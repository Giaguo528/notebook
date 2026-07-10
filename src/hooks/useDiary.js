import { useCallback, useEffect, useRef, useState } from "react";

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

  const saveEntry = useCallback(
    (dateKey, things) => {
      setEntries((prev) => {
        const cleaned = things.map((t) => t.trim());
        let next;
        if (cleaned.every((t) => t === "")) {
          next = { ...prev };
          delete next[dateKey];
        } else {
          next = { ...prev, [dateKey]: cleaned };
        }
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const getEntry = useCallback((dateKey) => entries[dateKey] ?? ["", "", ""], [entries]);

  const hasEntry = useCallback(
    (dateKey) => Boolean(entries[dateKey] && entries[dateKey].some((t) => t.trim() !== "")),
    [entries],
  );

  return { entries, saveEntry, getEntry, hasEntry, authenticated, loading, unlock: loadEntries };
}
