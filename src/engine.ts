// Expression parser and answer checking, copied unchanged from the
// original practice page so accepted and rejected answers stay the same.


// ---------- data types ----------
type Rng = number[];
type Field = { l?: string } & (
  | { t: "num"; a: string; tol?: number; abs?: number }
  | { t: "set"; a: string[] }
  | { t: "mc"; o: string[]; a: number }
  | { t: "expr"; a: string; v: Record<string, Rng>; c?: number }
  | { t: "gen"; f: string; x: string; y: string; d: Rng[]; a: string; pot?: number; p?: Record<string, Rng> }
  | { t: "imp"; x: string; y: string; pts: number[][]; off: number[][]; a: string }
  | { t: "res"; r: string; x: string; y: string; d: Rng; ic?: number[][]; a: string; p?: Record<string, Rng> }
  | { t: "if"; M: string; N: string; d: Rng[]; a: string }
);
type SF = { f: string; lab?: string };
type Fig = { src: string; cap: string };
type Card = { id: string; q: string; f: Field[]; h: string; src: string; p?: string; sol?: string[]; ctx?: string; bk?: string; figs?: Fig[]; sf?: SF[]; ssf?: SF; distinct?: number[] };
type Verdict = { ok: boolean; msg?: string };

// ---------- expression parser ----------
type Node =
  | { k: "num"; v: number }
  | { k: "var"; n: string }
  | { k: "bin"; op: string; a: Node; b: Node }
  | { k: "neg"; a: Node }
  | { k: "fn"; n: string; a: Node }
  | { k: "pow"; a: Node; b: Node }
  | { k: "eq"; a: Node; b: Node };

const FN = ["arcsin", "arccos", "arctan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "sin", "cos", "tan", "sec", "csc", "cot", "exp", "ln", "log", "sqrt", "abs", "cbrt"];
const CONSTS = ["pi", "e"];
const GREEK = ["alpha", "beta", "omega", "theta", "phi", "varphi", "xi", "lambda", "mu", "rho", "sigma", "tau"];
type Tok = { t: "num" | "id" | "op"; v: string };

function tokenize(src: string, vars: string[]): Tok[] {
  const s = src.replace(/\*\*/g, "^").replace(/[·×]/g, "*").replace(/−/g, "-").replace(/±/g, "+").replace(/π/g, "pi").replace(/√/g, "sqrt").replace(/ω/g, "omega").replace(/φ/g, "varphi").replace(/[{\[]/g, "(").replace(/[}\]]/g, ")").replace(/\\/g, "");
  const names = [...FN, ...CONSTS, ...GREEK, ...vars].sort((a, b) => b.length - a.length);
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      out.push({ t: "num", v: s.slice(i, j) });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < s.length && /[A-Za-z_0-9]/.test(s[j])) {
        if (/[0-9]/.test(s[j]) && !/_[0-9]*$/.test(s.slice(i, j))) break;
        j++;
      }
      let run = s.slice(i, j);
      i = j;
      while (run.length) {
        const m = names.find((n) => run.startsWith(n));
        if (m) { out.push({ t: "id", v: m }); run = run.slice(m.length); }
        else if (run[0] === "w" && vars.includes("omega")) { out.push({ t: "id", v: "omega" }); run = run.slice(1); }
        else if (run[0] === "_") { run = run.slice(1); }
        else { out.push({ t: "id", v: run[0] }); run = run.slice(1); }
      }
      continue;
    }
    if ("+-*/^()=|,!".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    throw new Error("Unexpected character “" + c + "”");
  }
  return out;
}

