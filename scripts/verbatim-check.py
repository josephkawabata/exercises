#!/usr/bin/env python3
"""Check that square prose is verbatim from the open books.

Math is removed from the card text before sentences are split, as the brief
requires. A sentence of six or more words must be a substring of the corpus,
or at least 60% of its six-word windows must match. PDFs are read with
pdftotext (not -layout). Gaggero chapters are Quarto source. Hanck pages are
the rendered HTML, with math spans removed.
"""
import json, os, re, subprocess, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = Path(os.environ.get("VERBATIM_CACHE", "/tmp/econ-verbatim"))
CACHE.mkdir(parents=True, exist_ok=True)

PDFS = {
    "godwin-ei.txt": "https://rtgodwin.com/econometrics1.pdf",
    "godwin-intro.txt": "https://rtgodwin.com/introeconometrics.pdf",
    "kaplan-intro.txt": "https://kaplandm.github.io/Kaplan_Intro_Econometrics_text.pdf",
    "kaplan-dnp.txt": "https://kaplandm.github.io/Kaplan_dist_np_text.pdf",
    "creel.txt": "https://github.com/mcreel/Econometrics/raw/main/econometrics.pdf",
    "ridge.txt": "https://arxiv.org/pdf/1509.09169.pdf",
}
GAGGERO = [
    "01-initial-concepts.qmd",
    "02-simple-regression.qmd",
    "03-multiple-regression.qmd",
    "04-inference.qmd",
    "05-prediction.qmd",
    "06-nonlinear-qualitative.qmd",
    "07-heteroskedasticity.qmd",
    "08-autocorrelation.qmd",
    "appendix-a-prerequisites.qmd",
]
HANCK_RMD = [
    "11-ch11.Rmd",
    "12-ch12.Rmd",
    "14-ch14.Rmd",
    "16-ch16.Rmd",
]
HANCK = [
    "11.1-binary-dependent-variables-and-the-linear-probability-model.html",
    "11.2-palr.html",
    "11.3-estimation-and-inference-in-the-logit-and-probit-models.html",
    "12.2-TGIVRM.html",
    "14.7-nit.html",
]

# Sentences kept for a stated formatting reason. Key is a short unique snippet.
ALLOW = {
    "Joint distribution for snow": "Table 2.1 is rendered as a table; the cell words are the book's.",
}


def fetch(url: str, dest: Path) -> None:
    if dest.exists() and dest.stat().st_size > 1000:
        return
    print("download", url, file=sys.stderr)
    urllib.request.urlretrieve(url, dest)


def pdf_text(name: str, url: str) -> str:
    txt = CACHE / name
    if not txt.exists():
        pdf = CACHE / (name.replace(".txt", ".pdf"))
        fetch(url, pdf)
        subprocess.check_call(["pdftotext", "-enc", "UTF-8", str(pdf), str(txt)])
    return txt.read_text(errors="ignore")


def strip_math(s: str) -> str:
    s = re.sub(r"\$\$[\s\S]*?\$\$", " ", s)
    s = re.sub(r"\$[^$\n]{0,500}\$", " ", s)
    s = re.sub(r"\\\([\s\S]*?\\\)", " ", s)
    s = re.sub(r"\\\[[\s\S]*?\\\]", " ", s)
    return s


def norm(s: str) -> str:
    s = (s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
         .replace("–", "-").replace("—", "-").replace("ﬁ", "fi").replace("ﬀ", "ff").replace("ﬂ", "fl"))
    s = re.sub(r"-\s*\n\s*", "", s)
    s = re.sub(r"[^a-zA-Z]+", " ", s).lower()
    return " ".join(w for w in s.split() if len(w) > 2)


def html_text(raw: str) -> str:
    raw = re.sub(r"<script[\s\S]*?</script>", " ", raw, flags=re.I)
    raw = re.sub(r"<style[\s\S]*?</style>", " ", raw, flags=re.I)
    raw = re.sub(r'<span class="math[\s\S]*?</span>', " ", raw)
    raw = re.sub(r"<[^>]+>", " ", raw)
    return strip_math(raw)


def corpus() -> str:
    parts = [norm(pdf_text(name, url)) for name, url in PDFS.items()]
    for name in GAGGERO:
        dest = CACHE / name
        fetch(f"https://raw.githubusercontent.com/agaggero/econometrics-i/main/chapters/{name}", dest)
        parts.append(norm(strip_math(dest.read_text(errors="ignore"))))
    for name in HANCK:
        dest = CACHE / name
        local = Path("/tmp/books/hanck/docs") / name
        if local.exists() and not dest.exists():
            dest.write_text(local.read_text(errors="ignore"))
        else:
            fetch(f"https://www.econometrics-with-r.org/{name}", dest)
        parts.append(norm(html_text(dest.read_text(errors="ignore"))))
    for name in HANCK_RMD:
        dest = CACHE / name
        local = Path("/tmp/books/hanck") / name
        if local.exists() and not dest.exists():
            dest.write_text(local.read_text(errors="ignore"))
        else:
            fetch(f"https://raw.githubusercontent.com/mca91/EconometricsWithR/master/{name}", dest)
        parts.append(norm(strip_math(dest.read_text(errors="ignore"))))
    return " " + " ".join(parts)


def cards():
    out = CACHE / "path.json"
    subprocess.check_call(
        ["npx", "--yes", "tsx", "-e",
         "import { CARDS } from './src/books/econ345/path.ts';"
         "import { writeFileSync } from 'fs';"
         f"writeFileSync({str(out)!r}, JSON.stringify(CARDS.map(c => ({{id:c.id,q:c.q,ex:c.ex||'',bk:c.bk||''}}))));"],
        cwd=ROOT,
    )
    return json.loads(out.read_text())


def allowed(sentence: str) -> bool:
    return any(key in sentence for key in ALLOW)


def main() -> int:
    text = corpus()
    deck = cards()
    bad = []
    for i, card in enumerate(deck, 1):
        for field in ("q", "ex", "bk"):
            raw = strip_math(card.get(field) or "")
            for sentence in re.split(r"(?<=[.?!:])\s+|\n+", raw):
                if allowed(sentence):
                    continue
                words = norm(sentence).split()
                if len(words) < 6:
                    continue
                folded = " ".join(words)
                if folded in text:
                    continue
                hits = sum(1 for k in range(0, len(words) - 5, 3) if " ".join(words[k:k + 6]) in text)
                need = max(1, (len(words) - 5) // 3 * 0.6)
                if hits < need:
                    bad.append(f"#{i} [{card['id']}] {field}: {sentence.strip()[:140]}")
    if bad:
        print(len(bad), "unmatched sentence(s):")
        print("\n".join(bad))
        return 1
    print("verbatim-check ok", len(deck), "squares")
    return 0


if __name__ == "__main__":
    # cards() is called twice if we print length after; call once
    sys.exit(main())
