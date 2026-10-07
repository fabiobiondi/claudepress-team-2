import clsx from "clsx";
import type { ButtonProps } from "@/contracts/blog";

type ButtonVariant = NonNullable<ButtonProps["variant"]>;

const variants: Record<ButtonVariant, string> = {
  primary: "border-pencil-blue bg-pencil-blue text-on-pencil hover:opacity-90",
  secondary: "border-rule bg-surface text-ink hover:border-graphite",
  danger: "border-pencil-red bg-surface text-pencil-red hover:bg-pencil-red/10",
};

export function Button({
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center rounded-sm border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
      )}
    >
      {children}
    </button>
  );
}
