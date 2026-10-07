import clsx from "clsx";
import type { PostStatus, StatusBadgeProps } from "@/contracts/blog";

const labels: Record<PostStatus, string> = {
  draft: "Bozza",
  published: "Pubblicato",
};

// La bozza è ancora a matita, tratteggiata; il pubblicato è passato in inchiostro blu.
const styles: Record<PostStatus, string> = {
  draft: "border-dashed border-graphite text-graphite",
  published: "border-pencil-blue bg-pencil-blue text-on-pencil",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
