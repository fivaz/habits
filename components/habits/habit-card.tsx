import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Briefcase, Check, Coffee, Edit,Flame, Moon, MoreVertical, RefreshCw, Sun, Trash2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryIcons = {
    morning: Sun,
    meals: Coffee,
    work: Briefcase,
    evening: Moon,
    other: Sun
};

const categoryColors = {
    morning: "from-amber-100 to-orange-100 text-amber-700",
    meals: "from-emerald-100 to-teal-100 text-emerald-700",
    work: "from-blue-100 to-indigo-100 text-blue-700",
    evening: "from-violet-100 to-purple-100 text-violet-700",
    other: "from-stone-100 to-stone-200 text-stone-600"
};

export default function HabitCard({
                                      habit,
                                      isCompletedToday,
                                      onComplete,
                                      onRedesign,
                                      onEdit,
                                      onDelete
                                  }) {
    const [isPressed, setIsPressed] = useState(false);
    const CategoryIcon = categoryIcons[habit.anchor_category || 'other'];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative rounded-2xl border bg-white shadow-sm overflow-hidden transition-all ${
                isCompletedToday ? 'border-emerald-300 bg-emerald-50/50' : 'border-stone-200'
            }`}
        >
            {/* Category Badge */}
            <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full bg-gradient-to-r ${categoryColors[habit.anchor_category || 'other']} flex items-center gap-1.5`}>
                <CategoryIcon className="w-3 h-3" />
                <span className="text-xs font-medium capitalize">{habit.anchor_category || 'other'}</span>
            </div>

            <div className="p-5">
                {/* ABC Recipe */}
                <div className="space-y-3 mb-5 pr-20">
                    {/* Anchor */}
                    <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-500">A</span>
                        <div>
                            <p className="text-xs text-stone-400 uppercase tracking-wide">Anchor</p>
                            <p className="text-stone-700 font-medium">{habit.anchor}</p>
                        </div>
                    </div>

                    {/* Behavior */}
                    <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-600">B</span>
                        <div>
                            <p className="text-xs text-stone-400 uppercase tracking-wide">Tiny Behavior</p>
                            <p className="text-stone-800 font-semibold">{habit.tiny_behavior}</p>
                        </div>
                    </div>

                    {/* Celebration */}
                    <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-600">C</span>
                        <div>
                            <p className="text-xs text-stone-400 uppercase tracking-wide">Celebration</p>
                            <p className="text-amber-700">{habit.celebration}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                {habit.streak > 0 && (
                    <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-stone-50 border border-stone-100">
                        <div className="flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-semibold text-stone-700">{habit.streak}</span>
                            <span className="text-xs text-stone-500">day streak</span>
                        </div>
                        <div className="w-px h-4 bg-stone-200" />
                        <div className="text-xs text-stone-500">
                            {habit.total_completions || 0} total
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {isCompletedToday ? (
                        <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-100 text-emerald-700 font-medium">
                            <Check className="w-5 h-5" />
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
                                className="flex-1 relative overflow-hidden py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium shadow-md shadow-emerald-200 transition-all hover:shadow-lg hover:shadow-emerald-300"
                            >
                                <motion.div
                                    animate={{ scale: isPressed ? 1.5 : 1, opacity: isPressed ? 0.3 : 0 }}
                                    className="absolute inset-0 bg-white rounded-xl"
                                />
                                <span className="relative flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  I did it!
                </span>
                            </motion.button>

                            <Button
                                variant="outline"
                                onClick={onRedesign}
                                className="py-3 px-4 rounded-xl border-stone-200 hover:bg-stone-50 text-stone-600"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        </>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl text-stone-400 hover:text-stone-600">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem onClick={onEdit} className="gap-2">
                                <Edit className="w-4 h-4" />
                                Edit Recipe
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onDelete} className="gap-2 text-rose-600 focus:text-rose-600">
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.div>
    );
}