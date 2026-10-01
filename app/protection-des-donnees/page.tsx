import { LegalPage } from "@/components/sections/legal/LegalPage";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Protection des données",
  description:
    "Comment NBK Interprétation & Traduction Juridique traite les données transmises via le formulaire de contact, conformément à la loi fédérale sur la protection des données.",
  path: "/protection-des-donnees",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Protection des données" updated="30 septembre 2026">
      <section>
        <p>
          Cette page explique quelles données personnelles sont traitées sur ce site, dans quel but et quels sont vos
          droits, conformément à la loi fédérale sur la protection des données (LPD).
        </p>
      </section>
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {SITE.owner}, {SITE.name}
          <br />
          E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </section>
      <section>
        <h2>Données collectées</h2>
        <p>Lorsque vous utilisez le formulaire de contact, les données suivantes sont transmises :</p>
        <ul>
          <li>votre nom et prénom et votre adresse e-mail ;</li>
          <li>le type de mission et les langues concernées ;</li>
          <li>votre commentaire décrivant le besoin.</li>
        </ul>
        <p>
          Ne transmettez par ce formulaire que les informations nécessaires à l’établissement d’un devis. Les détails
          confidentiels d’un dossier peuvent être échangés ensuite, directement avec l’interprète.
        </p>
      </section>
      <section>
        <h2>Finalité</h2>
        <p>
          Ces données servent uniquement à répondre à votre demande et à établir un devis. Elles ne sont ni vendues, ni
          utilisées à des fins publicitaires.
        </p>
      </section>
      <section>
        <h2>Destinataires</h2>
        <p>
          Les demandes sont acheminées par e-mail. Les prestataires techniques qui hébergent le site et la messagerie
          peuvent y avoir accès dans la seule mesure nécessaire à leur service.
        </p>
      </section>
      <section>
        <h2>Durée de conservation</h2>
        <p>
          Les données sont conservées le temps nécessaire au traitement de votre demande, puis, si une mission est
          confiée, pendant la durée imposée par les obligations légales de conservation.
        </p>
      </section>
      <section>
        <h2>Cookies et mesure d’audience</h2>
        <p>
          Ce site n’utilise ni cookie publicitaire ni outil de mesure d’audience. Les polices de caractères sont
          hébergées sur le site lui-même.
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander à tout moment l’accès à vos données, leur rectification ou leur suppression en écrivant
          à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Vous pouvez également vous adresser au Préposé fédéral à
          la protection des données et à la transparence (PFPDT).
        </p>
      </section>
    </LegalPage>
  );
}
