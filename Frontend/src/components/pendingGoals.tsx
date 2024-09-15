import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { usePendingGoals } from "../hooks/usePendingGoals";
import { goalsService } from "../services/goals";
import { OutlineButton } from "./ui/outline-button";

export const PendingGoals = () => {
  const queryClient = useQueryClient();
  const { data: pendingGoals } = usePendingGoals();
  if (!pendingGoals) return null;

  const handleCompleteGoal = async (goalId: string) => {
    await goalsService.CreateGoalCompletion(goalId);
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pendingGoals"] });
  };
  return (
    <div className="flex gap-3 flex-wrap">
      {pendingGoals.map((pendingGoal) => {
        return (
          <OutlineButton
            key={pendingGoal.id}
            disabled={
              pendingGoal.completionCount >= pendingGoal.desiredWeeklyFrequency
            }
            onClick={() => handleCompleteGoal(pendingGoal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {pendingGoal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
};
