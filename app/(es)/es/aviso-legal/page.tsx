import { LegalPage } from "@/components/sections/legal/LegalPage";
import { SITE } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { PAGES } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ locale: "es", page: "legal", noindex: true });

const { legalPage } = getContent("es");

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso legal" updated={{ label: legalPage.updated, date: legalPage.date }}>
      <section>
        <p>
          Esta traducción se ofrece para facilitar la lectura. En caso de discrepancia, prevalece la{" "}
          <a href={PAGES.legal.fr} hrefLang="fr-CH">
            versión francesa
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Responsable del sitio</h2>
        <p>
          {SITE.name}
          <br />
          {SITE.owner}, empresa individual no inscrita en el Registro Mercantil
          <br />
          {SITE.address}
          <br />
          Correo electrónico: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <br />
          Teléfono: <a href={SITE.phone.href}>{SITE.phone.display}</a>
        </p>
      </section>
      <section>
        <h2>Propiedad intelectual</h2>
        <p>
          Los textos, ilustraciones, fotografías y el logotipo de este sitio están protegidos por derechos de autor.
          Cualquier reproducción, incluso parcial, requiere la autorización previa y por escrito de su titular.
        </p>
      </section>
      <section>
        <h2>Responsabilidad</h2>
        <p>
          La información publicada en este sitio se ofrece a título orientativo y se revisa con cuidado. No constituye
          una oferta contractual: las condiciones de cada encargo se detallan en el presupuesto correspondiente. La
          responsable del sitio no responde del contenido de los sitios de terceros a los que se enlaza.
        </p>
      </section>
      <section>
        <h2>Protección de datos</h2>
        <p>
          El tratamiento de los datos personales se describe en la página{" "}
          <a href={PAGES.privacy.es}>Protección de datos</a>.
        </p>
      </section>
      <section>
        <h2>Diseño del sitio</h2>
        <p>
          <a href={SITE.studio.url} target="_blank" rel="noopener">
            {SITE.studio.name}
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
