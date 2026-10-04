import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  ArrowUpRight,
  BookOpen,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                <Sparkles size={19} />
              </div>

              <div>
                <span className="text-lg font-bold">
                  Proposal
                </span>

                <span className="text-lg font-bold text-blue-400">
                  AI
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              Create professional client proposals in minutes
              with the power of AI.
            </p>

            {/* Contact */}
            <a
              href="mailto:support@proposalai.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <Mail size={16} />
              support@proposalai.com
            </a>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Features
                </a>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  AI Proposal Generator
                </Link>
              </li>

              <li>
                <a
                  href="#pricing"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Pricing
                </a>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                  <BookOpen size={15} />
                  Documentation
                  <ArrowUpRight size={13} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Proposal Templates
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                  <MessageCircle size={15} />
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@proposalai.com"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                  <ShieldCheck size={15} />
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {currentYear} ProposalAI. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built for freelancers & agencies.
          </p>
        </div>
      </div>
    </footer>
  );
}