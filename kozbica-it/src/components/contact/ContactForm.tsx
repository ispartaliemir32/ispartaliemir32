"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, RotateCcw, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EMPLOYEE_OPTIONS, SERVICE_OPTIONS } from "@/content/service-options";
import { packages } from "@/content/packages";
import { CONTACT_LIMITS, validateContact, type ContactFieldErrors, type ContactFieldName, type ContactFields } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { SelectField, TextareaField, TextField } from "./fields";
import { Turnstile, type TurnstileHandle } from "./Turnstile";

type ApiResponse =
  | { ok: true; message: string }
  | { ok: false; code: string; message: string; errors?: ContactFieldErrors };

type Status = "idle" | "submitting" | "success";
type VerifyState = "loading" | "verified" | "expired" | "error-load" | "error-challenge";

const INITIAL: ContactFields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  employees: "",
  service: "",
  message: "",
  consent: false,
};

const FIELD_ORDER: ContactFieldName[] = ["name", "company", "email", "phone", "employees", "service", "message", "consent"];
const FIELD_LABELS: Record<ContactFieldName, string> = {
  name: "Volledige naam",
  company: "Bedrijfsnaam",
  email: "Zakelijk e-mailadres",
  phone: "Telefoonnummer",
  employees: "Aantal medewerkers",
  service: "Interesse in",
  message: "Uw vraag of situatie",
  consent: "Toestemming",
};

const NETWORK_ERROR =
  "Er kon geen verbinding worden gemaakt. Controleer uw internetverbinding en probeer het opnieuw.";

