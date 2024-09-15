const CreateGoalCompletion = async (goalId: string) => {
  await fetch("http://localhost:3333/goal-completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goalId,
    }),
  });
  return;
};

const DeleteGoalCompletion = async (goalCompletionId: string) => {
  await fetch("http://localhost:3333/delete-goal-completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goalCompletionId,
    }),
  });
  return;
};

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

const CreateGoal = async ({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) => {
  await fetch("http://localhost:3333/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });
  return;
};

export const goalsService = {
  CreateGoalCompletion,
  CreateGoal,
  DeleteGoalCompletion,
};
