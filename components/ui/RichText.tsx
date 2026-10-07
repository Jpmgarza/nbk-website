import { Fragment } from "react";

/** Renders `*names*` in content strings in bold (institution and company names). */
export function RichText({ children }: { children: string }) {
  return children.split("*").map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
