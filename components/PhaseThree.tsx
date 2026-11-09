
"use client";

import SBAQuiz from "./SBAQuiz";
import type {
  SBAQuestion,
  PhaseResult,
} from "@/types/assessment";

const questions: SBAQuestion[] = [
  {
    id: "p3-q1",
    prompt:
      "A patient presents with chest discomfort and suspected myocardial ischemia. Which test provides an early assessment of cardiac electrical activity?",
    options: [
      { id: "A", text: "Electrocardiogram (ECG)" },
      { id: "B", text: "Urine culture" },
      { id: "C", text: "Abdominal ultrasound" },
      { id: "D", text: "Skin allergy test" },
    ],
    correctOptionId: "A",
  },
  {
    id: "p3-q2",
    prompt:
      "A healthcare worker accidentally touches a non-sterile surface with a sterile glove. What should happen next?",
    options: [
      { id: "A", text: "Continue using the glove" },
      { id: "B", text: "Replace the contaminated glove" },
      { id: "C", text: "Wipe the glove with a dry cloth" },
      { id: "D", text: "Ignore the contamination" },
    ],
    correctOptionId: "B",
  },
  {
    id: "p3-q3",
    prompt:
      "What should be checked before administering a medication to a patient?",
    options: [
      { id: "A", text: "The patient's room decoration" },
      { id: "B", text: "The patient's meal preference only" },
      { id: "C", text: "The patient's documented medication allergies" },
      { id: "D", text: "The patient's visitor list" },
    ],
    correctOptionId: "C",
  },
  {
    id: "p3-q4",
    prompt:
      "Which device provides a non-invasive estimate of peripheral arterial oxygen saturation?",
    options: [
      { id: "A", text: "Thermometer" },
      { id: "B", text: "Stethoscope" },
      { id: "C", text: "Sphygmomanometer" },
      { id: "D", text: "Pulse oximeter" },
    ],
    correctOptionId: "D",
  },
  {
    id: "p3-q5",
    prompt:
      "Which approach represents good clinical documentation practice?",
    options: [
      { id: "A", text: "Record accurate, objective information promptly" },
      { id: "B", text: "Document events from memory several weeks later" },
      { id: "C", text: "Delete inconvenient clinical observations" },
      { id: "D", text: "Use personal opinions instead of observations" },
    ],
    correctOptionId: "A",
  },
];

type Props = {
  onSubmit: (result: PhaseResult) => void;
};

export default function PhaseThree({ onSubmit }: Props) {
  return (
    <SBAQuiz
      phaseNumber={3}
      phaseTitle="Post-Training Assessment"
      phaseDescription="Demonstrate the clinical knowledge gained through training."
      questions={questions}
      onSubmit={onSubmit}
    />
  );
}
