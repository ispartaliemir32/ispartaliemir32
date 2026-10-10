import type { ComponentProps, ReactNode } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

const control =
  "block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink shadow-[inset_0_1px_2px_rgb(16_35_52/0.04)] " +
  "placeholder:text-muted/80 transition-[border-color,box-shadow] duration-150 " +
  "focus:border-turquoise-600 focus:ring-4 focus:ring-turquoise-500/20 focus:outline-none " +
  "disabled:cursor-not-allowed disabled:bg-mist";

function controlState(invalid: boolean) {
  return invalid ? "border-danger-600 focus:border-danger-600 focus:ring-danger-600/15" : "border-field hover:border-navy-500";
}

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function describedBy(id: string, { hint, error }: { hint?: string; error?: string }) {
  return [hint ? `${id}-hint` : null, error ? `${id}-fout` : null].filter(Boolean).join(" ") || undefined;
}

export function FieldShell({ id, label, required, hint, error, children, className }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.9375rem] font-semibold text-navy-900">
        <span>
          {label}
          {required ? (
            <span className="text-danger-600" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </span>
        {!required && <span className="text-sm font-normal text-muted">Optioneel</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-fout`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger-700">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = Omit<ComponentProps<"input">, "id" | "className"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function TextField({ id, label, hint, error, required, className, ...props }: InputProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <input
        id={id}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={cn(control, controlState(Boolean(error)))}
        {...props}
      />
    </FieldShell>
  );
}

type SelectProps = Omit<ComponentProps<"select">, "id" | "className"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  className?: string;
};

export function SelectField({ id, label, hint, error, required, placeholder, options, className, ...props }: SelectProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, { hint, error })}
          className={cn(control, controlState(Boolean(error)), "appearance-none pr-11")}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted" />
      </div>
    </FieldShell>
  );
}

type TextareaProps = Omit<ComponentProps<"textarea">, "id" | "className"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  counter?: { current: number; max: number };
};

export function TextareaField({ id, label, hint, error, required, className, counter, ...props }: TextareaProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <textarea
        id={id}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={cn(control, controlState(Boolean(error)), "min-h-40 resize-y leading-relaxed")}
        {...props}
      />
      {counter && (
        <p className={cn("mt-1.5 text-right text-xs", counter.current > counter.max ? "text-danger-700" : "text-muted")}>
          {counter.current} / {counter.max} tekens
        </p>
      )}
    </FieldShell>
  );
}
