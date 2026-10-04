import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

import Navbar from "../layout/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
// import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setError("");

    try {
      setLoading(true);

      await forgotPassword(email);

      setSent(true);

      toast.success("Password reset link sent!");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to send reset email";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Mail size={22} />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-slate-900">
                Forgot your password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your email address and we'll send you a
                password reset link.
              </p>
            </div>

            {sent ? (
              <div className="mt-8 rounded-xl bg-green-50 p-5 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Sparkles size={18} />
                </div>

                <h3 className="mt-3 font-semibold text-green-800">
                  Check your email
                </h3>

                <p className="mt-2 text-sm text-green-700">
                  If an account exists for this email, you'll
                  receive a password reset link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <Input
                  id="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                />

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full"
                >
                  Send Reset Link
                </Button>
              </form>
            )}

            <Link
              to="/login"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}