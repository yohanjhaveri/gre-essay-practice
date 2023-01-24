import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentTimeInSecondsUNIX } from "../utils/datetime";
import { AppState, Essays } from "./types";
import data from "../data.json";

const initialState: AppState = {
  select: null,
  active: null,
  essays: data as Essays,
};

export const slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // ========== VIEW ==========

    select: (state, action: PayloadAction<string>) => {
      // ensure that state is inactive before selecting essay
      if (!state.active?.id) {
        state.select = action.payload;
      }
    },

    unselect: (state) => {
      state.select = null;
    },

    // ========== WRITE ==========

    start: (state, action: PayloadAction<string>) => {
      // ensure that state is inactive before activating essay
      if (!state.active?.id) {
        state.active = {
          id: action.payload,
          answer: "",
          startTime: getCurrentTimeInSecondsUNIX(),
        };
      }
    },

    update: (state, action: PayloadAction<string>) => {
      // ensure that state is active before updating essay
      if (state.active?.id) {
        state.active.answer = action.payload;
      }
    },

    cancel: (state) => {
      // ensure that state is active before cancelling essay
      if (state.active?.id) {
        state.active = null;
      }
    },

    submit: (state, action: PayloadAction<number>) => {
      // ensure that state is active before submitting essay
      if (state.active?.id) {
        // update essay cache with submission data
        state.essays = state.essays.map((essay) =>
          essay.id === state.active?.id
            ? {
                ...essay,
                answer: state.active.answer,
                startTime: state.active.startTime,
                submitTime: action.payload,
              }
            : essay
        );

        // reset state to inactive
        state.active = {
          id: "",
          answer: "",
          startTime: 0,
        };
      }
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
