import type { Card } from "../../engine";
import { ADDED } from "./added";
import { CARDS as bank } from "./data";

const by = new Map<string, Card>();
for (const c of [...bank, ...ADDED]) by.set(c.id, c);

const RECREATION: Record<string, { src: string; cap: string }[]> = {
  "4.1": [
    { src: "econ345/fig-8-1-recreation.png", cap: "Recreation of Figure 8.1. The book’s PDF draws the OLS line and omits the points. The points follow the book’s description: price rises slowly for a small stone and faster for a large one. The line is the OLS fit to these points." },
  ],
  "4.3": [
    { src: "econ345/fig-10-1-recreation.png", cap: "Recreation of Figure 10.1. The book’s PDF leaves this plot empty. The spread in wage rises with education, as the caption describes." },
    { src: "econ345/fig-10-2-recreation.png", cap: "Recreation of Figure 10.2. The book’s PDF draws the line and omits the points. The vertical spread around the line does not depend on $x$." },
    { src: "econ345/fig-10-3-recreation.png", cap: "Recreation of Figure 10.3. The book’s PDF draws the line and omits the points. The vertical spread grows with $x$." },
  ],
};

type Course = "345" | "366" | "both";
type Kind = "pen" | "r";

const topics: [string, string][] = [];
const counts = new Map<string, number>();
const out: Card[] = [];

function must(id: string): Card {
  const c = by.get(id);
  if (!c) throw new Error("missing card " + id);
  return c;
}

function sq(topic: string, course: Course, kind: Kind, readingId: string, exercise?: string | string[], note?: string): void {
  const reading = must(readingId);
  const ids = exercise == null ? [] : typeof exercise === "string" ? [exercise] : exercise;
  const exs = ids.map(must);
  const bkParts = exs.map((e) => e.bk).filter((x): x is string => !!x);
  const bk = bkParts.length ? bkParts.join("\n\n") : reading.bk;
  const sol = exs.flatMap((e) => e.sol ?? []);
  const f = exs.length ? exs.flatMap((e) => e.f) : reading.f;
  let n = counts.get(topic) ?? 0;
  n += 1;
  counts.set(topic, n);
  if (!topics.some(([, name]) => name === topic)) topics.push([String(topics.length + 1), topic]);
  const topicId = topics.find(([, name]) => name === topic)![0];
  const card: Card = {
    id: topicId + "." + n,
    topic,
    course,
    kind,
    q: reading.q,
    f,
    h: "",
    src: bk || f.length > 0 ? "b" : "n",
    ctx: exs.length ? reading.ctx + " Exercise: " + exs.map((e) => e.ctx).join(" ") : reading.ctx,
  };
  if (exs.length) card.ex = exs.map((e) => e.q).join("\n\n");
  if (bk) card.bk = bk;
  if (sol.length) card.sol = sol;
  if (note) card.note = note;
  const figs = RECREATION[readingId] ?? reading.figs;
  if (figs) card.figs = figs;
  out.push(card);
}

// 1. Orientation. Overlaps 345 chapter 1 and the start of 366.
sq("What econometrics is", "both", "pen", "1.1", "g1q3");
sq("What econometrics is", "345", "pen", "1.2", "g21");

// 2. Only the probability Godwin’s later chapters point at. He is already strong.
sq("Probability the later chapters use", "both", "pen", "1.6", "10.1");
sq("Probability the later chapters use", "366", "pen", "ce", "covq", "Conditional expectation is the object 366 uses. The blizzard table is Godwin’s Chapter 2.");
sq("Probability the later chapters use", "both", "pen", "1.7", "10.2");

// 3. Sampling, before regression properties. This is the “previous chapter” the statistics review names.
sq("Sampling and estimators", "both", "pen", "2.2", "e1rand", "Godwin’s Chapter 2 is the probability block above. This reading is the one that says “as we know from the previous chapter.”");

// 4. Scalar line, 345 chapters 2–4, before any matrix algebra.
sq("The regression line", "345", "pen", "fitread", "fitex");
sq("The regression line", "345", "pen", "1.3");
sq("The regression line", "345", "pen", "1.5");
sq("The regression line", "345", "pen", "derivread", "2.1", "Equation 4.10 is the slope formula in the previous square.");

// 5. Equation 5.7 before every exercise that cites it.
sq("Variance, fit, and dummies", "345", "pen", "8.1", ["8.2", "8.3"], "Equation 5.7 is stated in this reading. The two exercises use it.");
sq("Variance, fit, and dummies", "345", "pen", "8.7", undefined, "Equation 4.10 is the OLS formula two squares back. The central limit theorem is the earlier probability square.");
sq("Variance, fit, and dummies", "345", "pen", "5.6", ["8.4", "8.13"]);
sq("Variance, fit, and dummies", "345", "pen", "2.3", "8.8");
sq("Variance, fit, and dummies", "345", "pen", "2.4");
sq("Variance, fit, and dummies", "345", "pen", "3.1", "8.10");
sq("Variance, fit, and dummies", "345", "pen", "3.2");
sq("Variance, fit, and dummies", "345", "pen", "4.1");
sq("Variance, fit, and dummies", "345", "pen", "4.2");
sq("Variance, fit, and dummies", "345", "pen", "quad", ["quadq", "quadmc"]);
sq("Variance, fit, and dummies", "345", "pen", "pred", "predq");

