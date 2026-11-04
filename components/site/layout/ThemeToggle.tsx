"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "netbox_theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const isDark = savedTheme === "dark";

    setDark(isDark);
    document.documentElement.classList.toggle("theme-dark", isDark);
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#11110f" : "#f4511e");
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("theme-dark", nextDark);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextDark ? "dark" : "light");

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
