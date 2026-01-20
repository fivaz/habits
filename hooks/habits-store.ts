import { createEntityStore } from "@/hooks/optimistic/create-entity-store";
import { createEntityMutations } from "@/hooks/optimistic/use-entity-mutations";
import { HabitUI } from "@/lib/habits/type";

export const [HabitsProvider, useHabitsStore] = createEntityStore<HabitUI>();
export const useHabitMutations = createEntityMutations(useHabitsStore);
