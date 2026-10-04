import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Plus,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Proposals",
    path: "/proposals",
    icon: FileText,
  },
  {
    name: "Clients",
    path: "/clients",
    icon: Users,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    onClose();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-slate-200
          bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard");
              onClose();
            }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Sparkles size={20} />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                ProposalAI
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Smart proposals
              </p>
            </div>
          </button>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? "text-blue-600"
                            : "text-slate-400"
                        }
                      />

                      <span>{item.name}</span>

                      {isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Create proposal */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => {
                navigate("/proposals/create");
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              <Plus size={18} />
              New Proposal
            </button>
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-600">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {user.name || "User"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user.email || "user@example.com"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}