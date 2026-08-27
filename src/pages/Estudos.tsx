import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from '../components/ui/Tabs';
import { StudyIndex } from '../components/estudos/StudyIndex';
import { StudyPanel } from '../components/estudos/StudyPanel';
import { FooterSlot } from '../components/layout/Footer';
import { ABAS_ESTUDOS, estudoAtual, type AbaEstudos } from '../lib/estudos';
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

  /** Estudo aberto no painel. Nulo = ainda ninguém escolheu nesta aba. */
  const [temaSelecionado, setTemaSelecionado] = useState<string | null>(null);

  const secao = ABAS_ESTUDOS.find((a) => a.id === abaAtiva)!;
  useDocumentTitle(`INVB - ${secao.rotulo === 'EBD' ? 'EBD' : 'Capacitação'}`);

  /*
   * Sem escolha da pessoa, abre o ESTUDO ATUAL da aba (definido em
   * src/lib/estudos.ts) — não o primeiro da lista. O mesmo `??` cobre a troca
   * de aba: o id guardado deixa de existir na nova categoria, então volta ao
   * estudo atual dela e nunca sobra estudo de uma aba na outra.
   */
  const tema =
    secao.temas.find((t) => t.id === temaSelecionado) ?? estudoAtual(abaAtiva);

  const trocarAba = (id: AbaEstudos) => {
    setTemaSelecionado(null);
    setSearchParams(id === 'ebd' ? {} : { aba: id }, { replace: true });
  };

  return (
    <>
      <div className="section-estudo">
        <section id="estudos-biblicos" className="estudos-biblicos">
          <h2>{secao.titulo}</h2>
          <p className="estudos-intro">
            Todos os estudos ficam à vista — escolha um para trocar o conteúdo.
          </p>

          <Tabs abas={ABAS} ativa={abaAtiva} aoTrocar={trocarAba} rotuloLista="Estudos">
            <div className="biblioteca">
              <StudyIndex
                temas={secao.temas}
                rotuloAba={secao.rotulo}
                temaAtivo={tema?.id ?? ''}
                aoSelecionar={setTemaSelecionado}
              />

              {tema ? (
                <StudyPanel tema={tema} />
              ) : (
                <p className="estudo-vazio">Estudos em breve.</p>
              )}
            </div>
          </Tabs>
        </section>
      </div>

      <FooterSlot />
    </>
  );
}
