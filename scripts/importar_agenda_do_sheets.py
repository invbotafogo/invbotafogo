"""
Gera o agenda.json que alimenta a "Programação mensal" do site.

Fluxo: Google Sheets -> coluna de controle -> só as linhas marcadas -> agenda.json

A planilha é a fonte da verdade dos EVENTOS EXTRAS do mês. A programação
semanal fixa (EBD e cultos de domingo, quarta e quinta) NÃO vem daqui — ela
mora em src/lib/programacao.ts e não é tocada por este script.

Quem roda isto é o workflow .github/workflows/atualizar-agenda.yml, que publica
o resultado na branch `data`. A chave da API fica num secret do GitHub e nunca
chega ao frontend, exatamente como já é feito com os vídeos do YouTube.

Comportamento em caso de erro (proposital):
  - falha de rede/API/aba não encontrada -> NÃO escreve o arquivo e sai com
    código 1; o workflow mantém o agenda.json anterior no ar.
  - planilha lida com sucesso e nenhuma linha marcada -> escreve um mês vazio;
    tirar o X da planilha PRECISA tirar o evento do site.
"""

import json
import os
import re
import sys
import unicodedata
from datetime import date, datetime, timedelta, timezone
from urllib.parse import quote

import requests

# ============================================================================
#  CONFIGURAÇÃO DA PLANILHA — é aqui que se mexe. Só aqui.
# ============================================================================

# Id da planilha: é o trecho entre /d/ e /edit na URL.
# https://docs.google.com/spreadsheets/d/ESTE_TRECHO_AQUI/edit
# Definido como variável do repositório (Settings > Variables > AGENDA_SHEET_ID)
# para poder trocar de planilha sem mexer no código.
PLANILHA_ID = os.getenv("AGENDA_SHEET_ID", "")

# Coluna que decide o que é publicado, e o que conta como "publicar".
# Comparação sem acento, sem caixa e sem espaços: "x", "X", " x " valem igual.
COLUNA_CONTROLE = "F"
MARCA_PUBLICAR = "X"

# Onde cada informação está na linha. Letra da coluna, como aparece na planilha.
COLUNAS = {
    "dia_semana": "A",  # lido, mas o site usa o dia calculado a partir da data
    "data": "B",        # DD/MM — células mescladas repetem a última data preenchida
    "titulo": "C",
    "horario": "D",
    "nota": "E",        # observação; vira o texto dourado do card
    "controle": COLUNA_CONTROLE,
}

# Faixa lida em cada aba. Sobra folga para o mês inteiro.
INTERVALO = "A1:F400"

# Uma aba por mês. O script procura a aba do mês corrente comparando o nome
# sem acento e sem caixa: "SETEMBRO", "Setembro", "setembro 2026" e "09" valem.
ABA_POR_MES = True

# Fuso usado para decidir que mês é "o mês corrente".
FUSO = timezone(timedelta(hours=-3))  # America/Sao_Paulo

ARQUIVO_SAIDA = "agenda.json"

# ============================================================================

API_KEY = os.getenv("GOOGLE_SHEETS_API_KEY")
API_URL = "https://sheets.googleapis.com/v4/spreadsheets"

MESES = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
]
DIAS_ABREV = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"]  # weekday(): 0 = segunda

# Palavras que continuam minúsculas ao converter CAIXA ALTA em texto normal.
MINUSCULAS = {"de", "da", "do", "das", "dos", "e", "em", "no", "na", "nos",
              "nas", "a", "o", "as", "os", "com", "para", "por", "ao", "à",
              "pela", "pelas", "pelo", "pelos"}


def normalizar(texto: str) -> str:
    """Sem acento, sem caixa, sem espaço nas pontas — para comparar."""
    texto = unicodedata.normalize("NFKD", texto or "")
    texto = "".join(c for c in texto if not unicodedata.combining(c))
    return texto.casefold().strip()


def indice_da_coluna(letra: str) -> int:
    """'A' -> 0, 'F' -> 5."""
    return ord(letra.upper()) - ord("A")


def celula(linha: list, letra: str) -> str:
    """Valor da coluna nesta linha. A API corta as células vazias do fim."""
    i = indice_da_coluna(letra)
    return (linha[i] if i < len(linha) else "").strip()


