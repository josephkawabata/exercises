import { readFileSync } from "node:fs";
import { CARDS } from "../src/books/econ345/data.ts";
import { check } from "../src/engine.ts";

const godwin = readFileSync("/tmp/godwin.txt", "utf8").replace(/\s+/g, " ").toLowerCase();

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

const missing = phrases.filter((p) => !has(p));
if (missing.length) {
  console.error("phrases missing from Godwin text:");
  for (const p of missing) console.error(" - " + p);
  process.exit(1);
}

const book = CARDS.filter((c) => c.src === "b");
const none = CARDS.filter((c) => c.src !== "b");
const auto = CARDS.filter((c) => c.f.length > 0);
const selfBook = CARDS.filter((c) => c.f.length === 0 && c.src === "b");
const selfNone = CARDS.filter((c) => c.f.length === 0 && c.src !== "b");

if (CARDS.length !== 15) {
  console.error("expected 15 days, got " + CARDS.length);
  process.exit(1);
}

let checked = 0;
for (const card of auto) {
  card.f.forEach((f, j) => {
    if (f.t === "mc") return;
    const input = f.t === "set" ? f.a.join(", ") : f.a;
    const verdict = check(f, input);
    checked++;
    if (!verdict.ok) {
      console.error("key failed", card.id, j, input, verdict);
      process.exit(1);
    }
    const wrong = check(f, f.t === "set" ? "9, 9" : "999");
    if (wrong.ok) {
      console.error("wrong answer accepted", card.id, j);
      process.exit(1);
    }
  });
}

console.log("prep-check ok", {
  days: CARDS.length,
  textbook: book.length,
  noAnswer: none.length,
  auto: auto.length,
  selfBook: selfBook.length,
  selfNone: selfNone.length,
  numericFields: checked,
});
