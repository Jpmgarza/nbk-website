import type { StaticImageData } from "next/image";
import illustrationJuridique from "@/assets/images/illustration-juridique.webp";
import illustrationCommunautaire from "@/assets/images/illustration-communautaire.webp";
import illustrationSimultanee from "@/assets/images/illustration-simultanee.webp";
import illustrationChuchotee from "@/assets/images/illustration-chuchotee.webp";
import illustrationConsecutive from "@/assets/images/illustration-consecutive.webp";
import illustrationTraduction from "@/assets/images/illustration-traduction.webp";
import type { ServiceName } from "./service-names";

export type Service = {
  slug: string;
  title: ServiceName;
  summary: string;
  audience: { label: string; text: string };
  benefit: { label: string; paragraphs: string[] };
  cta: string;
  illustration: StaticImageData;
};

export const SERVICES: Service[] = [
  {
    slug: "interpretariat-juridique",
    title: "Interprétariat juridique",
    summary:
      "Vous êtes compris avec exactitude lors d’une audition, d’une procédure judiciaire ou d’un rendez-vous avec un avocat.",
    audience: {
      label: "À qui s’adresse ce service",
      text: "Avocats, études d’avocats, tribunaux, administrations.",
    },
    benefit: {
      label: "Ce que cela vous apporte",
      paragraphs: [
        "Une communication exacte lors d’auditions, de procédures judiciaires ou de rendez-vous avec un avocat.",
        "Sans risque de mauvaise interprétation d’un terme juridique.",
      ],
    },
    cta: "Sécuriser mon échange",
    illustration: illustrationJuridique,
  },
  {
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
    illustration: illustrationCommunautaire,
  },
  {
    slug: "interpretation-simultanee",
    title: "Interprétation simultanée",
    summary:
      "Une communication fluide et immédiate, sans interruption, pour les échanges à rythme soutenu.",
    audience: {
      label: "Idéal pour",
      text: "Les conférences, réunions à plusieurs intervenants, contextes à rythme soutenu.",
    },
    benefit: {
      label: "L’avantage",
      paragraphs: ["La communication continue sans interruption, même à débit rapide."],
    },
    cta: "Préparer ma conférence",
    illustration: illustrationSimultanee,
  },
  {
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
    illustration: illustrationChuchotee,
  },
  {
    slug: "interpretation-consecutive",
    title: "Interprétation consécutive",
    summary:
      "Une restitution précise et structurée, adaptée aux entretiens, auditions et réunions formelles.",
    audience: {
      label: "Adapté pour",
      text: "Les entretiens, auditions, réunions formelles.",
    },
    benefit: {
      label: "Ce qui est résolu",
      paragraphs: [
        "Chaque intervention est restituée intégralement, avec structure et précision, après chaque prise de parole.",
      ],
    },
    cta: "Préparer mon entretien",
    illustration: illustrationConsecutive,
  },
  {
    slug: "traduction-documents-juridiques-administratifs",
    title: "Traduction de documents juridiques et administratifs",
    summary:
      "Vos documents sont transposés avec la rigueur et le vocabulaire exacts qu’exige leur usage officiel.",
    audience: {
      label: "Public concerné",
      text: "Particuliers, entreprises, études d’avocats, institutions.",
    },
    benefit: {
      label: "Résultat obtenu",
      paragraphs: [
        "Vos documents officiels sont transposés avec la terminologie exacte requise pour un usage juridique ou administratif.",
      ],
    },
    cta: "Traduire mon document",
    illustration: illustrationTraduction,
  },
];
