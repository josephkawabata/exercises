import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { CARDS } from "./data";
import { check, evalNode, parse, sameFn, toTex, varsOf, type Field, type Verdict } from "./engine";
import { MathInline, Rich } from "./rich";
import { SECS, secOf } from "./sections";
import { SlopeField } from "./SlopeField";
import { clearStoredProgress, loadProgress, saveProgress, type Progress } from "./storage";

const initial: Progress = loadProgress(SECS.map(([id]) => id));

const HOWTO: [string, string][] = [
  ["Powers", "`x^2`, `e^(2x)`. Put a whole exponent in parentheses: `e^2x` means e² times x."],
  ["Products", "`2x`, `x*y`, `x y`, `3sin(x)`"],
  ["Fractions", "`1/(x+1)`, `(x^4+7)/(2x^2)`"],
  ["Roots", "`sqrt(x)`, `x^(1/3)`"],
  ["Functions", "`sin`, `cos`, `tan`, `ln`, `exp`, `arcsin` or `sin^-1`, `arctan`, `sinh`, `cosh`, `abs(x)` or `|x|`"],
  ["Constants", "`pi`, `e`, and `C` for the arbitrary constant. Subscripts like `A_0`; ω as `w`."],
  ["Implicit answers", "Type an equation, like `x^3 + x = t + 2` or `sin(y) = -cos(x) + C`"],
  ["Several values", "Separate with commas: `2, -4`"],
];

function cardLabel(id: string, part?: string): string {
  return "Exercise " + id + (part ? " (" + part + ")" : "");
}

function keyNote(f: Field): string {
  if (f.t === "gen") return " (any equivalent form with C is accepted)";
  if (f.t === "res") return " (one example; any correct solution is accepted)";
  if (f.t === "if") return " (other integrating factors that work are accepted)";
  if (f.t === "imp") return " (equivalent equations are accepted)";
  if (f.t === "expr" && f.c) return " (plus any constant)";
  return "";
}

function keyNode(f: Field): ReactNode {
  try {
    if (f.t === "mc") return <Rich text={f.o[f.a]} />;
    if (f.t === "set") {
      return f.a.map((s, k) => (
        <span key={k}>{k ? ", " : ""}<MathInline tex={toTex(parse(s, []))} /></span>
      ));
    }
    if (f.t === "num") {
      const nd = parse(f.a, []);
      const v = evalNode(nd, {});
      const tex = toTex(nd);
      const dec = Number.isInteger(v) || String(v).length < 8 ? "" : " ≈ " + v.toPrecision(6);
      return <span><MathInline tex={tex} />{dec}</span>;
    }
    return <MathInline tex={toTex(parse(f.a, varsOf(f)))} />;
  } catch (e) {
    return f.t === "mc" ? "" : f.a.toString();
  }
}

function preview(f: Field, value: string): ReactNode {
  if (!value.trim()) return null;
  try {
    if (f.t === "set") {
      return value.replace(/\b(or|and)\b/g, ",").split(/[,;]/).filter((x) => x.trim().length > 0).map((x, k) => (
        <span key={k}>{k ? ", " : ""}<MathInline tex={toTex(parse(x, []))} /></span>
      ));
    }
    return <MathInline tex={toTex(parse(value, varsOf(f)))} />;
  } catch (e) {
    return <span className="preview-error">{(e as Error).message}</span>;
  }
}

