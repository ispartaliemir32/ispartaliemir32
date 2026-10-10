import type { ContactSubmission } from "../../src/lib/contact";
import { employeeLabel, serviceLabel } from "../../src/content/service-options";
import { headerSafe } from "./types";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Row = { label: string; value: string };

function rows(data: ContactSubmission): Row[] {
  return [
    { label: "Naam", value: data.name },
    { label: "Bedrijf", value: data.company },
    { label: "E-mail", value: data.email },
    { label: "Telefoon", value: data.phone || "Niet opgegeven" },
    { label: "Aantal medewerkers", value: data.employees ? employeeLabel(data.employees) : "Niet opgegeven" },
    { label: "Interesse", value: serviceLabel(data.service) },
  ];
}

export function buildContactEmail(data: ContactSubmission, meta: { receivedAt: Date; siteHost: string }) {
  const subject = headerSafe(`Nieuwe aanvraag via de website: ${data.company} (${serviceLabel(data.service)})`, 180);
  const when = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(meta.receivedAt);

  const text = [
    `Nieuwe aanvraag via ${meta.siteHost}`,
    `Ontvangen: ${when}`,
    "",
    ...rows(data).map((r) => `${r.label}: ${r.value}`),
    "",
    "Bericht:",
    data.message,
    "",
    "De afzender heeft toestemming gegeven voor het verwerken van deze gegevens om de aanvraag te behandelen.",
    "Beantwoorden? Gebruik 'Antwoorden': het antwoord gaat rechtstreeks naar de afzender.",
  ].join("\n");

  const tableRows = rows(data)
    .map(
      (r) =>
        `<tr><td style="padding:8px 12px;color:#4f6275;font-size:14px;white-space:nowrap;vertical-align:top">${escapeHtml(r.label)}</td>` +
        `<td style="padding:8px 12px;color:#142536;font-size:14px;font-weight:600">${escapeHtml(r.value)}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#f4f8fa;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#142536">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e1e9ee">
    <tr><td style="background:#122636;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700">Kozbica IT <span style="color:#2fb5ba">· nieuwe aanvraag</span></td></tr>
    <tr><td style="padding:20px 12px 4px 12px;color:#4f6275;font-size:13px">&nbsp;&nbsp;Ontvangen op ${escapeHtml(when)} via ${escapeHtml(meta.siteHost)}</td></tr>
    <tr><td style="padding:8px 12px"><table role="presentation" cellpadding="0" cellspacing="0" width="100%">${tableRows}</table></td></tr>
    <tr><td style="padding:8px 24px 0 24px;color:#4f6275;font-size:14px">Bericht</td></tr>
    <tr><td style="padding:8px 24px 24px 24px"><div style="background:#f4f8fa;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div></td></tr>
    <tr><td style="padding:0 24px 24px 24px;color:#4f6275;font-size:12px;line-height:1.5">De afzender heeft toestemming gegeven voor het verwerken van deze gegevens om de aanvraag te behandelen. Gebruik ‘Antwoorden’ om rechtstreeks te reageren.</td></tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
