"use client";

export function BackButton() {
  function goToPreviousPage() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/");
  }

  return (
    <button type="button" className="inner-back-button" onClick={goToPreviousPage}>
      ←
    </button>
  );
}
