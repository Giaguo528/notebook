import { useCallback, useEffect, useRef, useState } from "react";

const BLANK = ["", "", ""];

// An entry is stored in one of two shapes so diaries written before the mood
// slider existed keep working untouched:
//   ["a", "b", "c"]                      — three things, no mood
//   { things: ["a", "b", "c"], mood: 72 } — three things plus a 0–100 mood
function normalize(raw) {
  if (Array.isArray(raw)) return { things: raw, mood: null };
  if (raw && typeof raw === "object") {
    return { things: raw.things ?? BLANK, mood: typeof raw.mood === "number" ? raw.mood : null };
  }
  return { things: BLANK, mood: null };
}

function toStored(things, mood) {
  if (mood === null && things.every((t) => t.trim() === "")) return null;
  return mood === null ? things : { things, mood };
}

export function useDiary() {
  const [entries, setEntries] = useState({});
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const saveTimer = useRef(null);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/entries");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setEntries(data);
      setAuthenticated(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const persist = useCallback((next) => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      }).catch(() => {});
    }, 500);
  }, []);

  // patch: { things?: string[3], mood?: number | null }
  const updateEntry = useCallback(
    (dateKey, patch) => {
      setEntries((prev) => {
        const current = normalize(prev[dateKey]);
        const things = patch.things ?? current.things;
        const mood = "mood" in patch ? patch.mood : current.mood;
        const stored = toStored(things, mood);
        const next = { ...prev };
        if (stored === null) delete next[dateKey];
        else next[dateKey] = stored;
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const getEntry = useCallback((dateKey) => normalize(entries[dateKey]), [entries]);

  const hasEntry = useCallback(
    (dateKey) => {
      if (!entries[dateKey]) return false;
      const { things, mood } = normalize(entries[dateKey]);
      return mood !== null || things.some((t) => t.trim() !== "");
    },
    [entries],
  );

  return { entries, updateEntry, getEntry, hasEntry, authenticated, loading, unlock: loadEntries };
}
