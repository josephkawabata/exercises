import type { Book } from "../types";
import { CARDS } from "./data";
import { econ345Info } from "./info";
import { SECS } from "./sections";

export const econ345: Book = {
  ...econ345Info,
  sections: SECS,
  cards: CARDS,
  practiceTitle: "345 and 366 prep",
  summary: "118 days. Godwin, Introduction to Econometrics, then Gaggero, Econometrics I.",
  clusterWord: "Week ",
  showDays: true,
  answerLabels: "printed",
  about: (
    <>
      <p>
        Ryan T. Godwin, Introduction to Econometrics, 2026. CC BY-NC-SA 4.0. <a href="https://rtgodwin.com/introeconometrics.pdf">https://rtgodwin.com/introeconometrics.pdf</a>. <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">https://creativecommons.org/licenses/by-nc-sa/4.0/</a>
      </p>
      <p>
        Alessio Gaggero, Econometrics I, 2026. CC BY 4.0. <a href="https://agaggero.github.io/econometrics-i/">https://agaggero.github.io/econometrics-i/</a>. <a href="https://creativecommons.org/licenses/by/4.0/">https://creativecommons.org/licenses/by/4.0/</a>
      </p>
      <p>Changes: formatted for the web and split into steps. Non-commercial.</p>
      <p>118 days.</p>
    </>
  ),
  links: [
    { title: "Introduction to Econometrics (PDF)", site: "rtgodwin.com", href: "https://rtgodwin.com/introeconometrics.pdf" },
    { title: "Econometrics I", site: "agaggero.github.io", href: "https://agaggero.github.io/econometrics-i/" },
    { title: "CC BY-NC-SA 4.0", site: "creativecommons.org", href: "https://creativecommons.org/licenses/by-nc-sa/4.0/" },
    { title: "CC BY 4.0", site: "creativecommons.org", href: "https://creativecommons.org/licenses/by/4.0/" },
  ],
  footer: "Ryan T. Godwin, Introduction to Econometrics, CC BY-NC-SA 4.0. Alessio Gaggero, Econometrics I, CC BY 4.0. Non-commercial. Changes: formatted for the web and split into steps.",
};
