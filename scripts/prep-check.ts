import { existsSync, readFileSync } from "node:fs";
import katex from "katex";
import { CARDS } from "../src/books/econ345/path.ts";
import { check } from "../src/engine.ts";
import { splitRich } from "../src/split.ts";

const godwinPath = "/tmp/godwin.txt";
const godwin = existsSync(godwinPath)
  ? readFileSync(godwinPath, "utf8").replace(/\s+/g, " ").toLowerCase()
  : "";

function has(phrase: string): boolean {
  const p = phrase.replace(/\s+/g, " ").toLowerCase();
  return godwin.includes(p);
}

const phrases = [
  "Econometrics is the study of statistical methods applied to economics data.",
  "correlation does not imply causation",
  "The general regression model is",
  "OLS predicted (or fitted) values",
  "minimize the sum of squared vertical distances",
  "The population model is linear in the",
  "omitted variable bias",
  "no perfect multicollinearity",
  "when the “X” variable is a dummy variable, the attached",
  "Another way to approximate the non-linear relationship between",
  "The term homoskedasticity (same dispersion)",
  "A variable, z, qualifies as an instrument if it satisfies two conditions.",
  "Why is the ϵ term needed in equation 4.4?",
  "How are the formulas for b1 and b0 derived?",
  "What are the two conditions that will make an omitted variable cause OLS to be biased?",
  "Explain how the “dummy variable trap” is a situation of perfect multicollinearity.",
  "What is a polynomial regression model?",
  "Explain the difference between homoskedasticity and heteroskedasticity.",
  "What two properties must an instrumental variable have?",
];

if (!godwin) {
  console.log("prep-check: /tmp/godwin.txt not present, skipped the source diff");
} else {
  const missing = phrases.filter((p) => !has(p));
  if (missing.length) {
    console.error("phrases missing from Godwin text:");
    for (const p of missing) console.error(" - " + p);
    process.exit(1);
  }
}

const failures: string[] = [];
const texts = (c: (typeof CARDS)[number]) => [c.q, c.ex ?? "", c.h, c.ctx ?? "", c.bk ?? "", c.note ?? "", ...(c.sol ?? [])];

for (const [i, card] of CARDS.entries()) {
  if (card.course !== "345" && card.course !== "366" && card.course !== "both") failures.push("no course " + card.id);
  if (!card.topic) failures.push("no topic " + card.id);
  if (card.kind !== "pen" && card.kind !== "r") failures.push("no kind " + card.id);
  const blob = card.q + (card.ex ?? "");
  const exercise = !!(card.ex || card.bk || card.f.length || /\?/.test(blob) || /Calculate|Explain|Prove|Show|Exercise|Question/.test(blob));
  if (!exercise) failures.push("no exercise " + card.id);
  for (const chunk of texts(card)) {
    for (const part of splitRich(chunk)) {
      if (part.m === 0) continue;
      try {
        katex.renderToString(part.s, { throwOnError: true, displayMode: part.m === 2, strict: "ignore" });
      } catch (e) {
        failures.push("katex square " + (i + 1) + " " + card.id + " :: " + part.s.slice(0, 160) + " :: " + (e as Error).message);
      }
    }
  }
  for (const fig of card.figs ?? []) {
    const path = "public/" + fig.src;
    if (!existsSync(path)) failures.push("missing figure " + fig.src + " on " + card.id);
    if (/10\.1|10\.2|10\.3|8\.1/.test(fig.cap) && !/recreation/i.test(fig.cap) && /fig-.*recreation/.test(fig.src) === false && fig.src.includes("recreation") === false) {
      // page renders of the blank plots should not be the only copy
    }
  }
}

const formulaAt = CARDS.findIndex((c) => /\\qquad \(5\.7\)/.test(c.q) || /qquad \(5\.7\)/.test(c.q) || c.q.includes("(5.7)"));
const usesFormula = CARDS.findIndex((c) => /[Uu]sing equation 5\.7/.test((c.ex ?? "") + c.q));
if (formulaAt < 0) failures.push("equation 5.7 is not stated");
if (usesFormula >= 0 && usesFormula < formulaAt) failures.push("equation 5.7 is used before it is stated");

