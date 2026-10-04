import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Check,
  Clock3,
  FileCheck,
  FileText,
  Loader2,
  MousePointer2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import {
  createProposal,
  getProposal,
  type Proposal,
} from "../api/proposalApi";

export default function Home() {
  // =========================================================
  // PROPOSAL FORM STATE
  // =========================================================

  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [requirements, setRequirements] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [timeline, setTimeline] = useState("");
  const [timelineUnit, setTimelineUnit] = useState("weeks");
  const [technologies, setTechnologies] = useState("");

  // =========================================================
  // API STATE
  // =========================================================

  const [proposal, setProposal] = useState<Proposal | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingProposal, setIsLoadingProposal] =
    useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // CREATE PROPOSAL
  // POST /api/proposals
  // THEN GET /api/proposals/{id}
  // =========================================================

  const handleCreateProposal = async () => {
    setError("");

    if (!title.trim()) {
      setError("Please enter a proposal title.");
      return;
    }

    if (!clientName.trim()) {
      setError("Please enter the client name.");
      return;
    }

    if (!requirements.trim()) {
      setError("Please enter the client requirements.");
      return;
    }

    try {
      setIsCreating(true);
      setProposal(null);

      const payload = {
        title: title.trim(),

        clientName: clientName.trim(),

        clientEmail: clientEmail.trim(),

        requirements: requirements.trim(),

        budget: Number(budget) || 0,

        currency,

        timeline: Number(timeline) || 0,

        timelineUnit,

        technologies: technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),
      };

      // -------------------------------------------------------
      // 1. CREATE PROPOSAL
      // -------------------------------------------------------

      const createdProposal = await createProposal(payload);

      // -------------------------------------------------------
      // 2. GET PROPOSAL FROM BACKEND
      // -------------------------------------------------------

      setIsLoadingProposal(true);

      const savedProposal = await getProposal(
        createdProposal.id
      );

      // -------------------------------------------------------
      // 3. DISPLAY SAVED PROPOSAL
      // -------------------------------------------------------

      setProposal(savedProposal);

      // Scroll to result
      setTimeout(() => {
        document
          .getElementById("proposal-result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (err: any) {
      console.error("Proposal creation error:", err);

      const message =
        err?.response?.data?.message ||
        "Failed to create proposal. Make sure the backend is running.";

      setError(message);
    } finally {
      setIsCreating(false);
      setIsLoadingProposal(false);
    }
  };

  // =========================================================
  // GET PROPOSAL AGAIN
  // =========================================================

  const handleLoadProposal = async () => {
    if (!proposal?.id) {
      return;
    }

    try {
      setError("");
      setIsLoadingProposal(true);

      const latestProposal = await getProposal(
        proposal.id
      );

      setProposal(latestProposal);
    } catch (err: any) {
      console.error("Proposal loading error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load proposal."
      );
    } finally {
      setIsLoadingProposal(false);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetProposal = () => {
    setProposal(null);
    setError("");

    setTitle("");
    setClientName("");
    setClientEmail("");
    setRequirements("");
    setBudget("");
    setCurrency("INR");
    setTimeline("");
    setTimelineUnit("weeks");
    setTechnologies("");

    setTimeout(() => {
      document
        .getElementById("create-proposal")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden bg-[#f8fafc]">
        {/* Background grid */}

        <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 75%)",
            }}
          />
        </div>

        {/* Glow */}

        <div className="animate-float-slow pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[100px]" />

        <div className="animate-float pointer-events-none absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-[100px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
          {/* Hero content */}

          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}

            <div className="animate-fade-in-up mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>

              <Sparkles size={15} />

              AI-powered proposal generation
            </div>

            {/* Heading */}

            <h1 className="animate-fade-in-up-delay text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Turn client ideas into

              <span className="relative block">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  winning proposals.
                </span>

                <span className="absolute -bottom-3 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60" />
              </span>
            </h1>

            {/* Description */}

            <p className="animate-fade-in-up-delay-2 mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Transform messy client requirements into
              professional proposals with AI-generated scope,
              deliverables, milestones, pricing and more.
            </p>

            {/* Buttons */}

            <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#create-proposal"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-600/30"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <Sparkles size={17} />

                Create Your First Proposal

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <Link
                to="/login"
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:text-blue-600"
              >
                Sign In

                <ArrowRight
                  size={17}
                  className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            </div>

            {/* Trust */}

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <ShieldCheck
                size={16}
                className="text-emerald-500"
              />

              Built for freelancers, consultants and agencies
            </div>
          </div>

          {/* ===================================================== */}
          {/* PRODUCT PREVIEW */}
          {/* ===================================================== */}

          <div className="relative mx-auto mt-20 max-w-6xl perspective-[1800px]">
            {/* Left card */}

            <div className="animate-card-left absolute -left-4 top-24 z-20 hidden w-52 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-2xl backdrop-blur-xl lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    AI Analysis
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    Requirements
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <MiniProgress
                  label="Scope"
                  value="92%"
                />

                <MiniProgress
                  label="Deliverables"
                  value="86%"
                />

                <MiniProgress
                  label="Timeline"
                  value="78%"
                />
              </div>
            </div>

            {/* Right card */}

            <div className="animate-card-right absolute -right-4 top-44 z-20 hidden w-52 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-2xl backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    Estimated value
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    $4,500
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp size={19} />
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                AI pricing suggestion
              </div>
            </div>

            {/* Main product card */}

            <div className="animate-dashboard-entrance relative transform-gpu rounded-[28px] border border-white/80 bg-white/80 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-700 hover:[transform:rotateX(1deg)_rotateY(-2deg)_translateY(-8px)]">
              <div className="rounded-[22px] bg-slate-950 p-3">
                {/* Browser */}

                <div className="flex items-center gap-2 px-2 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />

                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                  <div className="ml-4 h-6 flex-1 rounded-md bg-white/10" />
                </div>

                {/* Fake dashboard */}

                <div className="overflow-hidden rounded-xl bg-slate-50">
                  <div className="grid min-h-[430px] grid-cols-[170px_1fr]">
                    {/* Sidebar */}

                    <div className="hidden border-r border-slate-200 bg-white p-5 sm:block">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                          <FileText size={16} />
                        </div>

                        <span className="text-sm font-bold">
                          ProposalAI
                        </span>
                      </div>

                      <div className="mt-8 space-y-2">
                        <DashboardNav active>
                          Dashboard
                        </DashboardNav>

                        <DashboardNav>
                          Proposals
                        </DashboardNav>

                        <DashboardNav>
                          Clients
                        </DashboardNav>

                        <DashboardNav>
                          Templates
                        </DashboardNav>
                      </div>
                    </div>

                    {/* Dashboard main */}

                    <div className="p-5 sm:p-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            Proposal workspace
                          </p>

                          <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                            E-commerce Website Development
                          </h3>
                        </div>

                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          Draft
                        </span>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <PreviewStat
                          label="Deliverables"
                          value="8"
                          icon={<FileCheck size={16} />}
                        />

                        <PreviewStat
                          label="Timeline"
                          value="6 Weeks"
                          icon={<Clock3 size={16} />}
                        />

                        <PreviewStat
                          label="Estimated"
                          value="$4,500"
                          icon={<TrendingUp size={16} />}
                        />
                      </div>

                      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-slate-400">
                              Project overview
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              Modern e-commerce platform
                            </p>
                          </div>

                          <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                            <FileText size={17} />
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <PreviewItem text="Responsive website" />

                          <PreviewItem text="Payment integration" />

                          <PreviewItem text="Admin dashboard" />

                          <PreviewItem text="SEO optimization" />
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-xs text-slate-500">
                            AI-generated proposal
                          </span>

                          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20">
                            View proposal

                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pointer */}

            <div className="animate-pointer absolute bottom-6 right-[22%] z-30 hidden rounded-full bg-white p-3 shadow-2xl sm:block">
              <MousePointer2
                size={20}
                className="fill-blue-600 text-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
          <Stat
            value="10x"
            label="Faster proposals"
          />

          <Stat
            value="80%"
            label="Less manual writing"
          />

          <Stat
            value="24/7"
            label="AI assistance"
          />

          <Stat
            value="1 click"
            label="Proposal sharing"
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* CREATE PROPOSAL */}
      {/* ========================================================= */}

      <section
        id="create-proposal"
        className="relative overflow-hidden bg-slate-50 py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <Sparkles size={15} />

              Working prototype
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Create your proposal
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Enter your client's requirements and save a
              proposal directly to your backend.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Title */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Proposal title
                  </label>

                  <input
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    placeholder="E-commerce Website Development"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Client name */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Client name
                  </label>

                  <input
                    value={clientName}
                    onChange={(e) =>
                      setClientName(e.target.value)
                    }
                    placeholder="Acme Technologies"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Client email */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Client email
                  </label>

                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) =>
                      setClientEmail(e.target.value)
                    }
                    placeholder="client@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Budget */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Budget
                  </label>

                  <input
                    type="number"
                    value={budget}
                    onChange={(e) =>
                      setBudget(e.target.value)
                    }
                    placeholder="75000"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Currency */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Currency
                  </label>

                  <select
                    value={currency}
                    onChange={(e) =>
                      setCurrency(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>

                {/* Timeline */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Timeline
                  </label>

                  <input
                    type="number"
                    value={timeline}
                    onChange={(e) =>
                      setTimeline(e.target.value)
                    }
                    placeholder="6"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Timeline unit */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Timeline unit
                  </label>

                  <select
                    value={timelineUnit}
                    onChange={(e) =>
                      setTimelineUnit(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>

                {/* Technologies */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Technologies
                  </label>

                  <input
                    value={technologies}
                    onChange={(e) =>
                      setTechnologies(e.target.value)
                    }
                    placeholder="React, ASP.NET Core, MongoDB"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Separate technologies with commas.
                  </p>
                </div>

                {/* Requirements */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Client requirements
                  </label>

                  <textarea
                    value={requirements}
                    onChange={(e) =>
                      setRequirements(e.target.value)
                    }
                    rows={7}
                    placeholder="We need an online store with products, shopping cart, checkout, payments and an admin dashboard..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* Submit */}

              <button
                type="button"
                onClick={handleCreateProposal}
                disabled={isCreating}
                className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    {isLoadingProposal
                      ? "Loading proposal..."
                      : "Creating proposal..."}
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />

                    Create Proposal

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PROPOSAL RESULT */}
      {/* ========================================================= */}

      {proposal && (
        <section
          id="proposal-result"
          className="relative overflow-hidden bg-white py-28"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Heading */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Saved proposal
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                  {proposal.title}
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleLoadProposal}
                  disabled={isLoadingProposal}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 disabled:opacity-60"
                >
                  <RefreshCw
                    size={16}
                    className={
                      isLoadingProposal
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh
                </button>

                <button
                  type="button"
                  onClick={resetProposal}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  New Proposal
                </button>
              </div>
            </div>

            {/* Proposal card */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
              {/* Header */}

              <div className="border-b border-slate-200 bg-slate-50 p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Proposal ID
                    </p>

                    <p className="mt-1 break-all font-mono text-xs text-slate-700">
                      {proposal.id}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
                    {proposal.status}
                  </span>
                </div>
              </div>

              {/* Content */}

              <div className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <ProposalInfo
                    label="Client"
                    value={proposal.clientName}
                  />

                  <ProposalInfo
                    label="Budget"
                    value={`${proposal.currency} ${Number(
                      proposal.budget
                    ).toLocaleString("en-IN")}`}
                  />

                  <ProposalInfo
                    label="Timeline"
                    value={`${proposal.timeline} ${proposal.timelineUnit}`}
                  />
                </div>

                {/* Client email */}

                {proposal.clientEmail && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Client email
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-700">
                      {proposal.clientEmail}
                    </p>
                  </div>
                )}

                {/* Requirements */}

                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Client requirements
                  </p>

                  <div className="mt-3 rounded-2xl bg-slate-50 p-5">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {proposal.requirements}
                    </p>
                  </div>
                </div>

                {/* Technologies */}

                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Technologies
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {proposal.technologies.length > 0 ? (
                      proposal.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                          >
                            {technology}
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-sm text-slate-500">
                        No technologies specified.
                      </span>
                    )}
                  </div>
                </div>

                {/* Created */}

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-400">
                    Created
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {new Date(
                      proposal.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* FEATURES */}
      {/* ========================================================= */}

      <section
        id="features"
        className="relative overflow-hidden bg-white py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100/50 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Everything you need
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              From client requirements

              <span className="block text-slate-400">
                to a polished proposal.
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Stop staring at a blank document. Let AI
              handle the repetitive work while you stay in
              control.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Sparkles size={23} />}
              title="AI Generation"
              description="Turn raw client requirements into a structured proposal with scope, deliverables, milestones and more."
              number="01"
            />

            <FeatureCard
              icon={<FileText size={23} />}
              title="Professional Output"
              description="Create polished proposals that clearly communicate your value, timeline, scope and pricing."
              number="02"
            />

            <FeatureCard
              icon={<Zap size={23} />}
              title="Work Faster"
              description="Build proposals in minutes instead of spending hours rewriting the same sections for every client."
              number="03"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WORKFLOW */}
      {/* ========================================================= */}

      <section
        id="how-it-works"
        className="relative overflow-hidden bg-slate-950 py-28 text-white"
      >
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Simple workflow
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              Three steps.

              <span className="block text-slate-400">
                One professional proposal.
              </span>
            </h2>
          </div>

          <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3">
            <DarkStep
              number="01"
              title="Add Requirements"
              description="Paste the client's requirements, project details, budget and timeline."
            />

            <DarkStep
              number="02"
              title="Generate With AI"
              description="ProposalAI turns the information into structured, professional proposal content."
            />

            <DarkStep
              number="03"
              title="Edit & Send"
              description="Customize the proposal, add your branding and send it directly to your client."
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FINAL CTA */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden bg-white py-28">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30">
            <Sparkles size={25} />
          </div>

          <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Stop writing proposals

            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              from scratch.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Turn your next client requirement into a
            professional proposal in minutes.
          </p>

          <a
            href="#create-proposal"
            className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
          >
            Create Proposal

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </section>

      <Footer />

      {/* ========================================================= */}
      {/* ANIMATIONS */}
      {/* ========================================================= */}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-18px);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translate(0px, 0px);
          }

          50% {
            transform: translate(20px, -25px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dashboardEntrance {
          from {
            opacity: 0;
            transform:
              perspective(1800px)
              rotateX(10deg)
              translateY(60px)
              scale(0.96);
          }

          to {
            opacity: 1;
            transform:
              perspective(1800px)
              rotateX(4deg)
              translateY(0)
              scale(1);
          }
        }

        @keyframes cardLeft {
          0%, 100% {
            transform:
              translateY(0px)
              rotateY(8deg)
              rotateZ(-2deg);
          }

          50% {
            transform:
              translateY(-15px)
              rotateY(8deg)
              rotateZ(-2deg);
          }
        }

        @keyframes cardRight {
          0%, 100% {
            transform:
              translateY(0px)
              rotateY(-8deg)
              rotateZ(2deg);
          }

          50% {
            transform:
              translateY(-18px)
              rotateY(-8deg)
              rotateZ(2deg);
          }
        }

        @keyframes pointer {
          0%, 100% {
            transform: translate(0px, 0px);
          }

          50% {
            transform: translate(10px, -8px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 9s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out both;
        }

        .animate-fade-in-up-delay {
          animation: fadeInUp 0.8s 0.12s ease-out both;
        }

        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 0.8s 0.22s ease-out both;
        }

        .animate-fade-in-up-delay-3 {
          animation: fadeInUp 0.8s 0.32s ease-out both;
        }

        .animate-dashboard-entrance {
          animation: dashboardEntrance 1.1s 0.35s ease-out both;
        }

        .animate-card-left {
          animation: cardLeft 5s ease-in-out infinite;
        }

        .animate-card-right {
          animation: cardRight 6s ease-in-out infinite;
        }

        .animate-pointer {
          animation: pointer 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================================= */
/* COMPONENTS */
/* ============================================================= */

function FeatureCard({
  icon,
  title,
  description,
  number,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10">
      <span className="absolute right-7 top-6 text-5xl font-bold text-slate-100 transition-colors duration-500 group-hover:text-blue-50">
        {number}
      </span>

      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="relative mt-7 text-xl font-bold text-slate-950">
        {title}
      </h3>

      <p className="relative mt-3 text-sm leading-7 text-slate-600">
        {description}
      </p>

      <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
        Learn more
        <ArrowRight size={15} />
      </div>
    </div>
  );
}

function DarkStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/[0.07]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold shadow-lg shadow-blue-600/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {number}
      </div>

      <h3 className="mt-7 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {description}
      </p>

      <div className="mt-7 h-px w-12 bg-blue-500 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

function PreviewStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          {label}
        </span>

        <span className="text-blue-600">
          {icon}
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function PreviewItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <Check size={12} />
      </div>

      <span className="text-xs font-medium text-slate-700">
        {text}
      </span>
    </div>
  );
}

function DashboardNav({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-slate-500 hover:bg-slate-50"
      }`}
    >
      {children}
    </div>
  );
}

function MiniProgress({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px]">
        <span className="text-slate-500">
          {label}
        </span>

        <span className="font-semibold text-slate-700">
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
          style={{ width: value }}
        />
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="px-5 py-8 text-center sm:px-8">
      <p className="text-2xl font-bold text-slate-950 sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function ProposalInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}