import type { LlmClient } from "../types/llm-client";
import { GeminiClient } from "./gemini-client";

let llmClient: LlmClient | undefined;

export const getLlmClient = (): LlmClient => {
	llmClient = new GeminiClient(import.meta.env.VITE_GEMINI_API_KEY);
	return llmClient;
};
