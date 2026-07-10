import { useMemo } from "react";
import {
  PencilDoodle,
  StickerBlobGreen,
  StickerBlobPurple,
  StickerBolt,
  StickerHeart,
} from "./Stickers";
import ColorPicker from "./ColorPicker";
import { COVER_THEMES } from "../lib/themes";
import { shade } from "../lib/color";

export default function Cover({ name, themeIndex, onThemeChange, onPlay }) {
  const theme = COVER_THEMES[themeIndex];

  const leatherVars = useMemo(
    () => ({
      "--leather": theme.cover,
      "--leather-light": shade(theme.cover, 0.25),
      "--leather-dark": shade(theme.cover, -0.2),
    }),
    [theme],
  );

  const backdrop = theme.bg;
  const logoInk = shade(theme.cover, -0.4);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-10 transition-colors duration-300"
      style={{ backgroundColor: backdrop }}
    >
      <ColorPicker
        selectedIndex={themeIndex}
        onSelect={onThemeChange}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10"
      />
      <div className="relative w-full max-w-4xl">
        <div
          className="relative flex rounded-[26px] p-2.5 sm:p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)]"
          style={{
            ...leatherVars,
            background:
              "linear-gradient(155deg, var(--leather-light) 0%, var(--leather) 45%, var(--leather-dark) 100%)",
          }}
        >
          {/* left leather flat */}
          <div className="relative hidden sm:flex flex-1 items-end justify-start p-6">
            <span className="font-hand text-3xl opacity-70" style={{ color: logoInk }}>
              {name}
            </span>
          </div>

          {/* spine hinge */}
          <div className="relative w-4 sm:w-5 flex flex-col items-center justify-center gap-1 opacity-60">
            <div className="w-1.5 h-16 rounded-full bg-black/25" />
            <div className="w-1.5 h-16 rounded-full bg-black/25" />
          </div>

          {/* page panel */}
          <div
            className="relative flex-[1.2] rounded-[20px] bg-[var(--page)] shadow-inner overflow-hidden aspect-[3/4] sm:aspect-[4/5]"
            style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)" }}
          >
            <StickerBolt className="absolute left-6 top-7 w-20 sm:w-24 -rotate-6 drop-shadow-sm" />
            <StickerBlobPurple className="absolute right-6 top-10 w-14 sm:w-16 rotate-6 drop-shadow-sm" />
            <StickerBlobGreen className="absolute left-7 bottom-24 w-14 sm:w-16 -rotate-3 drop-shadow-sm" />
            <StickerHeart className="absolute right-7 bottom-28 w-16 sm:w-20 rotate-3 drop-shadow-sm" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 px-8 text-center">
              <p className="font-hand text-lg sm:text-xl text-[#171310]/80">Hello, {name}!</p>
              <h1 className="text-2xl sm:text-4xl font-black leading-[1.15] sm:leading-[1.1] text-[#171310]">
                Write 3
                <br />
                beautiful things
                <br />
                everyday!
              </h1>
            </div>

            <button
              onClick={onPlay}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-caps text-sm sm:text-base tracking-[0.25em] text-[#171310]/90 hover:text-[#171310] transition-colors cursor-pointer"
            >
              TAP TO PLAY!
            </button>
          </div>
        </div>

        <PencilDoodle className="hidden sm:block absolute -right-5 top-8 h-56 rotate-[8deg] drop-shadow-md" />
      </div>
    </div>
  );
}
