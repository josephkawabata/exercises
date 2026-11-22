import katex from "katex";
import type { ReactNode } from "react";
import { splitRich } from "./split";

function mathHtml(src: string, display: boolean): string {
  try {
    return katex.renderToString(src, {
      displayMode: display,
      throwOnError: false,
      strict: "ignore",
      trust: false,
    });
  } catch {
    return escapeHtml(src);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => (c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"));
}

function plain(s: string): ReactNode[] {
  const parts = s.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`") && part.length >= 2 ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function calloutLine(line: string): { kind: string; rest: string } | null {
  const m = line.match(/^\s*(Note|Warning) (?!that\b)([\s\S]*)$/);
  if (!m) return null;
  return { kind: m[1], rest: m[2] };
}

function textBlock(text: string, key: string): ReactNode {
  const lines = text.split("\n");
  const out: ReactNode[] = [];
  let buf: string[] = [];
  const flush = () => {
    if (!buf.length) return;
    const chunk = buf.join("\n");
    buf = [];
    out.push(
      <span key={key + "-t" + out.length}>
        {splitRich(chunk).map((part, k) =>
          part.m === 0 ? (
            <span key={k}>{plain(part.s)}</span>
          ) : part.m === 1 ? (
            <span key={k} className="math-inline" dangerouslySetInnerHTML={{ __html: mathHtml(part.s, false) }} />
          ) : (
            <div key={k} className="math-display" dangerouslySetInnerHTML={{ __html: mathHtml(part.s, true) }} />
          ),
        )}
      </span>,
    );
  };
  for (const line of lines) {
    const call = calloutLine(line);
    if (call) {
      flush();
      out.push(
        <p key={key + "-c" + out.length} className={"callout callout-" + call.kind.toLowerCase()}>
          <span className="callout-k">{call.kind}</span>
          {splitRich(call.rest).map((part, k) =>
            part.m === 0 ? (
              <span key={k}>{plain(part.s)}</span>
            ) : (
              <span key={k} className="math-inline" dangerouslySetInnerHTML={{ __html: mathHtml(part.s, false) }} />
            ),
          )}
        </p>,
      );
    } else buf.push(line);
  }
  flush();
  return out;
}

function withTables(text: string): ReactNode {
  const bits = text.split(/\[table\]|\[\/table\]/);
  if (bits.length === 1) return textBlock(text, "a");
  return bits.map((bit, i) => {
    if (i % 2 === 0) return <span key={"p" + i}>{textBlock(bit, "p" + i)}</span>;
    const rows = bit.trim().split("\n").filter((row) => row.trim());
    return (
      <div key={"tb" + i} className="table-wrap">
        <table>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.split("|").map((cell, c) => (
                  <td key={c}>{textBlock(cell.trim(), "c" + r + "-" + c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
}

export function Rich({ text }: { text?: string }) {
  if (!text) return null;
  return <>{withTables(text)}</>;
}

export function MathInline({ tex }: { tex: string }) {
  return <span className="math-inline" dangerouslySetInnerHTML={{ __html: mathHtml(tex, false) }} />;
}
