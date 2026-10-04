import { notFound } from "next/navigation";

// Unknown URLs under /es render es/not-found.tsx inside the Spanish layout.
export default function Missing() {
  notFound();
}
