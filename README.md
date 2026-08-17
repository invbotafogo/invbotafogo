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

**PDFs e imagens das aulas.** São servidos direto do repositório via
`raw.githubusercontent.com/.../main/src/assets/...` (constante `ASSETS_RAW_BASE`
em `src/lib/constants.ts`).

> ⚠️ **Não mova a pasta `src/assets/`.** Esses links dependem do caminho exato do
> arquivo dentro do repositório. Mover a pasta quebra os PDFs e as imagens de
> todas as aulas de uma vez.

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
