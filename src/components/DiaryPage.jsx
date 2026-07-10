import { StickerBlobGreen, StickerBlobPurple, StickerHeart } from "./Stickers";
import { formatLongDate, isSameDay } from "../lib/date";

const ROW_ICONS = [StickerBlobGreen, StickerBlobPurple, StickerHeart];

export default function DiaryPage({ date, things, onChange, onPrevDay, onNextDay, backdrop }) {
  const today = isSameDay(date, new Date());

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center px-4 py-16 transition-colors duration-300"
      style={{ backgroundColor: backdrop }}
    >
      <div className="w-full max-w-2xl rounded-[24px] bg-[var(--page)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] px-6 sm:px-12 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onPrevDay}
            className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-lg hover:bg-black/5"
            aria-label="Previous day"
          >
            ‹
          </button>
          <div className="text-center">
            <p className="font-mono-caps text-xs text-black/50">{today ? "TODAY" : ""}</p>
            <h2 className="text-2xl sm:text-3xl font-bold">{formatLongDate(date)}</h2>
          </div>
          <button
            onClick={onNextDay}
            className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-lg hover:bg-black/5"
            aria-label="Next day"
          >
            ›
          </button>
        </div>

        <p className="font-hand text-xl sm:text-2xl text-center mb-10">
          Write 3 beautiful things of today!
        </p>

        <div className="flex flex-col gap-8">
          {[0, 1, 2].map((i) => {
            const Icon = ROW_ICONS[i];
            return (
              <div key={i} className="flex items-end gap-4">
                <Icon className="w-9 h-9 shrink-0 mb-1" />
                <input
                  value={things[i]}
                  onChange={(e) => onChange(i, e.target.value)}
                  placeholder={
                    ["A small win...", "Something that made you smile...", "A moment of peace..."][i]
                  }
                  className="flex-1 bg-transparent border-b-2 border-black/15 focus:border-black/40 outline-none py-2 text-lg font-hand placeholder:text-black/30"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
