interface ComplianceBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ComplianceBadge({ score, size = "md" }: ComplianceBadgeProps) {
  const color = score >= 80 ? "text-success bg-success/10" : score >= 50 ? "text-warning bg-warning/10" : "text-destructive bg-destructive/10";
  const label = score >= 80 ? "Compliant" : score >= 50 ? "At Risk" : "Non-Compliant";
  const sizeClasses = { sm: "text-xs px-2 py-0.5", md: "text-sm px-3 py-1", lg: "text-base px-4 py-1.5" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${color} ${sizeClasses[size]}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${score >= 80 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-destructive"}`} />
      {score}% — {label}
    </span>
  );
}
