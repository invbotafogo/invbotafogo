import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FooterSlot } from '../components/layout/Footer';
import { centralLiberada } from '../lib/acessoCentral';
import { SUBDOMINIOS, type Subdominio } from '../lib/subdominios';
import { useCopiar } from '../hooks/useCopiar';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useForaDosBuscadores } from '../hooks/useForaDosBuscadores';
import '../styles/central.css';

type Situacao = 'verificando' | 'no-ar' | 'sem-resposta';

const ROTULO: Record<Situacao, string> = {
  verificando: 'Verificando…',
  'no-ar': 'No ar',
  'sem-resposta': 'Sem resposta',
};

/*
 * O site responde? O navegador não deixa ler a resposta de outro endereço,
 * mas deixa saber se veio alguma: chegou resposta, está no ar; deu erro de
 * rede (endereço fora do ar, sem certificado, domínio apontando para lugar
 * nenhum), não está.
 */
async function verificar(host: string): Promise<Situacao> {
  try {
    await fetch(`https://${host}/`, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    return 'no-ar';
  } catch {
    return 'sem-resposta';
  }
}

function Linha({ site, situacao }: { site: Subdominio; situacao: Situacao }) {
  const { estado, copiar } = useCopiar();
  const url = `https://${site.host}${site.caminho ?? ''}`;

  return (
    <li className="cen-linha">
      <span className="cen-icone" aria-hidden="true">
        <i className={site.icone} />
      </span>

      <div className="cen-texto">
        <p className="cen-nome">
          {site.nome}
          {site.aviso && <span className="cen-aviso">{site.aviso}</span>}
        </p>
        <a className="cen-host" href={url} target="_blank" rel="noopener noreferrer">
          {site.host}
          {site.caminho}
        </a>
        <p className="cen-descricao">{site.descricao}</p>
      </div>

      <span className={`cen-situacao cen-situacao--${situacao}`}>
        <span className="cen-ponto" aria-hidden="true" />
        {ROTULO[situacao]}
      </span>

      <div className="cen-acoes">
        <a className="cen-botao cen-botao--abrir" href={url} target="_blank" rel="noopener noreferrer">
          Abrir <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
        </a>
        <button
          type="button"
          className="cen-botao cen-botao--icone"
          onClick={() => copiar(url)}
          aria-label={`Copiar o link de ${site.nome}`}
          title="Copiar o link"
        >
          <i className={estado === 'ok' ? 'fa-solid fa-check' : 'fa-regular fa-copy'} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

/**
 * Central INVB: os sites da igreja num lugar só, com a situação de cada um.
 * Não tem link em lugar nenhum do site — chega-se aqui pelo código de acesso
 * (ver AcessoCentral.tsx). Quem abre /central direto, sem ter digitado o
 * código nesta aba, cai na página inicial com a caixa do código aberta (o
 * mesmo do link /#central); com o código certo, volta para cá.
 */
export default function Central() {
  if (!centralLiberada()) return <Navigate to="/#central" replace />;
  return <PaginaCentral />;
}

function PaginaCentral() {
  useDocumentTitle('INVB - Central');
  useForaDosBuscadores();

  const [situacoes, setSituacoes] = useState<Record<string, Situacao>>({});
  const [verificadoAs, setVerificadoAs] = useState<string | null>(null);

  const verificarTodos = useCallback(async () => {
    setVerificadoAs(null);
    setSituacoes(Object.fromEntries(SUBDOMINIOS.map((s) => [s.host, 'verificando' as Situacao])));
    const resultados = await Promise.all(
      SUBDOMINIOS.map(async (s) => [s.host, await verificar(s.host)] as const),
    );
    setSituacoes(Object.fromEntries(resultados));
    setVerificadoAs(
      new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    );
  }, []);

  useEffect(() => {
    void verificarTodos();
  }, [verificarTodos]);

  const noAr = SUBDOMINIOS.filter((s) => situacoes[s.host] === 'no-ar').length;
  const verificando = verificadoAs === null;

  return (
    <>
      <div className="section-central" id="main">
        <div className="cen-wrap">
          <div className="cen-topo">
            <div className="cen-intro">
              <h1>Central INVB</h1>
              <p>Os sites da igreja num lugar só.</p>
            </div>

            {/* A peça forte da página: quantos estão no ar, em numerais grandes. */}
            <div className="cen-resumo" aria-live="polite">
              <p className="cen-resumo-rotulo">Sites no ar</p>
              <p className="cen-resumo-numero">
                {verificando ? '—' : noAr}
                <span> de {SUBDOMINIOS.length}</span>
              </p>
              <p className="cen-resumo-hora">
                {verificando ? 'Verificando agora…' : `Verificado às ${verificadoAs}`}
              </p>
              <button
                type="button"
                className="cen-botao"
                onClick={() => void verificarTodos()}
                disabled={verificando}
              >
                <i className="fa-solid fa-rotate-right" aria-hidden="true" /> Verificar de novo
              </button>
            </div>
          </div>

          <ul className="cen-lista">
            {SUBDOMINIOS.map((site) => (
              <Linha key={site.host} site={site} situacao={situacoes[site.host] ?? 'verificando'} />
            ))}
          </ul>
        </div>
      </div>

      <FooterSlot />
    </>
  );
}
