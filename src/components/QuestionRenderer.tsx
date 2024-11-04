import React from "react";
import { Question, Answer } from "@/shared/types/testTypes";
import SingleChoiceQuestion from "@/components/Questions/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/components/Questions/MultipleChoiceQuestion";
import ShortAnswerQuestion from "@/components/Questions/ShortAnswerQuestion";
import LongAnswerQuestion from "@/components/Questions/LongAnswerQuestion";

type QuestionRenderProps = {
  question: Question;
  answer: Answer | null;
  onChange: (answer: Answer) => void;
};

export const QuestionRenderer: React.FC<QuestionRenderProps> = ({
  question,
  answer,
  onChange,
}) => {
  switch (question.type) {
    case "single":
      return (
        <SingleChoiceQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );
    case "multiple":
      return (
        <MultipleChoiceQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );

    case "short":
      return (
        <ShortAnswerQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );
    case "long":
      return (
        <LongAnswerQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
};
