import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
} from "@mui/material";
import { Question, Answer } from "@/types/testTypes";

interface Props {
  question: Question;
  answer: Answer | null;
  onChange: (answer: Answer) => void;
}

const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  answer,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOptions = answer?.selectedOptions || [];
    if (event.target.checked) {
      selectedOptions.push(event.target.value);
    } else {
      const index = selectedOptions.indexOf(event.target.value);
      selectedOptions.splice(index, 1);
    }
    onChange({ questionId: question.id, selectedOptions });
  };

  return (
    <FormControl component="fieldset">
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {question.questionText}
      </Typography>
      <FormGroup
        sx={{
          display: "grid",
          gridTemplateColumns:
            (question.options?.length ?? 0) >= 4 ? "1fr 1fr" : "1fr",
          gap: 1,
        }}
      >
        {question.options?.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={answer?.selectedOptions?.includes(option) || false}
                value={option}
                onChange={handleChange}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MultipleChoiceQuestion;
