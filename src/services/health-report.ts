import { HealthReportSchema, type HealthReport } from "../models/health-report";
import type { LlmClient } from "../types/llm-client";
import promptTemplate from "../config/prompt.md?raw";
import { buildPrompt } from "../utils";
import type { HealthFormData } from "../models/form-data";

export const generateReport = async (
	llmClient: LlmClient,
	data: HealthFormData,
): Promise<HealthReport> => {
	const prompt = buildPrompt(promptTemplate, data);
	const output = await llmClient.generate(prompt);
	if (!output) throw new Error(`LLM returned no output`);

	const cleaned = output.replace(/```json|```/g, "").trim();
	const object = JSON.parse(cleaned);

	return HealthReportSchema.parse(object);
};
