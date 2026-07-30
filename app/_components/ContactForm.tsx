"use client";

import { FormEvent, useState } from "react";

const WHATSAPP = "5508006022732";

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
    setSent(true);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
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
      <button className="model-button orange" type="submit">Continuar no WhatsApp →</button>
      {sent && <p className="form-status" role="status">Mensagem preparada. O WhatsApp foi aberto em uma nova janela.</p>}
    </form>
  );
}
