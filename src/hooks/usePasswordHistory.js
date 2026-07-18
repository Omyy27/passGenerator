import { useState, useCallback, useEffect } from "react";
import { calculateEntropy } from "../utils/passwordStrength";

const STORAGE_KEY = "password-history";
const MAX_ENTRIES = 50;

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function usePasswordHistory() {
  const [entries, setEntries] = useState(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((password, length, charOptions) => {
    const entropy = calculateEntropy({ ...charOptions, length });
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      password,
      length,
      uppercase: charOptions.uppercase,
      lowercase: charOptions.lowercase,
      numbers: charOptions.numbers,
      symbols: charOptions.symbols,
      entropy,
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
    return entry;
  }, []);

  const clearHistory = useCallback(() => {
    setEntries([]);
  }, []);

  const exportCSV = useCallback(() => {
    const header = "password,length,uppercase,lowercase,numbers,symbols,entropy,createdAt";
    const rows = entries.map((e) =>
      [
        `"${e.password}"`,
        e.length,
        e.uppercase,
        e.lowercase,
        e.numbers,
        e.symbols,
        e.entropy,
        e.createdAt,
      ].join(",")
    );
    return [header, ...rows].join("\n");
  }, [entries]);

  return { entries, addEntry, clearHistory, exportCSV };
}
