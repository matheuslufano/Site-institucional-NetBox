import type { AnimationEvent, CSSProperties } from "react";
import styles from "./Snowfall.module.css";

/** Seeded, independent samples keep hydration stable without aligned particle lanes. */
function createSnowflakes() {
  let seed = 0x4e455645;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: 140 }, () => {
    const duration = 16 + random() * 20;
    return {
      x: random() * 100,
      size: 7 + random() * 12,
      duration,
      delay: -random() * duration,
      drift: 10 + random() * 38,
      opacity: 0.3 + random() * 0.55,
      swayDuration: 3 + random() * 5,
      rotationDuration: 20 + random() * 35,
      rotationDirection: random() > 0.5 ? "normal" : "reverse",
    };
  });
}

const snowflakes = createSnowflakes();

/** One SVG path forms six radial arms, each with two pairs of branches. */
const crystalPath = Array.from({ length: 6 }, (_, arm) => {
  const angle = arm * Math.PI / 3;
  const point = (x: number, y: number) =>
    `${(12 + x * Math.cos(angle) - y * Math.sin(angle)).toFixed(3)},${(12 + x * Math.sin(angle) + y * Math.cos(angle)).toFixed(3)}`;
  return `M12,12L${point(0, -10)} M${point(-3, -8)}L${point(0, -5)}L${point(3, -8)} M${point(-2, -10)}L${point(0, -8)}L${point(2, -10)}`;
}).join(" ");

/** Change origin only after a complete fall, while the flake is outside the viewport. */
function restartSnowflake(event: AnimationEvent<HTMLElement>) {
  if (event.target !== event.currentTarget) return;
  const style = event.currentTarget.style;
  style.setProperty("--snow-x", `${Math.random() * 100}%`);
  style.setProperty("--snow-drift", `${10 + Math.random() * 38}px`);
  style.setProperty("--snow-opacity", String(0.3 + Math.random() * 0.55));
}

export default function Snowfall({ paused }: { paused: boolean }) {
  return (
    <div className={styles.snowfall} data-component="christmas-snowfall" data-paused={paused} aria-hidden="true">
      {snowflakes.map((flake, index) => (
        <i key={index} className={styles.flake} onAnimationIteration={restartSnowflake} style={{
          "--snow-x": `${flake.x}%`,
          "--snow-size": `${flake.size}px`,
          "--snow-duration": `${flake.duration}s`,
          "--snow-delay": `${flake.delay}s`,
          "--snow-drift": `${flake.drift}px`,
          "--snow-opacity": flake.opacity,
          "--snow-sway-duration": `${flake.swayDuration}s`,
          "--snow-rotation-duration": `${flake.rotationDuration}s`,
          "--snow-rotation-direction": flake.rotationDirection,
        } as CSSProperties}>
          <span className={styles.sway}>
            <svg className={styles.crystal} viewBox="0 0 24 24" fill="none" focusable="false">
              <path d={crystalPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </i>
      ))}
    </div>
  );
}
