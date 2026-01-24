"use client";

import { createEntityStore } from "@/hooks/optimistic/create-entity-store";
import { createEntityMutations } from "@/hooks/optimistic/use-entity-mutations";
import { TodayHabitUI } from "@/lib/habits/type";

export const [HabitsProvider, useHabitsStore] = createEntityStore<TodayHabitUI>();
export const useHabitMutations = createEntityMutations(useHabitsStore);
