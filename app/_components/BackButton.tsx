"use client";

import { IoArrowBack } from "react-icons/io5";

export function BackButton() {
  function goToPreviousPage() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/");
  }

  return (
    <button type="button" className="inner-back-button" onClick={goToPreviousPage} aria-label="Voltar para a página anterior">
      <IoArrowBack aria-hidden="true" />
    </button>
  );
}