// 6. Scalar simple regression, then the one matrix fact the next derivation uses.
sq("Scalar regression before the matrix form", "both", "pen", "g2a", "g2q2");
sq("Scalar regression before the matrix form", "both", "pen", "g2gm", ["g2q5", "g22"], "Ridge, LASSO, and quantile regression are named here. Each returns, with its own reading, later in the path.");
sq("Scalar regression before the matrix form", "both", "pen", "a5", "5.11");

// 7. Matrix OLS. This is the 365 core 366 assumes.
sq("Matrix OLS", "366", "pen", "5.1", "writex");
sq("Matrix OLS", "366", "pen", "5.2", ["handb", "8.9"]);
sq("Matrix OLS", "366", "pen", "5.3", "5.9", "“Chapter 2” in this reading is Gaggero’s simple regression, the scalar block above, not a missing chapter.");
sq("Matrix OLS", "366", "pen", "5.4", "endog");
sq("Matrix OLS", "366", "pen", "5.5", "g2q6", "The question is the scalar version of the variance formula in this reading. $\\mathrm{SST}_x$ is the $(1,1)$ story behind $\\sigma^2(X'X)^{-1}$.");
sq("Matrix OLS", "366", "pen", "5.7", ["5.10", "5.13", "5.16"]);
sq("Matrix OLS", "366", "pen", "fwl", "5.18");
sq("Matrix OLS", "366", "pen", "gmq");

// 8. Inference. 345 chapter 4 and the 366 paper exams.
sq("Inference, t, F, and restrictions", "both", "pen", "5.19", "5.28");
sq("Inference, t, F, and restrictions", "both", "pen", "5.20", "5.29");
sq("Inference, t, F, and restrictions", "366", "pen", "5.21", "5.36");
sq("Inference, t, F, and restrictions", "both", "pen", "5.22", "5.30");
sq("Inference, t, F, and restrictions", "both", "pen", "5.23", "5.31");
sq("Inference, t, F, and restrictions", "both", "pen", "5.24", "5.34");
sq("Inference, t, F, and restrictions", "both", "pen", "5.25", "5.32");
sq("Inference, t, F, and restrictions", "both", "pen", "5.26", "5.35");
sq("Inference, t, F, and restrictions", "366", "pen", "5.27", ["5.33", "5.37"]);
sq("Inference, t, F, and restrictions", "366", "pen", "rls", "5.38");

// 9. Asymptotics, then MLE. 365 readings, used again for probit.
sq("Asymptotics", "366", "pen", "consread", "consq");
sq("Maximum likelihood", "366", "pen", "mleread", "mleq");

// 10. Heteroskedasticity in words, then the matrix repair.
sq("Heteroskedasticity and robust standard errors", "both", "pen", "4.3", "8.15");
sq("Heteroskedasticity and robust standard errors", "both", "pen", "6.1", "6.5");
sq("Heteroskedasticity and robust standard errors", "366", "pen", "6.2", ["6.6", "6.7"]);
sq("Heteroskedasticity and robust standard errors", "366", "pen", "6.3", ["6.8", "6.9"]);
sq("Heteroskedasticity and robust standard errors", "both", "pen", "6.4", ["6.10", "6.14"]);

// 11. 366 topic order begins: GLS, ridge, IV, measurement error, simultaneous equations.
sq("GLS and FGLS", "366", "pen", "gls", "6.15", "The exercise is the scalar weighted-least-squares transformation. The reading is the same idea in matrix form.");
sq("GLS and FGLS", "366", "pen", "fgls", "fglsq");
sq("Autocorrelation", "both", "pen", "7.1", "7.5");
sq("Autocorrelation", "366", "pen", "7.2", ["7.6", "7.7"]);
sq("Autocorrelation", "366", "pen", "7.3", ["7.9", "7.14"]);
sq("Autocorrelation", "366", "pen", "7.4", ["7.11", "7.17"]);

sq("Ridge regression", "366", "pen", "ridge", "ridgeq");

sq("Instrumental variables", "both", "pen", "4.4");
sq("Instrumental variables", "366", "pen", "ivread", ["8.17", "8.18"]);
sq("Measurement error", "366", "pen", "measy", "measyq");
sq("Measurement error", "366", "pen", "measx", "measxq");
sq("Simultaneous equations", "366", "pen", "sem", "semq", "This is the demand-and-supply system. Order and rank conditions, and three-stage least squares, are not in these open books.");

// 12. Binary choice, panel, quantile, time series, then lasso and cross-validation.
sq("Binary choice", "366", "pen", "lpm", "lpmq");
sq("Binary choice", "366", "pen", "probit", "probitq");
sq("Binary choice", "366", "pen", "logit", "logitq");

sq("Panel data", "366", "pen", "9.1", "9.5");
sq("Panel data", "366", "pen", "9.2", ["9.6", "9.7"]);
sq("Panel data", "366", "pen", "9.4", ["9.8", "9.10"]);
sq("Panel data", "366", "pen", "9.3", "9.11", "Random effects are not in Godwin or in Hanck’s panel chapter. This path stops at fixed effects and the within estimator.");

sq("Quantile regression", "366", "pen", "quant", "quantq");

sq("Time series", "both", "pen", "hstat", "tsq4");
sq("Time series", "366", "pen", "stat", "tsq6");
sq("Time series", "366", "pen", "rw", ["tsq8", "tsq9"]);
sq("Time series", "366", "pen", "adf", "adfq");

sq("Lasso and cross-validation", "366", "pen", "lasso", "lassoq");
sq("Lasso and cross-validation", "366", "pen", "cv", "cvq");

const CARDS = out;
const SECS: [string, string][] = topics;

export { CARDS, SECS };
