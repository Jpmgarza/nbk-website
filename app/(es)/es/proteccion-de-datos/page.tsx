import { LegalPage } from "@/components/sections/legal/LegalPage";
import { SITE } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { PAGES } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ locale: "es", page: "privacy", noindex: true });

const { legalPage } = getContent("es");

export default function PrivacyPage() {
  return (
    <LegalPage title="Protección de datos" updated={{ label: legalPage.updated, date: legalPage.date }}>
      <section>
        <p>
          Esta página explica qué datos personales se tratan en este sitio, con qué finalidad y cuáles son sus
          derechos, de acuerdo con la Ley Federal suiza de Protección de Datos (LPD). En caso de discrepancia,
          prevalece la{" "}
          <a href={PAGES.privacy.fr} hrefLang="fr-CH">
            versión francesa
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Responsable del tratamiento</h2>
        <p>
          {SITE.owner}, {SITE.name}
          <br />
          Correo electrónico: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </section>
      <section>
        <h2>Datos recogidos</h2>
        <p>Cuando utiliza el formulario de contacto, se envían los siguientes datos:</p>
        <ul>
          <li>su nombre y apellidos y su dirección de correo electrónico;</li>
          <li>el tipo de servicio, los idiomas y el idioma de la página desde la que escribe;</li>
          <li>su comentario, en el que describe lo que necesita.</li>
        </ul>
        <p>
          Envíe por este formulario solo la información necesaria para preparar un presupuesto. Los detalles
          confidenciales de un caso pueden comentarse después, directamente con la intérprete.
        </p>
      </section>
      <section>
        <h2>Finalidad</h2>
        <p>
          Estos datos solo se utilizan para responder a su solicitud y preparar un presupuesto. No se venden ni se
          utilizan con fines publicitarios.
        </p>
      </section>
      <section>
        <h2>Destinatarios</h2>
        <p>
          Las solicitudes se transmiten por correo electrónico. Los proveedores técnicos que alojan el sitio y el
          correo pueden tener acceso a ellas únicamente en la medida necesaria para prestar su servicio.
        </p>
      </section>
      <section>
        <h2>Plazo de conservación</h2>
        <p>
          Los datos se conservan el tiempo necesario para tramitar su solicitud y, si se confía un encargo, durante el
          plazo que exijan las obligaciones legales de conservación.
        </p>
      </section>
      <section>
        <h2>Cookies y medición de audiencia</h2>
        <p>
          Este sitio no utiliza cookies publicitarias ni herramientas de medición de audiencia. Las fuentes
          tipográficas se alojan en el propio sitio.
        </p>
      </section>
      <section>
        <h2>Sus derechos</h2>
        <p>
          Puede solicitar en cualquier momento el acceso a sus datos, su rectificación o su supresión escribiendo a{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. También puede dirigirse al Encargado Federal de
          Protección de Datos y Transparencia (PFPDT).
        </p>
      </section>
    </LegalPage>
  );
}
