import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import SingleChoiceQuestion from "@/components/Question/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/components/Question/MultipleChoiceQuestion";
import ShortAnswerQuestion from "@/components/Question/ShortAnswerQuestion";
import LongAnswerQuestion from "@/components/Question/LongAnswerQuestion";
import Progress from "./Progress";
import Timer from "./Timer";
import { Question, Answer } from "@/types/testTypes";
import { mockDataQuestions } from "@/common/mockData";
import Swal from "sweetalert2";
import { checkAnswersForButtonDisabled } from "@/utils/validation/checkAnswersForButtonDisabled";

const questions: Question[] = mockDataQuestions;

const Test: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timerReset, setTimerReset] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const totalQuestions = questions.length;

  const isAnswerValid = checkAnswersForButtonDisabled(
    answers,
    questions,
    currentQuestionIndex
  );

  useEffect(() => {
    const savedAnswers = localStorage.getItem("testAnswers");
    const savedQuestionIndex = localStorage.getItem("currentQuestionIndex");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (error) {
        console.error("Error parsing saved answers:", error);
      }
    }

    if (savedQuestionIndex) {
      setCurrentQuestionIndex(Number(savedQuestionIndex));
    }
  }, []);

  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem("testAnswers", JSON.stringify(answers));
    }
    localStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );
  }, [answers, currentQuestionIndex]);

  const handleAnswerChange = (answer: Answer) => {
    setAnswers((prev) => {
      const existingAnswer = prev.find(
        (a) => a.questionId === answer.questionId
      );
      if (existingAnswer) {
        return prev.map((a) =>
          a.questionId === answer.questionId ? answer : a
        );
      }

      return [...prev, answer];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimerReset(true);
    setIsTestFinished(false);
    localStorage.removeItem("testAnswers");
    localStorage.removeItem("currentQuestionIndex");
  };

  const handleFinish = () => {
    console.log("Test finished. Answers:", answers);
    setIsTestFinished(true);
    Swal.fire({
      title: "Test Completed!",
      text: "Your answers have been saved successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      restartTest();
    });
  };

  const handleTimeUp: () => void = () => {
    Swal.fire({
      title: "Time is up!",
      text: "You ran out of time!",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      restartTest();
    });
  };

  return (
    <Container maxWidth="lg" className="p-4 mt-4 mx-auto">
      <Typography
        variant="h4"
        color="primary"
        sx={{
          fontWeight: "bold",
          mb: 2,
          letterSpacing: "0.1rem",
          textDecoration: "underline",
        }}
      >
        Testing your knowledge
      </Typography>
      <Timer
        totalTime={240}
        onTimeUp={handleTimeUp}
        reset={timerReset}
        isTestFinished={isTestFinished}
      />
      <Progress
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
      />
      {questions[currentQuestionIndex].type === "single" && (
        <SingleChoiceQuestion
          question={questions[currentQuestionIndex]}
          answer={
            answers.find(
              (a) => a.questionId === questions[currentQuestionIndex].id
            ) || null
          }
          onChange={handleAnswerChange}
        />
      )}
      {questions[currentQuestionIndex].type === "multiple" && (
        <MultipleChoiceQuestion
          question={questions[currentQuestionIndex]}
          answer={
            answers.find(
              (a) => a.questionId === questions[currentQuestionIndex].id
            ) || null
          }
          onChange={handleAnswerChange}
        />
      )}
      {questions[currentQuestionIndex].type === "short" && (
        <ShortAnswerQuestion
          question={questions[currentQuestionIndex]}
          answer={
            answers.find(
              (a) => a.questionId === questions[currentQuestionIndex].id
            ) || null
          }
          onChange={handleAnswerChange}
        />
      )}
      {questions[currentQuestionIndex].type === "long" && (
        <LongAnswerQuestion
          question={questions[currentQuestionIndex]}
          answer={
            answers.find(
              (a) => a.questionId === questions[currentQuestionIndex].id
            ) || null
          }
          onChange={handleAnswerChange}
        />
      )}
      <div className=" mt-5">
        {currentQuestionIndex < totalQuestions - 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isAnswerValid}
          >
            Next
          </Button>
        )}
        {currentQuestionIndex === totalQuestions - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinish}
            disabled={!isAnswerValid}
          >
            Finish
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Test;
