import { REDES } from '../../lib/constants';
import { useNextService } from '../../hooks/useNextService';

export function NextService() {
  const culto = useNextService();
  if (!culto) return <div id="proximo-culto" className="proximo-culto" />;

  return (
    <div id="proximo-culto" className="proximo-culto">
      {culto.aoVivo ? '🎥 Culto ao vivo agora! ' : `🗓️ Próximo culto: ${culto.rotulo}. `}
      <a href={REDES.youtubeLive} target="_blank" rel="noopener noreferrer">
        Clique para assistir
      </a>
    </div>
  );
}
