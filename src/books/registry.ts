import { diffyqsInfo } from "./diffyqs/info";
import type { BookEntry } from "./types";

export type { BookEntry };

/**
 * Books listed on the home page.
 *
 * To add one:
 * 1. Create `src/books/<id>/info.ts` with the title, author, license, source link, description, and chapters.
 * 2. Create `src/books/<id>/index.tsx` that exports a `Book` (that info, plus sections and cards).
 * 3. Append an entry here. The practice page is then `#/<id>`.
 * Saved answers for that book live in localStorage under `exercises:<id>`.
 */
export const BOOKS: BookEntry[] = [
  {
    ...diffyqsInfo,
    load: () => import("./diffyqs").then((mod) => mod.diffyqs),
  },
];

export function bookEntry(id: string): BookEntry | undefined {
  return BOOKS.find((book) => book.id === id);
}
