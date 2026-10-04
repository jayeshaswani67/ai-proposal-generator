import {
  Menu,
  Plus,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  let user = {
    name: "User",
    email: "user@example.com",
  };

  try {
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch {
    // Use default user
  }

  const initial =
    user.name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {/* New Proposal */}
        <button
          type="button"
          onClick={() =>
            navigate("/proposals/create")
          }
          className="hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex"
        >
          <Plus size={17} />
          New Proposal
        </button>

        {/* Notification */}
        <button
          type="button"
          className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="max-w-[150px] truncate text-sm font-semibold text-slate-800">
              {user.name || "User"}
            </p>

            <p className="text-xs text-slate-400">
              Freelancer
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-600">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}