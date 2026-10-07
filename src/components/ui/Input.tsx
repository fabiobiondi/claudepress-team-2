import clsx from "clsx";
import type { InputProps } from "@/contracts/blog";

export function Input({
  id,
  name,
  value,
  onChange,
  multiline = false,
  placeholder,
  invalid = false,
}: InputProps) {
  const className = clsx(
    "block w-full rounded-sm border bg-surface px-3 py-2 text-ink placeholder:text-graphite/70",
    invalid ? "border-pencil-red border-b-2" : "border-rule hover:border-graphite",
  );

  if (multiline) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid}
        rows={8}
        className={clsx(className, "resize-y leading-relaxed")}
      />
    );
  }

  return (
    <input
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-invalid={invalid}
      className={className}
    />
  );
}
