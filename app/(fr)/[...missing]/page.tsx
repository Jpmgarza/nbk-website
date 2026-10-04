import { notFound } from "next/navigation";

// With one root layout per language there is no app-wide not-found page: unknown French URLs land
// here and render (fr)/not-found.tsx inside the French layout.
export default function Missing() {
  notFound();
}
