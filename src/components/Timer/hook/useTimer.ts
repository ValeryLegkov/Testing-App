import { useState, useEffect, useRef } from "react";
import {
  SECONDS_IN_MINUTE,
  MILLISECONDS_IN_ONE_SECOND,
} from "@/shared/constant/time";

type UseTimerProps = {
  totalTime: number;
  onTimeUp: () => void;
  reset: boolean;
  isTestFinished: boolean;
};

export const useTimer = ({
  totalTime,
  onTimeUp,
  reset,
  isTestFinished,
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (reset || isTestFinished) {
      setTimeLeft(totalTime);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    }
    startTimeRef.current = null;
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
        (timestamp - startTimeRef.current) / MILLISECONDS_IN_ONE_SECOND
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
  }, [totalTime, onTimeUp, isTestFinished, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
    const remainingSeconds = seconds % SECONDS_IN_MINUTE;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return { timeLeft, formatTime };
};
