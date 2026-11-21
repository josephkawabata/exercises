import { useEffect, useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Book } from "./books/types";
import { check, evalNode, parse, sameFn, toTex, varsOf, type Card, type Field, type Verdict } from "./engine";
import { MathInline, Rich } from "./rich";
import { secOf } from "./sec";
import { SlopeField } from "./SlopeField";
import { clearStoredProgress, loadProgress, saveProgress, type Progress } from "./storage";

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

export function cardKey(card: { id: string; p?: string }): string {
  return card.p ? card.id + "/" + card.p : card.id;
}

export function cardHref(bookId: string, card: { id: string; p?: string }): string {
  if (!card.p) return "#/" + bookId + "/" + card.id;
  return "#/" + bookId + "/" + card.id + "/" + encodeURIComponent(card.p);
}

/** "b" is an answer from the book. Anything else was worked out by Grok Bot. */
function answerMode(book: Book): "grok" | "printed" {
  return book.answerLabels ?? "grok";
}

function fromBook(card: { src: string }): boolean {
  return card.src === "b";
}

function sourceNote(card: Card, mode: "grok" | "printed"): string {
  const printed = fromBook(card);
  if (mode === "printed") {
    if (card.f.length > 0) return printed ? "Answer key from the book." : "No answer in the book.";
    return printed ? "Self-check card. The solution shown is the book's." : "Self-check card. No answer in the book.";
  }
  if (card.f.length > 0) return printed ? "Answer key from the book (answers in the back)." : "Answer key worked by Grok Bot, not from the book.";
  return printed ? "Self-check card. The solution shown is the book's." : "Self-check card. Solution worked by Grok Bot, not from the book.";
}

function chapterOf(id: string): string {
  return id.split(".")[0] || id;
}

type AnswerFilter = "all" | "book";

