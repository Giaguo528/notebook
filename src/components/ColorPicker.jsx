import { NotebookSwatchIcon } from "./Stickers";
import { COVER_THEMES } from "../lib/themes";

export default function ColorPicker({ selectedIndex, onSelect, className }) {
  return (
    <div className={`hidden sm:flex flex-col gap-2.5 ${className ?? ""}`}>
      {COVER_THEMES.map((theme, i) => (
        <button
          key={theme.cover}
          onClick={() => onSelect(i)}
          aria-label={`Cover color ${theme.cover}`}
          className={[
            "rounded-xl p-1 transition-transform hover:scale-110",
            selectedIndex === i ? "ring-2 ring-offset-2 ring-[#171310]/70 ring-offset-transparent" : "",
          ].join(" ")}
        >
          <NotebookSwatchIcon color={theme.cover} className="w-8 h-9 sm:w-9 sm:h-10 drop-shadow-sm" />
        </button>
      ))}
    </div>
  );
}
