import { useEffect, useState } from "react";
import { bookEntry, type BookEntry } from "./books/registry";
import type { Book } from "./books/types";
import { Home, MissingBook } from "./Home";
import { Practice } from "./Practice";

function slugFromHash(hash: string): string | null {
  let path = hash.startsWith("#") ? hash.slice(1) : hash;
  path = path.replace(/^\/+|\/+$/g, "");
  if (!path) return null;
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

export default function App() {
  const [hash, setHash] = useState(() => (typeof window === "undefined" ? "" : window.location.hash));

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const slug = slugFromHash(hash);
  const entry = slug ? bookEntry(slug) : undefined;

  useEffect(() => {
    document.title = "Exercise practice";
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) return <Home />;
  if (!entry) return <MissingBook slug={slug} />;
  return <BookPractice key={entry.id} entry={entry} />;
}

function BookPractice({ entry }: { entry: BookEntry }) {
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

  useEffect(() => {
    if (book) document.title = book.practiceTitle;
  }, [book]);

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
  return <Practice book={book} />;
}
