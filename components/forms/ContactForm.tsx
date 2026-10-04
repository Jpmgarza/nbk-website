"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useMemo, useState } from "react";
import { Controller, useForm, type FieldError } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/constants";
import { LANGUAGE_KEYS, makeContactSchema, MISSION_KEYS, type ContactInput } from "@/lib/contact-schema";
import type { FormCopy } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { sendContactRequest } from "./actions";

const labelClass = "font-display text-h4 lg:font-semibold";
const fieldClass =
  "w-full rounded border border-ink/30 bg-ink/8 px-4 text-body text-ink transition-colors focus-visible:border-ink focus-visible:outline-none aria-[invalid=true]:border-accent";

function FieldMessage({ id, error }: { id: string; error?: FieldError }) {
  if (!error?.message) return null;
  return (
    <p id={id} className="text-base text-accent">
      {error.message}
    </p>
  );
}

export function ContactForm({ locale, copy }: { locale: Locale; copy: FormCopy }) {
  const id = useId();
  const schema = useMemo(() => makeContactSchema(copy.errors), [copy.errors]);
  const missionOptions = MISSION_KEYS.map((value) => ({ value, label: copy.missions[value] }));
  const languageOptions = LANGUAGE_KEYS.map((value) => ({ value, label: copy.languages[value] }));
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", comment: "", website: "", locale },
  });

  useEffect(() => {
    const mission = new URLSearchParams(window.location.search).get("mission");
    const option = MISSION_KEYS.find((value) => value === mission);
    if (option) setValue("mission", option);
  }, [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setStatus("idle");
    // A failed request (offline, server error) rejects instead of returning a result.
    const result = await sendContactRequest(data).catch(() => ({
      ok: false as const,
      message: copy.fallback.replace("{email}", SITE.email).replace("{phone}", SITE.phone.display),
    }));
    if (result.ok) {
      setStatus("sent");
    } else {
      setServerMessage(result.message);
      setStatus("error");
    }
  });

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded bg-bg p-6 shadow-card">
        <p className="font-display text-h4 font-semibold text-accent">{copy.sentTitle}</p>
        <p className="text-body-loose">{copy.sentText}</p>
      </div>
    );
  }

  const describedBy = (field: keyof ContactInput) => (errors[field] ? `${id}-${field}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6" aria-label={copy.ariaLabel}>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-6">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className={labelClass}>
            {copy.labels.name}
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            className={cn(fieldClass, "h-12")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
          <FieldMessage id={`${id}-name-error`} error={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className={labelClass}>
            {copy.labels.email}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            className={cn(fieldClass, "h-12")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
          <FieldMessage id={`${id}-email-error`} error={errors.email} />
        </div>

        <div className="flex flex-col gap-2">
          <label id={`${id}-mission-label`} htmlFor={`${id}-mission`} className={labelClass}>
            {copy.labels.mission}
          </label>
          <Controller
            control={control}
            name="mission"
            render={({ field }) => (
              <Select
                id={`${id}-mission`}
                labelId={`${id}-mission-label`}
                options={missionOptions}
                placeholder={copy.placeholder}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                buttonRef={field.ref}
                invalid={Boolean(errors.mission)}
                describedBy={describedBy("mission")}
                className={cn(fieldClass, "h-12")}
              />
            )}
          />
          <FieldMessage id={`${id}-mission-error`} error={errors.mission} />
        </div>

        <div className="flex flex-col gap-2">
          <label id={`${id}-languages-label`} htmlFor={`${id}-languages`} className={labelClass}>
            {copy.labels.languages}
          </label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <Select
                id={`${id}-languages`}
                labelId={`${id}-languages-label`}
                options={languageOptions}
                placeholder={copy.placeholder}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                buttonRef={field.ref}
                invalid={Boolean(errors.languages)}
                describedBy={describedBy("languages")}
                className={cn(fieldClass, "h-12")}
              />
            )}
          />
          <FieldMessage id={`${id}-languages-error`} error={errors.languages} />
        </div>

        <div className="flex flex-col gap-2 lg:col-span-2">
          <label htmlFor={`${id}-comment`} className={labelClass}>
            {copy.labels.comment}
          </label>
          <textarea
            id={`${id}-comment`}
            rows={3}
            className={cn(fieldClass, "min-h-24 resize-y py-3")}
            aria-invalid={errors.comment ? true : undefined}
            aria-describedby={describedBy("comment")}
            {...register("comment")}
          />
          <FieldMessage id={`${id}-comment-error`} error={errors.comment} />
        </div>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>{copy.labels.honeypot}</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-body text-accent">
          {serverMessage}
        </p>
      )}

      <Button type="submit" size="wide" className="self-start" disabled={isSubmitting}>
        {isSubmitting ? copy.sending : copy.submit}
      </Button>
    </form>
  );
}
