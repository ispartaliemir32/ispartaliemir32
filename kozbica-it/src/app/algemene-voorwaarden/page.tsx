import Link from "next/link";
import { LegalDocument, Review, type TocItem } from "@/components/legal/LegalDocument";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Algemene voorwaarden (concept)",
  description: "Conceptversie van de algemene voorwaarden van Kozbica IT voor zakelijke IT-dienstverlening.",
  path: "/algemene-voorwaarden",
  // Zolang dit een concept is, niet laten indexeren door zoekmachines.
  noIndex: site.legal.termsIsDraft,
});

const toc: TocItem[] = [
  { id: "artikel-1", title: "Definities" },
  { id: "artikel-2", title: "Toepasselijkheid" },
  { id: "artikel-3", title: "Offertes en totstandkoming" },
  { id: "artikel-4", title: "Omvang van de dienstverlening" },
  { id: "artikel-5", title: "Verplichtingen van de opdrachtgever" },
  { id: "artikel-6", title: "Beschikbaarheid en onderhoud" },
  { id: "artikel-7", title: "Producten en diensten van derden" },
  { id: "artikel-8", title: "Prijzen en betaling" },
  { id: "artikel-9", title: "Aansprakelijkheid" },
  { id: "artikel-10", title: "Gegevensbescherming" },
  { id: "artikel-11", title: "Geheimhouding" },
  { id: "artikel-12", title: "Intellectueel eigendom" },
  { id: "artikel-13", title: "Overmacht" },
  { id: "artikel-14", title: "Duur en beëindiging" },
  { id: "artikel-15", title: "Overdracht bij beëindiging" },
  { id: "artikel-16", title: "Toepasselijk recht en geschillen" },
];

