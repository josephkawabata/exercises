import { BOOKS } from "./books/registry";

export function Home() {
  return (
    <div className="page">
      <header>
        <h1>Exercise practice</h1>
        <p className="summary">
          Khan-style practice from free textbooks. Pick a book, work a problem, and check your answer right away.
        </p>
      </header>
      <ul className="book-list">
        {BOOKS.map((book) => (
          <li key={book.id}>
            <article className="book-card">
              <a className="book-card-link" href={"#/" + book.id}>
                <span className="book-kicker">{book.chapters}</span>
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-desc">{book.description}</p>
                <span className="book-go">Practice</span>
              </a>
              <p className="book-license">
                <span>License: <a href={book.licenseUrl}>{book.license}</a></span>
                <a href={book.sourceUrl}>Source</a>
              </p>
            </article>
          </li>
        ))}
      </ul>
      <footer>Exercise text stays under each book’s own license. Answers are checked in this browser and are not uploaded.</footer>
    </div>
  );
}

export function MissingBook({ slug }: { slug: string }) {
  return (
    <div className="page">
      <a className="crumb" href="#/">All books</a>
      <h1>Book not found</h1>
      <p className="summary">There is no exercise set named “{slug}”.</p>
    </div>
  );
}
