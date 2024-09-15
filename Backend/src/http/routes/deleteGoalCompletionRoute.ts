import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteGoalCompletion } from "../../functions/deleteGoalCompletion";

export const deleteGoalCompletionRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/delete-goal-completions",
    {
      schema: {
        body: z.object({
          goalCompletionId: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { goalCompletionId } = req.body;
      await deleteGoalCompletion({ goalCompletionId });

      res.status(201).send("success");
    }
  );
};
