export default {
	name: "DailyLog",
	type: "object",
	properties: {
		habit_id: {
			type: "string",
			description: "Reference to the HabitRecipe",
		},
		date: {
			type: "string",
			format: "date",
			description: "Date of the log entry",
		},
		status: {
			type: "string",
			enum: ["completed", "missed", "redesigned"],
			description: "Status of the habit for this day",
		},
		celebration_done: {
			type: "boolean",
			default: false,
			description: "Whether the user performed their celebration",
		},
		notes: {
			type: "string",
			description: "Optional notes about the completion or redesign",
		},
		redesign_reason: {
			type: "string",
			enum: ["too_hard", "forgot", "anchor_missing", "other"],
			description: "Reason for redesign if applicable",
		},
	},
	required: ["habit_id", "date", "status"],
};
