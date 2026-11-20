# Diffy Qs practice

Practice for Chapters 0 and 1 of *Notes on Diffy Qs: Differential Equations for Engineers* by Jiří Lebl.

The book is free at <https://www.jirka.org/diffyqs/>. It is used here under its Creative Commons license, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) or [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Exercise text is the book's. Exercises numbered 101 and up use the answers in the back of the book. Other answer keys and worked solutions were worked out by Grok Bot, are not from the book, and are labeled that way on each card.

The site is published at <https://josephkawabata.github.io/exercises/>.

Answers are checked in the browser. Nothing you type is sent to a server. Progress is saved in this browser's localStorage.

## Develop

```bash
npm install
npm run dev
npm run check
npm run build
```

`npm run check` runs every published answer key through the checker and spot-checks wrong answers. The production build uses the base path `/exercises/` so it loads on GitHub Pages.
