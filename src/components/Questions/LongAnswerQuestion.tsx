import React from "react";
import { TextField, Typography } from "@mui/material";
import { Question, Answer } from "@/shared/types/testTypes";

interface Props {
  question: Question;
  answer: Answer | null;
  onChange: (answer: Answer) => void;
}

const LongAnswerQuestion: React.FC<Props> = ({
  question,
  answer,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        multiline
        rows={4}
        value={answer?.answerText || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default LongAnswerQuestion;
