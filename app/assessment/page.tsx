
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PhaseOne from "@/components/PhaseOne";
import PhaseTwo from "@/components/PhaseTwo";
import PhaseThree from "@/components/PhaseThree";

import { getUser, logoutUser } from "@/lib/client-auth";

import type {
  Learner,
  PhaseResult,
} from "@/types/assessment";

type ActivePhase = 1 | 2 | 3;

const phaseNames = [
  "Pre-training",
  "Intra-training",
  "Post-training",
];

export default function AssessmentPage() {
  const router = useRouter();

  const [user, setUser] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);

  const [phase, setPhase] = useState<ActivePhase>(1);
  const [results, setResults] = useState<PhaseResult[]>([]);
  const [completed, setCompleted] = useState(false);

  // Check learner session
  useEffect(() => {
    const currentUser = getUser();

    if (!currentUser) {
      router.replace("/login");
    } else {
      setUser(currentUser);
    }

    setLoading(false);
  }, [router]);

  // Handle phase submission
  function handlePhaseSubmit(result: PhaseResult) {
    setResults((previous) => [...previous, result]);

    if (phase === 1) {
      setPhase(2);
    } else if (phase === 2) {
      setPhase(3);
    } else {
      setCompleted(true);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Logout
  function handleLogout() {
    logoutUser();
    router.replace("/login");
  }

  // Restart assessment
  function handleRestart() {
    setPhase(1);
    setResults([]);
    setCompleted(false);
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading assessment...
      </div>
    );
  }

  const totalScore = results.reduce(
    (sum, result) => sum + result.score,
    0
  );

  const totalQuestions = results.reduce(
    (sum, result) => sum + result.total,
    0
  );

  const percentage = totalQuestions
    ? Math.round((totalScore / totalQuestions) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold">
              D
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                DDAA
              </h1>

              <p className="text-xs text-slate-500">
                Assessment Platform
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-800">
                {user.name}
              </p>

              <p className="text-xs text-slate-500">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="text-sm text-slate-600 hover:text-red-600"
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      <div className="max-w-6xl mx-auto px-5 py-10">

        {/* Assessment Progress */}
        <div className="mb-10">

          <div className="flex items-center justify-between mb-4">

            <h2 className="font-semibold text-slate-900">
              Assessment Journey
            </h2>

            <span className="text-sm text-slate-500">
              {completed ? "Completed" : `Phase ${phase} of 3`}
            </span>

          </div>

          <div className="grid grid-cols-3 gap-3">

            {phaseNames.map((name, index) => {
              const number = index + 1;

              const isDone =
                completed || number < phase;

              const isActive =
                !completed && number === phase;

              return (
                <div
                  key={name}
                  className={`p-3 rounded-lg border ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900"
                      : isDone
                      ? "bg-slate-100 text-slate-700 border-slate-200"
                      : "bg-white text-slate-400 border-slate-200"
                  }`}
                >

                  <p className="text-xs mb-1">
                    PHASE 0{number}
                  </p>

                  <p className="text-sm font-semibold">
                    {name}
                  </p>

                  {isDone && (
                    <span className="text-xs">
                      Completed
                    </span>
                  )}

                </div>
              );
            })}

          </div>

        </div>

        {/* Display Current Phase */}
        {!completed && (
          <>
            {phase === 1 && (
              <PhaseOne onSubmit={handlePhaseSubmit} />
            )}

            {phase === 2 && (
              <PhaseTwo onSubmit={handlePhaseSubmit} />
            )}

            {phase === 3 && (
              <PhaseThree onSubmit={handlePhaseSubmit} />
            )}
          </>
        )}

        {/* Final Results */}
        {completed && (

          <div className="max-w-3xl mx-auto">

            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">

              <div className="h-16 w-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-3xl mx-auto mb-5">
                ✓
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Assessment Completed!
              </h1>

              <p className="text-slate-500 mt-2">
                Thank you, {user.name}. You have completed all three phases.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-sm text-slate-500">
                    Total Score
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {totalScore}/{totalQuestions}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-sm text-slate-500">
                    Overall Percentage
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {percentage}%
                  </p>
                </div>

              </div>

              {/* Individual Phase Scores */}
              <div className="text-left mt-8">

                <h2 className="font-semibold text-slate-900 mb-4">
                  Phase Results
                </h2>

                <div className="space-y-3">

                  {results.map((result) => (
                    <div
                      key={result.phaseTitle}
                      className="flex justify-between items-center border border-slate-200 rounded-lg p-4"
                    >

                      <span className="text-sm text-slate-700">
                        {result.phaseTitle}
                      </span>

                      <span className="font-semibold text-slate-900">
                        {result.score}/{result.total}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              <button
                onClick={handleRestart}
                className="w-full bg-slate-900 text-white rounded-lg py-3 mt-8 hover:bg-slate-800 transition"
              >
                Retake Assessment
              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}
