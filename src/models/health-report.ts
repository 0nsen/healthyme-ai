import z from "zod";
import { WeekDay } from "../config/constants";

const PercentageSchema = z.number().min(0).max(100);

const SummarySchema = z.object({
	bmi: z.number(),
	bmiCategory: z.string(),
	text: z.string(),
});

const ExerciseCalendarSchema = z.object({
	day: z.enum(WeekDay),
	activity: z.string(),
	duration: z.string(),
	caloriesBurned: z.number().nonnegative(),
});

const NutritionInsightsSchema = z.object({
	dailyCalories: z.number().positive(),
	macros: z
		.object({
			protein: PercentageSchema,
			carbs: PercentageSchema,
			fat: PercentageSchema,
		})
		.refine(
			(data) => {
				const sum = data.protein + data.carbs + data.fat;
				return Math.abs(sum - 100) < 0.01;
			},
			{
				message: "Macro percentages must sum to 100%",
			},
		),
});

const ActivityCompositionSchema = z
	.object({
		cardio: PercentageSchema,
		strength: PercentageSchema,
		stretching: PercentageSchema,
		rest: PercentageSchema,
	})
	.refine(
		(data) => {
			const sum = data.cardio + data.strength + data.stretching + data.rest;
			return Math.abs(sum - 100) < 0.01;
		},
		{
			message: "Activity composition percentages must sum to 100%",
		},
	);

const BodyCompositionSchema = z
	.object({
		muscle: PercentageSchema,
		fat: PercentageSchema,
		water: PercentageSchema,
		bone: PercentageSchema,
	})
	.refine(
		(data) => {
			const sum = data.muscle + data.fat + data.water + data.bone;
			return Math.abs(sum - 100) < 0.01;
		},
		{
			message: "Body composition percentages must sum to 100%",
		},
	);

const WeightProgressSchema = z.object({
	week: z.number().int().positive(),
	projectedWeight: z.number().nonnegative(),
});

const TimelineSchema = z.object({
	estimatedWeeks: z.number().int().positive(),
	targetDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
	progressPercent: PercentageSchema,
});

export const HealthReportSchema = z.object({
	summary: SummarySchema,
	exerciseCalendar: z.array(ExerciseCalendarSchema),
	nutritionInsights: NutritionInsightsSchema,
	activityComposition: ActivityCompositionSchema,
	bodyComposition: BodyCompositionSchema,
	weightProgress: z.array(WeightProgressSchema),
	timeline: TimelineSchema,
});
export type HealthReport = z.infer<typeof HealthReportSchema>;

export interface HealthReportHeaderInfo {
	name: string;
	age: number;
	currentWeight: number;
	weightGoal: number;
}

export type HealthReportStatus = "idle" | "loading" | "succeeded" | "failed";
