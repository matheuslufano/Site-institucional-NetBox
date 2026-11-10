"use client";

import { LuGift, LuHeart, LuPartyPopper, LuSparkles } from "react-icons/lu";
import type { ComponentPropsWithoutRef } from "react";
import { seasonalColors, useSeasonalTheme } from "./SeasonalThemeProvider";
import ChristmasScene from "./ChristmasScene";
import styles from "./SeasonalTheme.module.css";

/** Christmas art shares a white panel above the actual footer; other presets keep their placement. */
export function SeasonalSiteFooter({
  children,
  className,
  ...attributes
}: ComponentPropsWithoutRef<"footer">) {
  const { theme, paused } = useSeasonalTheme();
  const christmas = theme?.effect === "snow";
  return (
    <>
      {christmas ? <ChristmasScene paused={paused} /> : <SeasonalFooter />}
      <footer
        {...attributes}
        className={`${className || ""} ${styles.frame}`}
        data-seasonal-theme={theme?.id}
      >
        {children}
      </footer>
    </>
  );
}

export function SeasonalFooter() {
  const { theme, paused } = useSeasonalTheme();
  if (!theme || theme.effect === "snow") return null;
  const Icon =
    theme.effect === "hearts"
      ? LuHeart
      : theme.effect === "eggs"
        ? LuGift
        : theme.effect === "confetti" || theme.effect === "flags"
          ? LuPartyPopper
          : LuSparkles;
  return (
    <div
      id="seasonal-footer-decoration"
      className={styles.footerScene}
      style={seasonalColors(theme)}
      data-component="seasonal-footer-decoration"
      data-theme={theme.id}
      data-effect={theme.effect}
      data-paused={paused}
    >
      <div className={styles.greeting}>
        <Icon aria-hidden="true" />
        <small>{theme.name.toLocaleUpperCase("pt-BR")}</small>
        <p>{theme.greeting}</p>
      </div>
      <div className={styles.festiveBorder} aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}
