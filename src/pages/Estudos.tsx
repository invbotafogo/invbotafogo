import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from '../components/ui/Tabs';
import { TopicCard } from '../components/estudos/TopicCard';
import { FooterSlot } from '../components/layout/Footer';
import { ABAS_ESTUDOS, type AbaEstudos } from '../lib/estudos';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/estudos.css';

const ABAS = ABAS_ESTUDOS.map(({ id, rotulo }) => ({ id, rotulo }));

function ehAba(valor: string | null): valor is AbaEstudos {
  return valor === 'ebd' || valor === 'capacitacao';
}

export default function Estudos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const parametro = searchParams.get('aba');
  const abaAtiva: AbaEstudos = ehAba(parametro) ? parametro : 'ebd';

  /** Tema aberto no momento — no site antigo, abrir um recolhia os demais. */
  const [temaAberto, setTemaAberto] = useState<string | null>(null);

  const secao = ABAS_ESTUDOS.find((a) => a.id === abaAtiva)!;
  useDocumentTitle(`INVB - ${secao.rotulo === 'EBD' ? 'EBD' : 'Capacitação'}`);

  const trocarAba = (id: AbaEstudos) => {
    setTemaAberto(null);
    setSearchParams(id === 'ebd' ? {} : { aba: id }, { replace: true });
  };

  return (
    <>
      <div className="section-estudo">
        <section id="estudos-biblicos" className="estudos-biblicos">
          <h2>{secao.titulo}</h2>
          <p>Escolha um tema para acessar as aulas e PDFs correspondentes.</p>

          <Tabs abas={ABAS} ativa={abaAtiva} aoTrocar={trocarAba} rotuloLista="Estudos">
            <div className="temas-container">
              {secao.temas.map((tema) => (
                <TopicCard
                  key={tema.id}
                  tema={tema}
                  aberto={temaAberto === tema.id}
                  aoAlternar={() =>
                    setTemaAberto((atual) => (atual === tema.id ? null : tema.id))
                  }
                />
              ))}
            </div>
          </Tabs>
        </section>
      </div>

      <FooterSlot />
    </>
  );
}
