import React from "react";
import { Typography } from "@mui/material";
import { useTimer } from "@/components/Timer/hook/useTimer";

type TimerProps = {
  totalTime: number;
  onTimeUp: () => void;
  reset: boolean;
  isTestFinished: boolean;
};

const Timer: React.FC<TimerProps> = ({
  totalTime,
  onTimeUp,
  reset,
  isTestFinished,
}) => {
  const { timeLeft, formatTime } = useTimer({
    totalTime,
    onTimeUp,
    reset,
    isTestFinished,
  });

  return (
    <Typography
      variant="h6"
      sx={{
        marginBottom: "20px",
        border: "2px solid",
        padding: "5px",
        width: "fit-content",
        opacity: 0.5,
        fontWeight: "normal",
      }}
    >
      Time Left: {formatTime(timeLeft)}
    </Typography>
  );
};

export default Timer;
