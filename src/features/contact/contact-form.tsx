"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { submitContactForm } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import {
  MESSAGE_MAX_LENGTH,
  contactSchema,
  type ContactFormValues,
} from "@/features/contact/contact-schema";
import { ContactSuccess } from "@/features/contact/contact-success";
import { FormField, fieldClassName } from "@/features/contact/form-field";

const EMPTY_VALUES: ContactFormValues = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY_VALUES,
  });
  const mutation = useMutation({ mutationFn: submitContactForm });
  const messageLength = watch("message").length;

  if (mutation.isSuccess) {
    return (
      <ContactSuccess
        message={mutation.data.message}
        onReset={() => {
          reset(EMPTY_VALUES);
          mutation.reset();
        }}
      />
    );
  }

  const describedBy = (field: keyof ContactFormValues) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <form
      noValidate
      aria-label="Contact form"
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" error={errors.name?.message}>
          <input
            id="name"
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldClassName}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
        </FormField>
        <FormField id="email" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldClassName}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
        </FormField>
      </div>
      <FormField id="subject" label="Subject" error={errors.subject?.message}>
        <input
          id="subject"
          placeholder="A RAG project, a role, or just hello"
          className={fieldClassName}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          {...register("subject")}
        />
      </FormField>
      <FormField
        id="message"
        label="Message"
        error={errors.message?.message}
        hint={`${messageLength}/${MESSAGE_MAX_LENGTH}`}
      >
        <textarea
          id="message"
          rows={6}
          placeholder="Tell me a little about what you have in mind…"
          className={`${fieldClassName} resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          {...register("message")}
        />
      </FormField>

      {mutation.isError ? (
        <p
          role="alert"
          className="border-danger/40 bg-danger/10 text-danger rounded-2xl border px-4 py-3 text-sm"
        >
          {mutation.error.message}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={mutation.isPending} className="self-start">
        {mutation.isPending ? (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {mutation.isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
