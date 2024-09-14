import { count, gte, lte, and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletations, goals } from "../db/schema";
import dayjs from "dayjs";

interface CreateGoalCompletionRequest {
  goalId: string;
}

export const createGoalCompletion = async ({
  goalId,
}: CreateGoalCompletionRequest) => {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  const goalCompletionCounts = db.$with("goal_completion_counts").as(
    db
      .select({
        goalId: goalCompletations.goalId,
        completionCount: count(goalCompletations.id).as("completionCount"),
      })
      .from(goalCompletations)
      .where(
        and(
          gte(goalCompletations.createdAt, firstDayOfWeek),
          lte(goalCompletations.createdAt, lastDayOfWeek),
          eq(goalCompletations.goalId, goalId)
        )
      )
      .groupBy(goalCompletations.goalId)
  );

  const result = await db
    .with(goalCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount:
        sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goals)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId));

  const { completionCount, desiredWeeklyFrequency } = result[0];

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error("Goal already completed this week");
  }

  const insertResult = await db
    .insert(goalCompletations)
    .values({ goalId })
    .returning();

  const goalCompletion = insertResult[0];

  return {
    goalCompletion,
  };
};
