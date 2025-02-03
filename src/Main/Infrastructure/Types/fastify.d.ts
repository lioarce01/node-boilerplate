import "fastify";
import { DependencyContainer } from "tsyringe";

declare module "fastify" {
    interface FastifyInstance
    {
        container: DependencyContainer;
    }
}