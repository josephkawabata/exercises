import type { Book } from "../types";
import { econ345Info } from "./info";
import { CARDS, SECS } from "./path";

const n366 = CARDS.filter((c) => c.course === "366").length;
const n345 = CARDS.filter((c) => c.course === "345").length;
const nboth = CARDS.filter((c) => c.course === "both").length;

export const econ345: Book = {
  ...econ345Info,
  chapters: CARDS.length + " squares",
  description: CARDS.length + " squares in one order. ECON 366 first, with ECON 345 where the same idea is simpler. Non-commercial.",
  sections: SECS,
  cards: CARDS,
  practiceTitle: "345 and 366 prep",
  summary: CARDS.length + " squares. One path: 366 gets " + n366 + ", 345 gets " + n345 + ", and " + nboth + " serve both.",
  showDays: true,
  unitWord: "Square ",
  answerLabels: "printed",
  about: (
    <>
      <p>
        One numbered path. Square 1, then square 2, in that order. The tag on each square is the course it mainly serves: 366, 345, or both. Pen-and-paper means a derivation, a proof, or a hand calculation. R means the exercise is done in R.
      </p>
      <p>
        Ryan T. Godwin, Introduction to Econometrics, 2026. CC BY-NC-SA 4.0. <a href="https://rtgodwin.com/introeconometrics.pdf">https://rtgodwin.com/introeconometrics.pdf</a>
      </p>
      <p>
        Ryan T. Godwin, Econometrics I, 2023. CC BY-NC-SA 4.0. <a href="https://rtgodwin.com/econometrics1.pdf">https://rtgodwin.com/econometrics1.pdf</a>
      </p>
      <p>
        Alessio Gaggero, Econometrics I, 2026. CC BY 4.0. <a href="https://agaggero.github.io/econometrics-i/">https://agaggero.github.io/econometrics-i/</a>
      </p>
      <p>
        Christoph Hanck, Martin Arnold, Alexander Gerber, and Martin Schmelzer, Introduction to Econometrics with R. CC BY-NC-SA 4.0. <a href="https://www.econometrics-with-r.org/">https://www.econometrics-with-r.org/</a>
      </p>
      <p>
        David M. Kaplan, Introductory Econometrics, and Econometrics, Distributional and Nonparametric. CC BY-NC-SA 4.0. <a href="https://kaplandm.github.io/Kaplan_Intro_Econometrics_text.pdf">Introductory Econometrics</a>. <a href="https://kaplandm.github.io/Kaplan_dist_np_text.pdf">Distributional and Nonparametric</a>
      </p>
      <p>
        Wessel N. van Wieringen, Lecture notes on ridge regression. CC BY-NC-SA 4.0. <a href="https://arxiv.org/pdf/1509.09169">https://arxiv.org/pdf/1509.09169</a>
      </p>
      <p>
        Michael Creel, Econometrics. Copyright Michael Creel, MIT License. <a href="https://github.com/mcreel/Econometrics/blob/main/LICENSE">LICENSE</a>. <a href="https://github.com/mcreel/Econometrics/raw/main/econometrics.pdf">econometrics.pdf</a>
      </p>
      <p>
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>. <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. <a href="https://opensource.org/license/mit">MIT License</a>. Changes: formatted for the web and split into steps. Non-commercial, except the Creel excerpts, which keep the MIT terms. Four figures whose points are missing from Godwin’s PDF are labeled recreation. Kaplan figures 12.1 and 12.2 are cropped from the book.
      </p>
      <p>
        Creel’s open book supplies seemingly unrelated regressions, random effects and the Hausman test, the order and rank conditions, and three-stage least squares. A line in the SUR algebra is printed as X = Iₙ ⊗ X; it is kept as printed and flagged on that square. What these books still do not carry, and this path does not invent, is a full GMM chapter. The 366 syllabus does not require one.
      </p>
    </>
  ),
  links: [
    { title: "Introduction to Econometrics (PDF)", site: "rtgodwin.com", href: "https://rtgodwin.com/introeconometrics.pdf" },
    { title: "Econometrics I (PDF)", site: "rtgodwin.com", href: "https://rtgodwin.com/econometrics1.pdf" },
    { title: "Econometrics I", site: "agaggero.github.io", href: "https://agaggero.github.io/econometrics-i/" },
    { title: "Introduction to Econometrics with R", site: "econometrics-with-r.org", href: "https://www.econometrics-with-r.org/" },
    { title: "Creel, Econometrics (PDF)", site: "github.com/mcreel", href: "https://github.com/mcreel/Econometrics/raw/main/econometrics.pdf" },
    { title: "Creel MIT License", site: "github.com/mcreel", href: "https://github.com/mcreel/Econometrics/blob/main/LICENSE" },
    { title: "CC BY-NC-SA 4.0", site: "creativecommons.org", href: "https://creativecommons.org/licenses/by-nc-sa/4.0/" },
    { title: "CC BY 4.0", site: "creativecommons.org", href: "https://creativecommons.org/licenses/by/4.0/" },
  ],
  footer: "Godwin, Gaggero, Hanck, Arnold, Gerber, Schmelzer, Kaplan, van Wieringen, and Creel. CC BY-NC-SA 4.0, CC BY 4.0 for Gaggero, and the MIT License for Creel. Changes: formatted for the web and split into steps.",
};
