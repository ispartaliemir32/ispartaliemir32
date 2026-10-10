/**
 * Keuzelijsten voor het contactformulier. Bewust zonder React/iconen, zodat
 * de Worker dit bestand kan importeren voor server-side validatie.
 */

export const SERVICE_OPTIONS = [
  { value: "it-beheer", label: "IT-beheer & systeembeheer" },
  { value: "microsoft-365", label: "Microsoft 365 beheer" },
  { value: "cloud-azure", label: "Cloudoplossingen & Azure" },
  { value: "cybersecurity", label: "Cybersecurity & endpointbeveiliging" },
  { value: "werkplekbeheer", label: "Werkplekbeheer & apparaatbeheer" },
  { value: "it-support", label: "IT-support & troubleshooting" },
  { value: "it-advies", label: "IT-advies & automatisering" },
  { value: "anders", label: "Anders / weet ik nog niet" },
] as const;

export type ServiceOptionValue = (typeof SERVICE_OPTIONS)[number]["value"];

export const EMPLOYEE_OPTIONS = [
  { value: "1-4", label: "1 – 4 medewerkers" },
  { value: "5-10", label: "5 – 10 medewerkers" },
  { value: "11-20", label: "11 – 20 medewerkers" },
  { value: "21-30", label: "21 – 30 medewerkers" },
  { value: "30+", label: "Meer dan 30 medewerkers" },
] as const;

export type EmployeeOptionValue = (typeof EMPLOYEE_OPTIONS)[number]["value"];

export function serviceLabel(value: string): string {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function employeeLabel(value: string): string {
  return EMPLOYEE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
