import { useEffect, useState } from "react";
import { bookEntry, type BookEntry } from "./books/registry";
import type { Book } from "./books/types";
import { Home, MissingBook } from "./Home";
import { Practice } from "./Practice";

export type BookRoute = { bookId: string; card: string | null };

/** `#/`, `#/<book>`, or `#/<book>/<exercise id>` (a part is an extra segment). */
export function routeFromHash(hash: string): BookRoute | null {
  let path = hash.startsWith("#") ? hash.slice(1) : hash;
  path = path.replace(/^\/+|\/+$/g, "");
  if (!path) return null;
  const cut = path.indexOf("/");
  if (cut < 0) {
    try {
      return { bookId: decodeURIComponent(path), card: null };
    } catch {
      return { bookId: path, card: null };
    }
  }
  const bookRaw = path.slice(0, cut);
  const rest = path.slice(cut + 1);
  let bookId = bookRaw;
  try {
    bookId = decodeURIComponent(bookRaw);
  } catch {
    bookId = bookRaw;
  }
  const partCut = rest.indexOf("/");
  if (partCut < 0) {
    try {
      return { bookId, card: decodeURIComponent(rest) };
    } catch {
      return { bookId, card: rest };
    }
  }
  const id = rest.slice(0, partCut);
  let part = rest.slice(partCut + 1);
  try {
    part = decodeURIComponent(part);
  } catch {
    // Keep the raw segment.
  }
  return { bookId, card: id + "/" + part };
}

export default function App() {
  const [hash, setHash] = useState(() => (typeof window === "undefined" ? "" : window.location.hash));

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const route = routeFromHash(hash);
  const entry = route ? bookEntry(route.bookId) : undefined;
  const routeKey = route ? route.bookId + "\n" + (route.card ?? "") : "";

  useEffect(() => {
    if (!route) document.title = "Exercise practice";
    window.scrollTo(0, 0);
  }, [routeKey]);

  if (!route) return <Home />;
  if (!entry) return <MissingBook slug={route.bookId} />;
  return <BookPractice key={entry.id} entry={entry} card={route.card} />;
}

function BookPractice({ entry, card }: { entry: BookEntry; card: string | null }) {
  const [book, setBook] = useState<Book | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    entry.load().then(
      (loaded) => {
        if (live) setBook(loaded);
      },
      () => {
        if (live) setFailed(true);
      },
    );
    return () => {
      live = false;
    };
  }, [entry]);

  if (failed) {
    return (
      <div className="page">
        <a className="crumb" href="#/">All books</a>
        <h1>Couldn’t open this book</h1>
        <p className="summary">Reload the page and try again.</p>
      </div>
    );
  }
  if (!book) {
    return (
      <div className="page">
        <a className="crumb" href="#/">All books</a>
        <p className="summary">Loading {entry.title}…</p>
      </div>
    );
  }
  return <Practice book={book} cardKey={card} />;
}
