/** Split text into plain, inline-$ $, and display-$$ $$ pieces. Same rules as the original page. */
export function splitRich(t: string): { m: number; s: string }[] {
  const out: { m: number; s: string }[] = [];
  let i = 0;
  while (i < t.length) {
    const d = t.indexOf("$$", i), sg = t.indexOf("$", i);
    if (sg < 0) { out.push({ m: 0, s: t.slice(i) }); break; }
    if (d === sg) {
      const e = t.indexOf("$$", d + 2);
      out.push({ m: 0, s: t.slice(i, d) });
      out.push({ m: 2, s: t.slice(d + 2, e < 0 ? t.length : e) });
      i = e < 0 ? t.length : e + 2;
      continue;
    }
    const e = t.indexOf("$", sg + 1);
    out.push({ m: 0, s: t.slice(i, sg) });
    out.push({ m: 1, s: t.slice(sg + 1, e < 0 ? t.length : e) });
    i = e < 0 ? t.length : e + 1;
  }
  return out.filter((p) => p.s.length > 0);
}
