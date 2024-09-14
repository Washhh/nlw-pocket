import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../functions/getWeekPending";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/pending-goals", async (req, res) => {
    const { pendingGoals } = await getWeekPendingGoals();

    res.status(200).send({
      pendingGoals,
    });
  });
};