export function ContactForm({ siteKey, directEmail }: { siteKey: string; directEmail: string | null }) {
  const formId = useId();
  const fieldId = (name: ContactFieldName) => `${formId}-${name}`;

  const [values, setValues] = useState<ContactFields>(INITIAL);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [verifyState, setVerifyState] = useState<VerifyState>("loading");

  const startedAt = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Starttijd (tegen bots) en voorselectie via ?dienst=…&pakket=… in de URL.
  useEffect(() => {
    startedAt.current = Date.now();
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const dienst = params.get("dienst");
      const pakket = packages.find((p) => p.id === params.get("pakket"));
      setValues((current) => ({
        ...current,
        service: !current.service && SERVICE_OPTIONS.some((o) => o.value === dienst) ? (dienst as string) : current.service,
        message:
          !current.message && pakket ? `Ik heb interesse in het pakket ${pakket.name}. ` : current.message,
      }));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = <K extends ContactFieldName>(name: K, value: ContactFields[K]) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // Na een eerste verzendpoging direct terugkoppelen terwijl de bezoeker corrigeert.
    if (attempted) {
      const result = validateContact(next);
      setErrors(result.ok ? {} : result.errors);
    }
  };

  const handleToken = useCallback((value: string) => {
    setToken(value);
    setVerifyState("verified");
  }, []);
  const handleExpire = useCallback(() => {
    setToken(null);
    setVerifyState("expired");
  }, []);
  const handleVerifyError = useCallback((reason: "load" | "challenge") => {
    setToken(null);
    setVerifyState(reason === "load" ? "error-load" : "error-challenge");
  }, []);

  const focusSummary = () => requestAnimationFrame(() => summaryRef.current?.focus());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setAttempted(true);
    setFormError(null);

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      focusSummary();
      return;
    }
    setErrors({});

    if (!token) {
      setFormError(
        verifyState === "error-load"
          ? "De beveiligingscontrole kon niet worden geladen. Schakel eventuele adblockers voor deze pagina uit en vernieuw de pagina."
          : "Wacht even tot de beveiligingscontrole onder het formulier is voltooid en verstuur het formulier dan opnieuw.",
      );
      focusSummary();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          turnstileToken: token,
          kz_extra: honeypotRef.current?.value ?? "",
          startedAt: startedAt.current,
        }),
      });
      const data = (await response.json().catch(() => null)) as ApiResponse | null;

      if (response.ok && data?.ok) {
        setStatus("success");
        return;
      }
      if (data && !data.ok && data.errors) setErrors(data.errors);
      setFormError(data?.message ?? "Er ging iets mis bij het versturen. Probeer het later opnieuw.");
      setStatus("idle");
      focusSummary();
    } catch {
      setFormError(NETWORK_ERROR);
      setStatus("idle");
      focusSummary();
    } finally {
      // Een Turnstile-token is maar één keer bruikbaar: altijd een nieuw token ophalen.
      setToken(null);
      setVerifyState("loading");
      turnstileRef.current?.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card bg-white p-8 text-center shadow-card ring-1 ring-line sm:p-12" role="status">
        <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-success-50 text-success-700 ring-8 ring-success-50/50">
          <CircleCheck aria-hidden="true" className="size-8" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-6 text-2xl font-bold focus:outline-none sm:text-3xl">
          Bedankt, uw bericht is verzonden
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          We hebben uw aanvraag ontvangen en nemen persoonlijk contact met u op om een moment voor de kennismaking af te
          spreken.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/diensten"
            className="inline-flex min-h-11 items-center justify-center rounded-full px-5 font-semibold text-navy-900 ring-1 ring-line-strong transition hover:text-turquoise-700 hover:ring-turquoise-500"
          >
            Bekijk onze diensten
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              setValues(INITIAL);
              setAttempted(false);
              setStatus("idle");
              startedAt.current = Date.now();
            }}
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Nog een bericht sturen
          </Button>
        </div>
      </div>
    );
  }

  const errorEntries = FIELD_ORDER.filter((name) => errors[name]);
  const showSummary = formError !== null || (attempted && errorEntries.length > 0);
  const submitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-describedby={`${formId}-intro`}
      className="relative rounded-card bg-white p-6 shadow-card ring-1 ring-line sm:p-10"
    >
      <h2 className="text-2xl font-bold">Stuur ons een bericht</h2>
      <p id={`${formId}-intro`} className="mt-2 text-muted">
        Velden met een <span className="text-danger-600">*</span> zijn verplicht. Het invullen kost ongeveer twee minuten.
      </p>

      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        className={cn(
          "mt-6 rounded-2xl border border-danger-600/30 bg-danger-50 p-5 text-danger-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger-600",
          !showSummary && "hidden",
        )}
      >
        {showSummary && (
          <>
            <p className="flex items-center gap-2 font-semibold">
              <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
              {formError ?? "Controleer de volgende velden:"}
            </p>
            {errorEntries.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-9 text-sm">
                {errorEntries.map((name) => (
                  <li key={name}>
                    <a href={`#${fieldId(name)}`} className="underline underline-offset-2 hover:no-underline">
                      {FIELD_LABELS[name]}: {errors[name]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {formError && directEmail && (
              <p className="mt-3 text-sm">
                Lukt het niet? Mail ons rechtstreeks via{" "}
                <a href={`mailto:${directEmail}`} className="font-semibold underline underline-offset-2">
                  {directEmail}
                </a>
                .
              </p>
            )}
          </>
        )}
      </div>

      <fieldset disabled={submitting} className="mt-8 grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Uw gegevens en vraag</legend>
        <TextField
          id={fieldId("name")}
          name="name"
          label={FIELD_LABELS.name}
          required
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name.max}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <TextField
          id={fieldId("company")}
          name="company"
          label={FIELD_LABELS.company}
          required
          autoComplete="organization"
          maxLength={CONTACT_LIMITS.company.max}
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          error={errors.company}
        />
        <TextField
          id={fieldId("email")}
          name="email"
          type="email"
          inputMode="email"
          label={FIELD_LABELS.email}
          required
          autoComplete="email"
          spellCheck={false}
          maxLength={CONTACT_LIMITS.email.max}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <TextField
          id={fieldId("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          label={FIELD_LABELS.phone}
          autoComplete="tel"
          maxLength={CONTACT_LIMITS.phone.max}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
        <SelectField
          id={fieldId("employees")}
          name="employees"
          label={FIELD_LABELS.employees}
          placeholder="Maak een keuze"
          options={EMPLOYEE_OPTIONS}
          value={values.employees}
          onChange={(e) => update("employees", e.target.value)}
          error={errors.employees}
        />
        <SelectField
          id={fieldId("service")}
          name="service"
          label={FIELD_LABELS.service}
          required
          placeholder="Kies een dienst"
          options={SERVICE_OPTIONS}
          value={values.service}
          onChange={(e) => update("service", e.target.value)}
          error={errors.service}
        />
        <TextareaField
          id={fieldId("message")}
          name="message"
          label={FIELD_LABELS.message}
          hint="Bijvoorbeeld: met hoeveel mensen u werkt, welke systemen u gebruikt en waar u hulp bij zoekt."
          required
          rows={6}
          maxLength={CONTACT_LIMITS.message.max}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          error={errors.message}
          counter={{ current: values.message.length, max: CONTACT_LIMITS.message.max }}
          className="sm:col-span-2"
        />

        {/* Honeypot: onzichtbaar voor bezoekers en hulptechnologie. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${formId}-kz`}>Laat dit veld leeg</label>
          <input ref={honeypotRef} id={`${formId}-kz`} name="kz_extra" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className="sm:col-span-2">
          <div className="flex gap-3">
            <input
              id={fieldId("consent")}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              required
              aria-required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${fieldId("consent")}-fout` : undefined}
              className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-turquoise-600"
            />
            <label htmlFor={fieldId("consent")} className="text-[0.9375rem] leading-relaxed text-ink">
              Ik ga akkoord met de verwerking van mijn gegevens om mijn aanvraag te behandelen, zoals beschreven in de{" "}
              <Link href="/privacyverklaring" className="font-semibold text-turquoise-700 underline underline-offset-2 hover:text-navy-900">
                privacyverklaring
              </Link>
              . <span className="text-danger-600" aria-hidden="true">*</span>
            </label>
          </div>
          {errors.consent && (
            <p id={`${fieldId("consent")}-fout`} className="mt-2 ml-8 flex items-start gap-1.5 text-sm font-medium text-danger-700">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-900">
            <ShieldCheck aria-hidden="true" className="size-4 text-turquoise-700" />
            Beveiligingscontrole
          </p>
          <Turnstile ref={turnstileRef} siteKey={siteKey} onToken={handleToken} onExpire={handleExpire} onError={handleVerifyError} />
          <p className="mt-2 text-sm text-muted" aria-live="polite">
            {verifyState === "loading" && "De controle wordt uitgevoerd…"}
            {verifyState === "verified" && "Controle voltooid. U kunt het formulier versturen."}
            {verifyState === "expired" && "De controle is verlopen en wordt automatisch vernieuwd."}
            {verifyState === "error-challenge" && "De controle is niet gelukt. Er wordt automatisch een nieuwe poging gedaan."}
            {verifyState === "error-load" &&
              "De beveiligingscontrole kon niet worden geladen. Schakel eventuele adblockers uit of vernieuw de pagina."}
          </p>
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} className="w-full shrink-0 whitespace-nowrap sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
              Bezig met versturen…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="size-4.5" />
              Verstuur aanvraag
            </>
          )}
        </Button>
        <p className="text-sm text-muted">Vrijblijvend. Uw gegevens gebruiken we alleen voor uw aanvraag.</p>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Uw bericht wordt verzonden." : ""}
      </p>
    </form>
  );
}
