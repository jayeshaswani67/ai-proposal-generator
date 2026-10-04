interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function LoadingSpinner({
  size = "md",
  text,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-7 w-7 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div
        className={`
          animate-spin rounded-full
          border-slate-200 border-t-blue-600
          ${sizes[size]}
        `}
      />

      {text && (
        <span className="text-sm text-slate-500">
          {text}
        </span>
      )}
    </div>
  );
}