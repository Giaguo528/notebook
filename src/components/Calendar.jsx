import { useState } from "react";
import { WEEKDAY_LABELS, isSameDay, monthLabel, toDateKey } from "../lib/date";

function buildMonthGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  const days = [];
  for (let i = 0; i < 42; i++) {
    days.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
  }
  return days;
}

export default function Calendar({ hasEntry, onSelectDate, backdrop }) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const today = new Date();
  const days = buildMonthGrid(viewDate);
  const currentMonth = viewDate.getMonth();

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center px-4 py-16 transition-colors duration-300"
      style={{ backgroundColor: backdrop }}
    >
      <div className="w-full max-w-2xl rounded-[24px] bg-[var(--page)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] px-6 sm:px-10 py-10">
        <div className="text-center mb-2">
          <p className="font-mono-caps text-xs text-black/50">YOUR DIARY CALENDAR</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
            className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-lg hover:bg-black/5"
            aria-label="Previous month"
          >
            ‹
          </button>
          <h3 className="text-xl sm:text-2xl font-bold">{monthLabel(viewDate)}</h3>
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
            className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-lg hover:bg-black/5"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAY_LABELS.map((w) => (
            <div key={w} className="text-center font-mono-caps text-[10px] text-black/40 py-1">
              {w[0]}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((d) => {
            const inMonth = d.getMonth() === currentMonth;
            const filled = hasEntry(toDateKey(d));
            const isToday = isSameDay(d, today);
            return (
              <button
                key={toDateKey(d)}
                onClick={() => onSelectDate(d)}
                className={[
                  "aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 text-sm transition-colors",
                  inMonth ? "text-black/80" : "text-black/25",
                  isToday ? "ring-2 ring-[var(--leather)]" : "",
                  filled ? "bg-[#f4b93f]/25" : "hover:bg-black/5",
                ].join(" ")}
              >
                <span>{d.getDate()}</span>
                <span
                  className={[
                    "w-1.5 h-1.5 rounded-full",
                    filled ? "bg-[#e6473f]" : "bg-transparent",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        <p className="font-hand text-center text-black/50 mt-6">
          Tap any day to open that page ✦
        </p>
      </div>
    </section>
  );
}
