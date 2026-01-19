export default {
	name: "HabitRecipe",
	type: "object",
	properties: {
		anchor: {
			type: "string",
			description: "The existing routine that triggers the tiny behavior (After I...)",
		},
		tiny_behavior: {
			type: "string",
			description: "The super small action taking less than 30 seconds (I will...)",
		},
		celebration: {
			type: "string",
			description: "The immediate positive emotion or action (Then I will...)",
		},
		anchor_category: {
			type: "string",
			enum: ["morning", "meals", "work", "evening", "other"],
			default: "other",
			description: "Category of the anchor routine",
		},
		is_active: {
			type: "boolean",
			default: true,
			description: "Whether this habit recipe is currently active",
		},
		streak: {
			type: "number",
			default: 0,
			description: "Current streak of consecutive completions",
		},
		total_completions: {
			type: "number",
			default: 0,
			description: "Total number of times this habit was completed",
		},
		last_completed_date: {
			type: "string",
			format: "date",
			description: "Date of last completion",
		},
		times_redesigned: {
			type: "number",
			default: 0,
			description: "Number of times this habit was redesigned",
		},
	},
	required: ["anchor", "tiny_behavior", "celebration"],
};
