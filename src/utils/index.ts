export const buildPrompt = (
	template: string,
	input: Record<string, unknown>,
): string => {
	let prompt = template;
	Object.entries(input).forEach(([key, value]) => {
		prompt = prompt.replaceAll(`{{${key}}}`, `${value}`);
	});
	return prompt;
};
