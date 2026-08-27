import { useEffect, useState } from 'react';
import {
  fetchProgramacaoMensal,
  PROGRAMACAO_MENSAL,
  type ProgramacaoMensal,
} from '../lib/programacao';

export interface EstadoProgramacao {
  programacao: ProgramacaoMensal;
  carregando: boolean;
  erro: boolean;
}

/**
 * Programação mensal vinda da planilha (agenda.json na branch `data`).
 *
 * Devolve também `carregando` e `erro` porque um calendário vazio tem dois
 * motivos bem diferentes — o mês não tem evento extra, ou a agenda não chegou.
 * Sem essa distinção, uma integração quebrada passaria por mês tranquilo.
 */
export function useProgramacaoMensal(): EstadoProgramacao {
  const [estado, setEstado] = useState<EstadoProgramacao>({
    programacao: PROGRAMACAO_MENSAL,
    carregando: true,
    erro: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchProgramacaoMensal(controller.signal)
      .then((programacao) => setEstado({ programacao, carregando: false, erro: false }))
      .catch((erro: unknown) => {
        if (controller.signal.aborted) return;
        console.error('Erro ao carregar a agenda do mês:', erro);
        setEstado({ programacao: PROGRAMACAO_MENSAL, carregando: false, erro: true });
      });

    return () => controller.abort();
  }, []);

  return estado;
}
