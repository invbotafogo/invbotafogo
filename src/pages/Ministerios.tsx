import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MinistryCard } from '../components/ministerios/MinistryCard';
import { MinistryDetail } from '../components/ministerios/MinistryDetail';
import { FooterSlot } from '../components/layout/Footer';
import { MINISTERIOS } from '../lib/ministerios';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/ministerios.css';

export default function Ministerios() {
  useDocumentTitle('INVB - Ministérios');

  /** O ministério aberto fica na URL — mantém os deep links ?ministerio=louvor do rodapé. */
  const [searchParams, setSearchParams] = useSearchParams();
  const selecionadoId = searchParams.get('ministerio');
  const selecionado = MINISTERIOS.find((m) => m.id === selecionadoId) ?? null;

  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selecionado) {
      painelRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selecionado]);

  const abrir = (id: string) => setSearchParams({ ministerio: id });
  const fechar = () => setSearchParams({}, { replace: true });

  return (
    <div className="section-ministerios" id="main">
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
