import React, { useState } from "react";

import { motion } from "framer-motion";
import { Check, Edit, MoreVertical, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { HabitFormButton } from "@/app/(dashboard)/_components/habit-form/habit-form-button";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/confirm/use-confirm";
import { useHabitMutations } from "@/hooks/habits-store";
import { deleteHabitAction } from "@/lib/habits/actions";
import { HabitUI } from "@/lib/habits/type";

type HabitActionButtonsProps = {
	isCompletedToday: boolean;
	habit: HabitUI;
};

export function HabitActionButtons({ habit, isCompletedToday }: HabitActionButtonsProps) {
	const [isPressed, setIsPressed] = useState(false);
	const [openEditForm, setOpenEditForm] = useState(false);
	const confirm = useConfirm();
	const { deleteItem } = useHabitMutations();

	const onComplete = () => {
		console.log("onComplete");
	};
	const onRedesign = () => {
		console.log("onRedesign");
	};
	const onEdit = () => setOpenEditForm(true);

	const onDelete = async () => {
		const isConfirmed = await confirm({
			title: "Delete Habit",
			message: "Are you sure you want to delete this habit? This action cannot be undone.",
		});

		if (!isConfirmed) return;

		deleteItem(habit.id, {
			persist: () => deleteHabitAction(habit.id),
			onSuccess: () => toast.success("Habit deleted successfully."),
			onError: () =>
				toast.error("Failed to delete habit.", {
					description: "Your changes have been reverted, please try again",
				}),
		});
	};

	return (
		<div className="flex items-center gap-2">
			{isCompletedToday ? (
				<div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-100 py-3 font-medium text-emerald-700">
					<Check className="h-5 w-5" />
					Done for today!
				</div>
			) : (
				<>
					<motion.button
						whileTap={{ scale: 0.95 }}
						onMouseDown={() => setIsPressed(true)}
						onMouseUp={() => setIsPressed(false)}
						onMouseLeave={() => setIsPressed(false)}
						onClick={onComplete}
						className="relative flex-1 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 to-green-600 py-3 font-medium text-white shadow-md shadow-emerald-200 transition-all hover:shadow-lg hover:shadow-emerald-300"
					>
						<motion.div
							animate={{ scale: isPressed ? 1.5 : 1, opacity: isPressed ? 0.3 : 0 }}
							className="absolute inset-0 rounded-xl bg-white"
						/>
						<span className="relative flex items-center justify-center gap-2">
							<Check className="h-5 w-5" />I did it!
						</span>
					</motion.button>

					<Button
						variant="outline"
						onClick={onRedesign}
						className="rounded-xl border-stone-200 px-4 py-3 text-stone-600 hover:bg-stone-50"
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
				</>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-xl text-stone-400 hover:text-stone-600"
					>
						<MoreVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="rounded-xl">
					<DropdownMenuItem onClick={onEdit} className="gap-2">
						<Edit className="h-4 w-4" />
						Edit Recipe
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onDelete} className="gap-2 text-rose-600 focus:text-rose-600">
						<Trash2 className="h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<HabitFormButton habit={habit} open={openEditForm} onOpenChange={setOpenEditForm} />
		</div>
	);
}
