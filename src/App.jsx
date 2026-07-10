import { useRef, useState } from "react";
import Cover from "./components/Cover";
import DiaryPage from "./components/DiaryPage";
import Calendar from "./components/Calendar";
import PinGate from "./components/PinGate";
import { COVER_THEMES } from "./lib/themes";
import { useDiary } from "./hooks/useDiary";
import { toDateKey } from "./lib/date";

const NAME = import.meta.env.VITE_DIARY_NAME || "Friend";

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const { saveEntry, getEntry, hasEntry, authenticated, loading, unlock } = useDiary();
  const diaryRef = useRef(null);

  const backdrop = COVER_THEMES[themeIndex].bg;

  const dateKey = toDateKey(selectedDate);
  const things = getEntry(dateKey);

  const handleChange = (index, value) => {
    const next = [...things];
    next[index] = value;
    saveEntry(dateKey, next);
  };

  const shiftDay = (delta) => {
    setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta));
  };

  const jumpToDiary = () => {
    diaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const jumpToDate = (date) => {
    setSelectedDate(date);
    jumpToDiary();
  };

  if (authenticated === false) {
    return <PinGate onUnlock={unlock} />;
  }

  if (loading || authenticated === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#d8d2c4]">
        <p className="font-hand text-xl text-black/50">Opening your diary…</p>
      </div>
    );
  }

  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
      <div className="snap-start">
        <Cover
          name={NAME}
          themeIndex={themeIndex}
          onThemeChange={setThemeIndex}
          onPlay={jumpToDiary}
        />
      </div>
      <div ref={diaryRef} className="snap-start">
        <DiaryPage
          date={selectedDate}
          things={things}
          onChange={handleChange}
          onPrevDay={() => shiftDay(-1)}
          onNextDay={() => shiftDay(1)}
          backdrop={backdrop}
        />
      </div>
      <div className="snap-start">
        <Calendar hasEntry={hasEntry} onSelectDate={jumpToDate} backdrop={backdrop} />
      </div>
    </div>
  );
}
