import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export default function Button({
  children,
  loading = false,
  variant = "primary",
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/20",

    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500/20",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/20",

    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-blue-500/20",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl px-5 py-2.5
        text-sm font-semibold
        transition duration-200
        focus:outline-none focus:ring-4
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}

      {loading ? "Loading..." : children}
    </button>
  );
}