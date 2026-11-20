import type { Verdict } from "./engine";

const KEY = "diffyqs-practice-v1";

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

export function emptyProgress(): Progress {
  return {
    sec: "0.2",
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

export function loadProgress(sections: readonly string[]): Progress {
  const base = emptyProgress();
  if (typeof localStorage === "undefined") return base;
  try {
    const raw = localStorage.getItem(KEY);
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

export function saveProgress(progress: Progress): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // Private mode or a full disk: practice still works for this visit.
  }
}

export function clearStoredProgress(): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignore.
  }
}
