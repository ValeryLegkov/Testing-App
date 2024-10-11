import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Question, Answer } from "@/types/testTypes";

interface Props {
  question: Question;
  answer: Answer | null;
  onChange: (answer: Answer) => void;
}

const SingleChoiceQuestion: React.FC<Props> = ({
  question,
  answer,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      questionId: question.id,
      selectedOptions: [event.target.value],
    });
  };

  return (
    <FormControl component="fieldset">
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {question.questionText}
      </Typography>
      <RadioGroup
        value={answer?.selectedOptions ? answer.selectedOptions[0] : ""}
        onChange={handleChange}
        sx={{
          display: "grid",
          gridTemplateColumns:
            (question.options?.length ?? 0) > 5 ? "1fr 1fr" : "1fr",
          gap: 1,
        }}
      >
        {question.options?.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SingleChoiceQuestion;
