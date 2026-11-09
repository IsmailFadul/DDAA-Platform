
"use client";

import { useState, type FormEvent } from "react";
import type {
  SBAQuestion,
  PhaseResult,
} from "@/types/assessment";

type SBAQuizProps = {
  phaseTitle: string;
  phaseDescription: string;
  phaseNumber: number;
  questions: SBAQuestion[];
  onSubmit: (result: PhaseResult) => void;
};

export default function SBAQuiz({
  phaseTitle,
  phaseDescription,
  phaseNumber,
  questions,
  onSubmit,
}: SBAQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const answeredCount = questions.filter(
    (question) => answers[question.id]
  ).length;

  const allAnswered = answeredCount === questions.length;

  function handleAnswer(questionId: string, optionId: string) {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionId,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!allAnswered) return;

    const score = questions.filter(
      (question) =>
        answers[question.id] === question.correctOptionId
    ).length;

    onSubmit({
      phaseTitle,
      answers,
      score,
      total: questions.length,
    });
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Phase Heading */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500 mb-2">
          PHASE {phaseNumber} OF 3
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          {phaseTitle}
        </h1>

        <p className="text-slate-500 mt-2">
          {phaseDescription}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600">
            Questions answered
          </span>

          <span className="font-medium text-slate-900">
            {answeredCount} / {questions.length}
          </span>
        </div>

        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-300"
            style={{
              width: `${(answeredCount / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Questions */}
      <form onSubmit={handleSubmit}>

        <div className="space-y-6">

          {questions.map((question, index) => (
            <section
              key={question.id}
              className="bg-white border border-slate-200 rounded-xl p-6"
            >

              <div className="flex gap-3 mb-5">

                <span className="h-8 w-8 shrink-0 bg-slate-100 rounded-lg flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </span>

                <h2 className="font-semibold text-slate-900 leading-relaxed">
                  {question.prompt}
                </h2>

              </div>

              {/* Radio Options */}
              <div className="space-y-3">

                {question.options.map((option) => (
                  <label
                    key={option.id}
                    className="block cursor-pointer"
                  >

                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() =>
                        handleAnswer(question.id, option.id)
                      }
                      className="peer sr-only"
                      required
                    />

                    <span className="flex items-center gap-3 border border-slate-200 rounded-lg p-4 transition hover:bg-slate-50 peer-checked:border-slate-900 peer-checked:bg-slate-50 peer-focus-visible:ring-2 peer-focus-visible:ring-slate-500">

                      <span className="h-5 w-5 rounded-full border-2 border-slate-400 flex items-center justify-center shrink-0 peer-checked:border-slate-900">
                        {answers[question.id] === option.id && (
                          <span className="h-2.5 w-2.5 bg-slate-900 rounded-full" />
                        )}
                      </span>

                      <span className="text-sm text-slate-700">
                        {option.text}
                      </span>

                    </span>

                  </label>
                ))}

              </div>

            </section>
          ))}

        </div>

        {/* Submission */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-slate-500">
            {allAnswered
              ? "All questions answered. You can submit."
              : `Please answer ${questions.length - answeredCount} more question(s).`}
          </p>

          <button
            type="submit"
            disabled={!allAnswered}
            className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
          >
            {phaseNumber === 3
              ? "Submit Final Assessment"
              : "Submit & Continue"}
          </button>

        </div>

      </form>

    </div>
  );
}

