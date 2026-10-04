import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        {icon && (
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            {icon}
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          {trend && (
            <span className="font-semibold text-green-600">
              {trend}
            </span>
          )}

          {description && (
            <span className="text-slate-500">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}