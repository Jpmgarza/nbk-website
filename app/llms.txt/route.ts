import { SITE } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { PAGES } from "@/lib/i18n";

export const dynamic = "force-static";

/** llms.txt (llmstxt.org): a plain summary for AI assistants, built from the site's own copy. */
export function GET() {
  const fr = getContent("fr");
  const es = getContent("es");
  const url = (path: string) => `${SITE.url}${path}`;

  const body = `# ${SITE.name}

> ${SITE.owner}, interprète et traductrice juridique français-espagnol, de langue maternelle espagnole et de formation juridique, basée dans le canton de Vaud (Suisse). Interprétariat juridique, communautaire et médico-social, et traduction de documents officiels, dans les deux sens. Intérprete y traductora jurídica de español y francés en Lausana y el cantón de Vaud.

- Langues : espagnol (langue maternelle) et français (niveau C2), interprétation dans les deux sens
- Expérience : une dizaine d’années dans le milieu juridique (dont sept au Ministère public du Paraguay), interprète français-espagnol depuis 2022
- Zone : ${fr.contact.area}
- Disponibilité : ${fr.contact.availability}
- Téléphone : ${SITE.phone.display} (${SITE.phone.e164})
- E-mail : ${SITE.email}
- LinkedIn : ${SITE.linkedin}

## Parcours

${fr.expertise.proofs.map((proof) => `- ${proof.title} : ${proof.text.join(" ")}`).join("\n")}

## Services

${fr.services.map((service) => `- [${service.title}](${url(`${PAGES.services.fr}#${service.slug}`)}) : ${service.summary}`).join("\n")}

## Pages

- [Accueil](${url(PAGES.home.fr)}) : présentation, démarche et questions fréquentes
- [Services](${url(PAGES.services.fr)}) : détail de chaque prestation
- [Contact et demande de devis](${url(PAGES.contact.fr)})

## Versión en español

- [Inicio](${url(PAGES.home.es)})
- [Servicios](${url(PAGES.services.es)}) : ${es.services.map((service) => service.title).join(", ")}
- [Contacto y presupuesto](${url(PAGES.contact.es)})

## Questions fréquentes

${fr.faq.items.map((item) => `- ${item.question} ${item.answer}`).join("\n")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
