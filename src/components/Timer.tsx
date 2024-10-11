import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";

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
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (reset || isTestFinished) {
      setTimeLeft(totalTime);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      startTimeRef.current = null;
    }
  }, [reset, totalTime, isTestFinished]);

  useEffect(() => {
    if (isTestFinished || timeLeft <= 0) {
      if (timeLeft <= 0) {
        onTimeUp();
      }
      return;
    }

    const updateTimer = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsedSeconds = Math.floor(
        (timestamp - startTimeRef.current) / 1000
      );

      setTimeLeft(totalTime - elapsedSeconds);

      if (totalTime - elapsedSeconds <= 0) {
        return;
      }

      rafIdRef.current = requestAnimationFrame(updateTimer);
    };

    rafIdRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [timeLeft, onTimeUp, totalTime, isTestFinished]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

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
