import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../functions/getWeekSummary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/summary", async (req, res) => {
    const { summary } = await getWeekSummary();

    res.status(200).send({
      summary,
    });
  });
};
