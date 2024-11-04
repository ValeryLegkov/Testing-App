import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { Answer, Question } from "@/shared/types/testTypes";
import { mockDataQuestions } from "@/common/mockData";

interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  isTestFinished: boolean;
  reset: boolean;
}

const initialState: TestState = {
  questions: mockDataQuestions,
  currentQuestionIndex: 0,
  answers: [],
  isTestFinished: false,
  reset: false,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getItemFromLocalStorage(state) {
      const savedAnswers = localStorage.getItem("testAnswers");
      // const savedQuestionIndex = localStorage.getItem("currentQuestionIndex");

      if (savedAnswers) {
        try {
          state.answers = JSON.parse(savedAnswers);
        } catch (error) {
          console.error("Error parsing saved answers:", error);
        }
      }

      // if (savedQuestionIndex) {
      //   state.currentQuestionIndex = Number(savedQuestionIndex);
      // }
    },
    setItemToLocalStorage(state, action: PayloadAction<Answer>) {
      const newAnswer = action.payload;
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === newAnswer.questionId
      );

      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex] = newAnswer;
      } else {
        state.answers.push(newAnswer);
      }

      localStorage.setItem("testAnswers", JSON.stringify(state.answers));
      localStorage.setItem(
        "currentQuestionIndex",
        state.currentQuestionIndex.toString()
      );
    },

    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },

    finishTest(state) {
      state.isTestFinished = true;
      // state.reset = true;
      // localStorage.removeItem("testAnswers");
      // localStorage.removeItem("currentQuestionIndex");
    },

    resetTest(state) {
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.reset = true;
      state.isTestFinished = false;
      localStorage.removeItem("testAnswers");
      localStorage.removeItem("currentQuestionIndex");
    },
  },
});

export const {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  nextQuestion,
  finishTest,
  resetTest,
} = testSlice.actions;

export const selectCurrentQuestionIndex = (state: RootState) =>
  state.test.currentQuestionIndex;
export const selectAnswers = (state: RootState) => state.test.answers;
export const selectIsTestFinished = (state: RootState) =>
  state.test.isTestFinished;
export const selectReset = (state: RootState) => state.test.reset;
export const selectQuestions = (state: RootState) => state.test.questions;

export default testSlice.reducer;
