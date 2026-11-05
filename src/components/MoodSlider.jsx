import { useState } from "react";
import { MOOD_GRADIENT, moodColor, moodLabel } from "../lib/mood";

const THUMB = 52; // px — also the native range thumb width, so both line up

// A blob character whose face follows the mood value: frown + tear at the
// low end, flat in the middle, smile + blush + open grin at the high end.
function MoodFace({ value, muted = false, className }) {
  const v = muted ? 50 : value;
  const fill = muted ? "#e4ded0" : moodColor(v);
  const mouthControl = 60 + (v - 50) * 0.4;
  const blush = Math.max(0, (v - 65) / 35);
  const open = !muted && v >= 80;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 6 C70 4 88 16 90 36 C92 54 84 68 68 76 C54 84 34 86 20 74 C6 62 4 40 14 24 C22 12 36 8 50 6 Z"
        fill={fill}
        stroke="#171310"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {blush > 0 && (
        <>
          <ellipse cx="26" cy="54" rx="7" ry="4.5" fill="#ff7a93" opacity={blush * 0.85} />
          <ellipse cx="74" cy="54" rx="7" ry="4.5" fill="#ff7a93" opacity={blush * 0.85} />
        </>
      )}
      <circle cx="38" cy="40" r="7" fill="#0e0b08" />
      <circle cx="36.2" cy="38.2" r="2.3" fill="#fff" />
      <circle cx="62" cy="40" r="7" fill="#0e0b08" />
      <circle cx="60.2" cy="38.2" r="2.3" fill="#fff" />
      {open ? (
        <path d="M36 57 Q50 82 64 57 Z" fill="#7a1f1a" stroke="#171310" strokeWidth="3.5" strokeLinejoin="round" />
      ) : (
        <path
          d={`M38 60 Q50 ${mouthControl} 62 60`}
          fill="none"
          stroke="#171310"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      )}
      {!muted && v < 22 && (
        <path d="M29 50 Q24 58 29 62 Q34 58 29 50 Z" fill="#9fd6ff" stroke="#171310" strokeWidth="2.5" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function MoodSlider({ mood, onChange }) {
  const [dragging, setDragging] = useState(false);
  const isSet = mood !== null;
  const value = isSet ? mood : 50;

  const commitIfUnset = (e) => {
    // Pressing the exact middle fires no change event, so claim it here.
    if (!isSet) onChange(Number(e.currentTarget.value));
  };

  return (
    <div className="w-full max-w-2xl rounded-[24px] bg-[var(--page)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] px-6 sm:px-12 py-8 sm:py-10">
      <p className="font-mono-caps text-xs text-black/50 text-center">HOW DID TODAY FEEL?</p>
      <p className="font-hand text-xl sm:text-2xl text-center mt-1 mb-6">Slide to show your mood</p>

      <div className="flex items-center gap-3 sm:gap-5">
        <MoodFace value={0} className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />

        <div className="relative flex-1" style={{ height: THUMB }}>
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 rounded-full border-[3px] border-[#171310]"
            style={{ background: MOOD_GRADIENT, opacity: isSet ? 1 : 0.6 }}
          />

          <div
            className="absolute top-0 pointer-events-none transition-transform duration-150 ease-out"
            style={{
              width: THUMB,
              height: THUMB,
              left: `calc((100% - ${THUMB}px) * ${value / 100})`,
              transform: dragging ? "scale(1.12) rotate(-4deg)" : "none",
              filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.25))",
            }}
          >
            <MoodFace value={value} muted={!isSet} className="w-full h-full" />
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onPointerDown={(e) => {
              setDragging(true);
              commitIfUnset(e);
            }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            onBlur={() => setDragging(false)}
            aria-label="Today's mood"
            aria-valuetext={isSet ? `${moodLabel(value)}, ${value} percent` : "Not set"}
            className="mood-range absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          />
        </div>

        <MoodFace value={100} className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
      </div>

      <div className="flex items-start justify-between mt-3">
        <span className="font-mono-caps text-[10px] text-black/40 w-12 sm:w-14 text-center">DOWN</span>
        <p className="font-hand text-lg sm:text-xl text-center leading-tight">
          {isSet ? (
            <>
              {moodLabel(value)} · {value}%{" "}
              <button
                onClick={() => onChange(null)}
                className="font-mono-caps text-[10px] text-black/40 underline underline-offset-2 hover:text-black/70 align-middle ml-1"
              >
                CLEAR
              </button>
            </>
          ) : (
            <span className="text-black/40">Drag the face</span>
          )}
        </p>
        <span className="font-mono-caps text-[10px] text-black/40 w-12 sm:w-14 text-center">HAPPY</span>
      </div>
    </div>
  );
}
