import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MinistryCard } from '../components/ministerios/MinistryCard';
import { MinistryDetail } from '../components/ministerios/MinistryDetail';
import { FooterSlot } from '../components/layout/Footer';
import { MINISTERIOS, usaLayoutSolo } from '../lib/ministerios';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/ministerios.css';
/* Layout novo do card ampliado (padrão Contato / "Nossa história").
   Precisa vir depois de ministerios.css para vencer as regras do painel antigo. */
import '../styles/ministerios-solo.css';

export default function Ministerios() {
  useDocumentTitle('INVB - Ministérios');

  /** O ministério aberto fica na URL — mantém os deep links ?ministerio=louvor do rodapé. */
  const [searchParams, setSearchParams] = useSearchParams();
  const selecionadoId = searchParams.get('ministerio');
  const selecionado = MINISTERIOS.find((m) => m.id === selecionadoId) ?? null;

  /** Só com o layout novo aberto a seção volta a rolar como uma página normal. */
  const layoutSolo = usaLayoutSolo(selecionado?.id);

  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selecionado) {
      painelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selecionado]);

  const abrir = (id: string) => setSearchParams({ ministerio: id });
  const fechar = () => setSearchParams({}, { replace: true });

  return (
    <div
      className={`section-ministerios${layoutSolo ? ' section-ministerios--solo' : ''}`}
      id="main"
    >
      <MinistryDetail ministerio={selecionado} aoFechar={fechar} painelRef={painelRef} />

      <div className="cards-container">
        {MINISTERIOS.map((ministerio) => (
          <MinistryCard
            key={ministerio.id}
            ministerio={ministerio}
            aoSelecionar={() => abrir(ministerio.id)}
          />
        ))}
      </div>

      <FooterSlot />
    </div>
  );
}
