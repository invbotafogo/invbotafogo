import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/*
 * Quem responde os pedidos de oração é decisão da liderança. Enquanto não
 * houver decisão, eles chegam no e-mail de sempre, com "[Pedido de oração]" no
 * começo do texto. Para mandar para outra pessoa ou equipe: crie no EmailJS um
 * segundo template com o e-mail dela, ponha o id em
 * VITE_EMAILJS_TEMPLATE_ID_ORACAO (no .env e nos secrets do GitHub) e repasse
 * a variável no passo "Build" do .github/workflows/deploy.yml.
 */
const TEMPLATE_ID_ORACAO: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORACAO || TEMPLATE_ID;

const CONFIGURADO = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Estado = 'ocioso' | 'enviando' | 'ok' | 'erro';
type Assunto = 'mensagem' | 'oracao';

const ASSUNTOS: Record<
  Assunto,
  {
    rotulo: string;
    campo: string;
    placeholder: string;
    botao: string;
    enviado: string;
    template: string;
  }
> = {
  mensagem: {
    rotulo: 'Mensagem',
    campo: 'Mensagem',
    placeholder: 'Como podemos ajudar?',
    botao: 'Enviar mensagem',
    enviado: 'Mensagem enviada. Vamos responder no e-mail que você deixou.',
    template: TEMPLATE_ID,
  },
  oracao: {
    rotulo: 'Pedido de oração',
    campo: 'Seu pedido',
    placeholder: 'Pelo que você quer que a gente ore?',
    botao: 'Enviar pedido',
    enviado: 'Pedido enviado. Vamos orar por você.',
    template: TEMPLATE_ID_ORACAO,
  },
};

const ORDEM: Assunto[] = ['mensagem', 'oracao'];

const MENSAGEM_DE_ERRO =
  'Não foi possível enviar agora. Tente de novo ou use um dos contatos acima.';

/**
 * Formulário de contato, com a escolha entre mensagem e pedido de oração.
 * A escolha fica na URL (?assunto=oracao), para o link do Instagram já abrir
 * com o pedido de oração marcado.
 */
export function ContactForm() {
  const [parametros, setParametros] = useSearchParams();
  const assunto: Assunto = parametros.get('assunto') === 'oracao' ? 'oracao' : 'mensagem';
  const ehOracao = assunto === 'oracao';
  const [estado, setEstado] = useState<Estado>('ocioso');

  const escolher = (novo: Assunto) => {
    setEstado('ocioso');
    setParametros(novo === 'oracao' ? { assunto: 'oracao' } : {}, { replace: true });
  };

  const enviar = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const form = evento.currentTarget;

    if (!CONFIGURADO) {
      console.warn(
        'EmailJS não configurado: defina VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID e VITE_EMAILJS_PUBLIC_KEY.',
      );
      setEstado('erro');
      return;
    }

    const dados = new FormData(form);
    const texto = String(dados.get('message') ?? '');

    /*
     * Variáveis do template no EmailJS: {{from_name}}, {{reply_to}},
     * {{message}} e, se quiser no assunto do e-mail, {{assunto}}. O tipo
     * também vai escrito no começo do texto, para aparecer mesmo num template
     * que não usa {{assunto}}.
     */
    const parametrosDoEmail = {
      from_name: String(dados.get('from_name') ?? ''),
      reply_to: String(dados.get('reply_to') ?? ''),
      assunto: ASSUNTOS[assunto].rotulo,
      message: ehOracao ? `[Pedido de oração]\n\n${texto}` : texto,
    };

    setEstado('enviando');
    try {
      await emailjs.send(SERVICE_ID, ASSUNTOS[assunto].template, parametrosDoEmail, {
        publicKey: PUBLIC_KEY,
      });

      /* Limpa só os campos de texto: um form.reset() desmarcaria também a
         escolha do assunto, que vem da URL. */
      for (const nome of ['from_name', 'reply_to', 'message']) {
        const campo = form.elements.namedItem(nome);
        if (campo instanceof HTMLInputElement || campo instanceof HTMLTextAreaElement) {
          campo.value = '';
        }
      }

      setEstado('ok');
    } catch (erro) {
      console.error('Erro ao enviar o formulário de contato:', erro);
      setEstado('erro');
    }
  };

  return (
    <form className="ct-form" onSubmit={enviar}>
      <fieldset className="ct-assunto">
        <legend>Sobre o que você quer falar?</legend>
        <div className="ct-assunto-opcoes">
          {ORDEM.map((id) => (
            <label
              key={id}
              className={`ct-assunto-opcao${assunto === id ? ' is-ativo' : ''}`}
            >
              <input
                type="radio"
                name="assunto"
                value={id}
                checked={assunto === id}
                onChange={() => escolher(id)}
              />
              {ASSUNTOS[id].rotulo}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="ct-campos">
        <div className="ct-campo">
          <label htmlFor="ct-nome">
            Nome
            {ehOracao && <span className="ct-campo-dica"> (pode ser só o primeiro)</span>}
          </label>
          <input id="ct-nome" type="text" name="from_name" autoComplete="name" required />
        </div>

        <div className="ct-campo">
          <label htmlFor="ct-email">E-mail</label>
          <input id="ct-email" type="email" name="reply_to" autoComplete="email" required />
        </div>

        <div className="ct-campo ct-campo--inteiro">
          <label htmlFor="ct-texto">{ASSUNTOS[assunto].campo}</label>
          <textarea
            id="ct-texto"
            name="message"
            rows={6}
            placeholder={ASSUNTOS[assunto].placeholder}
            required
          />
        </div>
      </div>

      <div className="ct-enviar">
        <button type="submit" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Enviando…' : ASSUNTOS[assunto].botao}
        </button>

        {/* Sempre no DOM, para o leitor de tela anunciar quando o texto mudar. */}
        <p
          className={`ct-status${estado === 'ok' || estado === 'erro' ? ` ct-status--${estado}` : ''}`}
          role="status"
          aria-live="polite"
        >
          {estado === 'ok' ? ASSUNTOS[assunto].enviado : estado === 'erro' ? MENSAGEM_DE_ERRO : ''}
        </p>
      </div>
    </form>
  );
}