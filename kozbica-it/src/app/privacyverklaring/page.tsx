import { LegalDocument, Review, type TocItem } from "@/components/legal/LegalDocument";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacyverklaring",
  description:
    "Lees hoe Kozbica IT omgaat met persoonsgegevens: welke gegevens we verwerken, waarom, hoe lang we ze bewaren en welke rechten u heeft.",
  path: "/privacyverklaring",
});

const toc: TocItem[] = [
  { id: "wie-wij-zijn", title: "Wie wij zijn" },
  { id: "reikwijdte", title: "Op wie deze verklaring van toepassing is" },
  { id: "gegevens", title: "Welke gegevens wij verwerken" },
  { id: "doelen", title: "Doelen en grondslagen" },
  { id: "bewaartermijnen", title: "Bewaartermijnen" },
  { id: "derden", title: "Verwerkers en derden" },
  { id: "doorgifte", title: "Doorgifte buiten de EER" },
  { id: "beveiliging", title: "Beveiliging" },
  { id: "cookies", title: "Cookies en analyse" },
  { id: "rechten", title: "Uw rechten" },
  { id: "klachten", title: "Klachten" },
  { id: "wijzigingen", title: "Wijzigingen" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPage() {
  const draft = site.legal.privacyIsDraft;
  const { email, address, kvk, phone } = site.contact;

  return (
    <LegalDocument
      title="Privacyverklaring"
      intro="Wij gaan zorgvuldig om met uw persoonsgegevens. In deze verklaring leest u welke gegevens wij verwerken, waarom we dat doen en welke rechten u heeft."
      path="/privacyverklaring"
      draft={draft}
      lastUpdated={site.legal.lastUpdated}
      toc={toc}
      draftText={
        <p>
          Deze privacyverklaring is een zorgvuldig opgesteld concept voor een B2B IT-dienstverlener, maar is nog niet
          beoordeeld door een jurist of privacyspecialist. Onderdelen die specifiek gecontroleerd of aangevuld moeten
          worden, zijn gemarkeerd met “Juridisch controleren”. Waarden tussen [blokhaken] moeten nog worden ingevuld.
        </p>
      }
    >
      <h2 id="wie-wij-zijn">1. Wie wij zijn</h2>
      <p>
        Kozbica IT (“wij”, “ons”) is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze
        privacyverklaring (verwerkingsverantwoordelijke in de zin van de Algemene verordening gegevensbescherming,
        AVG).
      </p>
      <table>
        <tbody>
          <tr>
            <th scope="row">Naam</th>
            <td>{site.legalName}</td>
          </tr>
          <tr>
            <th scope="row">Vestigingsadres</th>
            <td>{address}, Rotterdam</td>
          </tr>
          <tr>
            <th scope="row">KvK-nummer</th>
            <td>{kvk}</td>
          </tr>
          <tr>
            <th scope="row">E-mail</th>
            <td>{email}</td>
          </tr>
          <tr>
            <th scope="row">Telefoon</th>
            <td>{phone}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <Review draft={draft}>rechtsvorm en volledige gegevens van de verantwoordelijke aanvullen</Review>
      </p>

      <h2 id="reikwijdte">2. Op wie deze verklaring van toepassing is</h2>
      <p>Deze privacyverklaring is van toepassing op:</p>
      <ul>
        <li>bezoekers van deze website;</li>
        <li>personen die contact met ons opnemen via het contactformulier, e-mail of telefoon;</li>
        <li>contactpersonen van (potentiële) klanten, leveranciers en zakelijke relaties.</li>
      </ul>
      <p>
        Bij het beheren van de IT-omgeving van een klant verwerken wij soms persoonsgegevens <em>in opdracht van</em> die
        klant (bijvoorbeeld gegevens van medewerkers in Microsoft 365). In dat geval zijn wij verwerker en is de klant
        verwerkingsverantwoordelijke. Die verwerking regelen we in een verwerkersovereenkomst met de klant en valt niet
        onder deze privacyverklaring.
      </p>
      <p>
        <Review draft={draft}>rolverdeling verantwoordelijke/verwerker afstemmen op uw dienstverlening</Review>
      </p>

      <h2 id="gegevens">3. Welke gegevens wij verwerken</h2>
      <h3>Contactformulier</h3>
      <p>
        Naam, bedrijfsnaam, zakelijk e-mailadres, telefoonnummer (optioneel), aantal medewerkers (optioneel), de dienst
        waarin u interesse heeft, de inhoud van uw bericht en uw akkoordverklaring.
      </p>
      <h3>Technische gegevens bij het versturen van het formulier</h3>
      <p>
        Uw IP-adres wordt kortstondig gebruikt om misbruik te beperken (rate limiting). Cloudflare Turnstile verwerkt
        technische kenmerken van uw browser en apparaat om vast te stellen dat het formulier door een mens wordt
        ingevuld.
      </p>
      <h3>Contact per e-mail of telefoon</h3>
      <p>De gegevens die u zelf met ons deelt, zoals uw naam, contactgegevens en de inhoud van het gesprek of bericht.</p>
      <h3>Klantrelatie</h3>
      <p>
        Naam, functie en zakelijke contactgegevens van contactpersonen, factuur- en betalingsgegevens, gemaakte afspraken
        en correspondentie.
      </p>
      <h3>Websitebezoek</h3>
      <p>
        Onze hostingpartij Cloudflare verwerkt technische gegevens zoals IP-adres, browsertype en het tijdstip van het
        verzoek om de website te kunnen tonen en te beveiligen. Wij gebruiken geen analysediensten en geen tracking- of
        advertentiecookies.
      </p>
      <p>
        Wij vragen niet om bijzondere persoonsgegevens (zoals gezondheidsgegevens). Vermeld deze ook niet in het
        contactformulier.
      </p>

      <h2 id="doelen">4. Doelen en grondslagen</h2>
      <p>Wij verwerken persoonsgegevens alleen voor de volgende doelen, op basis van de genoemde grondslag (artikel 6 AVG):</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Doel</th>
            <th scope="col">Grondslag</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Beantwoorden van uw vraag of aanvraag en het plannen van een kennismaking</td>
            <td>
              Maatregelen op uw verzoek vóór het sluiten van een overeenkomst (art. 6 lid 1 sub b) en ons gerechtvaardigd
              belang om zakelijke vragen te beantwoorden (sub f)
            </td>
          </tr>
          <tr>
            <td>Beveiligen van de website en voorkomen van spam en misbruik</td>
            <td>Gerechtvaardigd belang (sub f)</td>
          </tr>
          <tr>
            <td>Uitvoeren van een overeenkomst, waaronder dienstverlening, communicatie en facturatie</td>
            <td>Uitvoering van een overeenkomst (sub b)</td>
          </tr>
          <tr>
            <td>Voldoen aan wettelijke verplichtingen, zoals de fiscale bewaarplicht</td>
            <td>Wettelijke verplichting (sub c)</td>
          </tr>
        </tbody>
      </table>
      <p>
        In het contactformulier bevestigt u dat u akkoord gaat met de verwerking van uw gegevens voor het behandelen van
        uw aanvraag.{" "}
        <Review draft={draft}>bepalen of toestemming (sub a) of sub b/f de leidende grondslag is, en de tekst bij het selectievakje daarop afstemmen</Review>
      </p>
      <p>
        Wij nemen geen besluiten die uitsluitend berusten op geautomatiseerde verwerking en die voor u rechtsgevolgen of
        vergelijkbare gevolgen hebben. Turnstile beoordeelt automatisch of een formulier door een mens wordt ingevuld;
        lukt die controle niet, dan kunt u ons altijd per e-mail bereiken.
      </p>

      <h2 id="bewaartermijnen">5. Bewaartermijnen</h2>
      <p>Wij bewaren persoonsgegevens niet langer dan nodig voor het doel waarvoor ze zijn verzameld:</p>
      <ul>
        <li>contactaanvragen die niet tot een samenwerking leiden: tot 12 maanden na het laatste contact;</li>
        <li>gegevens van klanten en contactpersonen: gedurende de overeenkomst en tot 2 jaar daarna;</li>
        <li>financiële administratie (zoals facturen): 7 jaar, vanwege de fiscale bewaarplicht;</li>
        <li>
          technische gegevens voor beveiliging en rate limiting: kortstondig. Onze eigen technische logbestanden bevatten
          geen formulierinhoud en geen IP-adressen.
        </li>
      </ul>
      <p>
        <Review draft={draft}>bewaartermijnen bevestigen en afstemmen op uw werkwijze</Review>
      </p>

      <h2 id="derden">6. Verwerkers en derden</h2>
      <p>
        Wij verkopen uw gegevens niet en delen ze niet voor marketingdoeleinden. Voor onze dienstverlening maken wij
        gebruik van de volgende verwerkers, met wie wij (waar vereist) een verwerkersovereenkomst hebben:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong>: hosting van de website, beveiliging en Cloudflare Turnstile.
        </li>
        <li>
          <strong>E-maildienst voor formulierberichten</strong>: [Cloudflare Email Service / Microsoft 365 / Resend,
          afhankelijk van de gekozen configuratie].
        </li>
        <li>
          <strong>Microsoft (Microsoft 365)</strong>: zakelijke e-mail, agenda en documenten.
        </li>
        <li>
          <strong>Boekhoudsoftware</strong>: [naam leverancier].
        </li>
      </ul>
      <p>
        Daarnaast kunnen wij gegevens verstrekken als dat wettelijk verplicht is, bijvoorbeeld aan de Belastingdienst.
      </p>
      <p>
        <Review draft={draft}>lijst van verwerkers volledig maken en verwerkersovereenkomsten controleren</Review>
      </p>

      <h2 id="doorgifte">7. Doorgifte buiten de Europese Economische Ruimte</h2>
      <p>
        Sommige verwerkers, zoals Cloudflare en Microsoft, zijn internationale bedrijven. Waar persoonsgegevens buiten de
        Europese Economische Ruimte worden verwerkt, gebeurt dat op basis van passende waarborgen, zoals het EU-VS Data
        Privacy Framework of door de Europese Commissie goedgekeurde standaardcontractbepalingen.
      </p>
      <p>
        <Review draft={draft}>per verwerker de actuele doorgiftegrondslag controleren</Review>
      </p>

      <h2 id="beveiliging">8. Beveiliging</h2>
      <p>Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen, waaronder:</p>
      <ul>
        <li>een versleutelde verbinding (HTTPS) voor de gehele website;</li>
        <li>bescherming van het contactformulier met Cloudflare Turnstile, server-side controles en rate limiting;</li>
        <li>
          formuliergegevens worden niet in een database op de website opgeslagen, maar alleen doorgestuurd naar onze
          zakelijke mailbox;
        </li>
        <li>toegang tot onze zakelijke systemen is beveiligd met meervoudige verificatie (MFA) en beperkt tot wie dat nodig heeft.</li>
      </ul>
      <p>
        Bij een datalek handelen wij volgens de AVG, inclusief een melding aan de Autoriteit Persoonsgegevens en aan
        betrokkenen waar dat verplicht is.
      </p>
      <p>
        <Review draft={draft}>controleren of deze maatregelen overeenkomen met uw werkelijke situatie</Review>
      </p>

      <h2 id="cookies">9. Cookies en analyse</h2>
      <p>
        Deze website plaatst zelf geen cookies voor analyse, tracking of advertenties en gebruikt geen
        analysediensten. Voor de beveiliging van het contactformulier gebruikt Cloudflare Turnstile technieken om vast
        te stellen dat u een mens bent; daarbij kunnen technisch noodzakelijke gegevens worden verwerkt.
      </p>
      <p>
        <Review draft={draft}>opnieuw beoordelen als u later analysesoftware of extra Cloudflare-functies inschakelt</Review>
      </p>

      <h2 id="rechten">10. Uw rechten</h2>
      <p>U heeft op grond van de AVG de volgende rechten:</p>
      <ul>
        <li>recht op inzage in de persoonsgegevens die wij van u verwerken;</li>
        <li>recht op rectificatie (correctie) van onjuiste gegevens;</li>
        <li>recht op verwijdering van uw gegevens;</li>
        <li>recht op beperking van de verwerking;</li>
        <li>recht op overdraagbaarheid van uw gegevens;</li>
        <li>recht van bezwaar tegen verwerking op basis van gerechtvaardigd belang;</li>
        <li>recht om gegeven toestemming in te trekken, zonder dat dit afbreuk doet aan eerdere verwerking.</li>
      </ul>
      <p>
        U kunt een verzoek sturen naar {email}. Wij reageren binnen één maand. Bij complexe verzoeken kan deze termijn
        met twee maanden worden verlengd; dat laten wij u dan tijdig weten. Om misbruik te voorkomen, kunnen wij u vragen
        uw identiteit te bevestigen.
      </p>

      <h2 id="klachten">11. Klachten</h2>
      <p>
        Heeft u een klacht over hoe wij met uw gegevens omgaan? Neem dan eerst contact met ons op, dan zoeken we samen
        naar een oplossing. U heeft daarnaast altijd het recht een klacht in te dienen bij de{" "}
        <a href="https://www.autoriteitpersoonsgegevens.nl" rel="noopener noreferrer">
          Autoriteit Persoonsgegevens
        </a>
        .
      </p>

      <h2 id="wijzigingen">12. Wijzigingen</h2>
      <p>
        Wij kunnen deze privacyverklaring aanpassen, bijvoorbeeld bij nieuwe diensten of gewijzigde wetgeving. De meest
        actuele versie staat altijd op deze pagina.
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>
        Vragen over deze privacyverklaring of over uw gegevens? Neem contact op via {email} of schrijf naar {site.legalName},{" "}
        {address}, Rotterdam.
      </p>
    </LegalDocument>
  );
}
