import React, { useState, useRef } from "react";

import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#6366F1] border-r-[#8B5CF6]"></div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFF] to-[#EEF2FF] px-4 py-10 sm:px-6 lg:px-10">
      {/* Page Header */}
      <header className="mx-auto mb-8 max-w-6xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
          Create Your Custom{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            Interview Plan
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* Main Card */}
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_10px_40px_rgba(99,102,241,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Panel - Job Description */}
          <div className="p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#6366F1]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>

              <h2 className="text-lg font-semibold text-[#0F172A]">
                Target Job Description
              </h2>

              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                Required
              </span>
            </div>

            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              className="min-h-[300px] w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFF] p-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:bg-white focus:ring-4 focus:ring-[#6366F1]/10"
              placeholder={`Paste the job description here...
Example: We are looking for a MERN Stack Developer with skills in React, Node.js, Express.js and MongoDB.`}
              maxLength={5000}
            />

            <div className="mt-2 text-right text-xs text-[#94A3B8]">
              0 / 5000 chars
            </div>
          </div>

          {/* Right Panel - Profile */}
          <div className="border-t border-[#E2E8F0] p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#6366F1]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>

              <h2 className="text-lg font-semibold text-[#0F172A]">
                Your Profile
              </h2>
            </div>

            {/* Upload Resume */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                Upload Resume
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-[#10B981]">
                  Best Results
                </span>
              </label>

              <label
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFF] px-5 py-8 text-center transition hover:border-[#6366F1] hover:bg-[#EEF2FF]"
                htmlFor="resume"
              >
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#DBEAFE] text-[#6366F1]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </span>

                <p className="text-sm font-semibold text-[#0F172A]">
                  Click to upload or drag &amp; drop
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  PDF or DOCX (Max 5MB)
                </p>

                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                />
              </label>
            </div>

            {/* OR Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E2E8F0]" />
              <span className="text-xs font-medium text-[#94A3B8]">OR</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </div>

            {/* Quick Self-Description */}
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
                htmlFor="selfDescription"
              >
                Quick Self-Description
              </label>

              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                id="selfDescription"
                name="selfDescription"
                className="min-h-[120px] w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFF] p-4 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:bg-white focus:ring-4 focus:ring-[#6366F1]/10"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            {/* Info Box */}
            <div className="mt-5 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <span className="mt-0.5 text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                    stroke="#1a1f27"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12.01"
                    y2="16"
                    stroke="#1a1f27"
                    strokeWidth="2"
                  />
                </svg>
              </span>

              <p className="text-xs leading-5 text-[#64748B]">
                Either a <strong className="text-[#0F172A]">Resume</strong> or a{" "}
                <strong className="text-[#0F172A]">Self Description</strong> is
                required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex flex-col gap-4 border-t border-[#E2E8F0] bg-[#FAFBFF] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="text-xs text-[#64748B]">
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>

          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section className="mx-auto mt-10 max-w-6xl">
          <h2 className="mb-4 text-xl font-bold text-[#0F172A]">
            My Recent Interview Plans
          </h2>

          <ul className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <li
                key={report._id}
                className="cursor-pointer rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3 className="font-semibold text-[#0F172A]">
                  {report.title || "Untitled Position"}
                </h3>

                <p className="mt-1 text-xs text-[#64748B]">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    report.matchScore >= 80
                      ? "bg-emerald-50 text-[#10B981]"
                      : report.matchScore >= 60
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-500"
                  }`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Page Footer */}
      <footer className="mx-auto mt-12 flex max-w-6xl justify-center gap-6 border-t border-[#E2E8F0] pt-6 text-xs text-[#64748B]">
        <a href="#" className="transition hover:text-[#6366F1]">
          Privacy Policy
        </a>

        <a href="#" className="transition hover:text-[#6366F1]">
          Terms of Service
        </a>

        <a href="#" className="transition hover:text-[#6366F1]">
          Help Center
        </a>
      </footer>
    </div>
  );
};

export default Home;