function parse(src: string, vars: string[]): Node {
  const toks = tokenize(src, vars);
  let p = 0;
  let absDepth = 0;
  const peek = (): Tok | undefined => toks[p];
  const isOp = (v: string) => p < toks.length && toks[p].t === "op" && toks[p].v === v;
  const expect = (v: string) => { if (!isOp(v)) throw new Error("Expected “" + v + "”"); p++; };
  function equation(): Node {
    const a = expr();
    if (isOp("=")) { p++; const b = expr(); return { k: "eq", a, b }; }
    return a;
  }
  function expr(): Node {
    let a = term();
    while (isOp("+") || isOp("-")) { const op = toks[p++].v; const b = term(); a = { k: "bin", op, a, b }; }
    return a;
  }
  function startsPrimary(): boolean {
    const t = peek();
    if (!t) return false;
    if (t.t === "num" || t.t === "id") return true;
    if (t.t === "op" && t.v === "(") return true;
    if (t.t === "op" && t.v === "|" && absDepth === 0) return true;
    return false;
  }
  function term(): Node {
    if (isOp("-")) { p++; return { k: "neg", a: term() }; }
    let a = unary();
    for (;;) {
      if (isOp("*") || isOp("/")) { const op = toks[p++].v; const b = unary(); a = { k: "bin", op, a, b }; }
      else if (startsPrimary()) { const b = power(); a = { k: "bin", op: "*", a, b }; }
      else break;
    }
    return a;
  }
  function unary(): Node {
    if (isOp("-")) { p++; return { k: "neg", a: unary() }; }
    if (isOp("+")) { p++; return unary(); }
    return power();
  }
  function power(): Node {
    const a = primary();
    if (isOp("^")) { p++; const b = unary(); return { k: "pow", a, b }; }
    return a;
  }
  function primary(): Node {
    const t = peek();
    if (!t) throw new Error("The expression ends too early");
    if (t.t === "num") { p++; const v = Number(t.v); if (!isFinite(v)) throw new Error("Bad number " + t.v); return { k: "num", v }; }
    if (t.t === "op" && t.v === "(") { p++; const e = expr(); expect(")"); return e; }
    if (t.t === "op" && t.v === "|") { p++; absDepth++; const e = expr(); absDepth--; expect("|"); return { k: "fn", n: "abs", a: e }; }
    if (t.t === "id") {
      p++;
      if (FN.includes(t.v)) {
        let n = t.v;
        let powNode: Node | null = null;
        if (isOp("^")) {
          p++;
          const e = unary();
          if (e.k === "neg" && e.a.k === "num" && e.a.v === 1) {
            const inv: Record<string, string> = { sin: "arcsin", cos: "arccos", tan: "arctan" };
            if (inv[n]) n = inv[n]; else powNode = e;
          } else powNode = e;
        }
        let arg: Node;
        if (isOp("(")) { p++; arg = expr(); expect(")"); }
        else arg = power();
        const norm: Record<string, string> = { asin: "arcsin", acos: "arccos", atan: "arctan", log: "ln" };
        const f: Node = { k: "fn", n: norm[n] || n, a: arg };
        return powNode ? { k: "pow", a: f, b: powNode } : f;
      }
      return { k: "var", n: t.v };
    }
    throw new Error("Unexpected “" + t.v + "”");
  }
  const r = equation();
  if (p < toks.length) throw new Error("Unexpected “" + toks[p].v + "”");
  return r;
}

type Env = Record<string, number>;
function fnEval(n: string, x: number): number {
  switch (n) {
    case "sin": return Math.sin(x);
    case "cos": return Math.cos(x);
    case "tan": return Math.tan(x);
    case "sec": return 1 / Math.cos(x);
    case "csc": return 1 / Math.sin(x);
    case "cot": return 1 / Math.tan(x);
    case "arcsin": return Math.asin(x);
    case "arccos": return Math.acos(x);
    case "arctan": return Math.atan(x);
    case "sinh": return Math.sinh(x);
    case "cosh": return Math.cosh(x);
    case "tanh": return Math.tanh(x);
    case "exp": return Math.exp(x);
    case "ln": return Math.log(x);
    case "sqrt": return Math.sqrt(x);
    case "abs": return Math.abs(x);
    case "cbrt": return Math.cbrt(x);
  }
  return NaN;
}
function evalNode(nd: Node, env: Env): number {
  switch (nd.k) {
    case "num": return nd.v;
    case "var": {
      if (nd.n === "pi") return Math.PI;
      if (nd.n === "e" && !("e" in env)) return Math.E;
      if (nd.n in env) return env[nd.n];
      throw new Error("Unknown letter “" + nd.n + "”");
    }
    case "neg": return -evalNode(nd.a, env);
    case "fn": return fnEval(nd.n, evalNode(nd.a, env));
    case "pow": {
      const a = evalNode(nd.a, env), b = evalNode(nd.b, env);
      if (a < 0 && !Number.isInteger(b)) {
        const inv = 1 / b;
        const r = Math.round(inv);
        if (Math.abs(inv - r) < 1e-9 && r % 2 !== 0) return -Math.pow(-a, b);
        return NaN;
      }
      return Math.pow(a, b);
    }
    case "bin": {
      const a = evalNode(nd.a, env), b = evalNode(nd.b, env);
      return nd.op === "+" ? a + b : nd.op === "-" ? a - b : nd.op === "*" ? a * b : a / b;
    }
    case "eq": return evalNode(nd.a, env) - evalNode(nd.b, env);
  }
}
function varsIn(nd: Node, acc: Set<string> = new Set<string>()): Set<string> {
  if (nd.k === "var") { if (nd.n !== "pi" && nd.n !== "e") acc.add(nd.n); }
  else if (nd.k === "neg" || nd.k === "fn") varsIn(nd.a, acc);
  else if (nd.k === "bin" || nd.k === "pow" || nd.k === "eq") { varsIn(nd.a, acc); varsIn(nd.b, acc); }
  return acc;
}

