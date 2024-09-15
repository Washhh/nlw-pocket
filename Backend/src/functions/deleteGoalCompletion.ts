import { eq } from "drizzle-orm";
import { db } from "../db";
import { goalCompletations } from "../db/schema";

interface DeleteGoalCompletionRequest {
  goalCompletionId: string;
}

export const deleteGoalCompletion = async ({
  goalCompletionId,
}: DeleteGoalCompletionRequest) => {
  await db
    .delete(goalCompletations)
    .where(eq(goalCompletations.id, goalCompletionId));
};
