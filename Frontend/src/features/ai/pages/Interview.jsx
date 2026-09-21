import React, { useState, useEffect } from "react";

import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// Sub-components 
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#F8FAFF]"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#6366F1] text-sm font-semibold">
          Q{index + 1}
        </span>

        <p className="flex-1 text-sm sm:text-base font-semibold text-[#0F172A] leading-6">
          {item.question}
        </p>

        <span
          className={`flex-shrink-0 text-[#64748B] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {open && (
        <div className="border-t border-[#E2E8F0] bg-[#F8FAFF] px-5 py-5 space-y-5">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#DBEAFE] text-[#2563EB] text-xs font-semibold mb-2">
              Intention
            </span>
            <p className="text-sm text-[#64748B] leading-6">{item.intention}</p>
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold mb-2">
              Model Answer
            </span>
            <p className="text-sm text-[#475569] leading-6">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <span className="px-3 py-1 rounded-lg bg-[#EEF2FF] text-[#6366F1] text-xs font-bold">
        Day {day.day}
      </span>

      <h3 className="text-base font-semibold text-[#0F172A]">{day.focus}</h3>
    </div>

    <ul className="space-y-3">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-[#64748B]">
          <span className="w-2 h-2 mt-2 rounded-full bg-[#8B5CF6] flex-shrink-0" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

//  Main Component 
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold text-[#0F172A]">
          Loading your interview plan...
        </h1>
        <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#6366F1] border-r-[#8B5CF6]">
          {" "}
        </div>
      </main>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "score--high"
      : report.matchScore >= 60
        ? "score--mid"
        : "score--low";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFF] to-[#EEF2FF] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row bg-white border border-[#E2E8F0] rounded-2xl shadow-lg overflow-hidden min-h-[650px]">
          {/* Left Nav */}
          <nav className="w-full lg:w-64 flex flex-col justify-between bg-[#F8FAFF] border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Sections
              </p>

              <div className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeNav === item.id
                        ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-md"
                        : "text-[#64748B] hover:bg-white hover:text-[#6366F1]"
                    }`}
                    onClick={() => setActiveNav(item.id)}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>

                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5">
              <button
                onClick={() => {
                  getResumePdf(interviewId);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <svg
                  height={"0.8rem"}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8024 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path>
                </svg>
                Download Resume
              </button>
            </div>
          </nav>

          {/* ── Center Content ── */}
          <main className="flex-1 min-w-0 p-5 sm:p-7 lg:p-8">
            {activeNav === "technical" && (
              <section>
                <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-5">
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Technical Questions
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold">
                    {report.technicalQuestions.length} questions
                  </span>
                </div>

                <div className="space-y-3">
                  {report.technicalQuestions.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>
              </section>
            )}

            {activeNav === "behavioral" && (
              <section>
                <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-5">
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Behavioral Questions
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold">
                    {report.behavioralQuestions.length} questions
                  </span>
                </div>

                <div className="space-y-3">
                  {report.behavioralQuestions.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>
              </section>
            )}

            {activeNav === "roadmap" && (
              <section>
                <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-5">
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Preparation Road Map
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold">
                    {report.preparationPlan.length}-day plan
                  </span>
                </div>

                <div className="space-y-4">
                  {report.preparationPlan.map((day) => (
                    <RoadMapDay key={day.day} day={day} />
                  ))}
                </div>
              </section>
            )}
          </main>

          {/*  Right Sidebar  */}
          <aside className="w-full lg:w-64 xl:w-72 bg-[#F8FAFF] border-t lg:border-t-0 lg:border-l border-[#E2E8F0] p-5 sm:p-6">
            {/* Match Score */}
            <div className="flex flex-col items-center">
              <p className="self-start text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-5">
                Match Score
              </p>

              <div
                className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${
                  scoreColor === "score--high"
                    ? "border-[#10B981]"
                    : scoreColor === "score--mid"
                      ? "border-[#F59E0B]"
                      : "border-[#EF4444]"
                }`}
              >
                <span className="text-4xl font-bold text-[#0F172A]">
                  {report.matchScore}
                </span>

                <span className="text-sm font-semibold text-[#64748B]">%</span>
              </div>

              <p className="mt-4 text-sm font-medium text-[#10B981] text-center">
                Strong match for this role
              </p>
            </div>

            <div className="my-7 border-t border-[#E2E8F0]" />

            {/* Skill Gaps */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Skill Gaps
              </p>

              <div className="flex flex-col gap-2">
                {report.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className={`inline-flex w-fit max-w-full px-3 py-2 rounded-lg text-xs font-semibold border ${
                      gap.severity === "high"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : gap.severity === "medium"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-emerald-50 text-emerald-600 border-emerald-200"
                    }`}
                  >
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Interview;
