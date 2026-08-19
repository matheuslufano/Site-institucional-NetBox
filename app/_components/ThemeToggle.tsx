"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("theme-dark");
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", "#f4511e");
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("theme-dark", nextDark);

    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    themeColor?.setAttribute("content", nextDark ? "#11110f" : "#f4511e");
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={dark}
      title={dark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {dark ? "☀" : "☾"}
      </span>
      <span className="theme-toggle-label">{dark ? "Claro" : "Escuro"}</span>
    </button>
  );
}
