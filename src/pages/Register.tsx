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
// import { register } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
      });

      // Save authentication data
      localStorage.setItem(
        "accessToken",
        response.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      toast.success("Account created successfully!");

      // Redirect to dashboard
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: any) {
      console.error("Registration error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        "Unable to create account. Please try again.";

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
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Start creating professional proposals with AI
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Name */}
              <Input
                id="name"
                label="Full name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors((prev) => ({
                      ...prev,
                      name: undefined,
                    }));
                  }
                }}
                error={errors.name}
              />

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
                  placeholder="Create a password"
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

              {/* Confirm Password */}
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  label="Confirm password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);

                    if (errors.confirmPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }));
                    }
                  }}
                  error={errors.confirmPassword}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-3 top-[38px] flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Secure authentication powered by ProposalAI
          </p>
        </div>
      </main>
    </div>
  );
}