function inView(card: Card, filter: AnswerFilter, includeSelf: boolean): boolean {
  if (!includeSelf && card.f.length === 0) return false;
  if (filter === "book" && !fromBook(card)) return false;
  return true;
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

export function Practice({ book, cardKey: openKey }: { book: Book; cardKey: string | null }) {
  const cards = book.cards;
  const sections = book.sections;
  const [saved] = useState(() => loadProgress(book.id, sections.map(([id]) => id), sections[0]?.[0] ?? ""));
  const [sec, setSec] = useState(saved.sec);
  const [incSelf, setIncSelf] = useState(saved.incSelf);
  const [pos, setPos] = useState(saved.pos);
  const [inputs, setInputs] = useState(saved.inputs);
  const [res, setRes] = useState(saved.res);
  const [status, setStatus] = useState(saved.status);
  const [shown, setShown] = useState(saved.shown);
  const [streak, setStreak] = useState(saved.streak);
  const [best, setBest] = useState(saved.best);
  const [answerFilter, setAnswerFilter] = useState<AnswerFilter>("all");
  useEffect(() => {
    saveProgress(book.id, { sec, incSelf, pos, inputs, res, status, shown, streak, best });
  }, [book.id, sec, incSelf, pos, inputs, res, status, shown, streak, best]);

  const list = useMemo(
    () => cards.map((c, i) => ({ c, i })).filter((o) => inView(o.c, answerFilter, incSelf)),
    [cards, answerFilter, incSelf],
  );
  const chapters = useMemo(() => {
    const groups: { id: string; items: typeof list }[] = [];
    for (const item of list) {
      const id = chapterOf(item.c.id);
      const last = groups[groups.length - 1];
      if (!last || last.id !== id) groups.push({ id, items: [item] });
      else last.items.push(item);
    }
    return groups;
  }, [list]);

  const openedIndex = openKey == null ? -1 : cards.findIndex((c) => cardKey(c) === openKey);
  const opened = openedIndex >= 0 ? { c: cards[openedIndex], i: openedIndex } : undefined;

  useEffect(() => {
    if (openedIndex < 0) return;
    const card = cards[openedIndex];
    const section = secOf(card.id);
    const sequence = cards
      .map((c, i) => ({ c, i }))
      .filter((o) => secOf(o.c.id) === section && (inView(o.c, answerFilter, incSelf) || o.i === openedIndex));
    const idx = sequence.findIndex((o) => o.i === openedIndex);
    setSec((cur) => (cur === section ? cur : section));
    if (idx >= 0) setPos((p) => (p[section] === idx ? p : { ...p, [section]: idx }));
  }, [openedIndex, cards, incSelf, answerFilter]);

  useEffect(() => {
    if (openKey && opened) document.title = cardLabel(opened.c.id, opened.c.p);
    else if (openKey) document.title = "Exercise not found";
    else document.title = book.practiceTitle;
  }, [openKey, opened, book.practiceTitle]);

  const reset = () => {
    if (!window.confirm("Clear saved answers and scores for this book on this device?")) return;
    clearStoredProgress(book.id);
    setPos({});
    setInputs({});
    setRes({});
    setStatus({});
    setShown({});
    setStreak({});
    setBest({});
  };

  const nCorrect = list.filter((o) => status[o.i] === "correct").length;

  if (openKey) {
    const sequence = cards
      .map((c, i) => ({ c, i }))
      .filter((o) => inView(o.c, answerFilter, incSelf) || o.i === opened?.i);
    const at = opened ? sequence.findIndex((o) => o.i === opened.i) : -1;
    const prev = at > 0 ? sequence[at - 1] : undefined;
    const next = at >= 0 && at < sequence.length - 1 ? sequence[at + 1] : undefined;
    return (
      <div className="page focus">
        <a className="crumb" href={"#/" + book.id}>Exercises</a>
        {opened ? (
          <CardView
            at={Math.max(0, at)}
            total={sequence.length}
            ci={opened.i}
            card={opened.c}
            vals={inputs[opened.i] || []}
            verdicts={res[opened.i]}
            sh={shown[opened.i] ?? 0}
            st={status[opened.i]}
            inputs={inputs}
            res={res}
            status={status}
            shown={shown}
            streak={streak}
            best={best}
            sec={opened ? secOf(opened.c.id) : sec}
            setInputs={setInputs}
            setRes={setRes}
            setStatus={setStatus}
            setShown={setShown}
            setStreak={setStreak}
            setBest={setBest}
            prevHref={prev ? cardHref(book.id, prev.c) : undefined}
            nextHref={next ? cardHref(book.id, next.c) : undefined}
            answerMode={answerMode(book)}
            day={book.showDays ? opened.i + 1 : undefined}
          />
        ) : (
          <>
            <h1>Exercise not found</h1>
            <p className="summary">That exercise isn’t in this book.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      <header>
        <a className="crumb" href="#/">All books</a>
        <h1>{book.practiceTitle}</h1>
        <p className="summary">{book.summary}</p>
      </header>

      <section className="block" aria-labelledby="practice-heading">
        <h2 id="practice-heading">Practice</h2>
        <div className="filters">
          <div className="seg" role="group" aria-label="Which exercises">
            <button type="button" aria-pressed={answerFilter === "all"} onClick={() => setAnswerFilter("all")}>All</button>
            <button type="button" aria-pressed={answerFilter === "book"} onClick={() => setAnswerFilter("book")}>Textbook answers</button>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={incSelf} onChange={(e) => setIncSelf(e.target.checked)} />
            Include self-check cards
          </label>
        </div>
        <div className="score-row">
          <p className="muted">{nCorrect + " of " + list.length + " correct"}</p>
          <button type="button" className="linkish" onClick={reset}>Clear saved progress</button>
        </div>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="cluster">
            <h3 className="cluster-title">{(book.clusterWord ?? "Chapter ") + chapter.id}</h3>
            <div className="squares">
              {chapter.items.map((o) => {
                const mark = status[o.i];
                const tone = mark === "correct" ? "ok" : mark === "wrong" ? "bad" : mark === "revealed" ? "shown" : "todo";
                const word = mark === "correct" ? "completed" : mark === "wrong" ? "tried, not correct" : mark === "revealed" ? "solution shown" : "not done";
                const unmarked = !fromBook(o.c);
                const mode = answerMode(book);
                const extra = unmarked ? (mode === "printed" ? ", no answer in the book" : ", answer worked out by Grok Bot, not from the book") : "";
                const day = book.showDays ? "Day " + (o.i + 1) + ". " : "";
                const label = day + cardLabel(o.c.id, o.c.p) + ", " + word + extra;
                return (
                  <a
                    key={o.i}
                    className={"sq " + tone}
                    href={cardHref(book.id, o.c)}
                    aria-label={label}
                    title={label}
                  >
                    {unmarked ? <span className="bot" aria-hidden="true" /> : null}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
        <p className="legend">
          <span className="sq ok legend-sq" aria-hidden="true" /> correct
          <span className="sq legend-sq" aria-hidden="true" /> not done
          <span className="sq bad legend-sq" aria-hidden="true" /> tried
          <span className="bot-key"><span className="bot" aria-hidden="true" /></span>
          {answerMode(book) === "printed" ? "no answer in the book" : "answer worked out by Grok Bot, not from the book"}
        </p>
        {list.length === 0 ? <p className="card">No exercises match this filter.</p> : null}
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
        {book.about}
        <div className="links">
          {book.links.map((link) => (
            <a key={link.href} className="link-card" href={link.href}>
              <span>{link.title}</span>
              <span className="link-site">{link.site}</span>
            </a>
          ))}
        </div>
      </section>

      <footer>{book.footer}</footer>
    </div>
  );
}

function CardView(props: {
  at: number;
  total: number;
  ci: number;
  card: Card;
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
  prevHref?: string;
  nextHref?: string;
  answerMode: "grok" | "printed";
  day?: number;
}) {
  const { card, ci, vals, verdicts, sh, st, sec } = props;
  const srcLine = sourceNote(card, props.answerMode);
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
    <article className="card focus-card">
      <div className="card-top">
        <div className="card-title">{props.day ? "Day " + props.day + " · " : ""}{cardLabel(card.id, card.p)}</div>
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
        {props.prevHref ? <a className="btn" href={props.prevHref}>Previous</a> : <span className="btn" aria-disabled="true">Previous</span>}
        {props.nextHref ? <a className="btn" href={props.nextHref}>Next</a> : <span className="btn" aria-disabled="true">Next</span>}
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
