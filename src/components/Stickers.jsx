// Hand-drawn style doodle stickers, loosely inspired by the reference cover.

function Eyes({ cx1, cx2, cy, r = 5 }) {
  return (
    <>
      <circle cx={cx1} cy={cy} r={r} fill="#0e0b08" />
      <circle cx={cx1 - 1.6} cy={cy - 1.6} r={r * 0.32} fill="#fff" />
      <circle cx={cx2} cy={cy} r={r} fill="#0e0b08" />
      <circle cx={cx2 - 1.6} cy={cy - 1.6} r={r * 0.32} fill="#fff" />
    </>
  );
}

export function StickerBolt({ className }) {
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <path
        d="M62 4 L20 54 L44 56 L28 96 L96 40 L66 38 Z"
        fill="#f4b93f"
        stroke="#171310"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M46 30 Q40 20 50 12" stroke="#171310" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <g transform="translate(58 46) rotate(-18)">
        <path
          d="M-2 22 C-14 24 -22 14 -20 2 C-19 -8 -8 -14 4 -12 C16 -10 26 0 24 10 C22 20 10 20 -2 22 Z"
          fill="#4f8ef0"
          stroke="#171310"
          strokeWidth="3"
        />
        <rect x="-13" y="-2" width="14" height="8" rx="3" fill="#171310" />
        <rect x="6" y="-2" width="14" height="8" rx="3" fill="#171310" />
        <rect x="-1" y="0" width="7" height="3" fill="#171310" />
      </g>
    </svg>
  );
}

export function StickerBlobPurple({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M50 6 C70 4 88 16 90 36 C92 54 84 68 68 76 C54 84 34 86 20 74 C6 62 4 40 14 24 C22 12 36 8 50 6 Z"
        fill="#5b4bb0"
        stroke="#171310"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <Eyes cx1={40} cx2={60} cy={48} r={6.5} />
      <path d="M42 63 Q50 69 58 63" stroke="#171310" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function StickerBlobGreen({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M50 10 C58 -2 74 2 76 16 C90 16 96 32 86 42 C96 50 90 68 74 66 C72 80 54 86 44 76 C30 86 14 78 16 62 C4 58 4 40 16 34 C12 20 26 6 40 12 C42 6 46 6 50 10 Z"
        fill="#7bc142"
        stroke="#171310"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <Eyes cx1={40} cx2={58} cy={44} r={6} />
    </svg>
  );
}

export function StickerHeart({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M50 88 C18 66 4 46 8 28 C11 12 30 6 42 18 C46 22 48 26 50 30 C52 26 54 22 58 18 C70 6 89 12 92 28 C96 46 82 66 50 88 Z"
        fill="#e6473f"
        stroke="#171310"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <Eyes cx1={40} cx2={58} cy={38} r={6} />
    </svg>
  );
}

export function NotebookSwatchIcon({ color, className }) {
  return (
    <svg viewBox="0 0 57 61" className={className}>
      <path
        d="M49.8756 10.1096C49.9888 2.85829 49.8959 6.17568 49.9722 3.36452C49.9874 2.80349 49.5381 2.33731 48.9769 2.33495L3.56507 2.14391C2.83563 1.38616 3.1256 3.8289 2.95585 4.6315C2.37423 8.08386 1.89438 11.6669 2.02021 30.8861C2.39458 37.9735 2.02404 50.9626 2.83905 58.4953C2.92291 59.2703 6.40851 58.9462 7.39495 58.8545L7.40945 58.8532C11.7948 58.4455 15.9457 58.4739 42.9682 57.9843C48.4152 57.8857 49.1327 57.6941 49.4914 47.9596C49.8502 38.2252 49.7288 19.5137 49.8756 10.1096Z"
        fill={color}
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 4C13.89 4.43459 13.78 4.86917 13.6683 5.93947C13.5567 7.00977 13.4467 8.70261 13.335 16.926C13.2233 25.1493 13.1133 39.8519 13 55"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M51.5039 11.75C51.5406 11.75 54.0733 11.9998 54.2389 12.3516C54.4044 12.7034 54.8489 12.3516 54.8489 15.5626C54.8489 17.7236 54.8489 35.0549 54.8489 38.75"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PencilDoodle({ className }) {
  return (
    <svg viewBox="0 0 40 220" className={className}>
      <rect x="8" y="40" width="24" height="160" fill="#f2c14e" stroke="#171310" strokeWidth="2.5" />
      <rect x="8" y="40" width="24" height="10" fill="#e8b984" stroke="#171310" strokeWidth="2.5" />
      <path d="M8 200 L20 220 L32 200 Z" fill="#deb887" stroke="#171310" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 210 L20 220 L24 210 Z" fill="#171310" />
      <rect x="8" y="8" width="24" height="20" rx="4" fill="#e75c5c" stroke="#171310" strokeWidth="2.5" />
      <rect x="8" y="26" width="24" height="8" fill="#d9d9d9" stroke="#171310" strokeWidth="2.5" />
    </svg>
  );
}
