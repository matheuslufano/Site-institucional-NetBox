import Image from "next/image";
import WavingSnowman from "./WavingSnowman";
import styles from "./ChristmasScene.module.css";

/** Transparent photographic panorama preserves the open center for the greeting. */
function WinterForest() {
  return (
    <Image
      className={styles.forest}
      data-component="christmas-pine-forest"
      src="/seasonal/christmas-snowy-pine-panorama-transparent-v1.png"
      width={2172}
      height={724}
      alt=""
      aria-hidden="true"
      unoptimized
      draggable={false}
    />
  );
}

/** Decorative bulbs pulse slowly in alternating groups without flashing the text. */
function GreetingLights() {
  return (
    <svg className={styles.greetingLights} data-component="christmas-greeting-lights" viewBox="0 0 360 58" fill="none" aria-hidden="true">
      <path d="M8 8Q180 67 352 8" stroke="#667e64" strokeWidth="1.5" />
      {Array.from({ length: 15 }, (_, index) => {
        const x = 15 + index * 23.5;
        const y = 10 + 28 * (1 - ((x - 180) / 172) ** 2);
        return <g key={index}>
          <path d={`M${x} ${y}v6`} stroke="#667e64" strokeWidth="2" />
          <ellipse className={styles.lightBulb} cx={x} cy={y + 10} rx="3.5" ry="5" style={{ color: ['#d77962', '#d7ac55', '#79a68b'][index % 3], animationDelay: `${index % 3 * -.9}s` }} />
        </g>;
      })}
    </svg>
  );
}

/** Straddles the white content / dark footer boundary without covering footer controls. */
export default function ChristmasScene({ paused }: { paused: boolean }) {
  return (
    <section
      id="seasonal-footer-decoration"
      className={styles.scene}
      data-component="christmas-footer-scene"
      data-theme="christmas"
      data-paused={paused}
      aria-labelledby="christmas-greeting-title"
    >
      <div className={styles.greeting}>
        <span>A NETBOX DESEJA A VOCÊ</span>
        <h2 id="christmas-greeting-title">Feliz Natal!<GreetingLights /></h2>
        <p>Que a magia do Natal conecte sua família ao que mais importa.</p>
      </div>
      <div className={styles.artwork} aria-hidden="true">
        <WinterForest />
        <WavingSnowman />
      </div>
    </section>
  );
}
