import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const CONFIGURADO = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Estado = 'ocioso' | 'enviando' | 'ok' | 'erro';

const MENSAGENS: Record<Exclude<Estado, 'ocioso'>, string> = {
  enviando: 'Enviando…',
  ok: 'Mensagem enviada! Responderemos em breve.',
  erro: 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo e-mail acima.',
};

export function ContactForm() {
  const [estado, setEstado] = useState<Estado>('ocioso');

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

    setEstado('enviando');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      form.reset();
      setEstado('ok');
    } catch (erro) {
      console.error('Erro ao enviar o formulário de contato:', erro);
      setEstado('erro');
    }
  };

  return (
    <form className="contact-form" onSubmit={enviar}>
      <input type="text" name="nome" placeholder="Nome" required />
      <input type="email" name="email" placeholder="E-mail" required />
      <textarea name="mensagem" placeholder="Sua mensagem" required />
      <button type="submit" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar'}
      </button>

      {estado !== 'ocioso' && (
        <p className="contact-form__status" role="status" aria-live="polite">
          {MENSAGENS[estado]}
        </p>
      )}
    </form>
  );
}
