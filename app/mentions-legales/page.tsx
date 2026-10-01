import { LegalPage } from "@/components/sections/legal/LegalPage";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site NBK Interprétation & Traduction Juridique : éditrice, contact, hébergement, propriété intellectuelle et responsabilité quant au contenu.",
  path: "/mentions-legales",
  noindex: true,
});

export default function LegalNoticePage() {
  return (
    <LegalPage title="Mentions légales" updated="30 septembre 2026">
      <section>
        <h2>Éditrice du site</h2>
        <p>
          {SITE.name}
          <br />
          {SITE.owner}
          <br />
          E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <br />
          Téléphone : <a href={SITE.phone.href}>{SITE.phone.display}</a>
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, illustrations, photographies et le logo présents sur ce site sont protégés par le droit d’auteur.
          Toute reproduction, même partielle, nécessite l’accord écrit préalable de l’éditrice.
        </p>
      </section>
      <section>
        <h2>Responsabilité</h2>
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif et vérifiées avec soin. Elles ne
          constituent pas une offre contractuelle : les conditions de chaque mission sont précisées dans le devis
          correspondant. L’éditrice ne répond pas du contenu des sites tiers vers lesquels des liens sont proposés.
        </p>
      </section>
      <section>
        <h2>Protection des données</h2>
        <p>
          Le traitement des données personnelles est décrit dans la page{" "}
          <a href="/protection-des-donnees">Protection des données</a>.
        </p>
      </section>
      <section>
        <h2>Conception du site</h2>
        <p>
          <a href={SITE.studio.url} target="_blank" rel="noopener">
            {SITE.studio.name}
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
