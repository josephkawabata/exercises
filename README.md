# Exercise practice

Khan-style practice from free textbooks. Pick a book, work a problem, and check your answer in the browser. Nothing you type is uploaded. Progress is saved in this browser, separately for each book.

The site is published at <https://josephkawabata.github.io/exercises/>.

## Books

- [345 and 366 prep](https://josephkawabata.github.io/exercises/#/econ345). 118 days from Ryan T. Godwin, Introduction to Econometrics, CC BY-NC-SA 4.0, and Alessio Gaggero, Econometrics I, CC BY 4.0. Changes: formatted for the web and split into steps. Non-commercial.
- [Notes on Diffy Qs: Differential Equations for Engineers](https://josephkawabata.github.io/exercises/#/diffyqs), Chapters 0–1, by Jiří Lebl. The book is free at <https://www.jirka.org/diffyqs/> and is used under its Creative Commons license, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) or [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Exercise text is the book's. Exercises numbered 101 and up use the answers in the back of the book. Other answer keys and worked solutions were worked out by Grok Bot, are not from the book, and are labeled that way on each card.

## Add a book

1. Add `src/books/<id>/info.ts` with the title, author, license, source link, short description, and which chapters are covered.
2. Add `src/books/<id>/index.tsx` that exports a `Book`: that same info, plus the section list and the exercise cards. Put the cards in their own module next to it.
3. Register it in `src/books/registry.ts`.

The home page lists whatever is in the registry. A book’s exercise grid is `#/<id>` (for example `#/diffyqs`). One exercise is `#/<id>/<exercise id>`, and a part adds another segment (`#/diffyqs/0.2.14/b`). The shared expression checker is `src/engine.ts`, and the shared card UI is `src/Practice.tsx`. Saved answers for that book are stored under the localStorage key `exercises:<id>`.

## Develop

```bash
npm install
npm run dev
npm run check
npm run build
```

`npm run check` runs every published Diffy Qs answer key through the checker and spot-checks wrong answers. The production build uses the base path `/exercises/` so it loads on GitHub Pages. Routing is in the URL hash, so a book link works without extra Pages configuration.
