import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * Wraps each word of a plain-string heading in a masked span so it can rise into view.
 * Spaces stay as text nodes, so wrapping and screen-reader output are unchanged.
 * Non-string children are returned as is.
 */
export function SplitWords({ children }: { children: ReactNode }) {
  if (typeof children !== "string") return children;

  return children.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span className="reveal-word">
        <span className="reveal-word-inner" style={{ "--w": index } as CSSProperties}>
          {word}
        </span>
      </span>
    </Fragment>
  ));
}
