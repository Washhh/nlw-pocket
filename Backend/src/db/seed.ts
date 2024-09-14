import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletations, goals } from "./schema";

const seed = async () => {
  await db.delete(goalCompletations);
  await db.delete(goals);

  const resultGoalsInsert = await db
    .insert(goals)
    .values([
      {
        title: "Acordar cedo",
        desiredWeeklyFrequency: 6,
      },
      {
        title: "Ir para academia",
        desiredWeeklyFrequency: 5,
      },
      {
        title: "Estudar",
        desiredWeeklyFrequency: 7,
      },
    ])
    .returning();

  const startOfWeek = dayjs().startOf("week");

  await db.insert(goalCompletations).values([
    {
      goalId: resultGoalsInsert[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: resultGoalsInsert[1].id,
      createdAt: startOfWeek.add(1, "day").toDate(),
    },
    {
      goalId: resultGoalsInsert[2].id,
      createdAt: startOfWeek.add(1, "week").toDate(),
    },
  ]);
};

seed().finally(() => {
  client.end();
});