def texto_amigavel(texto: str) -> str:
    """
    A planilha é escrita em CAIXA ALTA; o site escreve normal. Converte só o
    que está todo em maiúsculas, para não estragar siglas digitadas de
    propósito ("EBD") nem texto já digitado normalmente.
    """
    if not texto or texto != texto.upper():
        return texto

    palavras = texto.split()
    saida = []
    for i, p in enumerate(palavras):
        base = p.casefold()
        if i > 0 and base in MINUSCULAS:
            saida.append(base)
        elif len(p) <= 3 and p.isalpha() and i == 0 and len(palavras) == 1:
            saida.append(p)          # sigla isolada: "EBD" continua "EBD"
        else:
            saida.append(base[:1].upper() + base[1:])

    # Maiúscula também depois de abre-parênteses: "(independência)" -> "(Independência)"
    return re.sub(r"\(\s*([a-zà-ÿ])",
                  lambda m: m.group(0)[:-1] + m.group(1).upper(),
                  " ".join(saida))


def horario_amigavel(texto: str) -> str:
    """'19:30' -> '19h30' | '10:00 e 19:00' -> '10h e 19h' (estilo do site)."""
    def troca(m: re.Match) -> str:
        hora = str(int(m.group(1)))
        minuto = m.group(2)
        return f"{hora}h" if minuto == "00" else f"{hora}h{minuto}"

    return re.sub(r"(\d{1,2}):(\d{2})", troca, texto or "").strip()


def buscar(url: str, params: dict) -> dict:
    resposta = requests.get(url, params=params, timeout=30)
    resposta.raise_for_status()
    return resposta.json()


def aba_do_mes(planilha_id: str, mes: int, ano: int) -> str:
    """Nome da aba correspondente ao mês. Erro explícito se não existir."""
    dados = buscar(f"{API_URL}/{planilha_id}",
                   {"key": API_KEY, "fields": "sheets.properties.title"})
    titulos = [s["properties"]["title"] for s in dados.get("sheets", [])]

    nome_mes = normalizar(MESES[mes - 1])
    numero = f"{mes:02d}"

    for titulo in titulos:
        n = normalizar(titulo)
        if nome_mes in n or n == numero or n == str(mes) or n.startswith(f"{numero} "):
            return titulo

    raise LookupError(
        f"Nenhuma aba para {MESES[mes - 1]}/{ano}. Abas encontradas: {titulos}. "
        f"Renomeie a aba do mês (ex.: '{MESES[mes - 1].upper()}')."
    )


def ler_linhas(planilha_id: str, aba: str) -> list:
    faixa = quote(f"{aba}!{INTERVALO}", safe="")
    dados = buscar(f"{API_URL}/{planilha_id}/values/{faixa}",
                   {"key": API_KEY, "majorDimension": "ROWS"})
    return dados.get("values", [])


def eventos_marcados(linhas: list, mes: int, ano: int) -> list:
    """
    Percorre a planilha e devolve só as linhas com X na coluna de controle.

    A coluna da data tem células mescladas (um domingo ocupa três linhas, com a
    data escrita só na primeira). Por isso a última data preenchida é carregada
    para as linhas seguintes.
    """
    marca = normalizar(MARCA_PUBLICAR)
    ultima_data = None
    eventos = []

    for linha in linhas:
        bruto_data = celula(linha, COLUNAS["data"])
        if bruto_data:
            ultima_data = bruto_data

        if normalizar(celula(linha, COLUNAS["controle"])) != marca:
            continue

        titulo = celula(linha, COLUNAS["titulo"])
        observacao = celula(linha, COLUNAS["nota"])

        # Linhas como feriado trazem o texto só na observação, sem evento na
        # coluna do título. Nesse caso a observação vira o próprio título.
        if not titulo and observacao:
            titulo, observacao = observacao, ""

        if not titulo:
            print(f"  aviso: linha marcada com {MARCA_PUBLICAR} mas sem texto nas "
                  f"colunas {COLUNAS['titulo']} e {COLUNAS['nota']} — ignorada.",
                  file=sys.stderr)
            continue

        dia = dia_do_mes(ultima_data, mes)
        if dia is None:
            print(f"  aviso: '{titulo}' está marcado mas a data '{ultima_data}' "
                  f"não foi entendida — ignorado.", file=sys.stderr)
            continue

        quando = date(ano, mes, dia)
        evento = {
            "dia": DIAS_ABREV[quando.weekday()],
            "data": f"{dia:02d}/{mes:02d}",
            "titulo": texto_amigavel(titulo),
            "_diaDoMes": dia,
        }

        horario = horario_amigavel(celula(linha, COLUNAS["horario"]))
        if horario:
            evento["horario"] = horario

        nota = texto_amigavel(observacao)
        if nota:
            evento["nota"] = nota

        eventos.append(evento)

    eventos.sort(key=lambda e: e["_diaDoMes"])
    return eventos


