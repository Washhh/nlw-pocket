import fastify from "fastify";
import { createGoal } from "../functions/createGoal";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { getWeekPendingGoals } from "../functions/getWeekPending";
import { createGoalCompletion } from "../functions/createGoalCompletion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Rotas

// POSTs
// Criar meta
app.post(
  "/goals",
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async (req, res) => {
    const { title, desiredWeeklyFrequency } = req.body;

    const goal = await createGoal({
      title,
      desiredWeeklyFrequency,
    });

    res.status(201).send(goal);
  }
);

app.post(
  "/goal-completions",
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async (req, res) => {
    const { goalId } = req.body;
    const goalCompletions = await createGoalCompletion({ goalId });

    res.status(201).send(goalCompletions);
  }
);

// GETs
// Buscar metas e retornar seus valores de frequência para comparação
app.get("/pending-goals", async (req, res) => {
  const { pendingGoals } = await getWeekPendingGoals();

  res.status(200).send({
    pendingGoals,
  });
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running");
  });
