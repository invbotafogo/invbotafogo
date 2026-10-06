import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ContactForm } from '../components/contato/ContactForm';
import { FooterSlot } from '../components/layout/Footer';
import { IGREJA, REDES } from '../lib/constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/contato.css';

interface Canal {
  id: string;
  icone: string;
  rotulo: string;
  valor: string;
  /** Linha menor embaixo do valor. */
  detalhe?: string;
  acao: { texto: string; href: string; externo?: boolean };
}

/* "Rua da Matriz, 95" em destaque e "Botafogo, Rio de Janeiro" embaixo, menor —
   como no rodapé, sem o CEP. */
const [rua, bairroECidade] = IGREJA.enderecoCompleto.split(' - ');

/* Os outros canais, lado a lado num painel só. O WhatsApp tem destaque próprio. */
const CANAIS: Canal[] = [
  {
    id: 'email',
    icone: 'fa-solid fa-envelope',
    rotulo: 'E-mail',
    valor: IGREJA.email,
    acao: { texto: 'Enviar e-mail', href: `mailto:${IGREJA.email}` },
  },
  {
    id: 'instagram',
    icone: 'fa-brands fa-instagram',
    rotulo: 'Instagram',
    valor: `@${REDES.instagram.split('/').filter(Boolean).pop()}`,
    acao: { texto: 'Abrir o Instagram', href: REDES.instagram, externo: true },
  },
  {
    id: 'endereco',
    icone: 'fa-solid fa-location-dot',
    rotulo: 'Endereço',
    valor: rua,
    detalhe: bairroECidade,
    acao: {
      texto: 'Ver no mapa',
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(IGREJA.enderecoCompleto)}`,
      externo: true,
    },
  },
];

/* Ao lado do formulário. Texto na Almeida Revista e Atualizada (ARA), a mesma
   do versículo do menu. */
const VERSICULO = {
  texto:
    'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças.',
  referencia: 'Filipenses 4.6',
};

const ABRE_EM_OUTRA_ABA = { target: '_blank', rel: 'noopener noreferrer' } as const;

/* No e-mail, se não couber numa linha, quebra antes do @, e não no meio do nome. */
function valorComQuebra(canal: Canal) {
  if (canal.id !== 'email') return canal.valor;
  const [usuario, dominio] = canal.valor.split('@');
  return (
    <>
      {usuario}
      <wbr />@{dominio}
    </>
  );
}

/** Desce até o formulário — só quando o topo dele está fora da tela. */
function rolarAteOFormulario() {
  const formulario = document.getElementById('escreva');
  if (!formulario) return;
  const topo = formulario.getBoundingClientRect().top;
  const alturaDoHeader = 70; /* --navbar-height */
  if (topo < alturaDoHeader || topo > window.innerHeight * 0.5) {
    formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Contato: o WhatsApp em destaque ao lado da abertura, os outros canais num
 * painel de três colunas e, embaixo, o formulário — que também recebe pedido
 * de oração.
 *
 * A escolha entre mensagem e pedido de oração fica na URL
 * (/contato?assunto=oracao): é esse o link para divulgar no Instagram, e ele
 * já abre a página no formulário, com "Pedido de oração" marcado.
 */
export default function Contato() {
  useDocumentTitle('INVB - Contato');

  const [parametros] = useSearchParams();

  /* Só a chegada pelo link conta. Trocar a opção no formulário não mexe na rolagem. */
  const [chegouParaPedirOracao] = useState(() => parametros.get('assunto') === 'oracao');

  useEffect(() => {
    if (!chegouParaPedirOracao) return;
    let cancelado = false;

    /* Espera a Montserrat carregar: com a fonte de reserva a página tem outra
       altura, e a rolagem feita antes parava fora do lugar. */
    document.fonts.ready.then(() => {
      if (!cancelado) rolarAteOFormulario();
    });

    return () => {
      cancelado = true;
    };
  }, [chegouParaPedirOracao]);

  return (
    <>
      <div className="section-contato" id="main">
        <div className="ct-wrap">
          <div className="ct-topo">
            <div className="ct-intro">
              <h1>Contato</h1>
              <p>
                Quer tirar uma dúvida, saber mais da igreja ou{' '}
                <Link to="?assunto=oracao" replace onClick={rolarAteOFormulario}>
                  pedir oração
                </Link>
                ? Fale com a gente pelo canal que preferir ou escreva pelo formulário.
              </p>
            </div>

            {/* O canal mais usado, em destaque: o número em numerais grandes,
                como o horário do "Próximo encontro" da home. */}
            <div className="ct-whatsapp">
              <p className="ct-whatsapp-rotulo">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp e telefone
              </p>
              <p className="ct-whatsapp-numero">{IGREJA.telefone}</p>
              <div className="ct-whatsapp-acoes">
                <a className="ct-botao ct-botao--cheio" href={REDES.whatsapp} {...ABRE_EM_OUTRA_ABA}>
                  Chamar no WhatsApp
                </a>
                <a className="ct-botao" href={IGREJA.telefoneHref}>
                  Ligar
                </a>
              </div>
            </div>
          </div>

          <ul className="ct-canais">
            {CANAIS.map((canal) => (
              <li key={canal.id} className="ct-canal">
                <span className="ct-icone" aria-hidden="true">
                  <i className={canal.icone} />
                </span>
                <div className="ct-canal-texto">
                  <span className="ct-rotulo">{canal.rotulo}</span>
                  <span className="ct-valor">{valorComQuebra(canal)}</span>
                  {canal.detalhe && <span className="ct-detalhe">{canal.detalhe}</span>}
                </div>
                <a
                  className="ct-botao"
                  href={canal.acao.href}
                  {...(canal.acao.externo ? ABRE_EM_OUTRA_ABA : {})}
                >
                  {canal.acao.texto}
                </a>
              </li>
            ))}
          </ul>

          <section className="ct-escreva" id="escreva" aria-labelledby="ct-escreva-titulo">
            <div className="ct-escreva-intro">
              <h2 id="ct-escreva-titulo">Escreva pra gente</h2>
              <p>
                Mande sua mensagem ou seu pedido de oração. A resposta chega no e-mail que você
                deixar.
              </p>

              <figure className="ct-versiculo">
                <blockquote>“{VERSICULO.texto}”</blockquote>
                <figcaption>{VERSICULO.referencia}</figcaption>
              </figure>
            </div>

            <ContactForm />
          </section>
        </div>
      </div>

      <FooterSlot />
    </>
  );
}