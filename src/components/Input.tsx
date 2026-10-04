import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  className = "",
  id,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        className={`
          w-full rounded-xl border bg-white
          px-4 py-3 text-sm text-slate-900
          outline-none transition
          placeholder:text-slate-400
          ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          }
          ${className}
        `}
      />

      {hint && !error && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}