import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-hot-toast";

import Navbar from "../layout/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
// import { login } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // POST /api/auth/login
      const response = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      // Save JWT
      localStorage.setItem(
        "accessToken",
        response.accessToken
      );

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      toast.success("Login successful!");

      // Navigate to dashboard
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: any) {
      console.error("Login error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        "Unable to login. Please check your email and password.";

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

            {/* Header */}
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Sparkles size={22} />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-slate-900">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue to ProposalAI
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Email */}
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }
                }}
                error={errors.email}
              />

              {/* Password */}
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (errors.password) {
                      setErrors((prev) => ({
                        ...prev,
                        password: undefined,
                      }));
                    }
                  }}
                  error={errors.password}
                />

                {/* Password Eye */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-[38px] flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Bottom Trust Text */}
          <p className="mt-5 text-center text-xs text-slate-400">
            Secure authentication powered by ProposalAI
          </p>
        </div>
      </main>
    </div>
  );
}