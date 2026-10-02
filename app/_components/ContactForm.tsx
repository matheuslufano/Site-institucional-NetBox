"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

const CONTACT_EMAIL = "atendimento@netbox.net.br";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const message = [
      "Olá! Entrei em contato pelo site da Netbox.",
      `Nome: ${data.name}`,
      `Cidade: ${data.city}`,
      `Telefone: ${data.phone}`,
      `Assunto: ${data.subject}`,
      `Mensagem: ${data.message}`,
    ].join("\n");
    const subject = `Contato pelo site — ${data.subject}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="inner-form-row">
        <label>Nome<input name="name" required placeholder="Seu nome" /></label>
        <label>Telefone<input name="phone" required inputMode="tel" placeholder="(63) 99999-9999" /></label>
      </div>
      <div className="inner-form-row">
        <label>Cidade<input name="city" required placeholder="Sua cidade" /></label>
        <label>Assunto<select name="subject"><option>Quero contratar</option><option>Suporte técnico</option><option>Financeiro</option><option>Atendimento empresarial</option><option>Outro assunto</option></select></label>
      </div>
      <label>Como podemos ajudar?<textarea name="message" required rows={5} placeholder="Escreva sua mensagem" /></label>
      <button className="model-button orange" type="submit">Enviar por e-mail <ArrowIcon /></button>
      {sent && <p className="form-status" role="status">Mensagem preparada no seu aplicativo de e-mail.</p>}
    </form>
  );
}
