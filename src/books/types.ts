import type { ReactNode } from "react";
import type { Card } from "../engine";

export type BookLink = { title: string; site: string; href: string };

/** Fields shown on the home page. Enough to list a book before its exercises load. */
export type BookInfo = {
  id: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  description: string;
  chapters: string;
};

/** A book plus the practice page that reuses the shared checker and card UI. */
export type Book = BookInfo & {
  sections: [string, string][];
  cards: Card[];
  practiceTitle: string;
  summary: string;
  about: ReactNode;
  links: BookLink[];
  footer: string;
  /** Heading in front of each cluster id. Diffy Qs uses "Chapter ". */
  clusterWord?: string;
  /** Number squares as Day 1, Day 2, in card order. */
  showDays?: boolean;
  /**
   * "grok": squares without a book answer are marked as worked out by Grok Bot.
   * "printed": those squares are marked as having no answer in the book.
   */
  answerLabels?: "grok" | "printed";
};

export type BookEntry = BookInfo & {
  load: () => Promise<Book>;
};
