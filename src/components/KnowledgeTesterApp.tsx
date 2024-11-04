import React, { useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { QuestionRenderer } from "@/components/QuestionRenderer";
import Progress from "./Progress";
import Timer from "./Timer/Timer";
import { TOTAL_TIME_IN_SECONDS } from "@/shared/constant/time";
import { Answer } from "@/shared/types/testTypes";
import Swal from "sweetalert2";
import { checkAnswersForButtonDisabled } from "@/utils/validation/checkAnswersForButtonDisabled";
import { useSelector, useDispatch } from "react-redux";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  nextQuestion,
  finishTest,
  resetTest,
  selectCurrentQuestionIndex,
  selectAnswers,
  selectIsTestFinished,
  selectReset,
  selectQuestions,
} from "@/store/testSlice";

const KnowledgeTesterApp: React.FC = () => {
  const dispatch = useDispatch();

  const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);
  const answers = useSelector(selectAnswers);
  const isTestFinished = useSelector(selectIsTestFinished);
  const timerReset = useSelector(selectReset);
  const questions = useSelector(selectQuestions);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer =
    answers.find((a) => a.questionId === questions[currentQuestionIndex].id) ||
    null;
  const isAnswerValid = checkAnswersForButtonDisabled(
    answers,
    questions,
    currentQuestionIndex
  );

  useEffect(() => {
    dispatch(getItemFromLocalStorage());
  }, [dispatch]);

  const handleAnswerChange = (answer: Answer) => {
    dispatch(setItemToLocalStorage(answer));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      dispatch(nextQuestion());
    }
  };

  const handleFinish = () => {
    console.log("Test finished. Answers:", answers);
    dispatch(finishTest());
    Swal.fire({
      title: "Test Completed!",
      text: "Your answers have been saved successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      dispatch(resetTest());
    });
  };

  const handleTimeUp: () => void = () => {
    Swal.fire({
      title: "Time is up!",
      text: "You ran out of time!",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      dispatch(resetTest());
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
        totalTime={TOTAL_TIME_IN_SECONDS}
        onTimeUp={handleTimeUp}
        reset={timerReset}
        isTestFinished={isTestFinished}
      />
      <Progress
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
      />
      <QuestionRenderer
        question={currentQuestion}
        answer={currentAnswer}
        onChange={handleAnswerChange}
      />
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

export default KnowledgeTesterApp;
