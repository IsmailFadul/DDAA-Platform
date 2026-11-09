
"use client";

import SBAQuiz from "./SBAQuiz";
import type {
  SBAQuestion,
  PhaseResult,
} from "@/types/assessment";

const questions: SBAQuestion[] = [
  {
    id: "p1-q1",
    prompt:
      "A patient presents with acute chest pain and suspected acute coronary syndrome. Which investigation should be obtained promptly?",
    options: [
      { id: "A", text: "Chest X-ray" },
      { id: "B", text: "12-lead ECG" },
      { id: "C", text: "Abdominal ultrasound" },
      { id: "D", text: "Pulmonary function test" },
    ],
    correctOptionId: "B",
  },
  {
    id: "p1-q2",
    prompt:
      "What does a pulse oximeter primarily measure?",
    options: [
      { id: "A", text: "Blood glucose level" },
      { id: "B", text: "Blood pressure" },
      { id: "C", text: "Peripheral oxygen saturation" },
      { id: "D", text: "Heart electrical activity" },
    ],
    correctOptionId: "C",
  },
  {
    id: "p1-q3",
    prompt:
      "Which combination is generally appropriate for identifying a patient before medication administration?",
    options: [
      { id: "A", text: "Room number and bed number" },
      { id: "B", text: "Full name and date of birth" },
      { id: "C", text: "Ward name and diagnosis" },
      { id: "D", text: "Bed number and age" },
    ],
    correctOptionId: "B",
  },
  {
    id: "p1-q4",
    prompt:
      "When should a healthcare worker perform hand hygiene in relation to touching a patient?",
    options: [
      { id: "A", text: "Before touching the patient" },
      { id: "B", text: "Only after leaving the ward" },
      { id: "C", text: "Only when hands look dirty" },
      { id: "D", text: "Only after administering medication" },
    ],
    correctOptionId: "A",
  },
  {
    id: "p1-q5",
    prompt:
      "Which statement about antibiotics is most accurate?",
    options: [
      { id: "A", text: "They treat all types of infection" },
      { id: "B", text: "They are always needed for fever" },
      { id: "C", text: "They directly treat viral infections" },
      { id: "D", text: "They act against susceptible bacterial infections" },
    ],
    correctOptionId: "D",
  },
];

type Props = {
  onSubmit: (result: PhaseResult) => void;
};

export default function PhaseOne({ onSubmit }: Props) {
  return (
    <SBAQuiz
      phaseNumber={1}
      phaseTitle="Pre-Training Assessment"
      phaseDescription="This assessment establishes your baseline clinical knowledge."
      questions={questions}
      onSubmit={onSubmit}
    />
  );
}
