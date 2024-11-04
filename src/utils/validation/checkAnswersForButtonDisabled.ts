import { Question, Answer } from "@/shared/types/testTypes";

export const checkAnswersForButtonDisabled = (
  answers: Answer[],
  questions: Question[],
  currentQuestionIndex: number
) => {
  const currentAnswer = answers.find(
    (a) => a.questionId === questions[currentQuestionIndex].id
  );

  if (!currentAnswer) {
    return false;
  }

  switch (questions[currentQuestionIndex].type) {
    case "short":
    case "long":
      return currentAnswer.answerText && currentAnswer.answerText.trim() !== "";

    case "single":
    case "multiple":
      return (
        currentAnswer.selectedOptions &&
        currentAnswer.selectedOptions.length > 0
      );

    default:
      return false;
  }
};
