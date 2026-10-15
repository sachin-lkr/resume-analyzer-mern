import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({ email, password });

    navigate("/");
  };

  // Loading UI
 if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#6366F1] border-r-[#8B5CF6]"></div>
    </main>
  );
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFF] to-[#EEF2FF] px-4 py-10 lg:px-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side: Product Branding & Features (Visible on Desktop) */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 pr-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-3.5 py-1.5 text-xs font-semibold text-[#6366F1] w-fit border border-indigo-100">
            <span className="flex h-2 w-2 rounded-full bg-[#6366F1] animate-pulse"></span>
            AI-Powered Career & Interview Platform
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight">
            Master Your Next Role with{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="text-base text-[#64748B] leading-relaxed">
            Upload your resume, analyze it against target job descriptions,
            uncover critical skill gaps, and get a tailored interview strategy
            and preparation roadmap instantly.
          </p>

          {/* Feature Highlight Cards */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="font-semibold text-[#0F172A] text-sm mb-1 flex items-center gap-2">
                <span>🎯</span> JD & Resume Match
              </div>
              <p className="text-xs text-[#64748B]">
                Get exact match scores and critical skill gap insights.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="font-semibold text-[#0F172A] text-sm mb-1 flex items-center gap-2">
                <span>🚀</span> Custom Roadmaps
              </div>
              <p className="text-xs text-[#64748B]">
                Personalized interview questions and prep roadmap.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="w-full max-w-md mx-auto rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-xl shadow-[#6366F1]/10">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Login to continue your AI-powered interview preparation
            </p>
          </div>
            <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Email Address
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Password
            </label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-3 font-semibold text-white shadow-lg shadow-[#6366F1]/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6366F1]/30 active:translate-y-0"
          >
            Login
          </button>
        </form>

            {/* Register Link */}
        <p className="mt-6 text-center text-sm text-[#64748B]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#6366F1] transition hover:text-[#8B5CF6]"
          >
            Register
          </Link>
        </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
