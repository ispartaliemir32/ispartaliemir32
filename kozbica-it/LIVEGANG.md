# kozbica.nl live zetten: checklist

Situatie: domein **kozbica.nl** staat bij **STRATO**, de website draait gratis op **Cloudflare**, en nog geen zakelijke e-mail.
Suleyman (je IT-assistent) doet de code en de configuratie. Jij doet alleen de stappen waarvoor jouw login nodig is.

> **Nooit** wachtwoorden, API-sleutels of de Turnstile *secret key* in de chat zetten. Die plak je zelf in Cloudflare.
> De Turnstile **site key** is wel publiek en mag je doorsturen.

Stap 1, 2 en 3 kun je in willekeurige volgorde doen.

## Stap 1: GitHub-repo aanmaken (1 minuut)

1. Ga naar **github.com/new**.
2. Repository name: `kozbica-it-website` · kies **Private** · vink **niets** aan (geen README).
3. **Create repository** → laat het Suleyman weten. Hij zet de code erin.

## Stap 2: Turnstile, de spambeveiliging van het formulier (3 minuten)

1. **dash.cloudflare.com** → **Turnstile** → **Add widget**.
2. Naam: `Kozbica IT contactformulier` · Hostnames: `kozbica.nl` en `www.kozbica.nl` · Mode: **Managed** → **Create**.
3. Stuur de **Site key** naar Suleyman.
4. Kopieer de **Secret key** naar een veilige plek (bijv. je wachtwoordmanager). Die heb je nodig in stap 4.

## Stap 3: Domein naar Cloudflare (5 minuten + wachttijd)

1. Cloudflare → **Add a domain** → `kozbica.nl` → plan **Free** → doorklikken. Cloudflare toont **2 nameservers**.
2. **STRATO** → Domeinen → `kozbica.nl` → **DNS** → **NS-record** → kies eigen/externe nameservers → vul de 2 Cloudflare-nameservers in → opslaan.
3. Wacht op de e-mail van Cloudflare dat `kozbica.nl` **Active** is. Dat duurt meestal minuten, soms enkele uren.

Geeft STRATO de foutmelding dat de nameserver "niet verantwoordelijk" is? Controleer dan dat stap 3.1 klaar is en de namen exact kloppen. Lukt het dan nog niet, neem contact op met STRATO-support.

## Stap 4: Website koppelen (5 minuten, na stap 1 en nadat Suleyman de site key heeft verwerkt)

1. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → GitHub koppelen.
   Geef Cloudflare alleen toegang tot de repo `kozbica-it-website`.
2. Instellingen:
   - Project name: `kozbica-it`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
3. **Deploy**. Na de eerste build staat de site op een `…workers.dev`-adres.
4. **Settings → Variables and Secrets → Add** → type **Secret** → naam `TURNSTILE_SECRET_KEY` → plak de secret key → **Deploy**.

## Stap 5: E-mail voor het formulier (5 minuten, na stap 3)

Je hebt nog geen zakelijke mail. Cloudflare stuurt de aanvragen gratis door naar je persoonlijke adres.

1. Cloudflare → `kozbica.nl` → **Email** → **Email Routing** → inschakelen (Cloudflare maakt de DNS-records zelf aan).
2. **Destination addresses** → voeg je persoonlijke e-mailadres toe → klik op de bevestigingslink in je mail.
3. Optioneel: maak een regel `info@kozbica.nl` → je persoonlijke adres. Dan heb je gratis een zakelijk adres om mail op te ontvangen.

Neem je later Microsoft 365 voor kozbica.nl, dan past Suleyman de e-mailinstellingen aan.

## Stap 6: Domein aan de website hangen (3 minuten, na stap 3 en 4)

1. **Workers & Pages** → `kozbica-it` → **Settings** → **Domains & Routes** → **Add** → **Custom domain** → `kozbica.nl`. Daarna nog een keer voor `www.kozbica.nl`.
2. **Rules** → **Redirect Rules** → stuur `www.kozbica.nl` door naar `https://kozbica.nl` (Cloudflare heeft hiervoor een kant-en-klaar sjabloon).
3. **SSL/TLS** → **Edge Certificates** → **Always Use HTTPS**: aan.

## Stap 7: Laat het Suleyman weten

Suleyman zet dan het ontvangstadres en de beveiligingsinstellingen goed, controleert de live site en stuurt een testaanvraag.

---

**Daarna** gaat elke wijziging automatisch live: Suleyman past de code aan, Cloudflare bouwt en publiceert.
Nog te regelen, los van de techniek: KvK-nummer op de site (verplicht zodra je ingeschreven bent) en een jurist laten kijken naar de privacyverklaring en algemene voorwaarden.
