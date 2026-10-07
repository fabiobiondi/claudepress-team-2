import clsx from "clsx";
import type { PostStatus, StatusBadgeProps } from "@/contracts/blog";

const labels: Record<PostStatus, string> = {
  draft: "Bozza",
  published: "Pubblicato",
};

const styles: Record<PostStatus, string> = {
  draft:
    "bg-amber-100 text-amber-800 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
  published:
    "bg-emerald-100 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
