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

export function Rich({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <>
      {splitRich(text).map((part, k) =>
        part.m === 0 ? (
          <span key={k}>{plain(part.s)}</span>
        ) : part.m === 1 ? (
          <span key={k} className="math-inline" dangerouslySetInnerHTML={{ __html: mathHtml(part.s, false) }} />
        ) : (
          <div key={k} className="math-display" dangerouslySetInnerHTML={{ __html: mathHtml(part.s, true) }} />
        ),
      )}
    </>
  );
}

export function MathInline({ tex }: { tex: string }) {
  return <span className="math-inline" dangerouslySetInnerHTML={{ __html: mathHtml(tex, false) }} />;
}
