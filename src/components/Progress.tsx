import React from "react";
import { LinearProgress, Typography } from "@mui/material";

interface Props {
  currentStep: number;
  totalSteps: number;
}

const Progress: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div>
      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
        Progress: {currentStep}/{totalSteps}
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 3 }} />
    </div>
  );
};

export default Progress;
