import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { prettifyError, ZodError } from "zod";
import type { LlmClient } from "../types/llm-client";
import type { HealthFormData } from "../models/form-data";
import type {
	HealthReport,
	HealthReportHeaderInfo,
	HealthReportStatus,
} from "../models/health-report";
import { generateReport } from "../services/health-report";
import type { AppDispatch, RootState } from "./index";

interface HealthReportState {
	status: HealthReportStatus;
	report?: HealthReport;
	headerInfo?: HealthReportHeaderInfo;
	errorMessage?: string;
	lastSubmittedValues?: HealthFormData;
}

const initialState: HealthReportState = {
	status: "idle",
};

interface GenerateHealthReportFulfilled {
	report: HealthReport;
	headerInfo: HealthReportHeaderInfo;
}

export const generateHealthReport = createAsyncThunk<
	GenerateHealthReportFulfilled,
	HealthFormData,
	{
		state: RootState;
		dispatch: AppDispatch;
		extra: LlmClient;
		rejectValue: string;
	}
>("healthReport/generate", async (formData, thunkAPI) => {
	try {
		const report = await generateReport(thunkAPI.extra, formData);
		const headerInfo: HealthReportHeaderInfo = {
			name: formData.name,
			age: formData.age,
			currentWeight: formData.weight,
			weightGoal: formData.weightGoal,
		};

		return { report, headerInfo };
	} catch (error) {
		if (error instanceof ZodError) {
			return thunkAPI.rejectWithValue(
				`The AI response was not in the expected format:\n${prettifyError(error)}`,
			);
		}

		const message =
			error instanceof Error
				? error.message
				: "Failed to generate health report.";
		return thunkAPI.rejectWithValue(message);
	}
});

const healthReportSlice = createSlice({
	name: "healthReport",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(generateHealthReport.pending, (state, action) => {
				state.status = "loading";
				state.errorMessage = undefined;
				state.lastSubmittedValues = action.meta.arg;
			})
			.addCase(generateHealthReport.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.report = action.payload.report;
				state.headerInfo = action.payload.headerInfo;
			})
			.addCase(generateHealthReport.rejected, (state, action) => {
				state.status = "failed";
				state.errorMessage =
					action.payload ?? action.error.message ?? "Something went wrong.";
			});
	},
});

export default healthReportSlice.reducer;
