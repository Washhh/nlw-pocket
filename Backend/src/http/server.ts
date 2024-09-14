import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createCompletionRoute } from "./routes/createCompletionRoute";
import { createGoalRoute } from "./routes/createGoalRoute";
import { getPendingGoalsRoute } from "./routes/getPendingGoalsRoute";
import { getWeekSummaryRoute } from "./routes/getWeekSummaryRoute";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Rotas
app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running");
  });