// ---------- expression to TeX (for the live preview) ----------
const GREEKTEX: Record<string, string> = { alpha: "\\alpha", beta: "\\beta", omega: "\\omega", theta: "\\theta", phi: "\\phi", varphi: "\\varphi", xi: "\\xi", lambda: "\\lambda", mu: "\\mu", rho: "\\rho", sigma: "\\sigma", tau: "\\tau", pi: "\\pi" };
function prec(nd: Node): number {
  if (nd.k === "eq") return 0;
  if (nd.k === "bin") return nd.op === "+" || nd.op === "-" ? 1 : 2;
  if (nd.k === "neg") return 1.5;
  if (nd.k === "pow") return 4;
  return 5;
}
function toTex(nd: Node): string {
  const wrap = (n: Node, min: number) => (prec(n) < min ? "\\left(" + toTex(n) + "\\right)" : toTex(n));
  switch (nd.k) {
    case "num": return String(nd.v);
    case "var": {
      if (GREEKTEX[nd.n]) return GREEKTEX[nd.n];
      const m = nd.n.match(/^([A-Za-z]+)_?([0-9]+)$/);
      if (m) return m[1] + "_{" + m[2] + "}";
      return nd.n;
    }
    case "neg": return "-" + wrap(nd.a, 2);
    case "fn": {
      if (nd.n === "sqrt") return "\\sqrt{" + toTex(nd.a) + "}";
      if (nd.n === "abs") return "\\lvert " + toTex(nd.a) + "\\rvert ";
      if (nd.n === "exp") return "e^{" + toTex(nd.a) + "}";
      if (nd.n === "cbrt") return "\\sqrt[3]{" + toTex(nd.a) + "}";
      const nm = nd.n === "arcsin" ? "\\sin^{-1}" : nd.n === "arccos" ? "\\cos^{-1}" : nd.n === "arctan" ? "\\tan^{-1}" : "\\" + nd.n;
      return nm + "\\left(" + toTex(nd.a) + "\\right)";
    }
    case "pow": {
      const base = nd.a.k === "fn" && nd.a.n !== "sqrt" && nd.a.n !== "abs" ? "\\left(" + toTex(nd.a) + "\\right)" : wrap(nd.a, 5);
      return base + "^{" + toTex(nd.b) + "}";
    }
    case "bin": {
      if (nd.op === "/") return "\\frac{" + toTex(nd.a) + "}{" + toTex(nd.b) + "}";
      if (nd.op === "*") {
        const L = wrap(nd.a, 2), R = wrap(nd.b, 2.5);
        const needDot = (/[0-9.]$/.test(L) && /^[0-9.\-]/.test(R)) || nd.b.k === "neg";
        return L + (needDot ? " \\cdot " : " ") + (nd.b.k === "neg" ? "\\left(" + toTex(nd.b) + "\\right)" : R);
      }
      const R = nd.op === "-" ? wrap(nd.b, 2) : wrap(nd.b, 1.5);
      return wrap(nd.a, 1) + " " + nd.op + " " + R;
    }
    case "eq": return toTex(nd.a) + " = " + toTex(nd.b);
  }
}

