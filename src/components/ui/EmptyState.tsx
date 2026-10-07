import type { EmptyStateProps } from "@/contracts/blog";

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-neutral-300 px-6 py-12 text-center dark:border-neutral-700">
      <p className="text-lg font-semibold tracking-tight">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
}
