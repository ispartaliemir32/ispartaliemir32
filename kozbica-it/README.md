# Kozbica IT: website

Statische website (Next.js, Tailwind). Na de build is het gewoon een map met bestanden (`out/`), die je bij **elke webhost** kunt neerzetten. Er is geen server, database of formulier nodig: contact loopt via e-mail en telefoon.

Bedrijfsgegevens (e-mail, telefoon, KvK-nummer) staan op één plek: `src/config/site.ts`.

## Live zetten bij STRATO (of een andere webhost): geen programmeerwerk

1. Pak **`kozbica-it-upload.zip`** uit op je computer.
2. Open in je STRATO-klantenmenu je webruimte (bestandsbeheer of SFTP, bijvoorbeeld met FileZilla). Zet **alles uit de uitgepakte map** in de hoofdmap van je domein `kozbica.nl`. Je ziet dan `index.html`, `.htaccess` en mappen als `diensten` direct in die hoofdmap.
   - `.htaccess` is een verborgen bestand. Zorg dat je programma verborgen bestanden toont en dat het mee is geüpload. Daarin staat de verplichte HTTPS-doorverwijzing en de beveiliging.
3. Zet in STRATO **SSL** aan voor het domein (staat bij jou al op "geactiveerd").
4. Open `https://kozbica.nl` en klik de pagina's door.

Heeft je pakket geen Apache/`.htaccess`? Dan werkt de site nog steeds. Alleen de extra beveiligingsheaders en de HTTPS-doorverwijzing ontbreken dan; stel die in via je hostingpaneel.

## Aanpassen en opnieuw live zetten

Nodig: [Node.js](https://nodejs.org) 22 of nieuwer.

```bash
npm ci            # eenmalig: onderdelen installeren
npm run dev       # bekijk de site op http://localhost:3000 terwijl je aanpast
npm run check     # controle: lint + types + build + inhoudscontrole
npm run zip       # maakt kozbica-it-upload.zip, klaar om te uploaden
```

Teksten staan in `src/content/` (diensten, tarieven, veelgestelde vragen) en in `src/app/*/page.tsx`.
Het KvK-nummer vul je in bij `kvk` in `src/config/site.ts`; de placeholder verdwijnt dan overal.

`npm run build` controleert automatisch: geen kapotte links, geen externe scripts, en geen vermelding van zaken die je niet aanbiedt (ontwikkeling, hosting, cloud, hardware, ISO/NIS2, 24/7, enzovoort). Bij een fout stopt de build.

## Alternatief: Cloudflare (gratis)

Upload de inhoud van `out/` via *Workers & Pages* in het Cloudflare-dashboard, of koppel de Git-repository (build command `npm run build`, deploy command `npx wrangler deploy`; configuratie staat in `wrangler.jsonc`). Het domein blijft dan wel via Cloudflare-nameservers lopen. Voor STRATO is dat niet nodig.

## Logo en huisstijl

Het officiële logo staat in `brand/`. `npm run brand` maakt daar alle logobestanden en favicons van.

## Privacy

De site plaatst geen cookies, gebruikt geen analyse of tracking en laadt niets van andere partijen. De privacyverklaring (`/privacy/`) is een eenvoudige tekst voor deze situatie. Laat hem eenmalig nalopen als je een vennootschap start of dienstverlening uitbreidt.
