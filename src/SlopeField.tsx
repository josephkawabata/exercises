import { useMemo } from "react";
import { evalNode, parse } from "./engine";

export function SlopeField(props: { f: string; lab?: string }) {
  const segs = useMemo(() => {
    const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
    let node: ReturnType<typeof parse> | null = null;
    try { node = parse(props.f, ["x", "y"]); } catch (e) { node = null; }
    if (!node) return out;
    const S = 200 / 6, L = 5.5;
    for (let i = 0; i <= 14; i++) {
      for (let j = 0; j <= 14; j++) {
        const x = -3 + (6 * i) / 14, y = -3 + (6 * j) / 14;
        let m = NaN;
        try { m = evalNode(node, { x, y }); } catch (e) { m = NaN; }
        if (!isFinite(m)) continue;
        const a = Math.atan(m), cx = 10 + (x + 3) * S, cy = 10 + (3 - y) * S;
        out.push({ x1: cx - L * Math.cos(a), y1: cy + L * Math.sin(a), x2: cx + L * Math.cos(a), y2: cy - L * Math.sin(a) });
      }
    }
    return out;
  }, [props.f]);
  return (
    <figure className="slope">
      <svg viewBox="0 0 220 220" width="100%" role="img" aria-label={"Slope field " + (props.lab ?? "")}>
        <line className="axis" x1={10} y1={110} x2={210} y2={110} />
        <line className="axis" x1={110} y1={10} x2={110} y2={210} />
        {segs.map((sg, k) => (
          <line key={k} className="tick" x1={sg.x1} y1={sg.y1} x2={sg.x2} y2={sg.y2} strokeLinecap="round" />
        ))}
        <text className="axis-label" x={208} y={124} fontSize={10} textAnchor="end">x = 3</text>
        <text className="axis-label" x={114} y={20} fontSize={10}>y = 3</text>
      </svg>
      {props.lab ? <figcaption>{props.lab}</figcaption> : null}
    </figure>
  );
}
