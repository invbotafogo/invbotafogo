import { PIX } from '../../lib/constants';
import { useCopiar } from '../../hooks/useCopiar';

interface Dado {
  rotulo: string;
  valor: string;
  /** Mostra o botão de copiar: só nos números que a pessoa digita no app. */
  copiavel?: boolean;
}

const DADOS: Dado[] = [
  { rotulo: 'Banco', valor: PIX.instituicao },
  { rotulo: 'Agência', valor: PIX.agencia, copiavel: true },
  { rotulo: 'Conta', valor: PIX.conta, copiavel: true },
  { rotulo: 'Tipo de conta', valor: PIX.tipo },
  { rotulo: 'Favorecido', valor: PIX.favorecido },
  { rotulo: 'CNPJ', valor: PIX.cnpj, copiavel: true },
];

function BotaoCopiar({ dado }: { dado: Dado }) {
  const { estado, copiar } = useCopiar();
  const copiado = estado === 'ok';

  return (
    <button
      type="button"
      className={`doe-copiar${copiado ? ' is-copiado' : ''}`}
      onClick={() => copiar(dado.valor)}
      aria-label={`Copiar ${dado.rotulo.toLowerCase()}`}
    >
      <i className={copiado ? 'fa-solid fa-check' : 'fa-regular fa-copy'} aria-hidden="true" />
      <span aria-hidden="true">{copiado ? 'Copiado' : 'Copiar'}</span>
    </button>
  );
}

/** Dados da conta para transferência ou depósito, numa grade de 3 × 2. */
export function BankDetails() {
  return (
    <section className="doe-banco" aria-labelledby="doe-banco-titulo">
      <div className="doe-banco-cabeca">
        <h2 id="doe-banco-titulo">Transferência ou depósito</h2>
        <p>Se preferir, faça uma transferência ou um depósito na conta da igreja.</p>
      </div>

      <dl className="doe-dados">
        {DADOS.map((dado) => (
          <div key={dado.rotulo} className="doe-dado">
            <dt>{dado.rotulo}</dt>
            <dd>
              <span className="doe-dado-valor">{dado.valor}</span>
              {dado.copiavel && <BotaoCopiar dado={dado} />}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}