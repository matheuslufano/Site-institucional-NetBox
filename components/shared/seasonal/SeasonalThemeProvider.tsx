"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { LuPause, LuPlay } from "react-icons/lu";
import styles from "./SeasonalTheme.module.css";
import Snowfall from "./Snowfall";

export type SeasonalTheme = {
  id: string;
  name: string;
  effect:
    | "snow"
    | "stars"
    | "confetti"
    | "petals"
    | "hearts"
    | "eggs"
    | "flags"
    | "bats";
  colors: string[];
  greeting: string;
};
type ThemeConfiguration = {
  catalog: SeasonalTheme[];
  settings: { scope: string; themeId: string; enabled: boolean }[];
};
type SeasonalContext = { theme: SeasonalTheme | null; paused: boolean };
const ThemeContext = createContext<SeasonalContext>({
  theme: null,
  paused: false,
});
export const useSeasonalTheme = () => useContext(ThemeContext);
export function seasonalColors(theme: SeasonalTheme): CSSProperties {
  return {
    "--seasonal-primary": theme.colors[0],
    "--seasonal-secondary": theme.colors[1],
    "--seasonal-tertiary": theme.colors[2],
  } as CSSProperties;
}

/** Shared by both public surfaces; preview overrides affect this page only. */
export function SeasonalThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<SeasonalTheme | null>(null);
  const [paused, setPaused] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const scope = pathname.startsWith("/site/blog") ? "blog" : "institutional";
    let sequence = 0;
    async function refresh() {
      const requestSequence = ++sequence;
      try {
        const response = await fetch("/api/site-themes", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Theme settings unavailable");
        const data: ThemeConfiguration = await response.json();
        const override = new URL(window.location.href).searchParams.get(
          "previewTheme",
        );
        const setting = data.settings.find(
          (setting) => setting.scope === scope,
        );
        const themeId =
          override !== null
            ? override
            : setting?.enabled
              ? setting.themeId
              : null;
        const selected =
          data.catalog.find((theme) => theme.id === themeId) || null;
        if (!controller.signal.aborted && requestSequence === sequence) {
          setTheme(selected);
          setPreview(override !== null);
        }
      } catch {
        if (!controller.signal.aborted && requestSequence === sequence)
          setTheme(null);
      }
    }
    function onVisibility() {
      if (!document.hidden) void refresh();
    }
    void refresh();
    const interval = window.setInterval(onVisibility, 30000);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);
    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    if (
      theme &&
      preview &&
      window.location.hash === "#seasonal-footer-decoration"
    )
      document
        .getElementById("seasonal-footer-decoration")
        ?.scrollIntoView({ block: "end", behavior: "instant" });
  }, [theme, preview]);

  return (
    <ThemeContext.Provider value={{ theme, paused }}>
      {children}
      {theme && (
        <>
          <div
            id="seasonal-screen-decoration"
            className={styles.overlay}
            style={seasonalColors(theme)}
            data-component="seasonal-screen-decoration"
            data-theme={theme.id}
            data-effect={theme.effect}
            data-paused={paused}
            aria-hidden="true"
          >
            {theme.effect === "snow" ? (
              <Snowfall paused={paused} />
            ) : (
              Array.from({ length: 20 }, (_, index) => (
                <span
                  key={index}
                  className={styles.particle}
                  style={
                    {
                      "--particle-x": `${(index * 37 + 3) % 100}%`,
                      "--particle-delay": `${-(index * 1.37)}s`,
                      "--particle-duration": `${12 + (index % 11)}s`,
                      "--particle-size": `${9 + (index % 8)}px`,
                      "--particle-color":
                        theme.colors[index % theme.colors.length],
                    } as CSSProperties
                  }
                />
              ))
            )}
          </div>
          <button
            id="seasonal-motion-toggle"
            className={styles.motionToggle}
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <LuPlay aria-hidden="true" />
            ) : (
              <LuPause aria-hidden="true" />
            )}
            {paused ? "Retomar efeitos" : "Pausar efeitos"}
          </button>
        </>
      )}
      {preview && (
        <div
          id="seasonal-preview-indicator"
          className={styles.previewIndicator}
          role="status"
        >
          Prévia · {theme?.name || "Sem tema"}
        </div>
      )}
    </ThemeContext.Provider>
  );
}
