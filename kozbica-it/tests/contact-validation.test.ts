import { describe, expect, it } from "vitest";
import { cleanMultiLine, cleanSingleLine, validateContact } from "../src/lib/contact";

const valid = {
  name: "Jan de Vries",
  company: "De Vries Advies B.V.",
  email: "Jan@DeVriesAdvies.nl",
  phone: "+31 10 123 4567",
  employees: "11-20",
  service: "microsoft-365",
  message: "Wij zoeken iemand die ons Microsoft 365 en onze laptops beheert.",
  consent: true,
};

describe("validateContact", () => {
  it("accepteert een geldige aanvraag en normaliseert waarden", () => {
    const result = validateContact({ ...valid, name: "  Jan   de Vries " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Jan de Vries");
      expect(result.data.email).toBe("jan@devriesadvies.nl");
    }
  });

  it("accepteert optionele velden als ze leeg zijn", () => {
    expect(validateContact({ ...valid, phone: "", employees: "" }).ok).toBe(true);
  });

  it("geeft per veld een Nederlandstalige foutmelding", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["company", "consent", "email", "message", "name", "service"]);
      expect(result.errors.email).toMatch(/e-mailadres/);
    }
  });

  it.each([
    ["geen-apenstaartje.nl"],
    ["naam@domein"],
    ["naam@@domein.nl"],
    ["naam <x>@domein.nl"],
    [`${"a".repeat(250)}@domein.nl`],
  ])("weigert ongeldig e-mailadres %s", (email) => {
    const result = validateContact({ ...valid, email });
    expect(result.ok).toBe(false);
  });

  it("weigert diensten en bedrijfsgroottes die niet in de lijst staan", () => {
    const result = validateContact({ ...valid, service: "hacken", employees: "1000" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.service).toBeDefined();
      expect(result.errors.employees).toBeDefined();
    }
  });

  it("weigert berichten met te veel links (spam)", () => {
    const message = "Zie https://a.example https://b.example https://c.example en www.d.example";
    const result = validateContact({ ...valid, message });
    expect(result.ok).toBe(false);
  });

  it("vereist expliciet consent === true", () => {
    expect(validateContact({ ...valid, consent: "true" }).ok).toBe(false);
  });

  it("weigert een ongeldig telefoonnummer", () => {
    expect(validateContact({ ...valid, phone: "bel me" }).ok).toBe(false);
  });

  it("negeert niet-string invoer veilig", () => {
    const result = validateContact({ ...valid, name: { $gt: "" }, message: ["x"] });
    expect(result.ok).toBe(false);
  });
});

describe("opschonen van invoer", () => {
  it("verwijdert regeleinden uit eenregelige velden (header-injectie)", () => {
    expect(cleanSingleLine("Jan\r\nBcc: spam@example.com")).toBe("Jan Bcc: spam@example.com");
  });

  it("verwijdert stuurtekens en onzichtbare richtingstekens", () => {
    expect(cleanSingleLine("Jan\u0000‮de Vries")).toBe("Jande Vries");
  });

  it("behoudt alinea's in berichten maar beperkt lege regels", () => {
    expect(cleanMultiLine("Regel 1\r\n\r\n\r\n\r\nRegel 2  \nRegel 3")).toBe("Regel 1\n\nRegel 2\nRegel 3");
  });
});
