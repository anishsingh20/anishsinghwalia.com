"use client";

import { useState, type ComponentProps, type FormEvent } from "react";
import { budgets, projectTypes, timelines } from "@data/contact";
import { site } from "@data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Errors = Record<string, string>;

const fieldClass = "mt-2";

export function ContactForm({ mailto }: { mailto: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setFormError("");
    setErrors({});
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok: boolean;
        transport?: string;
        errors?: Errors;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setFormError(data.error || "Check the fields and try again.");
        return;
      }
      setDone(true);
    } catch {
      setFormError("The form could not reach the server. Use the email link below.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-orange/40 bg-panel p-6" role="status">
        <h2 className="font-display text-2xl">Thanks. I&apos;ll get back to you.</h2>
        <p className="mt-3 text-muted">Your note is in. I&apos;ll reply to the email you entered.</p>
        <a className="mt-4 inline-block text-ember hover:underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_fax">Fax</label>
        <input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" required />
        <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" required />
      </div>
      <Field label="Company" name="company" error={errors.company} autoComplete="organization" required />
      <Select label="Project type" name="projectType" error={errors.projectType} options={projectTypes} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Budget (optional)" name="budget" error={errors.budget} options={budgets} optional />
        <Select label="Timeline (optional)" name="timeline" error={errors.timeline} options={timelines} optional />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" className={fieldClass} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message ? <p id="message-error" className="mt-1 text-sm text-ember">{errors.message}</p> : null}
      </div>
      {formError ? <p className="text-sm text-ember" role="alert">{formError}</p> : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>{pending ? "Sending…" : "Send"}</Button>
        <a href={mailto} className="text-sm text-ember hover:underline">Or email me directly</a>
      </div>
    </form>
  );
}

function Field({
  label, name, error, type = "text", ...props
}: { label: string; name: string; error?: string; type?: string } & ComponentProps<"input">) {
  const id = name;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} className={fieldClass} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error ? <p id={`${id}-error`} className="mt-1 text-sm text-ember">{error}</p> : null}
    </div>
  );
}

function Select({
  label, name, options, error, optional = false,
}: { label: string; name: string; options: readonly string[]; error?: string; optional?: boolean }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        defaultValue=""
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 h-11 w-full rounded-xl border border-line bg-ink px-3 text-sm text-cream focus-visible:border-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40"
      >
        <option value="" disabled={!optional}>{optional ? "Skip for now" : "Choose one"}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error ? <p id={`${name}-error`} className="mt-1 text-sm text-ember">{error}</p> : null}
    </div>
  );
}
