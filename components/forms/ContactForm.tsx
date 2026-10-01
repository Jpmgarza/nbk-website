"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useState } from "react";
import { Controller, useForm, type FieldError } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { contactSchema, LANGUAGE_OPTIONS, MISSION_OPTIONS, type ContactInput } from "@/lib/contact-schema";
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

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", comment: "", website: "" },
  });

  useEffect(() => {
    const mission = new URLSearchParams(window.location.search).get("mission");
    const option = MISSION_OPTIONS.find((value) => value === mission);
    if (option) setValue("mission", option);
  }, [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setStatus("idle");
    const result = await sendContactRequest(data);
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
        <p className="font-display text-h4 font-semibold text-accent">Merci, votre demande est bien envoyée.</p>
        <p className="text-body-loose">Une réponse personnalisée vous sera apportée dans les meilleurs délais.</p>
      </div>
    );
  }

  const describedBy = (field: keyof ContactInput) => (errors[field] ? `${id}-${field}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6" aria-label="Demande de devis">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-x-6">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className={labelClass}>
            Nom et prénom
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
            E-mail
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
            Type de mission
          </label>
          <Controller
            control={control}
            name="mission"
            render={({ field }) => (
              <Select
                id={`${id}-mission`}
                labelId={`${id}-mission-label`}
                options={MISSION_OPTIONS}
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
            Langues concernées
          </label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <Select
                id={`${id}-languages`}
                labelId={`${id}-languages-label`}
                options={LANGUAGE_OPTIONS}
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
            Commentaire
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
        <label htmlFor={`${id}-website`}>Site web</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-body text-accent">
          {serverMessage}
        </p>
      )}

      <Button type="submit" size="wide" className="self-start" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
