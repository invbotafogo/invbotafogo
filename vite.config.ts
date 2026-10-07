import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { copyFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { IGREJA } from './src/lib/constants.ts';
import {
  AGENDA_JSON_URL,
  PROGRAMACAO_SEMANAL,
  parseProgramacaoMensal,
  type ProgramacaoMensal,
} from './src/lib/programacao.ts';
import { CALENDARIO_ICS, gerarCalendarioIcs } from './src/lib/calendarioIcs.ts';

/**
 * GitHub Pages não faz rewrite de rotas: uma URL como /estudos devolveria 404.
 * Copiar o index.html para 404.html faz o Pages servir o app em qualquer rota.
 * Na Vercel quem cuida disso é o rewrite do vercel.json — manter os dois é inofensivo.
 *
 * O /links (o link da bio do Instagram) ganha também um links.html: o Pages
 * serve /links por ele e responde 200, e não o 404 do fallback.
 */
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const out = resolve(import.meta.dirname, 'dist');
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
      copyFileSync(resolve(out, 'index.html'), resolve(out, 'links.html'));
    },
  };
}

/**
 * Agenda do mês para o calendário. No deploy ela vem do arquivo indicado em
 * AGENDA_JSON_LOCAL, tirado da branch `data` com git (ver deploy.yml); sem
 * ele, do mesmo endereço que o site usa. Nula se nenhum dos dois der certo.
 */
async function lerAgendaDoMes(): Promise<ProgramacaoMensal | null> {
  const arquivo = process.env.AGENDA_JSON_LOCAL;
  if (arquivo) {
    try {
      const agenda = parseProgramacaoMensal(JSON.parse(readFileSync(arquivo, 'utf8')));
      if (agenda) return agenda;
    } catch {
      /* Arquivo ausente ou vazio: tenta pela internet. */
    }
  }
  try {
    const resposta = await fetch(AGENDA_JSON_URL, { signal: AbortSignal.timeout(10_000) });
    return resposta.ok ? parseProgramacaoMensal(await resposta.json()) : null;
  } catch {
    return null;
  }
}

/**
 * Gera o calendario.ics que as pessoas assinam (ver src/lib/calendarioIcs.ts).
 * Sem a agenda do mês, sai só com a programação semanal: o build nunca falha
 * por causa dela.
 */
function calendarioIcs(): Plugin {
  return {
    name: 'calendario-ics',
    apply: 'build',
    async generateBundle() {
      const mensal = await lerAgendaDoMes();
      this.emitFile({
        type: 'asset',
        fileName: CALENDARIO_ICS.arquivo,
        source: gerarCalendarioIcs({
          semanal: PROGRAMACAO_SEMANAL,
          mensal,
          nome: IGREJA.nome,
          endereco: IGREJA.enderecoCompleto,
          site: new URL('/', CALENDARIO_ICS.url).href,
          agora: new Date(),
        }),
      });
      console.log(
        `\n${CALENDARIO_ICS.arquivo}: programação semanal + ${
          mensal ? `agenda de ${mensal.rotulo}` : 'sem a agenda do mês (não foi possível ler)'
        }`,
      );
    },
  };
}

/**
 * Código de acesso da Central INVB (ver src/lib/acessoCentral.ts). Não fica no
 * repositório: no deploy vem do secret CODIGO_CENTRAL do GitHub (deploy.yml);
 * para testar no computador, pode ir no .env. O site leva só o hash SHA-256
 * dele. Sem o código, o build sai normal — só a Central não abre.
 */
function hashDoCodigoDaCentral(mode: string, avisar: boolean): string {
  const codigo = (loadEnv(mode, import.meta.dirname, '').CODIGO_CENTRAL ?? '').trim();
  if (!codigo) {
    if (avisar) {
      console.warn(
        '\nAviso: CODIGO_CENTRAL não definido — neste build a Central INVB não abre com código nenhum.' +
          '\nNo deploy ele vem do secret do GitHub; aqui, é normal.\n',
      );
    }
    return '';
  }
  return createHash('sha256').update(codigo).digest('hex');
}

export default defineConfig(({ mode, isPreview }) => ({
  base: '/',
  plugins: [react(), spaFallback(), calendarioIcs()],
  define: {
    __CODIGO_CENTRAL_SHA256__: JSON.stringify(hashDoCodigoDaCentral(mode, !isPreview)),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 8080,
    open: true,
    /* Túnel do ngrok para testar o site no celular. */
    allowedHosts: ['onboard-ferris-spectator.ngrok-free.dev'],
  },
}));
