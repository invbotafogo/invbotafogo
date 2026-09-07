import { useMemo, useState } from 'react';
import {
  DEVOCIONAIS,
  devocionalDoDia,
  devocionalPorNumero,
  TOTAL_DEVOCIONAIS,
  type Devocional,
} from '../../lib/devocionais';

/* Quantos parágrafos aparecem antes do "continuar lendo". Os devocionais vão
   de três linhas a mais de vinte; sem o corte, os longos empurrariam o resto
   da home para muito abaixo da dobra. */
const PREVIA = 6;

/* Data por extenso, com a primeira letra maiúscula: o toLocaleDateString do
   português devolve "domingo, 7 de setembro". */
function dataPorExtenso(d: Date) {
  const s = d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/*
 * Pré-visualização: `?devocional=39` força uma reflexão específica, sem mexer
 * na data do ciclo. Serve para conferir o layout e para o pastor revisar
 * qualquer uma delas antes do dia. Quem chega pelo site vê a do dia.
 */
function devocionalDaURL() {
  if (typeof window === 'undefined') return null;
  const bruto = new URLSearchParams(window.location.search).get('devocional');
  if (!bruto) return null;
  const n = Number(bruto);
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_DEVOCIONAIS) return null;
  return DEVOCIONAIS[n - 1];
}

/** Os parágrafos de um devocional, com os marcadores tratados. */
function Texto({ linhas }: { linhas: string[] }) {
  return (
    <>
      {linhas.map((linha, i) =>
        linha === '' ? (
          <div className="dev-espaco" key={i} aria-hidden="true" />
        ) : linha.startsWith('• ') ? (
          <p className="dev-item" key={i}>
            {linha.slice(2)}
          </p>
        ) : (
          <p key={i}>{linha}</p>
        ),
      )}
    </>
  );
}

/*
 * A parte anterior de uma série, aberta sob demanda.
 *
 * É recursivo de propósito: cada parte que aparece traz o seu próprio link
 * para a anterior, então quem está na parte 5 pode voltar até a 1 sem sair da
 * home. Como cada nível tem o seu próprio estado, nada abre sozinho — só o que
 * a pessoa pedir.
 */
function ParteAnterior({ numero }: { numero: number }) {
  const [aberto, setAberto] = useState(false);
  const devocional = devocionalPorNumero(numero);
  if (!devocional) return null;

  const serie = devocional.serie;

  return (
    <div className="dev-anterior">
      <button type="button" className="month-link" onClick={() => setAberto((v) => !v)}>
        {aberto
          ? 'Ocultar a parte anterior'
          : `Rever a parte ${serie ? serie.parte : ''} desta série`.replace('  ', ' ')}
      </button>

      {aberto && (
        <article className="dev-texto dev-texto-anterior">
          <Texto linhas={devocional.linhas} />
          {serie?.anterior && <ParteAnterior numero={serie.anterior} />}
        </article>
      )}
    </div>
  );
}

/**
 * Bloco "Devocional do dia" — uma das 100 reflexões do curso OBREIRO APROVADO,
 * escolhida pela data. Ao passar da centésima, o ciclo recomeça na primeira.
 */
export function EdDevocional() {
  const [aberto, setAberto] = useState(false);

  /* Calculado uma vez por montagem: quem deixa a aba aberta a noite inteira vê
     o devocional de ontem até recarregar, e isso é aceitável. */
  const hoje = useMemo(() => new Date(), []);
  const previa = useMemo(() => devocionalDaURL(), []);
  const devocional: Devocional = previa ?? devocionalDoDia(hoje);
  const serie = devocional.serie;

  const temMais = devocional.linhas.length > PREVIA;
  const linhas = aberto || !temMais ? devocional.linhas : devocional.linhas.slice(0, PREVIA);

  return (
    <section className="ed reveal ed-top ed-dev">
      <div className="lead-col">
        <p className="kicker">Devocional do dia</p>
        <h3>Palavra para hoje</h3>
        <p className="dev-data">{previa ? 'Pré-visualização' : dataPorExtenso(hoje)}</p>
        <p className="dev-contador">
          Reflexão <b>{devocional.numero}</b> de {TOTAL_DEVOCIONAIS}
        </p>

        {/* Contexto para quem chega no meio de uma série. */}
        {serie && (
          <p className="dev-serie">
            {serie.titulo}
            <span>
              parte {serie.parte} de {serie.total}
            </span>
          </p>
        )}
      </div>

      <div className="dev-col">
        <article className={`dev-texto ${temMais && !aberto ? 'is-cortado' : ''}`}>
          <Texto linhas={linhas} />
        </article>

        {temMais && (
          <button type="button" className="month-link" onClick={() => setAberto((v) => !v)}>
            {aberto ? 'Mostrar menos' : 'Continuar lendo'}
          </button>
        )}

        {/* O texto de hoje continua o de ontem: o link abre a parte anterior
            aqui mesmo, e ela traz o link para a dela, até a primeira. */}
        {serie?.anterior && <ParteAnterior numero={serie.anterior} />}
      </div>
    </section>
  );
}