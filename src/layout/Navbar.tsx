
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  Menu,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* ------------------------------------------------------------ */
  /* Scroll detection */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------------------------------------------------ */
  /* Close mobile menu on route change */
  /* ------------------------------------------------------------ */

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ------------------------------------------------------------ */
  /* Navigation */
  /* ------------------------------------------------------------ */

  const handleCreateProposal = () => {
    navigate("/register");
    setMobileOpen(false);
  };

  const scrollToSection = (id: string) => {
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);

      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ======================================================== */}
      {/* NAVBAR */}
      {/* ======================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
        <nav
          className={`
            mx-auto flex h-[68px] max-w-6xl items-center justify-between
            rounded-2xl border px-3 transition-all duration-500
            sm:px-4
            ${
              scrolled
                ? "border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/5 backdrop-blur-2xl"
                : "border-white/70 bg-white/70 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
            }
          `}
        >
          {/* ==================================================== */}
          {/* LOGO */}
          {/* ==================================================== */}

          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            {/* Logo icon */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/30 blur-md transition-all duration-500 group-hover:bg-indigo-500/50" />

              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-950 text-white shadow-lg transition-all duration-500 group-hover:rotate-3 group-hover:scale-105">
                {/* Animated gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 opacity-90" />

                <FileText
                  size={19}
                  strokeWidth={2.3}
                  className="relative z-10 transition-transform duration-500 group-hover:-rotate-6"
                />

                {/* Spark */}
                <Sparkles
                  size={9}
                  className="absolute right-1 top-1 z-20 text-white"
                />
              </div>
            </div>

            {/* Brand */}
            <div className="hidden sm:block">
              <div className="flex items-center leading-none">
                <span className="text-[17px] font-bold tracking-tight text-slate-950">
                  Proposal
                </span>

                <span className="text-[17px] font-bold tracking-tight text-blue-600">
                  AI
                </span>
              </div>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  AI workspace
                </span>
              </div>
            </div>
          </Link>

          {/* ==================================================== */}
          {/* DESKTOP NAVIGATION */}
          {/* ==================================================== */}

          <div className="hidden items-center gap-1 md:flex">
            <NavItem
              label="Home"
              active={location.pathname === "/"}
              onClick={() => navigate("/")}
            />

            <NavItem
              label="Features"
              onClick={() => scrollToSection("features")}
            />

            <NavItem
              label="How It Works"
              onClick={() => scrollToSection("how-it-works")}
            />

            <NavItem
              label="Pricing"
              onClick={() => scrollToSection("pricing")}
            />
          </div>

          {/* ==================================================== */}
          {/* DESKTOP ACTIONS */}
          {/* ==================================================== */}

          <div className="hidden items-center gap-2 md:flex">
            {/* AI status */}
            <div className="mr-2 hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2 lg:flex">
              <Zap size={13} className="text-blue-600" />

              <span className="text-[11px] font-semibold text-slate-500">
                AI Ready
              </span>
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-950"
            >
              Login
            </Link>

            {/* Create proposal */}
            <button
              type="button"
              onClick={handleCreateProposal}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/25"
            >
              {/* Shine */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <Sparkles size={15} />

              <span className="relative">
                Create Proposal
              </span>

              <ArrowRight
                size={15}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* ==================================================== */}
          {/* MOBILE BUTTON */}
          {/* ==================================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* ====================================================== */}
        {/* MOBILE MENU */}
        {/* ====================================================== */}

        <div
          className={`
            mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl
            border border-slate-200/80 bg-white/95 shadow-2xl
            backdrop-blur-2xl transition-all duration-500 md:hidden
            ${
              mobileOpen
                ? "max-h-[600px] translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-3 opacity-0"
            }
          `}
        >
          <div className="p-3">
            {/* Mobile AI banner */}
            <div className="mb-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/20">
                  <Sparkles size={16} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-900">
                    ProposalAI
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    <span className="text-[10px] text-slate-500">
                      AI workspace ready
                    </span>
                  </div>
                </div>
              </div>

              <Zap size={16} className="text-blue-600" />
            </div>

            {/* Links */}
            <div className="space-y-1">
              <MobileNavItem
                label="Home"
                active={location.pathname === "/"}
                onClick={() => navigate("/")}
              />

              <MobileNavItem
                label="Features"
                onClick={() => scrollToSection("features")}
              />

              <MobileNavItem
                label="How It Works"
                onClick={() => scrollToSection("how-it-works")}
              />

              <MobileNavItem
                label="Pricing"
                onClick={() => scrollToSection("pricing")}
              />
            </div>

            <div className="my-3 h-px bg-slate-100" />

            {/* Login */}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Login
            </Link>

            {/* CTA */}
            <button
              type="button"
              onClick={handleCreateProposal}
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600"
            >
              <Sparkles size={16} />

              Create Your First Proposal

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Bottom trust */}
            <div className="mt-3 flex items-center justify-center gap-2 py-2 text-[10px] font-medium text-slate-400">
              <Check size={13} className="text-emerald-500" />

              No credit card required
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/* ============================================================= */
/* DESKTOP NAV ITEM */
/* ============================================================= */

function NavItem({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative rounded-xl px-3.5 py-2.5 text-sm font-medium
        transition-all duration-300
        ${
          active
            ? "text-blue-600"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
        }
      `}
    >
      {label}

      {/* Active / hover underline */}
      <span
        className={`
          absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full
          bg-blue-600 transition-all duration-300
          ${
            active
              ? "w-5 opacity-100"
              : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
          }
        `}
      />
    </button>
  );
}

/* ============================================================= */
/* MOBILE NAV ITEM */
/* ============================================================= */

function MobileNavItem({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center justify-between rounded-xl px-4 py-3
        text-left text-sm font-semibold transition-all duration-300
        ${
          active
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
        }
      `}
    >
      <span>{label}</span>

      {active ? (
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
      ) : (
        <ChevronDown
          size={15}
          className="-rotate-90 text-slate-300"
        />
      )}
    </button>
  );
}
