export const SERVICE_NAMES = [
  "Interprétariat juridique",
  "Interprétariat communautaire et médico-social",
  "Interprétation simultanée",
  "Interprétation chuchotée",
  "Interprétation consécutive",
  "Traduction de documents juridiques et administratifs",
] as const;

export type ServiceName = (typeof SERVICE_NAMES)[number];
