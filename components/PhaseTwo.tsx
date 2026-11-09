
"use client";

import SBAQuiz from "./SBAQuiz";
import type {
  SBAQuestion,
  PhaseResult,
} from "@/types/assessment";

const questions: SBAQuestion[] = [
  {
    id: "p2-q1",
    prompt:
      "A patient develops severe anaphylaxis. Which medication is the first-line treatment?",
    options: [
      { id: "A", text: "Oral paracetamol" },
      { id: "B", text: "Intravenous antibiotics" },
      { id: "C", text: "Intramuscular epinephrine (adrenaline)" },
      { id: "D", text: "Oral antihistamine alone" },
    ],
    correctOptionId: "C",
  },
  {
    id: "p2-q2",
    prompt:
      "A patient presents with sudden facial weakness and difficulty speaking. Which initial brain imaging investigation is commonly used to assess suspected acute stroke?",
    options: [
      { id: "A", text: "Abdominal CT" },
      { id: "B", text: "Non-contrast CT of the head" },
      { id: "C", text: "Knee X-ray" },
      { id: "D", text: "Routine bone scan" },
    ],
    correctOptionId: "B",
  },
  {
    id: "p2-q3",
    prompt:
      "A conscious adult has low blood glucose and can swallow safely. Which action is generally appropriate initially?",
    options: [
      { id: "A", text: "Give a fast-acting oral glucose source" },
      { id: "B", text: "Give a large meal immediately" },
      { id: "C", text: "Restrict all food and fluids" },
      { id: "D", text: "Encourage vigorous exercise" },
    ],
    correctOptionId: "A",
  },
  {
    id: "p2-q4",
    prompt:
      "Before administering medication, what is an important patient-safety step?",
    options: [
      { id: "A", text: "Ask another patient to confirm identity" },
      { id: "B", text: "Check only the room number" },
      { id: "C", text: "Skip identity checks for familiar patients" },
      { id: "D", text: "Verify the patient using approved identifiers" },
    ],
    correctOptionId: "D",
  },
  {
    id: "p2-q5",
    prompt:
      "A procedure is expected to involve contact with a patient's blood. Which personal protective equipment is indicated?",
    options: [
      { id: "A", text: "Sunglasses" },
      { id: "B", text: "A shoe cover alone" },
      { id: "C", text: "Appropriate protective gloves" },
      { id: "D", text: "No protective equipment" },
    ],
    correctOptionId: "C",
  },
];

type Props = {
  onSubmit: (result: PhaseResult) => void;
};

export default function PhaseTwo({ onSubmit }: Props) {
  return (
    <SBAQuiz
      phaseNumber={2}
      phaseTitle="Intra-Training Assessment"
      phaseDescription="Apply your developing clinical knowledge to these scenarios."
      questions={questions}
      onSubmit={onSubmit}
    />
  );
}
