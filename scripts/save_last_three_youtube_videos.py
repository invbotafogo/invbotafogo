"""
Gera o videos.json consumido pela aba "Cultos" do site.

Critério de seleção (um vídeo entra se):
  - tem a tag de inclusão (TAG_INCLUIR), OU
  - dura pelo menos DURACAO_MINIMA_MIN minutos.

E nunca entra se tiver a tag de exclusão (TAG_EXCLUIR).

A regra de duração existe para o site não depender de alguém lembrar de marcar
a tag no YouTube. A tag continua funcionando como atalho manual.

Se nenhum vídeo for encontrado, o arquivo NÃO é escrito — assim o workflow
mantém o videos.json anterior no ar em vez de deixar a aba em branco.
"""

import json
import os
import re
import sys
import unicodedata
from urllib.parse import urljoin

import requests

API_KEY = os.getenv("YOUTUBE_API_KEY")
CHANNEL_ID = os.getenv("CHANNEL_ID")

API_URL = "https://www.googleapis.com/youtube/v3/"
ARQUIVO_SAIDA = "videos.json"

QUANTIDADE_FINAL = 3        # quantos vídeos vão para o site
JANELA_BUSCA = 50           # quantos vídeos recentes do canal são analisados (máx. 50)
DURACAO_MINIMA_MIN = 35     # abaixo disso não é culto (Shorts, recortes, avisos)
TAG_INCLUIR = "pregação"    # força a entrada de um vídeo
TAG_EXCLUIR = "sem-site"    # força a saída de um vídeo


def normalizar(texto: str) -> str:
    """Remove acentos e caixa, para comparar tags sem surpresa."""
    texto = unicodedata.normalize("NFKD", texto)
    texto = "".join(c for c in texto if not unicodedata.combining(c))
    return texto.casefold().strip()


def duracao_em_minutos(iso8601: str) -> float:
    """Converte a duração ISO-8601 do YouTube (ex.: PT1H12M30S) em minutos."""
    if not iso8601:
        return 0.0
    padrao = re.match(
        r"P(?:(?P<d>\d+)D)?T(?:(?P<h>\d+)H)?(?:(?P<m>\d+)M)?(?:(?P<s>\d+)S)?",
        iso8601,
    )
    if not padrao:
        return 0.0
    partes = {k: int(v or 0) for k, v in padrao.groupdict().items()}
    return partes["d"] * 1440 + partes["h"] * 60 + partes["m"] + partes["s"] / 60


def buscar_videos_recentes(api_key: str, channel_id: str, quantidade: int) -> dict:
    resposta = requests.get(
        urljoin(API_URL, "search"),
        params={
            "key": api_key,
            "channelId": channel_id,
            "part": "snippet,id",
            "type": "video",
            "order": "date",
            "maxResults": quantidade,
        },
        timeout=30,
    )
    resposta.raise_for_status()
    return resposta.json()


def detalhar_videos(api_key: str, busca: dict) -> dict:
    """Retorna {videoId: item} com snippet (tags) e contentDetails (duração)."""
    ids = [
        item["id"]["videoId"]
        for item in busca.get("items", [])
        if item.get("id", {}).get("videoId")
    ]
    if not ids:
        return {}

    detalhes: dict[str, dict] = {}
    # a API aceita no máximo 50 ids por chamada
    for inicio in range(0, len(ids), 50):
        lote = ids[inicio : inicio + 50]
        resposta = requests.get(
            urljoin(API_URL, "videos"),
            params={
                "key": api_key,
                "part": "snippet,contentDetails",
                "id": ",".join(lote),
            },
            timeout=30,
        )
        resposta.raise_for_status()
        for item in resposta.json().get("items", []):
            detalhes[item["id"]] = item
    return detalhes


def e_culto(item: dict) -> tuple[bool, str]:
    """Decide se o vídeo entra no site. Devolve (entra, motivo) para o log."""
    snippet = item.get("snippet", {})
    tags = {normalizar(t) for t in snippet.get("tags", [])}
    minutos = duracao_em_minutos(item.get("contentDetails", {}).get("duration", ""))

    if normalizar(TAG_EXCLUIR) in tags:
        return False, f"excluído pela tag '{TAG_EXCLUIR}'"
    if normalizar(TAG_INCLUIR) in tags:
        return True, f"tag '{TAG_INCLUIR}'"
    if minutos >= DURACAO_MINIMA_MIN:
        return True, f"duração de {minutos:.0f} min"
    return False, f"curto demais ({minutos:.0f} min) e sem tag"


def main() -> int:
    if not API_KEY or not CHANNEL_ID:
        print("ERRO: YOUTUBE_API_KEY e CHANNEL_ID precisam estar definidos.", file=sys.stderr)
        return 1

    busca = buscar_videos_recentes(API_KEY, CHANNEL_ID, JANELA_BUSCA)
    detalhes = detalhar_videos(API_KEY, busca)

    selecionados = []
    for item in busca.get("items", []):
        video_id = item.get("id", {}).get("videoId")
        detalhe = detalhes.get(video_id)
        if not detalhe:
            continue

        entra, motivo = e_culto(detalhe)
        titulo = detalhe.get("snippet", {}).get("title", "")
        print(f"{'[SIM]' if entra else '[NAO]'} {titulo} -- {motivo}")

        if entra:
            item["_publishedAt"] = detalhe.get("snippet", {}).get("publishedAt", "")
            selecionados.append(item)

    selecionados.sort(key=lambda v: v.get("_publishedAt", ""), reverse=True)
    selecionados = selecionados[:QUANTIDADE_FINAL]
    for item in selecionados:
        item.pop("_publishedAt", None)

    if not selecionados:
        print(
            "Nenhum culto encontrado na janela analisada. "
            "O videos.json anterior será mantido.",
            file=sys.stderr,
        )
        return 0

    busca["items"] = selecionados
    with open(ARQUIVO_SAIDA, "w", encoding="utf-8") as arquivo:
        json.dump(busca, arquivo, indent=2, ensure_ascii=False)

    print(f"\n{len(selecionados)} vídeo(s) gravados em {ARQUIVO_SAIDA}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