def dia_do_mes(bruto: str, mes: int):
    """'05/09' -> 5. Ignora datas de outro mês (aba com sobra de outro mês)."""
    if not bruto:
        return None
    m = re.match(r"^\s*(\d{1,2})\s*/\s*(\d{1,2})", bruto)
    if not m:
        return None
    dia, mes_da_celula = int(m.group(1)), int(m.group(2))
    if mes_da_celula != mes or not 1 <= dia <= 31:
        return None
    return dia


def montar_semanas(eventos: list, mes: int, ano: int) -> list:
    """
    Agrupa por semana de domingo a sábado, como o calendário do site já fazia.
    Uma sobra curta no começo do mês (menos de 4 dias) entra na primeira semana
    cheia, para não gerar uma "Semana 1" de um dia só.
    """
    ultimo_dia = (date(ano, mes, 28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)
    ultimo_dia = ultimo_dia.day

    cortes = []
    inicio = 1
    d = date(ano, mes, 1)
    while inicio <= ultimo_dia:
        # avança até o sábado (weekday 5)
        fim = inicio + (5 - d.weekday()) % 7
        fim = min(fim, ultimo_dia)
        cortes.append([inicio, fim])
        inicio = fim + 1
        if inicio <= ultimo_dia:
            d = date(ano, mes, inicio)

    if len(cortes) > 1 and (cortes[0][1] - cortes[0][0] + 1) < 4:
        cortes[1][0] = cortes[0][0]
        cortes.pop(0)

    semanas = []
    for i, (ini, fim) in enumerate(cortes, start=1):
        da_semana = [e for e in eventos if ini <= e["_diaDoMes"] <= fim]
        semanas.append({
            "rotulo": f"Semana {i}",
            # O site lê "N a M" daqui para saber qual semana é a de hoje.
            "intervalo": f"{ini} a {fim} de {MESES[mes - 1]}",
            "eventos": [{k: v for k, v in e.items() if k != "_diaDoMes"} for e in da_semana],
        })
    return semanas


def main() -> int:
    if not API_KEY:
        print("Falta GOOGLE_SHEETS_API_KEY (secret do repositório).", file=sys.stderr)
        return 1
    if not PLANILHA_ID:
        print("Falta AGENDA_SHEET_ID (variável do repositório).", file=sys.stderr)
        return 1

    hoje = datetime.now(FUSO).date()
    mes, ano = hoje.month, hoje.year

    try:
        aba = aba_do_mes(PLANILHA_ID, mes, ano) if ABA_POR_MES else INTERVALO
        print(f"Lendo a aba '{aba}' ({MESES[mes - 1]} de {ano}).")
        linhas = ler_linhas(PLANILHA_ID, aba)
    except Exception as erro:  # noqa: BLE001 — qualquer falha mantém o JSON anterior
        print(f"Não foi possível ler a planilha: {erro}", file=sys.stderr)
        print("O agenda.json anterior continua no ar.", file=sys.stderr)
        return 1

    eventos = eventos_marcados(linhas, mes, ano)
    print(f"{len(eventos)} evento(s) com '{MARCA_PUBLICAR}' na coluna {COLUNA_CONTROLE}.")

    agenda = {
        "rotulo": f"{MESES[mes - 1].capitalize()} de {ano}",
        "semanas": montar_semanas(eventos, mes, ano),
        "atualizadoEm": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "fonte": {"planilha": PLANILHA_ID, "aba": aba, "coluna": COLUNA_CONTROLE},
    }

    with open(ARQUIVO_SAIDA, "w", encoding="utf-8") as arquivo:
        json.dump(agenda, arquivo, ensure_ascii=False, indent=2)

    print(f"{ARQUIVO_SAIDA} gerado.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
