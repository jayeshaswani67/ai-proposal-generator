import { Calendar, DollarSign, Eye, Pencil, Trash2 } from "lucide-react";
import type { Proposal } from "../types/proposal";

interface ProposalCardProps {
  proposal: Proposal;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ProposalCard({
  proposal,
  onView,
  onEdit,
  onDelete,
}: ProposalCardProps) {
  const statusStyles = {
    Draft: "bg-slate-100 text-slate-600",
    Sent: "bg-blue-100 text-blue-600",
    Accepted: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            {proposal.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {proposal.projectDescription}
          </p>
        </div>

        <span
          className={`
            rounded-full px-3 py-1 text-xs font-semibold
            ${statusStyles[proposal.status]}
          `}
        >
          {proposal.status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <DollarSign size={16} />
          <span>
            {proposal.pricing.currency}{" "}
            {proposal.pricing.total.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={16} />
          <span>
            {proposal.timeline.duration}{" "}
            {proposal.timeline.unit}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onView?.(proposal.id)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          <Eye size={16} />
          View
        </button>

        <button
          type="button"
          onClick={() => onEdit?.(proposal.id)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete?.(proposal.id)}
          className="ml-auto rounded-lg p-2 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}