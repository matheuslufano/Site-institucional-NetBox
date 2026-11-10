import styles from "./ChristmasScene.module.css";

/** Decorative SVG snowman; scene styles control placement and the waving arm. */
export default function WavingSnowman() {
  return (
    <svg
      className={styles.snowman}
      data-component="christmas-waving-snowman"
      viewBox="0 0 190 210"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="98" cy="198" rx="61" ry="9" fill="#d0e2e9" />
      <ellipse cx="94" cy="194" rx="54" ry="7" fill="#f8fcff" />
      <path
        d="M62 127 29 101m4 3-2-14m4 16-16-2"
        stroke="#866149"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g className={styles.wavingArm}>
        <path
          d="m125 128 27-37 9-14m-9 15 17-4m-17 4-3-18"
          stroke="#866149"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <ellipse cx="96" cy="156" rx="45" ry="40" fill="#deedf4" />
      <ellipse cx="90" cy="150" rx="37" ry="35" fill="#f9fdff" />
      <circle cx="96" cy="94" r="32" fill="#e1eff5" />
      <circle cx="91" cy="90" r="27" fill="#fff" />
      <path d="M65 78q-1-40 31-42t32 42" fill="#bb3544" />
      <path
        d="M71 64q23-17 50 0M75 54q21-14 42-1"
        stroke="#d6646d"
        strokeWidth="3"
      />
      <rect x="63" y="69" width="67" height="14" rx="7" fill="#d54e5a" />
      <path
        d="M70 72v8m7-9v9m7-9v9m8-9v9m8-9v9m8-9v9m8-9v9m7-8v7"
        stroke="#ed8a8e"
        strokeWidth="2"
      />
      <circle cx="98" cy="30" r="12" fill="#c83b4b" />
      <path
        d="M90 25q9-6 15 3"
        stroke="#e67780"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="85" cy="93" r="3" fill="#243c4a" />
      <circle cx="106" cy="92" r="3" fill="#243c4a" />
      <path d="m95 99 25 6-25 6z" fill="#e98a47" />
      <path
        d="M84 110q11 8 23-1"
        stroke="#667c85"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="76" cy="104" r="5" fill="#e8a7a1" opacity=".65" />
      <path d="M68 120q28 12 58-1l-2 13q-28 9-54-1z" fill="#c33f4c" />
      <path d="m108 130 1 35 14-3-4-34" fill="#bf3847" />
      <path
        d="M73 124q25 8 49 0m-10 16h9m-9 10h10"
        stroke="#fff0e6"
        strokeWidth="4"
      />
      <circle cx="94" cy="147" r="4" fill="#bd3c49" />
      <circle cx="94" cy="164" r="4" fill="#bd3c49" />
      <circle cx="94" cy="181" r="4" fill="#bd3c49" />
    </svg>
  );
}