const previous = CARDS.findIndex((c) => /previous chapter/.test(c.q));
const chapter2 = CARDS.findIndex((c) => /conditional expectation/i.test(c.q) || /Chapter 2/.test(c.note ?? ""));
if (previous >= 0 && chapter2 > previous) failures.push("Godwin chapter 2 is still after the reading that calls it the previous chapter");

const order: { token: string; definedBy: RegExp }[] = [
  { token: "M_1", definedBy: /projection|residual-maker|M_X|M_1 =/ },
  { token: "M_2", definedBy: /projection|residual-maker|M_X|M_2 =/ },
  { token: "P_Z", definedBy: /projection|P_Z =/ },
  { token: "plim", definedBy: /probability limit|Definition 7\.1/ },
  { token: "Slutsky", definedBy: /Slutsky.s [Tt]heorem/ },
  { token: "LP(", definedBy: /linear projection/ },
  { token: "AR(1)", definedBy: /autoregressive|AR\(1\) process|Autoregressive/ },
  { token: "MA(1)", definedBy: /moving average|MA\(1\) process|Moving average/ },
];
for (const rule of order) {
  const first = CARDS.findIndex((c) => (c.q + (c.ex ?? "") + (c.bk ?? "")).includes(rule.token));
  if (first < 0) continue;
  const text = CARDS[first].q + (CARDS[first].ex ?? "") + (CARDS[first].bk ?? "");
  if (!rule.definedBy.test(text)) failures.push(rule.token + " is used in square " + (first + 1) + " before it is defined");
}

const figsNeeded = ["econ345/kaplan-12-1.png", "econ345/kaplan-12-2.png"];
for (const src of figsNeeded) {
  if (!CARDS.some((c) => (c.figs ?? []).some((f) => f.src === src))) failures.push("figure not attached " + src);
}

const of366 = CARDS.filter((c) => c.course === "366");
const pen366 = of366.filter((c) => c.kind === "pen").length;
if (of366.length && pen366 / of366.length < 0.75) failures.push("fewer than three quarters of 366 squares are pen-and-paper");

let checked = 0;
for (const card of CARDS) {
  card.f.forEach((f, j) => {
    if (f.t === "mc") {
      const verdict = check(f, String(f.a));
      checked++;
      if (!verdict.ok) failures.push("mc key failed " + card.id + " " + j);
      const wrong = check(f, String((f.a + 1) % f.o.length));
      if (wrong.ok) failures.push("mc wrong answer accepted " + card.id + " " + j);
      return;
    }
    const input = f.t === "set" ? f.a.join(", ") : f.a;
    const verdict = check(f, input);
    checked++;
    if (!verdict.ok) failures.push("key failed " + card.id + " " + j + " " + input + " " + (verdict.msg ?? ""));
    const wrong = check(f, f.t === "set" ? "9, 9" : "999");
    if (wrong.ok) failures.push("wrong answer accepted " + card.id + " " + j);
  });
}

const byCourse: Record<string, number> = {};
const byTopic: Record<string, number> = {};
const byKind: Record<string, number> = {};
for (const c of CARDS) {
  byCourse[c.course ?? "?"] = (byCourse[c.course ?? "?"] ?? 0) + 1;
  byTopic[c.topic ?? "?"] = (byTopic[c.topic ?? "?"] ?? 0) + 1;
  byKind[c.kind ?? "?"] = (byKind[c.kind ?? "?"] ?? 0) + 1;
}

if (failures.length) {
  console.error(failures.length + " failure(s):");
  for (const f of failures) console.error(" - " + f);
  process.exit(1);
}

console.log("prep-check ok", {
  squares: CARDS.length,
  byCourse,
  byKind,
  pen366,
  of366: of366.length,
  numericFields: checked,
  topics: byTopic,
});
