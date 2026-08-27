# Site Igreja de Nova Vida Botafogo

Site da Igreja Nova Vida de Botafogo em **React + Vite + TypeScript**.

[Acesse o site](https://invbotafogo.com.br)

---

## Como rodar localmente

Precisa do [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install     # instala as dependências
npm run dev     # sobe em http://localhost:8080
```

Outros comandos:

```bash
npm run build     # gera o site em dist/
npm run preview   # serve o dist/ para conferir o build de produção
npm run deploy    # build + publica na branch gh-pages com o CNAME invbotafogo.com.br
```

> O deploy em produção acontece sozinho: o workflow `.github/workflows/deploy.yml`
> roda `npm run build` a cada push na `main` e publica o `dist/`. O `npm run deploy`
> é só para publicação manual.

---

## Estrutura

```
index.html                 entrada do Vite
vite.config.ts             build, base e cópia do 404.html
vercel.json                rewrite de SPA para o ambiente de teste na Vercel
src/
  main.tsx                 monta o React e o BrowserRouter
  App.tsx                  rotas e redirecionamentos das URLs antigas
  components/
    layout/                Header, Footer, Layout
    ui/                    Tabs (abas reutilizáveis)
    home/                  HeroHome, ServiceInfo, EventsCalendar, ChurchHistory
    cultos/                NextService, VideoList, VideoCard
    doacao/                BankDetails, PixButton
    estudos/               TopicCard, ClassCard
    ministerios/           MinistryGrid, MinistryCard, MinistryDetail
    contato/               ContactForm
  pages/                   Home, Cultos, Doacao, Contato, Estudos, Ministerios
  hooks/                   useLatestVideos, useNextService, useMobileMenu,
                           useScrollFade, useCalendarMode, useDocumentTitle
  lib/                     constants, youtube, estudos, ministerios, cultos
  styles/                  um .css por componente + global.css
  assets/                  imagens, PDFs e fontes
```

### Estilos

O `styles.css` antigo foi dividido por componente, **mantendo os nomes de classe
originais**. Cada componente importa o seu próprio `.css`; o `global.css` tem só
o que é realmente global (variáveis, reset, `body`, fundo, sticky footer).

### Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/cultos` | Cultos |
| `/doacao` | Doação |
| `/contato` | Contato |
| `/estudos` | Estudos — abas EBD e Capacitação (`?aba=capacitacao`) |
| `/ministerios` | Ministérios (`?ministerio=louvor` abre o painel direto) |

As URLs antigas (`/doe.html`, `/estudo.html`, `/capacitacao.html`,
`/ministries.html`…) redirecionam para as novas, então links já indexados
continuam funcionando.

---

## Dados que vêm de fora do build

**Vídeos dos cultos.** O workflow `.github/workflows/update-videos.yml` roda o
script Python `scripts/save_last_three_youtube_videos.py` duas vezes por dia e
grava o `videos.json` na branch `data`. O hook `useLatestVideos()` consome esse
arquivo direto do GitHub. Nem o script nem o workflow foram alterados na migração.

**Agenda do mês (Google Sheets).** Os eventos extras do mês vêm de uma planilha,
não do código. O workflow `.github/workflows/atualizar-agenda.yml` roda o script
`scripts/importar_agenda_do_sheets.py` **no dia 1 de cada mês**, às 3h de
Brasília, e grava o `agenda.json` na branch `data`; o hook
`useProgramacaoMensal()` consome esse arquivo. A planilha é fonte de
atualização mensal, não de consulta em tempo real — o Sheets é chamado 12 vezes
por ano, e nunca pelo navegador de quem visita. Veja a seção "Agenda do mês"
abaixo.

**PDFs e imagens das aulas.** São servidos direto do repositório via
`raw.githubusercontent.com/.../main/src/assets/...` (constante `ASSETS_RAW_BASE`
em `src/lib/constants.ts`).

> ⚠️ **Não mova a pasta `src/assets/`.** Esses links dependem do caminho exato do
> arquivo dentro do repositório. Mover a pasta quebra os PDFs e as imagens de
> todas as aulas de uma vez.

---

## Agenda do mês (Google Sheets)

O calendário da home tem duas partes, e só uma delas vem da planilha:

| Parte | De onde vem | Como mudar |
| --- | --- | --- |
| Programação **semanal** (EBD, cultos de domingo, quarta e quinta) | Fixa no código | `PROGRAMACAO_SEMANAL` em `src/lib/programacao.ts` |
| Eventos **extras do mês** | Planilha do Google Sheets | Marcar `X` na coluna de controle |

### A regra

Uma aba por mês. Numa linha, o `X` na **coluna F** publica aquele evento no
site; célula vazia, o evento não aparece. Maiúscula/minúscula e espaços não
importam. As colunas lidas são:

| Coluna | Conteúdo | Vira o quê no site |
| --- | --- | --- |
| A | Dia da semana | nada (o site calcula pelo dia da data) |
| B | Data `DD/MM` | data do card — células mescladas repetem a última data preenchida |
| C | Evento | título do card |
| D | Horário | horário do card (`19:30` vira `19h30`) |
| E | Observação | texto dourado abaixo do título |
| F | **Controle** | `X` publica; vazio não publica |

Linha marcada com `X` mas sem nada na coluna C usa a observação como título —
é o caso dos feriados.

### Configuração

Tudo que descreve a planilha está no bloco `CONFIGURAÇÃO DA PLANILHA`, no topo
de `scripts/importar_agenda_do_sheets.py`. Só ali. Para trocar de planilha,
mudar a coluna de controle ou a faixa lida, é esse bloco que se edita.

Duas coisas ficam fora do código, nas configurações do repositório
(*Settings → Secrets and variables → Actions*), no environment `data`:

| Onde | Nome | O que é |
| --- | --- | --- |
| Variable | `AGENDA_SHEET_ID` | o trecho entre `/d/` e `/edit` na URL da planilha |
| Secret | `GOOGLE_SHEETS_API_KEY` | chave da API do Google com a **Google Sheets API** ativada |

A chave nunca chega ao navegador: quem fala com o Google é o GitHub Actions, e
o site só lê o `agenda.json` já pronto.

A planilha precisa estar compartilhada como *"qualquer pessoa com o link pode
ver"* — é o que a chave de API exige.

### Quando a sincronização acontece

**Uma vez por mês, no dia 1 às 3h de Brasília.** A agenda daquele mês fica
publicada e serve o mês inteiro, sem nenhuma consulta nova ao Sheets — nem pelo
workflow, nem pelo navegador de quem abre o site.

Prepare o mês na planilha **antes do dia 1**. Para qualquer mudança fora dessa
janela — corrigir um horário, incluir um evento que surgiu no meio do mês,
refazer a sincronização que falhou — rode na mão em *Actions → Atualizar agenda
do mês → Run workflow*. Leva um minuto e vale para o que estiver marcado
naquele momento.

- pôr `X` → o evento passa a aparecer;
- tirar `X` → o evento some;
- mudar horário, observação ou data → o card muda junto;
- linha nova com `X` → card novo, na semana certa.

A execução é **idempotente**: o script monta o mês inteiro do zero e sobrescreve
o `agenda.json`. Rodar duas vezes no mesmo mês dá exatamente o mesmo arquivo,
sem duplicar evento; se nada mudou, o commit nem acontece ("Sem mudanças").

### Quando alguma coisa falha

Se a planilha não puder ser lida (chave errada, aba do mês faltando, Google
fora do ar), o script sai com erro **sem escrever o arquivo**: a execução
aparece vermelha no Actions, o GitHub avisa o dono do repositório por e-mail, e
o log diz o motivo. Rode de novo na mão depois de corrigir.

Nesse caso o `agenda.json` do mês anterior continua sendo servido — JSON válido,
mês errado. O site percebe isso: compara o mês do arquivo com o mês corrente e,
se não baterem, mostra **"A agenda deste mês ainda não foi publicada"** em vez
dos eventos do mês passado. Um mês sem sincronização fica visível, não passa por
mês tranquilo.

Se a planilha for lida e nenhuma linha estiver marcada, o mês fica mesmo vazio —
tirar o `X` precisa tirar o evento do site.

`PROGRAMACAO_MENSAL`, em `src/lib/programacao.ts`, está **vazia de propósito**.
Não há mais cadastro manual de evento no código: dado escrito à mão ali
esconderia uma integração quebrada, porque o site mostraria o mês antigo como
se estivesse tudo certo. Enquanto o `agenda.json` carrega, o calendário diz
"Carregando a agenda do mês…"; se ele não vier, diz "Não foi possível carregar
a agenda agora" — a falha aparece, em vez de virar um mês sem eventos.

---

## Formulário de contato (EmailJS)

O formulário usa o [EmailJS](https://www.emailjs.com). Crie um `.env` na raiz a
partir do `.env.example`:

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
```

O template do EmailJS precisa esperar os campos `nome`, `email` e `mensagem`.

Como o Vite injeta essas variáveis no build, elas também precisam existir no
ambiente que gera o build de produção (GitHub Actions) e no projeto da Vercel.
Sem elas o formulário mostra uma mensagem de erro em vez de enviar.
