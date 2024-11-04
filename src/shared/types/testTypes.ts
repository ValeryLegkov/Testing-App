export interface Question {
  id: number;
  type: "single" | "multiple" | "short" | "long";
  questionText: string;
  options?: string[];
}

export interface Answer {
  questionId: number;
  selectedOptions?: string[];
  answerText?: string;
}
