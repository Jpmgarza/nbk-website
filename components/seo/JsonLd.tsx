type JsonLdProps = { data: Record<string, unknown> };

/**
 * Renders one JSON-LD block. Only ever pass data built from our own static content
 * (lib/structured-data.ts); `<` is escaped so a value can never close the script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
