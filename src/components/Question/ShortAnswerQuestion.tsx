import React from "react";
import { TextField, Typography } from "@mui/material";
import { Question, Answer } from "@/types/testTypes";

interface Props {
  question: Question;
  answer: Answer | null;
  onChange: (answer: Answer) => void;
}

const ShortAnswerQuestion: React.FC<Props> = ({
  question,
  answer,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ questionId: question.id, answerText: event.target.value });
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {question.questionText}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={answer?.answerText || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default ShortAnswerQuestion;
