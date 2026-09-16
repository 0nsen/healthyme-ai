import { GoogleGenAI } from "@google/genai";
import type { LlmClient } from "../types/llm-client";

export class GeminiClient implements LlmClient {
	private readonly model: GoogleGenAI;

	constructor(apiKey: string) {
		this.model = new GoogleGenAI({ apiKey: apiKey });
	}

	async generate(input: string): Promise<string | undefined> {
		const interaction = await this.model.interactions.create({
			model: "gemini-3.5-flash",
			input: input,
		});
		return interaction.output_text;
	}
}
