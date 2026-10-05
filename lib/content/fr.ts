import { PAGES } from "@/lib/i18n";
import type { Content } from "./types";

const anchors = {
  expertise: "expertise",
  problems: "problemes",
  solutions: "solutions",
  process: "demarche",
  faq: "faq",
};

const home = PAGES.home.fr;

export const fr: Content = {
  titleSuffix: "NBK Interprétation",
  meta: {
    home: {
      title: "Interprète français-espagnol juridique, Vaud | NBK",
      description:
        "Noelia Krähenbühl, interprète français-espagnol de formation juridique : interprétariat juridique et médico-social, traduction officielle. Lausanne et Vaud.",
    },
    services: {
      title: "Interprétariat et traduction juridique",
      description:
        "Interprétariat juridique, communautaire et médico-social, interprétation simultanée, chuchotée, consécutive et traduction officielle français-espagnol.",
    },
    contact: {
      title: "Contact et demande de devis",
      description:
        "Décrivez votre besoin d’interprète ou de traduction français-espagnol et recevez une réponse personnalisée. Canton de Vaud et Suisse romande, sur rendez-vous.",
    },
    legal: {
      title: "Mentions légales",
      description:
        "Mentions légales du site NBK Interprétation & Traduction Juridique : éditrice, contact, propriété intellectuelle et responsabilité quant au contenu.",
    },
    privacy: {
      title: "Protection des données",
      description:
        "Comment NBK Interprétation & Traduction Juridique traite les données transmises via le formulaire de contact, conformément à la loi sur la protection des données.",
    },
    notFound: {
      title: "Page introuvable",
      description: "Cette page n’existe pas ou a été déplacée.",
    },
  },
  anchors,
  header: {
    homeLabel: "NBK Interprétation & Traduction juridique, accueil",
    mainNavLabel: "Navigation principale",
    mobileNavLabel: "Navigation mobile",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    allServices: "Tous les services",
    servicesLabel: "Services",
    cta: "Recevoir mon devis",
    switchLabel: "Español",
  },
  nav: {
    main: [
      { label: "Expertise", href: `${home}#${anchors.expertise}` },
      { label: "Problèmes", href: `${home}#${anchors.problems}` },
      { label: "Services", href: PAGES.services.fr },
      { label: "Démarche", href: `${home}#${anchors.process}` },
      { label: "Questions fréquentes", href: `${home}#${anchors.faq}` },
      { label: "Contact", href: PAGES.contact.fr },
    ],
    mobileFooter: [
      { label: "Accueil", href: home },
      { label: "Expertise", href: `${home}#${anchors.expertise}` },
      { label: "Problèmes", href: `${home}#${anchors.problems}` },
      { label: "Services", href: PAGES.services.fr },
      { label: "Questions fréquentes", href: `${home}#${anchors.faq}` },
      { label: "Contact", href: PAGES.contact.fr },
    ],
    footerGroups: [
      {
        title: "Découvrir",
        links: [
          { label: "Accueil", href: home },
          { label: "Expertise", href: `${home}#${anchors.expertise}` },
          { label: "Problèmes", href: `${home}#${anchors.problems}` },
        ],
      },
      {
        title: "Prestations",
        links: [
          { label: "Services", href: PAGES.services.fr },
          { label: "Questions fréquentes", href: `${home}#${anchors.faq}` },
          { label: "Contact", href: PAGES.contact.fr },
        ],
      },
    ],
    legal: [
      { label: "Mentions légales", href: PAGES.legal.fr },
      { label: "Protection des données", href: PAGES.privacy.fr },
    ],
  },
  footer: {
    title: "Sécurisez votre prochain rendez-vous ou audition dès aujourd’hui.",
    cta: "Parler de mon besoin",
    navLabel: "Navigation du pied de page",
    sitemapLabel: "Plan du site",
    navigation: "Navigation",
    contact: "Contact",
    reachUs: "Nous joindre",
    legal: "Légalités",
    madeBy: "Site Web conçu par",
    madeByShort: "Site conçu par",
    rights: "Tous droits réservés.",
  },
  hero: {
    title: "Votre situation, interprétée avec exactitude",
    lead: "Interprétation et traduction juridique, communautaire et médico-sociale, français",
    join: "et",
    tail: "espagnol, pour les particuliers, les avocats et les institutions.",
    cta: "Recevoir mon devis",
  },
  servicesHero: {
    title: "Services d’interprétariat et de traduction",
    body: "Chaque situation a ses propres enjeux. Voici les prestations proposées, adaptées à votre contexte : juridique, médical, social ou professionnel.",
    cta: "Recevoir mon devis",
    imageAlt: "Interprète professionnelle tenant un dossier dans une salle de réunion",
  },
  expertise: {
    title: "Preuve d’expertise",
    intro:
      "est juriste de formation, de langue maternelle espagnole et de niveau C2 en français. Elle a travaillé une dizaine d’années dans le milieu juridique, dont sept au *Ministère public du Paraguay*, et connaît le déroulement d’une audience, les étapes d’une procédure et l’importance de la confidentialité.",
    proofs: [
      {
        title: "Interprétariat",
        text: "Depuis 2022, interprétation simultanée et chuchotée français-espagnol dans les domaines médical, diplomatique et juridique, notamment pour *ABC Translation*. Interprète communautaire pour l’Amérique latine et l’Espagne (2022–2025), soumise au secret professionnel.",
      },
      {
        title: "Expérience juridique",
        text: "Secrétaire au *Ministère public du Paraguay*, de 2001 à 2008, assistante juridique à Asunción, puis en études d’avocats à Lausanne et Aubonne (*CBWM & Associés*, *Dugast Avocat*) et à l’*Office d’exécution des peines*, canton de Vaud.",
      },
      {
        title: "Formation juridique",
        text: "Diplôme d’avocate, *Universidad Nacional de Asunción*, Paraguay (2011), et *Diplôme SEC Suisse de secrétaire juridique*, Lausanne (2019).",
      },
    ],
    cta: "Échanger avec Noelia",
  },
  problems: {
    title: "Vos problèmes",
    summary:
      "Un mot mal compris lors d’une audition peut changer l’issue d’une procédure. Un malentendu lors d’un rendez-vous médical peut retarder un diagnostic. Une démarche administrative mal expliquée peut faire perdre des droits.",
    riskTitle: "Sans interprète qualifié,",
    riskText:
      "chaque échange devient un risque : erreur de traduction, retard de procédure, perte de confiance entre les parties et stress permanent pour la personne.",
    items: [
      { title: "Lors d’une audition", text: "Un mot mal compris peut changer l’issue d’une procédure." },
      { title: "Lors d’un rendez-vous médical", text: "Un malentendu peut retarder un diagnostic." },
      { title: "Une démarche administrative", text: "Mal expliquée, elle peut faire perdre des droits." },
    ],
    cta: "Trouver une solution",
  },
  solutions: {
    title: "Vos solutions",
    carouselLabel: "Solutions proposées, faites défiler horizontalement",
    show: "Afficher :",
    ctaMobile: "Choisir mon service",
    ctaDesktop: "Découvrir les solutions",
  },
  process: {
    title: "La démarche",
    subtitle: "En quatre étapes",
    steps: [
      { title: "Premier contact", text: "Vous décrivez votre besoin par téléphone, WhatsApp ou via le formulaire." },
      { title: "Confirmation de la mission", text: "Langues, date, lieu et type d’intervention sont validés ensemble." },
      {
        title: "Préparation",
        text: "Le contexte du dossier ou du rendez-vous est étudié en amont, dans le respect de la confidentialité.",
      },
      { title: "Intervention", text: "L’interprétariat ou la traduction est réalisé avec précision, le jour convenu." },
    ],
    cta: "Démarrer ma demande",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Mes échanges resteront-ils confidentiels ?",
        answer:
          "Oui. Noelia Krähenbühl connaît le code déontologique de l’interprète et est soumise au secret professionnel. Ce qui est dit ou transmis avant, pendant et après une intervention reste strictement confidentiel.",
      },
      {
        question: "Comment sont fixés les tarifs ?",
        answer:
          "Le tarif dépend du type d’intervention, de sa durée et du lieu, ou, pour une traduction, du volume et de la nature du document. Un devis vous est transmis après votre demande.",
      },
      {
        question: "Quel est le délai pour organiser une intervention ?",
        answer:
          "Il dépend de la date souhaitée et du type de mission. Indiquez vos contraintes dans le formulaire ou par téléphone : une réponse personnalisée vous est apportée dans les meilleurs délais.",
      },
      {
        question: "Dans quelle zone les déplacements sont-ils possibles ?",
        answer:
          "Les interventions ont lieu principalement dans le canton de Vaud. Des déplacements sont possibles dans toute la Suisse romande.",
      },
      { question: "Quelles langues sont couvertes ?", answer: "Le français et l’espagnol, dans les deux sens." },
      {
        question: "Quelle est la différence entre interprétariat et traduction ?",
        answer:
          "L’interprétariat concerne l’oral : les propos sont restitués sur le moment, lors d’une audition, d’un rendez-vous ou d’une réunion. La traduction concerne l’écrit : un document est transposé dans l’autre langue avec la terminologie exacte requise.",
      },
      {
        question: "Comment se fait le paiement ?",
        answer: "Les modalités de paiement sont précisées dans le devis établi pour chaque mission.",
      },
    ],
    cta: "Poser ma question",
  },
  contact: {
    homeTitle: "Sécurisez votre prochain rendez-vous ou audition dès aujourd’hui.",
    pageTitle: "Parlons de votre situation",
    pageIntro: "Décrivez votre besoin, une réponse personnalisée vous sera apportée dans les meilleurs délais.",
    detailsTitle: "Coordonnées",
    labels: { email: "E-mail", phone: "Téléphone", availability: "Disponibilité", area: "Zone de service" },
    availability: "Sur rendez-vous",
    area: "Lausanne et canton de Vaud, déplacements possibles en Suisse romande",
    mapAlt: "Carte de la Suisse, canton de Vaud et Suisse romande mis en évidence",
    submitMobile: "Envoyer ma demande",
  },
  services: [
    {
      key: "juridique",
      slug: "interpretariat-juridique",
      title: "Interprétariat juridique",
      summary:
        "Vous êtes compris avec exactitude lors d’une audition, d’une procédure judiciaire ou d’un rendez-vous avec un avocat.",
      audience: { label: "À qui s’adresse ce service", text: "Avocats, études d’avocats, tribunaux, administrations." },
      benefit: {
        label: "Ce que cela vous apporte",
        paragraphs: [
          "Une communication exacte lors d’auditions, de procédures judiciaires ou de rendez-vous avec un avocat.",
          "Sans risque de mauvaise interprétation d’un terme juridique.",
        ],
      },
      cta: "Sécuriser mon échange",
    },
    {
      key: "communautaire",
      slug: "interpretariat-communautaire-medico-social",
      title: "Interprétariat communautaire et médico-social",
      summary:
        "Vous exprimez votre situation clairement lors d’un rendez-vous médical ou d’une démarche sociale, sans crainte d’être mal interprété.",
      audience: {
        label: "Pensé pour",
        text: "Les institutions médico-sociales, particuliers francophones et hispanophones.",
      },
      benefit: {
        label: "Le résultat",
        paragraphs: [
          "La personne peut exprimer sa situation médicale ou sociale avec précision.",
          "Elle comprend pleinement les réponses qui lui sont données.",
        ],
      },
      cta: "Clarifier mon échange",
    },
    {
      key: "simultanee",
      slug: "interpretation-simultanee",
      title: "Interprétation simultanée",
      summary: "Une communication fluide et immédiate, sans interruption, pour les échanges à rythme soutenu.",
      audience: {
        label: "Idéal pour",
        text: "Les conférences, réunions à plusieurs intervenants, contextes à rythme soutenu.",
      },
      benefit: { label: "L’avantage", paragraphs: ["La communication continue sans interruption, même à débit rapide."] },
      cta: "Préparer ma conférence",
    },
    {
      key: "chuchotee",
      slug: "interpretation-chuchotee",
      title: "Interprétation chuchotée",
      summary:
        "Une traduction discrète et en temps réel, directement à vos côtés, sans perturber l’échange en cours.",
      audience: {
        label: "Contexte d’utilisation",
        text: "Accompagnement individuel lors d’un rendez-vous ou d’une audience.",
      },
      benefit: {
        label: "Ce qui est assuré",
        paragraphs: ["Une traduction discrète, en temps réel, sans perturber l’échange principal."],
      },
      cta: "Prévoir mon interprète",
    },
    {
      key: "consecutive",
      slug: "interpretation-consecutive",
      title: "Interprétation consécutive",
      summary: "Une restitution précise et structurée, adaptée aux entretiens, auditions et réunions formelles.",
      audience: { label: "Adapté pour", text: "Les entretiens, auditions, réunions formelles." },
      benefit: {
        label: "Ce qui est résolu",
        paragraphs: [
          "Chaque intervention est restituée intégralement, avec structure et précision, après chaque prise de parole.",
        ],
      },
      cta: "Préparer mon entretien",
    },
    {
      key: "traduction",
      slug: "traduction-documents-juridiques-administratifs",
      title: "Traduction de documents juridiques et administratifs",
      summary:
        "Vos documents sont transposés avec la rigueur et le vocabulaire exacts qu’exige leur usage officiel.",
      audience: { label: "Public concerné", text: "Particuliers, entreprises, études d’avocats, institutions." },
      benefit: {
        label: "Résultat obtenu",
        paragraphs: [
          "Vos documents officiels sont transposés avec la terminologie exacte requise pour un usage juridique ou administratif.",
        ],
      },
      cta: "Traduire mon document",
    },
  ],
  form: {
    ariaLabel: "Demande de devis",
    labels: {
      name: "Nom et prénom",
      email: "E-mail",
      mission: "Type de mission",
      languages: "Langues concernées",
      comment: "Commentaire",
      honeypot: "Site web",
    },
    placeholder: "Choisir",
    missions: {
      juridique: "Interprétariat juridique",
      communautaire: "Interprétariat communautaire et médico-social",
      simultanee: "Interprétation simultanée",
      chuchotee: "Interprétation chuchotée",
      consecutive: "Interprétation consécutive",
      traduction: "Traduction de documents juridiques et administratifs",
      autre: "Autre",
    },
    languages: {
      "fr-es": "Français → espagnol",
      "es-fr": "Espagnol → français",
      both: "Dans les deux sens",
      other: "Autre (à préciser dans le commentaire)",
    },
    errors: {
      nameMissing: "Indiquez votre nom et prénom.",
      nameTooLong: "Ce nom est trop long.",
      emailMissing: "Indiquez votre adresse e-mail.",
      emailInvalid: "Cette adresse e-mail n’est pas valide.",
      emailTooLong: "Cette adresse e-mail est trop longue.",
      mission: "Choisissez le type de mission.",
      languages: "Choisissez les langues concernées.",
      comment: "Décrivez brièvement votre besoin.",
      commentTooLong: "Votre message est trop long (3000 caractères au plus).",
    },
    submit: "Envoyer ma demande",
    sending: "Envoi en cours…",
    sentTitle: "Merci, votre demande est bien envoyée.",
    sentText: "Une réponse personnalisée vous sera apportée dans les meilleurs délais.",
    invalid: "Certains champs sont incomplets. Vérifiez le formulaire.",
    fallback: "L’envoi n’a pas abouti. Vous pouvez réessayer, écrire à {email} ou appeler le {phone}.",
  },
  legalPage: { updated: "Dernière mise à jour :", date: "2 octobre 2026" },
  notFound: {
    title: "Page introuvable",
    text: "Cette page n’existe pas ou a été déplacée. Vous pouvez revenir à l’accueil ou nous écrire directement.",
    home: "Retour à l’accueil",
    contact: "Nous contacter",
  },
};
