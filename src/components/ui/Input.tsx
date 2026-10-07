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
    "block w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-2",
    invalid
      ? "border-red-500 focus:ring-red-500/40"
      : "border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500/30 dark:border-neutral-700",
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
        className={clsx(className, "resize-y")}
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
