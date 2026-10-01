# NBK Interprétation & Traduction Juridique

Site vitrine de Noelia Krähenbühl, interprète et traductrice français ⇄ espagnol (canton de Vaud).
Pages : accueil, services, contact, mentions légales, protection des données.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 3.4, tokens de design en variables CSS (`styles/globals.css`)
- React Hook Form + Zod, Nodemailer (SMTP) pour le formulaire
- Playwright + axe-core pour la QA visuelle et l'accessibilité

## Commandes

```bash
npm install
npm run dev          # développement (localhost:3000)
npm run build        # build de production
npm run start        # serveur de production
npm run lint
npm run typecheck
npm run assets       # régénère les images depuis design/source
npm run qa           # QA sur un serveur lancé avec `npx next start -p 3100`
```

## Formulaire de contact

Renseigner le SMTP de info@nbk-interp.ch dans `.env.local` (ou dans les variables Vercel) :

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="NBK Interprétation <info@nbk-interp.ch>"
SMTP_TO=info@nbk-interp.ch
```

Sans configuration, en production, le formulaire affiche un message invitant à écrire ou appeler
directement.

## Design

Maquettes Figma « NBK website ». Couleurs : rouge `#B01829`, noir `#1D1D1B`, blanc `#FEFDFD`.
Polices : Inter (texte) et Source Sans 3 (titres), échelle typographique de ratio 1,333.
Voir `CLAUDE.md` pour l'architecture et les décisions de contenu à valider.
