import katex from "katex";
import { CARDS } from "../src/books/diffyqs/data.ts";
import { SECS } from "../src/books/diffyqs/sections.ts";
import { check, parse, toTex, varsOf, type Field } from "../src/engine.ts";
import { secOf } from "../src/sec.ts";
import { splitRich } from "../src/split.ts";

const failures: string[] = [];

function card(id: string, p?: string) {
  const found = CARDS.filter((c) => c.id === id && c.p === p);
  if (found.length !== 1) throw new Error("expected one " + id + " " + (p ?? "") + ", got " + found.length);
  return found[0];
}

function expect(label: string, f: Field, input: string, ok: boolean) {
  const verdict = check(f, input);
  if (verdict.ok !== ok) {
    failures.push(label + " input " + JSON.stringify(input) + " => " + JSON.stringify(verdict) + " expected ok=" + ok);
  }
}

function answerInput(f: Field): string {
  if (f.t === "mc") return String(f.a);
  if (f.t === "set") return f.a.join(", ");
  return f.a;
}

function textsOf(c: (typeof CARDS)[number]): string[] {
  const out = [c.q, c.h, c.ctx ?? "", c.bk ?? "", ...(c.sol ?? [])];
  for (const f of c.f) {
    if (f.l) out.push(f.l);
    if (f.t === "mc") out.push(...f.o);
  }
  return out;
}

const exercises = new Set(CARDS.map((c) => c.id));
console.log("cards", CARDS.length, "exercises", exercises.size);
if (CARDS.length !== 212) failures.push("expected 212 cards, got " + CARDS.length);
if (exercises.size !== 151) failures.push("expected 151 exercises, got " + exercises.size);

const seen = new Set<string>();
for (const c of CARDS) {
  const sec = secOf(c.id);
  seen.add(sec);
  if (!SECS.some(([id]) => id === sec)) failures.push("card " + c.id + " has unknown section " + sec);
  if (c.f.length === 0 && !c.sol && !c.bk) failures.push("self-check " + c.id + " " + (c.p ?? "") + " has no solution");
  for (const sf of c.sf ?? []) {
    try { parse(sf.f, ["x", "y"]); } catch (e) { failures.push("slope " + c.id + " " + (e as Error).message); }
  }
  if (c.ssf) {
    try { parse(c.ssf.f, ["x", "y"]); } catch (e) { failures.push("solution slope " + c.id + " " + (e as Error).message); }
  }
}
for (const [id] of SECS) {
  if (!seen.has(id)) failures.push("section " + id + " has no cards");
}

let keyed = 0;
for (const c of CARDS) {
  c.f.forEach((f, j) => {
    keyed++;
    const input = answerInput(f);
    const verdict = check(f, input);
    if (!verdict.ok) {
      failures.push("key " + c.id + (c.p ? "(" + c.p + ")" : "") + " field " + j + " " + f.t + " rejected " + JSON.stringify(input) + " :: " + (verdict.msg ?? ""));
    }
  });
}
console.log("answer keys checked", keyed);

const mc = card("0.2.6").f[0];
expect("mc yes", mc, "0", true);
expect("mc no", mc, "1", false);
expect("mc empty", mc, "", false);

const num = card("0.2.8").f[0];
expect("num 100", num, "100", true);
expect("num 50", num, "50", false);
expect("num expression", num, "200/2", true);

const set = card("0.2.7").f[0];
expect("set order", set, "2, -4", true);
expect("set swapped", set, "-4, 2", true);
expect("set words", set, "2 and -4", true);
expect("set one", set, "2", false);
expect("set wrong", set, "2, 3", false);

const expr = card("0.2.105").f[0];
expect("expr key", expr, "-9e^(8s)", true);
expect("expr exp", expr, "-9*exp(8*s)", true);
expect("expr wrong", expr, "e^(8s)", false);
expect("expr bad var", expr, "-9e^(8*t)", false);

const self = card("0.2.1");
if (self.f.length !== 0 || !self.sol) failures.push("0.2.1 should be a self-check with a worked solution");

const res = card("0.2.10").f[0];
expect("res sin", res, "2sin(t)", true);
expect("res cos", res, "2cos(t)", true);
expect("res wrong", res, "t", false);

const gen = card("1.3.1").f[0];
expect("gen key", gen, "y^2-x^2=C", true);
expect("gen equiv", gen, "y^2=x^2+C", true);
expect("gen wrong", gen, "y=x", false);

const imp = card("1.3.8").f[0];
expect("imp key", imp, "y^3/3+y=x^3/3+x+4/3", true);
expect("imp wrong", imp, "y=x", false);

const plusC = card("1.8.6").f[0];
expect("const key", plusC, "ln(x)+x y+ln(y)", true);
expect("const extra", plusC, "ln(x)+xy+ln(y)+7", true);
expect("const wrong", plusC, "x+y", false);

expect("distance", card("1.1.9").f[0], "145060", true);
expect("distance wrong", card("1.1.9").f[0], "1000", false);

const classify = card("0.3.1", "a");
expect("class ode", classify.f[0], "0", true);
expect("class pde", classify.f[0], "1", false);
expect("class order", classify.f[2], "2", true);
expect("class order wrong", classify.f[2], "3", false);

const equiv = card("1.1.2").f[0];
expect("equiv form", equiv, "(2*x^3+3*x^2+13)/6", true);
expect("equiv wrong", equiv, "x^2", false);

let formulas = 0;
for (const c of CARDS) {
  for (const chunk of textsOf(c)) {
    for (const part of splitRich(chunk)) {
      if (part.m === 0) continue;
      formulas++;
      try {
        katex.renderToString(part.s, { throwOnError: true, displayMode: part.m === 2, strict: "ignore" });
      } catch (e) {
        failures.push("katex " + c.id + (c.p ? "(" + c.p + ")" : "") + " :: " + part.s.slice(0, 180) + " :: " + (e as Error).message);
      }
    }
  }
  for (const f of c.f) {
    if (f.t === "mc") continue;
    const pieces = f.t === "set" ? f.a : [f.a];
    for (const piece of pieces) {
      try {
        const tex = toTex(parse(piece, f.t === "set" || f.t === "num" ? [] : varsOf(f)));
        katex.renderToString(tex, { throwOnError: true, displayMode: false, strict: "ignore" });
      } catch (e) {
        failures.push("preview tex " + c.id + (c.p ? "(" + c.p + ")" : "") + " " + f.t + " :: " + (e as Error).message);
      }
    }
  }
}
console.log("formulas rendered", formulas);

if (failures.length) {
  console.error("\n" + failures.length + " failure(s):");
  for (const f of failures) console.error(" - " + f);
  process.exit(1);
}
console.log("spot-check ok");