export default function AlgemeneVoorwaardenPage() {
  const draft = site.legal.termsIsDraft;

  return (
    <LegalDocument
      title="Algemene voorwaarden"
      intro="Deze voorwaarden beschrijven de afspraken die gelden voor de IT-dienstverlening van Kozbica IT aan zakelijke opdrachtgevers."
      path="/algemene-voorwaarden"
      draft={draft}
      lastUpdated={site.legal.lastUpdated}
      toc={toc}
      draftText={
        <>
          <p>
            Dit is een <strong>conceptstructuur</strong> en nog <strong>niet van toepassing</strong> op overeenkomsten.
            De tekst is niet juridisch getoetst en mag niet worden gebruikt voordat een jurist deze heeft beoordeeld en
            aangevuld. Waarden tussen [blokhaken] zijn nog niet vastgesteld.
          </p>
          <p className="mt-2">
            Heeft u een vraag over de voorwaarden? <Link href="/contact" className="font-semibold underline">Neem contact op</Link>.
          </p>
        </>
      }
    >
      <h2 id="artikel-1">Artikel 1. Definities</h2>
      <ol>
        <li>
          <strong>Kozbica IT</strong>: de onderneming Kozbica IT, gevestigd te Rotterdam, ingeschreven bij de Kamer van
          Koophandel onder nummer {site.contact.kvk}.
        </li>
        <li>
          <strong>Opdrachtgever</strong>: de natuurlijke persoon handelend in de uitoefening van een beroep of bedrijf,
          of de rechtspersoon, met wie Kozbica IT een overeenkomst sluit.
        </li>
        <li>
          <strong>Overeenkomst</strong>: iedere afspraak tussen Kozbica IT en opdrachtgever over het leveren van
          diensten, inclusief het voorstel of de offerte en deze voorwaarden.
        </li>
        <li>
          <strong>Diensten</strong>: alle werkzaamheden van Kozbica IT, waaronder IT-beheer, IT-support, advies,
          projecten en werkzaamheden binnen een beheerpakket.
        </li>
        <li>
          <strong>Producten van derden</strong>: software, licenties (zoals Microsoft 365), clouddiensten, hardware en
          andere producten of diensten die door derden worden geleverd.
        </li>
      </ol>

      <h2 id="artikel-2">Artikel 2. Toepasselijkheid</h2>
      <ol>
        <li>Deze voorwaarden zijn van toepassing op alle voorstellen, offertes en overeenkomsten van Kozbica IT.</li>
        <li>Kozbica IT levert uitsluitend aan zakelijke opdrachtgevers; deze voorwaarden zijn niet bedoeld voor consumenten.</li>
        <li>Afwijkingen gelden alleen als deze schriftelijk (waaronder per e-mail) zijn overeengekomen.</li>
        <li>De toepasselijkheid van inkoop- of andere voorwaarden van opdrachtgever wordt uitdrukkelijk van de hand gewezen.</li>
      </ol>
      <p>
        <Review draft={draft}>wijze van terhandstelling van de voorwaarden vastleggen</Review>
      </p>

      <h2 id="artikel-3">Artikel 3. Offertes en totstandkoming</h2>
      <ol>
        <li>Voorstellen en offertes zijn vrijblijvend en [30] dagen geldig, tenzij anders vermeld.</li>
        <li>
          Een overeenkomst komt tot stand door schriftelijke aanvaarding van het voorstel door opdrachtgever, of doordat
          Kozbica IT met instemming van opdrachtgever met de uitvoering begint.
        </li>
      </ol>

      <h2 id="artikel-4">Artikel 4. Omvang van de dienstverlening</h2>
      <ol>
        <li>De inhoud en omvang van de diensten staan in het voorstel of de offerte en de bijbehorende pakketomschrijving.</li>
        <li>
          Kozbica IT voert de diensten naar beste inzicht en vermogen uit en volgens de eisen van goed vakmanschap. Op
          Kozbica IT rust een inspanningsverplichting, tenzij uitdrukkelijk schriftelijk een resultaat is toegezegd.
        </li>
        <li>
          Werkzaamheden buiten de afgesproken omvang (meerwerk) worden vooraf met opdrachtgever afgestemd en tegen de
          dan geldende tarieven gefactureerd.
        </li>
      </ol>

      <h2 id="artikel-5">Artikel 5. Verplichtingen van de opdrachtgever</h2>
      <ol>
        <li>
          Opdrachtgever verstrekt tijdig alle informatie, toegang en medewerking die Kozbica IT redelijkerwijs nodig heeft
          voor de uitvoering van de diensten.
        </li>
        <li>Opdrachtgever wijst een vaste contactpersoon aan.</li>
        <li>
          Opdrachtgever zorgt voor geldige licenties voor de gebruikte software en voor het naleven van de
          gebruiksvoorwaarden van leveranciers.
        </li>
        <li>
          Opdrachtgever blijft verantwoordelijk voor zijn eigen gegevens en het maken van back-ups daarvan, tenzij
          back-upbeheer uitdrukkelijk onderdeel van de overeenkomst is.
        </li>
        <li>
          Opdrachtgever wijzigt geen instellingen of configuraties die Kozbica IT beheert zonder voorafgaand overleg, en
          volgt redelijke beveiligingsadviezen van Kozbica IT op.
        </li>
      </ol>

      <h2 id="artikel-6">Artikel 6. Beschikbaarheid, onderhoud en reactietijden</h2>
      <ol>
        <li>
          Kozbica IT garandeert geen ononderbroken beschikbaarheid van systemen en geen vaste reactie- of oplostijden,
          tenzij deze uitdrukkelijk schriftelijk zijn overeengekomen in een servicebeschrijving of SLA.
        </li>
        <li>
          Onderhoud en updates kunnen tijdelijke onbeschikbaarheid veroorzaken. Kozbica IT stemt gepland onderhoud zo
          veel mogelijk vooraf af.
        </li>
        <li>
          Kozbica IT is niet verantwoordelijk voor storingen in diensten van derden, zoals Microsoft 365, cloudplatformen
          of internetverbindingen.
        </li>
      </ol>

      <h2 id="artikel-7">Artikel 7. Producten en diensten van derden</h2>
      <ol>
        <li>
          Op producten van derden zijn de voorwaarden van de betreffende leverancier van toepassing. Kozbica IT staat niet
          in voor de werking of beschikbaarheid daarvan.
        </li>
        <li>
          Licenties en hardware vallen niet onder de beheerpakketten en worden apart gefactureerd of rechtstreeks door de
          leverancier aan opdrachtgever in rekening gebracht.
        </li>
      </ol>

      <h2 id="artikel-8">Artikel 8. Prijzen en betaling</h2>
      <ol>
        <li>Alle prijzen zijn in euro’s en exclusief btw, tenzij anders vermeld.</li>
        <li>Periodieke vergoedingen voor beheerpakketten worden [maandelijks / per kwartaal] vooraf gefactureerd.</li>
        <li>Facturen worden binnen [14] dagen na factuurdatum betaald.</li>
        <li>
          Bij niet-tijdige betaling is opdrachtgever na een betalingsherinnering de wettelijke handelsrente en
          buitengerechtelijke incassokosten verschuldigd. Kozbica IT mag de dienstverlening opschorten zolang een
          opeisbare factuur onbetaald blijft.
        </li>
        <li>Kozbica IT mag tarieven jaarlijks aanpassen; opdrachtgever wordt hierover [1] maand vooraf geïnformeerd.</li>
      </ol>
      <p>
        <Review draft={draft}>betaaltermijn, facturatiefrequentie en indexeringsregeling vaststellen</Review>
      </p>

      <h2 id="artikel-9">Artikel 9. Aansprakelijkheid</h2>
      <ol>
        <li>
          De aansprakelijkheid van Kozbica IT is beperkt tot vergoeding van directe schade en tot maximaal het bedrag dat
          in de [6 / 12] maanden voorafgaand aan de schadeveroorzakende gebeurtenis voor de betreffende dienst is
          gefactureerd, en in ieder geval tot het bedrag dat de aansprakelijkheidsverzekering van Kozbica IT uitkeert.
        </li>
        <li>
          Kozbica IT is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste
          besparingen, bedrijfsstagnatie en verlies of beschadiging van gegevens.
        </li>
        <li>
          De beperkingen in dit artikel gelden niet bij opzet of bewuste roekeloosheid van Kozbica IT of haar
          leidinggevenden.
        </li>
        <li>Een vordering tot schadevergoeding moet binnen [12] maanden na het ontstaan ervan schriftelijk worden gemeld.</li>
      </ol>
      <p>
        <Review draft={draft}>
          aansprakelijkheidsbeperking laten toetsen en afstemmen op uw beroeps- en bedrijfsaansprakelijkheidsverzekering
        </Review>
      </p>

      <h2 id="artikel-10">Artikel 10. Gegevensbescherming</h2>
      <ol>
        <li>Beide partijen houden zich aan de Algemene verordening gegevensbescherming (AVG).</li>
        <li>
          Voor zover Kozbica IT bij de uitvoering persoonsgegevens verwerkt in opdracht van opdrachtgever, sluiten partijen
          een verwerkersovereenkomst. Bij strijdigheid gaat de verwerkersovereenkomst voor.
        </li>
        <li>
          Meer informatie over hoe Kozbica IT zelf met persoonsgegevens omgaat, staat in de{" "}
          <Link href="/privacyverklaring">privacyverklaring</Link>.
        </li>
      </ol>
      <p>
        <Review draft={draft}>model verwerkersovereenkomst opstellen</Review>
      </p>

      <h2 id="artikel-11">Artikel 11. Geheimhouding</h2>
      <p>
        Partijen houden vertrouwelijke informatie die zij van elkaar ontvangen geheim, ook na het einde van de
        overeenkomst. Dit geldt in het bijzonder voor wachtwoorden, toegangsgegevens en bedrijfsinformatie van
        opdrachtgever waartoe Kozbica IT bij de uitvoering toegang krijgt.
      </p>

      <h2 id="artikel-12">Artikel 12. Intellectueel eigendom</h2>
      <ol>
        <li>
          Gegevens en documenten van opdrachtgever blijven eigendom van opdrachtgever, evenals de beheeraccounts van diens
          IT-omgeving.
        </li>
        <li>
          Intellectuele eigendomsrechten op door Kozbica IT ontwikkelde scripts, sjablonen en werkmethoden blijven bij
          Kozbica IT, tenzij schriftelijk anders overeengekomen. Opdrachtgever krijgt een niet-exclusief gebruiksrecht voor
          eigen bedrijfsdoeleinden.
        </li>
        <li>De documentatie van de IT-omgeving van opdrachtgever wordt bij beëindiging aan opdrachtgever overgedragen.</li>
      </ol>

      <h2 id="artikel-13">Artikel 13. Overmacht</h2>
      <p>
        Kozbica IT is niet gehouden tot nakoming van verplichtingen als zij daartoe verhinderd is door overmacht,
        waaronder storingen bij leveranciers of netwerken, cyberaanvallen ondanks redelijke beveiligingsmaatregelen,
        ziekte en overheidsmaatregelen. Duurt de overmacht langer dan [60] dagen, dan mogen beide partijen de
        overeenkomst schriftelijk beëindigen.
      </p>

      <h2 id="artikel-14">Artikel 14. Duur en beëindiging</h2>
      <ol>
        <li>De looptijd van een overeenkomst voor beheerpakketten staat in het voorstel en is [onbepaalde tijd / X maanden].</li>
        <li>Opzegging gebeurt schriftelijk met inachtneming van een opzegtermijn van [1 / 3] maanden.</li>
        <li>
          Elke partij mag de overeenkomst met onmiddellijke ingang beëindigen als de andere partij in staat van
          faillissement verkeert of surseance van betaling aanvraagt, of na een schriftelijke ingebrekestelling
          wezenlijk tekort blijft schieten.
        </li>
      </ol>
      <p>
        <Review draft={draft}>looptijd en opzegtermijn vaststellen</Review>
      </p>

      <h2 id="artikel-15">Artikel 15. Overdracht bij beëindiging</h2>
      <p>
        Bij het einde van de overeenkomst werkt Kozbica IT mee aan een zorgvuldige overdracht aan opdrachtgever of een
        door opdrachtgever aangewezen partij, waaronder het overdragen van beheertoegang en documentatie. Uitgebreide
        exitwerkzaamheden worden tegen de geldende tarieven uitgevoerd.
      </p>

      <h2 id="artikel-16">Artikel 16. Toepasselijk recht en geschillen</h2>
      <ol>
        <li>Op alle overeenkomsten met Kozbica IT is Nederlands recht van toepassing.</li>
        <li>
          Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Rotterdam, tenzij de wet dwingend
          anders voorschrijft.
        </li>
      </ol>
      <p>
        <Review draft={draft}>volledige tekst laten beoordelen; overweeg ook branchevoorwaarden</Review>
      </p>
    </LegalDocument>
  );
}
