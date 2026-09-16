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

export const toChartBreakdown = (
	record: Record<string, number>,
	fieldKey: "type" | "item",
): { [key: string]: string | number }[] =>
	Object.entries(record).map(([key, value]) => ({
		[fieldKey]: key.charAt(0).toUpperCase() + key.slice(1),
		value,
	}));
