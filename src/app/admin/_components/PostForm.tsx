"use client";
// Client component: tiene lo stato dei campi e degli errori e gestisce l'invio.

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import {
  API_ROUTES,
  ROUTES,
  postInputSchema,
  type ApiError,
  type PostInput,
  type PostStatus,
} from "@/contracts/blog";

type PostFormProps = {
  postId?: string;
  initialValues?: Partial<PostInput>;
};

type TextField = Exclude<keyof PostInput, "status">;

const TEXT_FIELDS: { name: TextField; label: string; multiline?: boolean }[] = [
  { name: "title", label: "Titolo" },
  { name: "excerpt", label: "Sommario" },
  { name: "content", label: "Contenuto", multiline: true },
  { name: "author", label: "Autore" },
];

const STATUS_OPTIONS: { value: PostStatus; label: string }[] = [
  { value: "draft", label: "Bozza" },
  { value: "published", label: "Pubblicato" },
];

export function PostForm({ postId, initialValues }: PostFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PostInput>({
    title: initialValues?.title ?? "",
    excerpt: initialValues?.excerpt ?? "",
    content: initialValues?.content ?? "",
    author: initialValues?.author ?? "",
    status: initialValues?.status ?? "draft",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function setValue<K extends keyof PostInput>(name: K, value: PostInput[K]) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const parsed = postInputSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!(key in fieldErrors)) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch(postId ? API_ROUTES.post(postId) : API_ROUTES.posts, {
        method: postId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as ApiError | null;
        if (body?.error.code === "validation_error" && body.error.fields) {
          setErrors(body.error.fields);
        } else {
          setSubmitError(body?.error.message ?? "Salvataggio non riuscito. Riprova.");
        }
        setSubmitting(false);
        return;
      }

      router.push(ROUTES.adminPosts);
      router.refresh();
    } catch {
      setSubmitError("Impossibile contattare il server. Riprova.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-6">
      {TEXT_FIELDS.map((field) => (
        <Field
          key={field.name}
          label={field.label}
          htmlFor={`post-${field.name}`}
          error={errors[field.name]}
        >
          <Input
            id={`post-${field.name}`}
            name={field.name}
            value={values[field.name]}
            onChange={(value) => setValue(field.name, value)}
            multiline={field.multiline}
            invalid={Boolean(errors[field.name])}
          />
        </Field>
      ))}

      <fieldset className="space-y-1.5">
        <legend className="block text-sm font-medium text-ink">Stato</legend>
        <div className="flex gap-2">
          {STATUS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={values.status === option.value ? "primary" : "secondary"}
              onClick={() => setValue("status", option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        {errors.status && (
          <p role="alert" className="text-sm text-pencil-red">
            {errors.status}
          </p>
        )}
      </fieldset>

      <div className="flex items-center gap-4 border-t border-rule pt-6">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Salvataggio…" : "Salva"}
        </Button>
        {submitError && (
          <p role="alert" className="text-sm text-pencil-red">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
