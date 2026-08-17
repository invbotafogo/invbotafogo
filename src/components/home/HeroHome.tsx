interface HeroHomeProps {
  esmaecido: boolean;
}

/** Hero como no site antigo: só as boas-vindas, centralizadas na tela.
 *  O versículo e os botões saíram daqui para a seção `VerseCta`, logo abaixo. */
export function HeroHome({ esmaecido }: HeroHomeProps) {
  return (
    <div className={`section-home${esmaecido ? ' fade-out' : ''}`}>
      <div className="text">
        <h1>Bem-vindo à Igreja Nova Vida de Botafogo</h1>
        <h4>Não apenas uma Igreja, mas uma Família!</h4>
        <p>Participe conosco!</p>
      </div>
    </div>
  );
}
