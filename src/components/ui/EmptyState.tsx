import type { EmptyStateProps } from "@/contracts/blog";

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-rule bg-surface px-6 py-14 text-center">
      <p className="font-serif text-xl font-semibold tracking-tight text-ink">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-graphite">{description}</p>
      )}
    </div>
  );
}