// ---------- answer checking ----------
let seed = 12345;
function rnd(): number { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
function pick(r: Rng): number { return r[0] + (r[1] - r[0]) * rnd(); }
const fin = (v: number) => typeof v === "number" && isFinite(v);
function stripLhs(nd: Node): Node {
  if (nd.k === "eq" && (nd.a.k === "var" || nd.a.k === "fn")) return nd.b;
  if (nd.k === "eq") throw new Error("Type just the right-hand side");
  return nd;
}
function constVal(src: string): number {
  const nd = stripLhs(parse(src.replace(/≈/g, "="), []));
  const v = evalNode(nd, {});
  if (!fin(v)) throw new Error("That doesn't evaluate to a number");
  return v;
}
function tipFor(s: string): string | undefined {
  if (/\^\s*-?[0-9.]+\s*[A-Za-z(]/.test(s) || /\^\s*-?[A-Za-z]\s*[A-Za-z0-9(]/.test(s)) return "Tip: put a whole exponent in parentheses, like e^(-4t)";
  return undefined;
}
const usesMsg = (v: string) => "Your answer uses “" + v + "”, which shouldn't appear here";

function check(fd: Field, input: string): Verdict {
  const s = input.trim();
  if (fd.t === "mc") return { ok: s !== "" && Number(s) === fd.a };
  if (!s) return { ok: false, msg: "Enter an answer first" };
  try {
    if (fd.t === "num") {
      const u = constVal(s), t = constVal(fd.a);
      const tol = fd.abs !== undefined ? fd.abs : Math.max(Math.abs(t) * (fd.tol ?? 0.002), 1e-6);
      return { ok: Math.abs(u - t) <= tol };
    }
    if (fd.t === "set") {
      const parts = s.replace(/\b(or|and)\b/g, ",").split(/[,;]/).map((x) => x.trim()).filter((x) => x.length > 0);
      const us = parts.map(constVal).sort((a, b) => a - b);
      const ts = fd.a.map(constVal).sort((a, b) => a - b);
      if (us.length !== ts.length) return { ok: false, msg: "Expected " + ts.length + " value" + (ts.length > 1 ? "s" : "") + ", separated by commas" };
      return { ok: us.every((u, i) => Math.abs(u - ts[i]) <= 1e-6 * Math.max(1, Math.abs(ts[i]))) };
    }
    if (fd.t === "expr") {
      const vars = Object.keys(fd.v);
      const u = stripLhs(parse(s, vars));
      const t = parse(fd.a, vars);
      for (const v of varsIn(u)) if (!vars.includes(v)) return { ok: false, msg: usesMsg(v) };
      const us: number[] = [], ts: number[] = [];
      let tries = 0;
      while (ts.length < 14 && tries < 200) {
        tries++;
        const env: Env = {};
        for (const v of vars) env[v] = pick(fd.v[v]);
        const tv = evalNode(t, env);
        if (!fin(tv)) continue;
        const uv = evalNode(u, env);
        if (!fin(uv)) return { ok: false, msg: "Your expression is undefined at some points where the answer is defined" };
        us.push(uv); ts.push(tv);
      }
      if (ts.length < 6) return { ok: false, msg: "Couldn't check this answer" };
      const typ = ts.map(Math.abs).sort((a, b) => a - b)[Math.floor(ts.length / 2)] + 1e-12;
      const off = fd.c ? us[0] - ts[0] : 0;
      for (let i = 0; i < ts.length; i++) {
        const d = us[i] - ts[i] - off;
        if (Math.abs(d) > 2e-5 * Math.max(Math.abs(ts[i]), typ) + 1e-9) return { ok: false, msg: tipFor(s) };
      }
      return { ok: true };
    }
    if (fd.t === "gen") {
      const pv = Object.keys(fd.p || {});
      const vars = [fd.x, fd.y, "C", ...pv];
      const u = parse(s, vars);
      const f = parse(fd.f, [fd.x, fd.y, ...pv]);
      for (const v of varsIn(u)) if (!vars.includes(v)) return { ok: false, msg: usesMsg(v) };
      const hasC = varsIn(u).has("C");
      let G: Node;
      if (u.k === "eq") { if (!hasC) return { ok: false, msg: "A general solution needs the arbitrary constant C" }; G = u; }
      else if (fd.pot && !hasC) G = { k: "bin", op: "-", a: u, b: { k: "var", n: "C" } };
      else if (!hasC) return { ok: false, msg: "A general solution needs the arbitrary constant C" };
      else G = { k: "bin", op: "-", a: { k: "var", n: fd.y }, b: u };
      let good = 0, bad = 0;
      for (let tr = 0; tr < 40 && good < 6; tr++) {
        const env: Env = { [fd.x]: pick(fd.d[0]), [fd.y]: pick(fd.d[1]) };
        for (const k of pv) env[k] = pick((fd.p || {})[k]);
        const fv = evalNode(f, env);
        if (!fin(fv)) continue;
        const g = (c: number, dx = 0, dy = 0) => evalNode(G, { ...env, [fd.x]: env[fd.x] + dx, [fd.y]: env[fd.y] + dy, C: c });
        const roots: number[] = [];
        let prevC = NaN, prevG = NaN;
        for (let i = 0; i <= 480; i++) {
          const c = Math.sinh(-7 + (14 * i) / 480) * 3;
          const gv = g(c);
          if (fin(gv) && gv === 0) roots.push(c);
          else if (fin(gv) && fin(prevG) && gv * prevG < 0) {
            let lo = prevC, hi = c, glo = prevG;
            for (let it = 0; it < 80; it++) {
              const mid = (lo + hi) / 2;
              const gm = g(mid);
              if (!fin(gm)) break;
              if (gm * glo <= 0) hi = mid; else { lo = mid; glo = gm; }
            }
            const r = (lo + hi) / 2;
            const sc = Math.abs(g(r + 1e-3)) + Math.abs(g(r - 1e-3)) + 1e-12;
            if (fin(g(r)) && Math.abs(g(r)) < 1e-6 * sc + 1e-12) roots.push(r);
          }
          prevC = c; prevG = gv;
        }
        if (!roots.length) continue;
        let matched = false, any = false;
        for (const r of roots) {
          const hx = 1e-5 * (1 + Math.abs(env[fd.x])), hy = 1e-5 * (1 + Math.abs(env[fd.y]));
          const gx = (g(r, hx, 0) - g(r, -hx, 0)) / (2 * hx), gy = (g(r, 0, hy) - g(r, 0, -hy)) / (2 * hy);
          if (!fin(gx) || !fin(gy) || Math.abs(gy) < 1e-9 * (Math.abs(gx) + 1e-12)) continue;
          any = true;
          if (Math.abs(-gx / gy - fv) <= 1e-4 * (1 + Math.abs(fv))) matched = true;
        }
        if (!any) continue;
        if (matched) good++; else bad++;
      }
      if (bad > 0) return { ok: false, msg: tipFor(s) };
      if (good < 4) return { ok: false, msg: "Couldn't check this; make sure it's a general solution with the constant C" };
      return { ok: true };
    }
    if (fd.t === "imp") {
      const u = parse(s, [fd.x, fd.y]);
      for (const v of varsIn(u)) if (![fd.x, fd.y].includes(v)) return { ok: false, msg: usesMsg(v) };
      const G: Node = u.k === "eq" ? u : { k: "bin", op: "-", a: { k: "var", n: fd.y }, b: u };
      const ev = (pt: number[]) => evalNode(G, { [fd.x]: pt[0], [fd.y]: pt[1] });
      const offs = fd.off.map(ev).filter(fin).map(Math.abs).sort((a, b) => a - b);
      if (offs.length < 3 || offs[Math.floor(offs.length / 2)] < 1e-9) return { ok: false, msg: "That equation doesn't describe a curve" };
      const scale = offs[Math.floor(offs.length / 2)];
      for (const pt of fd.pts) { const v = ev(pt); if (!fin(v) || Math.abs(v) > 1e-5 * scale) return { ok: false, msg: tipFor(s) }; }
      return { ok: true };
    }
    if (fd.t === "res") {
      const pv = Object.keys(fd.p || {});
      const u = stripLhs(parse(s, [fd.x, ...pv]));
      for (const v of varsIn(u)) if (![fd.x, ...pv].includes(v)) return { ok: false, msg: usesMsg(v) };
      const r = parse(fd.r, [fd.x, "Y", "Yp", "Ypp", ...pv]);
      const pe: Env = {};
      for (const k of pv) pe[k] = pick((fd.p || {})[k]);
      const y = (x: number) => evalNode(u, { ...pe, [fd.x]: x });
      for (const ic of fd.ic || []) {
        const x0 = ic[0], val = ic[1], ord = ic[2], h = 1e-4;
        const got = ord === 1 ? (y(x0 + h) - y(x0 - h)) / (2 * h) : y(x0);
        if (!fin(got) || Math.abs(got - val) > 1e-4 * (1 + Math.abs(val))) return { ok: false, msg: "It doesn't satisfy the initial condition" };
      }
      let n = 0;
      for (let tr = 0; tr < 60 && n < 10; tr++) {
        const x = pick(fd.d), h = 1e-3;
        const Y = y(x), Ya = y(x + h), Yb = y(x - h);
        if (!fin(Y) || !fin(Ya) || !fin(Yb)) continue;
        const Yp = (Ya - Yb) / (2 * h), Ypp = (Ya - 2 * Y + Yb) / (h * h);
        const rv = evalNode(r, { ...pe, [fd.x]: x, Y, Yp, Ypp });
        if (!fin(rv)) continue;
        if (Math.abs(rv) > 1e-4 * (1 + Math.abs(Y) + Math.abs(Yp) + Math.abs(Ypp))) return { ok: false, msg: "That function doesn't satisfy the equation" };
        n++;
      }
      if (n < 5) return { ok: false, msg: "Couldn't check this answer" };
      return { ok: true };
    }
    if (fd.t === "if") {
      const u = stripLhs(parse(s, ["x", "y"]));
      for (const v of varsIn(u)) if (!["x", "y"].includes(v)) return { ok: false, msg: usesMsg(v) };
      const M = parse(fd.M, ["x", "y"]), N = parse(fd.N, ["x", "y"]);
      const P = (x: number, y: number) => evalNode(u, { x, y }) * evalNode(M, { x, y });
      const Q = (x: number, y: number) => evalNode(u, { x, y }) * evalNode(N, { x, y });
      let n = 0;
      for (let tr = 0; tr < 60 && n < 10; tr++) {
        const x = pick(fd.d[0]), y = pick(fd.d[1]), h = 1e-5;
        const mu = evalNode(u, { x, y });
        if (!fin(mu)) continue;
        if (Math.abs(mu) < 1e-12) return { ok: false, msg: "An integrating factor can't be zero" };
        const Py = (P(x, y + h) - P(x, y - h)) / (2 * h), Qx = (Q(x + h, y) - Q(x - h, y)) / (2 * h);
        if (!fin(Py) || !fin(Qx)) continue;
        if (Math.abs(Py - Qx) > 1e-5 * (Math.abs(Py) + Math.abs(Qx)) + 1e-7) return { ok: false };
        n++;
      }
      if (n < 5) return { ok: false, msg: "Couldn't check this answer" };
      return { ok: true };
    }
  } catch (e) {
    return { ok: false, msg: (e as Error).message };
  }
  return { ok: false };
}
function sameFn(a: string, b: string, v: string, d: Rng): boolean {
  try {
    const A = stripLhs(parse(a, [v])), B = stripLhs(parse(b, [v]));
    for (let k = 0; k < 5; k++) {
      const x = d[0] + ((d[1] - d[0]) * (k + 0.5)) / 5;
      const va = evalNode(A, { [v]: x }), vb = evalNode(B, { [v]: x });
      if (Math.abs(va - vb) > 1e-6 * (1 + Math.abs(va))) return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
function varsOf(f: Field): string[] {
  if (f.t === "expr") return Object.keys(f.v);
  if (f.t === "gen") return [f.x, f.y, "C", ...Object.keys(f.p || {})];
  if (f.t === "imp") return [f.x, f.y];
  if (f.t === "res") return [f.x, ...Object.keys(f.p || {})];
  if (f.t === "if") return ["x", "y"];
  return [];
}

export type { Rng, Field, SF, Fig, Card, Verdict, Node };
export { check, sameFn, varsOf, toTex, parse, evalNode };
