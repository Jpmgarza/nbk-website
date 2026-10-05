import { Fragment } from "react";

/** Renders `*names*` in content strings as italics (institution and company names). */
export function RichText({ children }: { children: string }) {
  return children.split("*").map((part, index) =>
    index % 2 === 1 ? <em key={index}>{part}</em> : <Fragment key={index}>{part}</Fragment>,
  );
}
