import { configureStore } from "@reduxjs/toolkit";
import { getLlmClient } from "../lib";
import healthReportReducer from "./health-report-slice";

const llmClient = getLlmClient();

export const store = configureStore({
	reducer: {
		healthReport: healthReportReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: { extraArgument: llmClient },
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
