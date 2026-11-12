"use client";

import { useSeasonalTheme } from "./SeasonalThemeProvider";
import styles from "./ChristmasHeroLights.module.css";

/** Original transparent artwork with alternating brightness and shared motion controls. */
export default function ChristmasHeroLights() {
  const { theme, paused } = useSeasonalTheme();
  if (theme?.id !== "christmas") return null;

  return (
    <div className={styles.garland} data-component="christmas-hero-lights" data-paused={paused} aria-hidden="true">
      {[0, 1].map((segment) => (
        <div className={styles.artwork} key={segment}>
          <span className={styles.lightBank} />
          <span className={styles.lightBank} />
          <span className={styles.lightBank} />
        </div>
      ))}
    </div>
  );
}
