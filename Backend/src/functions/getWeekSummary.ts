import dayjs from "dayjs";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletations, goals } from "../db/schema";

export const getWeekSummary = async () => {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );

  const goalsCompletedInWeek = db.$with("goal_completed_in_week").as(
    db
      .select({
        id: goalCompletations.id,
        title: goals.title,
        completedAt: goalCompletations.createdAt,
        completedAtDate: sql`
        DATE(${goalCompletations.createdAt})`.as("completedAtDate"),
      })
      .from(goalCompletations)
      .innerJoin(goals, eq(goals.id, goalCompletations.goalId))
      .where(
        and(
          gte(goalCompletations.createdAt, firstDayOfWeek),
          lte(goalCompletations.createdAt, lastDayOfWeek)
        )
      )
  );

  const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql`
                JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', ${goalsCompletedInWeek.id},
                'title',${goalsCompletedInWeek.title},
                'completedAt', ${goalsCompletedInWeek.completedAt}
                ))
            `.as("completions"),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
  );

  const summary = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goolsPerDay: sql`
      JSON_OBJECT_AGG(
        ${goalsCompletedByWeekDay.completedAtDate},
        ${goalsCompletedByWeekDay.completions}
      )`,
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary,
  };
};
