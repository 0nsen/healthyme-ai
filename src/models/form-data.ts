import z from "zod";

const minMessage = (num: number) => `Must be greater than ${num}`;

export const HealthFormSchema = z.object({
	name: z
		.string({ message: "Required" })
		.min(1, { message: "Cannot be empty" }),
	age: z.int({ message: "Required" }).positive({ message: minMessage(0) }),
	weight: z
		.number({ message: "Required" })
		.positive({ message: minMessage(0) }),
	height: z.int({ message: "Required" }).positive({ message: minMessage(0) }),
	weightGoal: z
		.number({ message: "Required" })
		.positive({ message: minMessage(0) }),
	dailyExerciseDuration: z
		.int({ message: "Required" })
		.positive({ message: minMessage(0) })
		.max(1440, { message: "Cannot exceed 1440 minutes a day" }),
});
export type HealthFormData = z.infer<typeof HealthFormSchema>;
