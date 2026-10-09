import { PAGES } from "@/lib/i18n";
import type { Content } from "./types";

// Adapted, not translated word for word: "usted" throughout, Spanish legal and healthcare terms
// (sociosanitario, interpretación susurrada, bufete, presupuesto), neutral Spanish readable
// by people from Spain and Latin America.

const anchors = {
  expertise: "experiencia",
  problems: "riesgos",
  solutions: "soluciones",
  process: "como-funciona",
  faq: "preguntas-frecuentes",
};

const home = PAGES.home.es;

export const es: Content = {
  titleSuffix: "NBK Interprétation",
  meta: {
    home: {
      title: "Intérprete español-francés en Lausana y Vaud | NBK",
      description:
        "Noelia Krähenbühl, intérprete de español y francés con formación jurídica: interpretación jurídica y sociosanitaria, traducción oficial. Lausana y Vaud.",
    },
    services: {
      title: "Interpretación y traducción jurídica",
      description:
        "Interpretación jurídica, comunitaria y sociosanitaria; interpretación simultánea, susurrada y consecutiva; traducción oficial de español a francés y viceversa.",
    },
    contact: {
      title: "Contacto y presupuesto",
      description:
        "Cuéntenos qué interpretación o traducción entre español y francés necesita y reciba una respuesta personalizada. Cantón de Vaud y Suiza francófona.",
    },
    legal: {
      title: "Aviso legal",
      description:
        "Aviso legal del sitio de NBK Interprétation & Traduction Juridique: responsable, contacto, propiedad intelectual y responsabilidad sobre el contenido.",
    },
    privacy: {
      title: "Protección de datos",
      description:
        "Cómo trata NBK Interprétation & Traduction Juridique los datos enviados con el formulario de contacto, conforme a la ley suiza de protección de datos.",
    },
    notFound: {
      title: "Página no encontrada",
      description: "Esta página no existe o se ha trasladado.",
    },
  },
  anchors,
  header: {
    homeLabel: "NBK Interprétation & Traduction juridique, inicio",
    mainNavLabel: "Navegación principal",
    mobileNavLabel: "Navegación móvil",
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
    allServices: "Todos los servicios",
    servicesLabel: "Servicios",
    cta: "Pedir presupuesto",
    switchLabel: "Français",
  },
  nav: {
    main: [
      { label: "Experiencia", href: `${home}#${anchors.expertise}` },
      { label: "Riesgos", href: `${home}#${anchors.problems}` },
      { label: "Servicios", href: PAGES.services.es },
      { label: "Proceso", href: `${home}#${anchors.process}` },
      { label: "Preguntas frecuentes", href: `${home}#${anchors.faq}` },
      { label: "Contacto", href: PAGES.contact.es },
    ],
    mobileFooter: [
      { label: "Inicio", href: home },
      { label: "Experiencia", href: `${home}#${anchors.expertise}` },
      { label: "Riesgos", href: `${home}#${anchors.problems}` },
      { label: "Servicios", href: PAGES.services.es },
      { label: "Preguntas frecuentes", href: `${home}#${anchors.faq}` },
      { label: "Contacto", href: PAGES.contact.es },
    ],
    footerGroups: [
      {
        title: "Descubrir",
        links: [
          { label: "Inicio", href: home },
          { label: "Experiencia", href: `${home}#${anchors.expertise}` },
          { label: "Riesgos", href: `${home}#${anchors.problems}` },
        ],
      },
      {
        title: "Información",
        links: [
          { label: "Servicios", href: PAGES.services.es },
          { label: "Preguntas frecuentes", href: `${home}#${anchors.faq}` },
          { label: "Contacto", href: PAGES.contact.es },
        ],
      },
    ],
    legal: [
      { label: "Aviso legal", href: PAGES.legal.es },
      { label: "Protección de datos", href: PAGES.privacy.es },
    ],
  },
  footer: {
    title: "Asegure hoy mismo su próxima cita o audiencia.",
    cta: "Contar mi caso",
    navLabel: "Navegación del pie de página",
    sitemapLabel: "Mapa del sitio",
    navigation: "Navegación",
    contact: "Contacto",
    reachUs: "Contacto",
    legal: "Legal",
    madeBy: "Sitio web diseñado por",
    madeByShort: "Diseño de",
    rights: "Todos los derechos reservados.",
  },
  hero: {
    title: "Su situación interpretada con exactitud",
    lead: "Interpretación y traducción en los ámbitos jurídico, comunitario y sociosanitario, español",
    join: "y",
    tail: "francés, para particulares, abogados e instituciones.",
    cta: "Pedir presupuesto",
    imageAlt: "Retrato de Noelia Krähenbühl, intérprete y traductora",
  },
  servicesHero: {
    title: "Servicios de interpretación y traducción",
    body: "Cada situación tiene sus propias exigencias. Estos son los servicios disponibles, adaptados a su contexto: jurídico, médico, social o profesional.",
    cta: "Pedir presupuesto",
    imageAlt: "Noelia Krähenbühl, intérprete y traductora jurídica",
  },
  expertise: {
    title: "Experiencia y formación",
    intro:
      "es abogada de formación, hispanohablante y con nivel C2 de francés. Ha trabajado una decena de años en el ámbito jurídico, siete de ellos en el *Ministerio Público de Paraguay*, y conoce de cerca cómo se desarrolla una audiencia, las etapas de un procedimiento y la importancia de la confidencialidad.",
    proofs: [
      {
        title: "Interpretación e idiomas",
        text: [
          "Desde 2022, interpretación simultánea y susurrada entre francés y español en los ámbitos médico, diplomático y jurídico, entre otros para *ABC Translation*.",
          "Intérprete comunitaria para América Latina y España (2022–2025), sujeta al secreto profesional.",
          "En el curso 2010–2011, auxiliar de conversación de español en dos centros de secundaria de Saint-Julien-en-Genevois, en Francia.",
        ],
      },
      {
        title: "Experiencia jurídica",
        text: [
          "Secretaria en el *Ministerio Público de Paraguay* de 2001 a 2008 y, después, asistente jurídica en Asunción.",
          "En Suiza, asistente jurídica en bufetes de Lausana y Aubonne (*CBWM & Associés*, *Dugast Avocat*) y en la *Office d’exécution des peines* del cantón de Vaud.",
        ],
      },
      {
        title: "Formación jurídica",
        text: [
          "Título de abogada por la *Universidad Nacional de Asunción*, Paraguay (2011).",
          "*Diplôme SEC Suisse de secrétaire juridique*, Lausana (2019).",
        ],
      },
    ],
    cta: "Ponerse en contacto",
  },
  problems: {
    title: "Los riesgos de no entenderse",
    summary:
      "Una palabra mal entendida en una audiencia puede cambiar el resultado de un procedimiento. Un malentendido en una cita médica puede retrasar un diagnóstico. Un trámite mal explicado puede hacerle perder derechos.",
    riskTitle: "Sin un intérprete cualificado,",
    riskText:
      "cada conversación es un riesgo: errores de traducción, retrasos en el procedimiento, desconfianza entre las partes y una tensión constante para la persona afectada.",
    items: [
      { title: "En una audiencia", text: "Una palabra mal entendida puede cambiar el resultado de un procedimiento." },
      { title: "En una cita médica", text: "Un malentendido puede retrasar un diagnóstico." },
      { title: "En un trámite administrativo", text: "Si no se explica bien, puede hacerle perder derechos." },
    ],
    cta: "Encontrar una solución",
  },
  solutions: {
    title: "Soluciones a su medida",
    carouselLabel: "Servicios disponibles, desplácese horizontalmente",
    show: "Ver:",
    ctaMobile: "Elegir mi servicio",
    ctaDesktop: "Ver todos los servicios",
  },
  process: {
    title: "Cómo funciona",
    subtitle: "En cuatro pasos",
    steps: [
      { title: "Primer contacto", text: "Explique lo que necesita por teléfono, por WhatsApp o a través del formulario." },
      { title: "Confirmación del encargo", text: "Se acuerdan con usted los idiomas, la fecha, el lugar y el tipo de intervención." },
      {
        title: "Preparación",
        text: "El contexto del expediente o de la cita se estudia con antelación, con confidencialidad total.",
      },
      { title: "Intervención", text: "La interpretación o la traducción se realiza con precisión el día acordado." },
    ],
    cta: "Iniciar mi solicitud",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Lo que hablemos será confidencial?",
        answer:
          "Sí. Noelia Krähenbühl conoce el código deontológico de la interpretación y está sujeta al secreto profesional. Todo lo que se dice o se transmite antes, durante y después de una intervención es estrictamente confidencial.",
      },
      {
        question: "¿Cómo se calculan las tarifas?",
        answer:
          "La tarifa depende del tipo de intervención, de su duración y del lugar o, si se trata de una traducción, de la extensión y la naturaleza del documento. Tras su solicitud, recibirá un presupuesto.",
      },
      {
        question: "¿Con cuánta antelación hay que reservar?",
        answer:
          "Depende de la fecha que desee y del tipo de encargo. Indique sus condiciones en el formulario o por teléfono y recibirá una respuesta personalizada lo antes posible.",
      },
      {
        question: "¿En qué zona trabaja?",
        answer:
          "Principalmente en el cantón de Vaud. También puede desplazarse a cualquier lugar de la Suiza francófona.",
      },
      { question: "¿Con qué idiomas trabaja?", answer: "Francés y español, en ambas direcciones." },
      {
        question: "¿Qué diferencia hay entre interpretación y traducción?",
        answer:
          "La interpretación es oral: lo que se dice se traslada en el momento, durante una audiencia, una cita o una reunión. La traducción es escrita: un documento se traslada al otro idioma con la terminología exacta que exige.",
      },
      {
        question: "¿Cómo se paga?",
        answer: "Las condiciones de pago figuran en el presupuesto de cada encargo.",
      },
    ],
    cta: "Hacer una pregunta",
  },
  contact: {
    homeTitle: "Asegure hoy mismo su próxima cita o audiencia.",
    pageTitle: "Hablemos de su situación",
    pageIntro: "Cuéntenos qué necesita y recibirá una respuesta personalizada lo antes posible.",
    detailsTitle: "Datos de contacto",
    labels: { email: "Correo electrónico", phone: "Teléfono", availability: "Disponibilidad", area: "Zona de trabajo" },
    availability: "Con cita previa",
    area: "Lausana y cantón de Vaud, con desplazamientos a toda la Suiza francófona",
    mapAlt: "Mapa de Suiza con el cantón de Vaud y la Suiza francófona resaltados",
    submitMobile: "Enviar mi solicitud",
  },
  services: [
    {
      key: "juridique",
      slug: "interpretacion-juridica",
      title: "Interpretación jurídica",
      summary:
        "Le entenderán con exactitud en una audiencia, en un procedimiento judicial o en una cita con su abogado.",
      audience: { label: "A quién va dirigido", text: "Abogados, bufetes, tribunales y administraciones públicas." },
      benefit: {
        label: "Lo que le aporta",
        paragraphs: [
          "Una comunicación exacta en audiencias, procedimientos judiciales o citas con su abogado.",
          "Sin riesgo de que un término jurídico se malinterprete.",
        ],
      },
      cta: "Comunicarme con seguridad",
    },
    {
      key: "communautaire",
      slug: "interpretacion-comunitaria-sociosanitaria",
      title: "Interpretación comunitaria y sociosanitaria",
      summary:
        "Explique su situación con claridad en una cita médica o un trámite social, sin miedo a que le malinterpreten.",
      audience: {
        label: "Pensado para",
        text: "Instituciones sociosanitarias y particulares de habla francesa o española.",
      },
      benefit: {
        label: "El resultado",
        paragraphs: [
          "La persona puede explicar su situación médica o social con precisión.",
          "Y entiende perfectamente las respuestas que recibe.",
        ],
      },
      cta: "Hacerme entender",
    },
    {
      key: "simultanee",
      slug: "interpretacion-simultanea",
      title: "Interpretación simultánea",
      summary: "Una comunicación fluida e inmediata, sin pausas, para reuniones de ritmo sostenido.",
      audience: {
        label: "Ideal para",
        text: "Conferencias, reuniones con varios participantes y contextos de ritmo sostenido.",
      },
      benefit: { label: "La ventaja", paragraphs: ["La comunicación sigue sin interrupciones, aunque se hable rápido."] },
      cta: "Preparar mi conferencia",
    },
    {
      key: "chuchotee",
      slug: "interpretacion-susurrada",
      title: "Interpretación susurrada",
      summary: "Una interpretación discreta y en tiempo real, a su lado, sin interrumpir la conversación.",
      audience: {
        label: "Cuándo se utiliza",
        text: "Para acompañar a una persona en una cita o una audiencia.",
      },
      benefit: {
        label: "Lo que se garantiza",
        paragraphs: ["Una interpretación discreta, en tiempo real, sin alterar el desarrollo de la conversación."],
      },
      cta: "Reservar mi intérprete",
    },
    {
      key: "consecutive",
      slug: "interpretacion-consecutiva",
      title: "Interpretación consecutiva",
      summary: "Una interpretación precisa y bien estructurada para entrevistas, audiencias y reuniones formales.",
      audience: { label: "Adecuada para", text: "Entrevistas, audiencias y reuniones formales." },
      benefit: {
        label: "Lo que resuelve",
        paragraphs: ["Cada intervención se interpreta íntegramente, con orden y precisión, al final de cada turno de palabra."],
      },
      cta: "Preparar mi entrevista",
    },
    {
      key: "traduction",
      slug: "traduccion-documentos-juridicos-administrativos",
      title: "Traducción de documentos jurídicos y administrativos",
      summary: "Sus documentos se traducen con el rigor y el vocabulario exactos que exige su uso oficial.",
      audience: { label: "Para quién", text: "Particulares, empresas, bufetes de abogados e instituciones." },
      benefit: {
        label: "El resultado",
        paragraphs: [
          "Sus documentos oficiales se traducen con la terminología exacta que requiere su uso jurídico o administrativo.",
        ],
      },
      cta: "Traducir mi documento",
    },
  ],
  form: {
    ariaLabel: "Solicitud de presupuesto",
    labels: {
      name: "Nombre y apellidos",
      email: "Correo electrónico",
      mission: "Tipo de servicio",
      languages: "Idiomas",
      comment: "Comentario",
      honeypot: "Sitio web",
    },
    placeholder: "Elegir",
    missions: {
      juridique: "Interpretación jurídica",
      communautaire: "Interpretación comunitaria y sociosanitaria",
      simultanee: "Interpretación simultánea",
      chuchotee: "Interpretación susurrada",
      consecutive: "Interpretación consecutiva",
      traduction: "Traducción de documentos jurídicos y administrativos",
      autre: "Otro",
    },
    languages: {
      "fr-es": "Francés → español",
      "es-fr": "Español → francés",
      both: "En ambas direcciones",
      other: "Otro (indíquelo en el comentario)",
    },
    errors: {
      nameMissing: "Indique su nombre y apellidos.",
      nameTooLong: "El nombre es demasiado largo.",
      emailMissing: "Indique su correo electrónico.",
      emailInvalid: "Esta dirección de correo no es válida.",
      emailTooLong: "Esta dirección de correo es demasiado larga.",
      mission: "Elija el tipo de servicio.",
      languages: "Elija los idiomas.",
      comment: "Explique brevemente lo que necesita.",
      commentTooLong: "El mensaje es demasiado largo (3000 caracteres como máximo).",
    },
    submit: "Enviar mi solicitud",
    sending: "Enviando…",
    sentTitle: "Gracias, su solicitud se ha enviado correctamente.",
    sentText: "Recibirá una respuesta personalizada lo antes posible.",
    invalid: "Faltan algunos datos. Revise el formulario.",
    fallback: "No se ha podido enviar la solicitud. Puede volver a intentarlo, escribir a {email} o llamar al {phone}.",
  },
  legalPage: { updated: "Última actualización:", date: "2 de octubre de 2026" },
  notFound: {
    title: "Página no encontrada",
    text: "Esta página no existe o se ha trasladado. Puede volver al inicio o escribirnos directamente.",
    home: "Volver al inicio",
    contact: "Contactar",
  },
};
