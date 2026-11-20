import type { Book } from "../types";
import { CARDS } from "./data";
import { diffyqsInfo } from "./info";
import { SECS } from "./sections";

export const diffyqs: Book = {
  ...diffyqsInfo,
  sections: SECS,
  cards: CARDS,
  practiceTitle: "Diffy Qs practice: Chapters 0–1",
  summary: "Khan-style practice with the exercises from Notes on Diffy Qs, in the book's order. Type an answer or pick a choice, check it, and use hints or worked solutions when stuck.",
  about: (
    <>
      <p>
        All exercises are from Notes on Diffy Qs: Differential Equations for Engineers by Jiří Lebl (<a href="https://www.jirka.org/diffyqs/">https://www.jirka.org/diffyqs/</a>), used under its Creative Commons license (CC BY-SA 4.0 or CC BY-NC-SA 4.0). The exercise text is the book's; a few were split into parts so each can be checked, and in-text exercises show the needed context.
      </p>
      <p>
        Exercises numbered 101 and up use the answers in the back of the book. All other answer keys and worked solutions were worked out by Grok Bot and checked with a computer algebra system, and are marked as not from the book. Proofs, sketches and open-ended questions are self-check cards with a solution to compare against. Answers, hints you opened, and scores are saved in this browser and kept when the page reloads.
      </p>
    </>
  ),
  links: [
    { title: "Notes on Diffy Qs (free online book and PDF)", site: "jirka.org", href: "https://www.jirka.org/diffyqs/" },
    { title: "CC BY-SA 4.0 license", site: "creativecommons.org", href: "https://creativecommons.org/licenses/by-sa/4.0/" },
  ],
  footer: "Exercise text from Jiří Lebl, Notes on Diffy Qs, under CC BY-SA 4.0 or CC BY-NC-SA 4.0.",
};
