import type { Book } from "../types";
import { CARDS } from "./data";
import { econ345Info } from "./info";
import { SECS } from "./sections";

export const econ345: Book = {
  ...econ345Info,
  sections: SECS,
  cards: CARDS,
  practiceTitle: "345 and 366 prep",
  summary: "15 days. About 30 minutes a day. Godwin, Introduction to Econometrics, in section order.",
  clusterWord: "Week ",
  showDays: true,
  answerLabels: "printed",
  about: (
    <>
      <p>
        Ryan T. Godwin, Introduction to Econometrics, 2026. This work is licensed under CC BY-NC-SA 4.0. <a href="https://rtgodwin.com/introeconometrics.pdf">https://rtgodwin.com/introeconometrics.pdf</a>. <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">https://creativecommons.org/licenses/by-nc-sa/4.0/</a>
      </p>
      <p>Changes: formatted for the web and split into steps. Non-commercial.</p>
      <p>15 days. About 30 minutes a day.</p>
    </>
  ),
  links: [
    { title: "Introduction to Econometrics (PDF)", site: "rtgodwin.com", href: "https://rtgodwin.com/introeconometrics.pdf" },
    { title: "CC BY-NC-SA 4.0", site: "creativecommons.org", href: "https://creativecommons.org/licenses/by-nc-sa/4.0/" },
  ],
  footer: "Ryan T. Godwin, Introduction to Econometrics, CC BY-NC-SA 4.0. Non-commercial. Changes: formatted for the web and split into steps.",
};
