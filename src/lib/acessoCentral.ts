/*
 * Código de acesso da Central INVB (/central).
 *
 * O código não fica no repositório: no deploy ele vem do secret
 * CODIGO_CENTRAL do GitHub (ver .github/workflows/deploy.yml), e o
 * vite.config.ts põe no site só o hash SHA-256 dele. O navegador calcula o
 * hash do que a pessoa digita e compara. Maiúsculas e minúsculas contam.
 *
 * Para trocar o código: edite o secret no GitHub e rode o deploy de novo.
 */
const HASH_DO_CODIGO = __CODIGO_CENTRAL_SHA256__;
const CHAVE = 'invb-central';

/** Vale só nesta visita, se o navegador não deixar guardar nada. */
let liberadaNestaVisita = false;

async function sha256(texto: string): Promise<string> {
  const resumo = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(resumo), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function codigoConfere(digitado: string): Promise<boolean> {
  /* Sem código no build, nada entra. O crypto.subtle só existe em HTTPS — e o
     site sempre redireciona para HTTPS. */
  if (!HASH_DO_CODIGO || !window.isSecureContext) return false;
  return (await sha256(digitado.trim())) === HASH_DO_CODIGO;
}

/** Libera a Central até fechar a aba (computador de uso comum fica trancado). */
export function liberarCentral() {
  liberadaNestaVisita = true;
  try {
    sessionStorage.setItem(CHAVE, HASH_DO_CODIGO);
  } catch {
    /* Sem armazenamento: vale só nesta visita. */
  }
}

/** Se o código mudar, quem tinha entrado com o antigo precisa digitar de novo. */
export function centralLiberada(): boolean {
  if (!HASH_DO_CODIGO) return false;
  if (liberadaNestaVisita) return true;
  try {
    return sessionStorage.getItem(CHAVE) === HASH_DO_CODIGO;
  } catch {
    return false;
  }
}
