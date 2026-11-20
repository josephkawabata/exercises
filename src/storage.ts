import type { Verdict } from "./engine";

/** Older builds stored Diffy Qs progress here. Reading it once keeps those answers. */
const LEGACY_KEYS: Record<string, string> = {
  diffyqs: "diffyqs-practice-v1",
};

export function progressKey(bookId: string): string {
  return "exercises:" + bookId;
}

export type Progress = {
  sec: string;
  incSelf: boolean;
  pos: Record<string, number>;
  inputs: Record<string, string[]>;
  res: Record<string, Verdict[]>;
  status: Record<string, string>;
  shown: Record<string, number>;
  streak: Record<string, number>;
  best: Record<string, number>;
};

export function emptyProgress(defaultSection: string): Progress {
  return {
    sec: defaultSection,
    incSelf: true,
    pos: {},
    inputs: {},
    res: {},
    status: {},
    shown: {},
    streak: {},
    best: {},
  };
}

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function numMap(v: unknown): Record<string, number> {
  if (!isObj(v)) return {};
  const out: Record<string, number> = {};
  for (const [k, val] of Object.entries(v)) {
    if (typeof val === "number" && Number.isFinite(val)) out[k] = val;
  }
  return out;
}

function stringMap(v: unknown): Record<string, string> {
  if (!isObj(v)) return {};
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v)) {
    if (val === "correct" || val === "wrong" || val === "revealed") out[k] = val;
  }
  return out;
}

function stringListMap(v: unknown): Record<string, string[]> {
  if (!isObj(v)) return {};
  const out: Record<string, string[]> = {};
  for (const [k, val] of Object.entries(v)) {
    if (Array.isArray(val) && val.every((x) => typeof x === "string")) out[k] = val.slice();
  }
  return out;
}

function verdictMap(v: unknown): Record<string, Verdict[]> {
  if (!isObj(v)) return {};
  const out: Record<string, Verdict[]> = {};
  for (const [k, val] of Object.entries(v)) {
    if (!Array.isArray(val)) continue;
    const vs: Verdict[] = [];
    let good = true;
    for (const item of val) {
      if (!isObj(item) || typeof item.ok !== "boolean") {
        good = false;
        break;
      }
      const verdict: Verdict = { ok: item.ok };
      if (typeof item.msg === "string") verdict.msg = item.msg;
      vs.push(verdict);
    }
    if (good) out[k] = vs;
  }
  return out;
}

export function loadProgress(bookId: string, sections: readonly string[], defaultSection: string): Progress {
  const base = emptyProgress(defaultSection);
  if (typeof localStorage === "undefined") return base;
  try {
    const key = progressKey(bookId);
    let raw = localStorage.getItem(key);
    const legacy = LEGACY_KEYS[bookId];
    if (raw == null && legacy) {
      raw = localStorage.getItem(legacy);
      if (raw != null) {
        try {
          localStorage.setItem(key, raw);
        } catch {
          // The old key still holds the answers for this visit.
        }
      }
    }
    if (!raw) return base;
    const parsed = JSON.parse(raw) as unknown;
    if (!isObj(parsed)) return base;
    if (typeof parsed.sec === "string" && sections.includes(parsed.sec)) base.sec = parsed.sec;
    if (typeof parsed.incSelf === "boolean") base.incSelf = parsed.incSelf;
    base.pos = numMap(parsed.pos);
    base.streak = numMap(parsed.streak);
    base.best = numMap(parsed.best);
    base.shown = numMap(parsed.shown);
    base.inputs = stringListMap(parsed.inputs);
    base.status = stringMap(parsed.status);
    base.res = verdictMap(parsed.res);
    return base;
  } catch {
    return base;
  }
}

export function saveProgress(bookId: string, progress: Progress): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(progressKey(bookId), JSON.stringify(progress));
  } catch {
    // Private mode or a full disk: practice still works for this visit.
  }
}

export function clearStoredProgress(bookId: string): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.removeItem(progressKey(bookId));
    const legacy = LEGACY_KEYS[bookId];
    if (legacy) localStorage.removeItem(legacy);
  } catch {
    // Ignore.
  }
}
