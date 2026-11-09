export type SBAOption = {
  id: string;
  text: string;
};

export type SBAQuestion = {
  id: string;
  prompt: string;
  options: SBAOption[];
  correctOptionId: string;
};

export type PhaseResult = {
  phaseTitle: string;
  answers: Record<string, string>;
  score: number;
  total: number;
};

export type Learner = {
  name: string;
  email: string;
};