export default function App() {
  const [sec, setSec] = useState(initial.sec);
  const [incSelf, setIncSelf] = useState(initial.incSelf);
  const [pos, setPos] = useState(initial.pos);
  const [inputs, setInputs] = useState(initial.inputs);
  const [res, setRes] = useState(initial.res);
  const [status, setStatus] = useState(initial.status);
  const [shown, setShown] = useState(initial.shown);
  const [streak, setStreak] = useState(initial.streak);
  const [best, setBest] = useState(initial.best);
  const cardRef = useRef<HTMLDivElement>(null);
  const place = useRef<string | null>(null);

  useEffect(() => {
    saveProgress({ sec, incSelf, pos, inputs, res, status, shown, streak, best });
  }, [sec, incSelf, pos, inputs, res, status, shown, streak, best]);

  const list = useMemo(
    () => CARDS.map((c, i) => ({ c, i })).filter((o) => secOf(o.c.id) === sec && (incSelf || o.c.f.length > 0)),
    [sec, incSelf],
  );
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of CARDS) {
      const k = secOf(c.id);
      if (incSelf || c.f.length > 0) m[k] = (m[k] ?? 0) + 1;
    }
    return m;
  }, [incSelf]);

  const at = Math.max(0, Math.min(pos[sec] ?? 0, list.length - 1));
  const cur = list[at];

  useEffect(() => {
    const key = sec + "|" + at + "|" + incSelf;
    if (place.current === null) {
      place.current = key;
      return;
    }
    if (place.current === key) return;
    place.current = key;
    cardRef.current?.scrollIntoView({ block: "start" });
  }, [sec, at, incSelf]);

  const go = (k: number) => setPos({ ...pos, [sec]: Math.max(0, Math.min(k, list.length - 1)) });

  const reset = () => {
    if (!window.confirm("Clear all saved answers and scores on this device?")) return;
    clearStoredProgress();
    setPos({});
    setInputs({});
    setRes({});
    setStatus({});
    setShown({});
    setStreak({});
    setBest({});
  };

  const nCorrect = list.filter((o) => status[o.i] === "correct").length;
  const totalCorrect = CARDS.filter((_c, i) => status[i] === "correct").length;

  return (
    <div className="page">
      <header>
        <h1>Diffy Qs practice: Chapters 0–1</h1>
        <p className="summary">
          Khan-style practice with the exercises from Notes on Diffy Qs, in the book's order. Type an answer or pick a choice, check it, and use hints or worked solutions when stuck.
        </p>
      </header>

      <section className="block" aria-labelledby="practice-heading">
        <h2 id="practice-heading">Practice</h2>
        <div className="controls">
          <label className="field grow">
            <span>Section</span>
            <select value={sec} onChange={(e) => setSec(e.target.value)}>
              {SECS.map(([k, title]) => (
                <option key={k} value={k}>
                  {k + " " + title + " (" + (counts[k] ?? 0) + ")"}
                </option>
              ))}
            </select>
          </label>
          <label className="toggle">
            <input type="checkbox" checked={incSelf} onChange={(e) => setIncSelf(e.target.checked)} />
            Include self-check cards
          </label>
        </div>
        <div className="score-row">
          <p className="muted">
            {"Section score: " + nCorrect + " of " + list.length + " correct · Streak: " + (streak[sec] ?? 0) + " · Best streak: " + (best[sec] ?? 0) + " · All sections: " + totalCorrect + " correct"}
          </p>
          <button type="button" className="linkish" onClick={reset}>Clear saved progress</button>
        </div>
        <div className="dots">
          {list.map((o, k) => {
            const mark = status[o.i];
            const tone = mark === "correct" ? "ok" : mark === "wrong" ? "bad" : mark === "revealed" ? "shown" : "todo";
            const label = cardLabel(o.c.id, o.c.p);
            return (
              <button
                key={o.i}
                type="button"
                className={"dot " + tone + (k === at ? " current" : "")}
                onClick={() => go(k)}
                title={label}
                aria-label={label}
                aria-current={k === at ? "true" : undefined}
              />
            );
          })}
        </div>
        <p className="muted legend">Squares: green correct, red missed, amber solution shown, gray not done yet. Click one to jump to it.</p>

        {cur ? (
          <CardView
            cardRef={cardRef}
            at={at}
            total={list.length}
            ci={cur.i}
            card={cur.c}
            vals={inputs[cur.i] || []}
            verdicts={res[cur.i]}
            sh={shown[cur.i] ?? 0}
            st={status[cur.i]}
            inputs={inputs}
            res={res}
            status={status}
            shown={shown}
            streak={streak}
            best={best}
            sec={sec}
            setInputs={setInputs}
            setRes={setRes}
            setStatus={setStatus}
            setShown={setShown}
            setStreak={setStreak}
            setBest={setBest}
            onPrev={() => go(at - 1)}
            onNext={() => go(at + 1)}
            prevDisabled={at === 0}
            nextDisabled={at >= list.length - 1}
          />
        ) : (
          <p className="card">No cards in this section with the current filter.</p>
        )}
      </section>

      <details className="fold">
        <summary>How to type answers</summary>
        <div className="fold-body">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>To write</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {HOWTO.map(([left, right]) => (
                  <tr key={left}>
                    <td>{left}</td>
                    <td><Rich text={right} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Answers are checked by value, not by form: your expression is compared with the key at many random points, so any equivalent form counts. General solutions are checked by plugging them into the differential equation, so any form of the constant works. The preview under each box shows how your input was read.
          </p>
        </div>
      </details>

      <section className="block about" aria-labelledby="about-heading">
        <h2 id="about-heading">About these exercises</h2>
        <p>
          All exercises are from Notes on Diffy Qs: Differential Equations for Engineers by Jiří Lebl (<a href="https://www.jirka.org/diffyqs/">https://www.jirka.org/diffyqs/</a>), used under its Creative Commons license (CC BY-SA 4.0 or CC BY-NC-SA 4.0). The exercise text is the book's; a few were split into parts so each can be checked, and in-text exercises show the needed context.
        </p>
        <p>
          Exercises numbered 101 and up use the answers in the back of the book. All other answer keys and worked solutions were worked out by Grok Bot and checked with a computer algebra system, and are marked as not from the book. Proofs, sketches and open-ended questions are self-check cards with a solution to compare against. Answers, hints you opened, and scores are saved in this browser and kept when the page reloads.
        </p>
        <div className="links">
          <a className="link-card" href="https://www.jirka.org/diffyqs/">
            <span>Notes on Diffy Qs (free online book and PDF)</span>
            <span className="link-site">jirka.org</span>
          </a>
          <a className="link-card" href="https://creativecommons.org/licenses/by-sa/4.0/">
            <span>CC BY-SA 4.0 license</span>
            <span className="link-site">creativecommons.org</span>
          </a>
        </div>
      </section>

      <footer>
        Exercise text from Jiří Lebl, Notes on Diffy Qs, under CC BY-SA 4.0 or CC BY-NC-SA 4.0.
      </footer>
    </div>
  );
}

function CardView(props: {
  cardRef: RefObject<HTMLDivElement | null>;
  at: number;
  total: number;
  ci: number;
  card: (typeof CARDS)[number];
  vals: string[];
  verdicts: Verdict[] | undefined;
  sh: number;
  st: string | undefined;
  inputs: Progress["inputs"];
  res: Progress["res"];
  status: Progress["status"];
  shown: Progress["shown"];
  streak: Progress["streak"];
  best: Progress["best"];
  sec: string;
  setInputs: (v: Progress["inputs"]) => void;
  setRes: (v: Progress["res"]) => void;
  setStatus: (v: Progress["status"]) => void;
  setShown: (v: Progress["shown"]) => void;
  setStreak: (v: Progress["streak"]) => void;
  setBest: (v: Progress["best"]) => void;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}) {
  const { card, ci, vals, verdicts, sh, st, sec } = props;
  const srcLine = card.f.length > 0
    ? card.src === "b" ? "Answer key from the book (answers in the back)." : "Answer key worked by Grok Bot, not from the book."
    : card.src === "b" ? "Self-check card. The solution shown is the book's." : "Self-check card. Solution worked by Grok Bot, not from the book.";
  const allOk = verdicts ? verdicts.every((v) => v.ok) : false;

  const setInp = (j: number, v: string) => {
    const arr = [...vals];
    arr[j] = v;
    props.setInputs({ ...props.inputs, [ci]: arr });
    if (props.res[ci]) {
      const r2 = { ...props.res };
      delete r2[ci];
      props.setRes(r2);
    }
  };
  const bump = () => {
    const s2 = (props.streak[sec] ?? 0) + 1;
    props.setStreak({ ...props.streak, [sec]: s2 });
    if (s2 > (props.best[sec] ?? 0)) props.setBest({ ...props.best, [sec]: s2 });
  };
  const doCheck = () => {
    const vs: Verdict[] = card.f.map((f, j) => check(f, vals[j] ?? ""));
    if (card.distinct && vs[card.distinct[0]].ok && vs[card.distinct[1]].ok) {
      const f0 = card.f[card.distinct[0]];
      if (f0.t === "res" && sameFn(vals[card.distinct[0]] ?? "", vals[card.distinct[1]] ?? "", f0.x, f0.d)) {
        vs[card.distinct[1]] = { ok: false, msg: "Give a different solution from the first one" };
      }
    }
    props.setRes({ ...props.res, [ci]: vs });
    const all = vs.every((v) => v.ok);
    if (all) {
      if (st !== "correct") {
        props.setStatus({ ...props.status, [ci]: "correct" });
        if (st === undefined) bump();
      }
    } else if (st !== "correct") {
      props.setStatus({ ...props.status, [ci]: "wrong" });
      props.setStreak({ ...props.streak, [sec]: 0 });
    }
  };
  const reveal = () => {
    props.setShown({ ...props.shown, [ci]: sh | 2 });
    if (card.f.length > 0 && st !== "correct") {
      props.setStatus({ ...props.status, [ci]: "revealed" });
      props.setStreak({ ...props.streak, [sec]: 0 });
    }
  };
  const selfMark = (ok: boolean) => {
    if (ok) {
      props.setStatus({ ...props.status, [ci]: "correct" });
      if (st === undefined) bump();
    } else {
      props.setStatus({ ...props.status, [ci]: "wrong" });
      props.setStreak({ ...props.streak, [sec]: 0 });
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") doCheck();
  };

  return (
    <article className="card" ref={props.cardRef}>
      <div className="card-top">
        <div className="card-title">{cardLabel(card.id, card.p)}</div>
        <div className="muted">{"Card " + (props.at + 1) + " of " + props.total}</div>
      </div>
      <div className="muted">{srcLine}</div>
      {card.ctx ? <div className="muted context prose">{"From the text: "}<Rich text={card.ctx} /></div> : null}
      <div className="question prose"><Rich text={card.q} /></div>
      {card.sf ? (
        <div className="slopes">
          {card.sf.map((x, k) => <SlopeField key={k} f={x.f} lab={x.lab} />)}
        </div>
      ) : null}

      {card.f.map((f, j) => {
        const v = vals[j] ?? "";
        const vd = verdicts ? verdicts[j] : undefined;
        return (
          <div key={j} className="stack">
            {f.t === "mc" ? (
              <>
                {f.l ? <div className="prompt"><Rich text={f.l} /></div> : null}
                <div className="choices" role="group" aria-label={f.l ? undefined : "Choices"}>
                  {f.o.map((o, k) => {
                    const sel = v === String(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        className="choice"
                        aria-pressed={sel}
                        onClick={() => setInp(j, String(k))}
                      >
                        <Rich text={o} />
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <label className="answer">
                {f.l ? <span className="prompt"><Rich text={f.l} /></span> : <span className="sr-only">Answer</span>}
                <input
                  value={v}
                  placeholder={f.t === "set" ? "e.g. 1, -3" : f.t === "num" ? "a number or expression, e.g. 3/2 or ln(5)" : "type your answer"}
                  onChange={(e) => setInp(j, e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="done"
                />
                {v.trim() ? <span className="muted preview">{"Preview: "}{preview(f, v)}</span> : null}
              </label>
            )}
            {vd ? (
              <div className={vd.ok ? "verdict ok" : "verdict bad"} role="status">
                {vd.ok ? "✓ Correct" : "✗ Not quite" + (vd.msg ? ". " + vd.msg : "")}
              </div>
            ) : null}
          </div>
        );
      })}

      {verdicts && card.f.length > 0 ? (
        <div className={allOk ? "banner ok" : "banner bad"} role="status">
          {allOk ? "Correct! Nice work." : "Not quite. Try again, or open a hint."}
        </div>
      ) : null}

      <div className="toolbar">
        {card.f.length > 0 ? <button type="button" className="btn primary" onClick={doCheck}>Check</button> : null}
        <button type="button" className="btn" onClick={() => props.setShown({ ...props.shown, [ci]: sh ^ 1 })} disabled={!card.h}>
          {sh & 1 ? "Hide hint" : "Show hint"}
        </button>
        <button type="button" className="btn" onClick={reveal} disabled={(sh & 2) !== 0}>
          {sh & 2 ? "Solution shown" : "Show solution"}
        </button>
        <button type="button" className="btn" onClick={props.onPrev} disabled={props.prevDisabled}>Previous</button>
        <button type="button" className="btn" onClick={props.onNext} disabled={props.nextDisabled}>Next</button>
      </div>

      {sh & 1 && card.h ? (
        <div className="panel">
          <h3>Hint</h3>
          <div className="prose"><Rich text={card.h} /></div>
        </div>
      ) : null}

      {sh & 2 ? (
        <div className="panel">
          {card.f.length > 0 ? (
            <div className="stack">
              <h3>Answer</h3>
              {card.f.map((f, j) => (
                <div key={j}>
                  {f.l ? <span className="muted"><Rich text={f.l} /> </span> : null}
                  {keyNode(f)}
                  <span className="note">{keyNote(f)}</span>
                </div>
              ))}
            </div>
          ) : null}
          {card.bk ? (
            <div className="stack">
              <h3>Answer in the back of the book</h3>
              <div className="prose"><Rich text={card.bk} /></div>
            </div>
          ) : null}
          {card.sol ? (
            <div className="stack">
              <h3>{card.src === "b" ? "Extra worked steps (Grok Bot)" : "Worked solution (Grok Bot, not from the book)"}</h3>
              {card.sol.map((x, k) => <div key={k} className="prose"><Rich text={x} /></div>)}
            </div>
          ) : null}
          {card.ssf ? (
            <div className="slopes">
              <SlopeField f={card.ssf.f} lab="Slope field, window −3 to 3 on both axes" />
            </div>
          ) : null}
          {card.f.length === 0 ? (
            <div className="toolbar">
              <span className="muted">Did you get it?</span>
              <button type="button" className="btn" onClick={() => selfMark(true)}>Yes, I got it</button>
              <button type="button" className="btn" onClick={() => selfMark(false)}>Not yet</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
