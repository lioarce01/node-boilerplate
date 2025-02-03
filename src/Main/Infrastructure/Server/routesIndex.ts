import { FastifyInstance } from "fastify";
import userRoutes from "../../../User/Infrastructure/HTTP/Routes/UserRoutes";

export default async function routes(fastify: FastifyInstance)
{
    //all entities routes
    fastify.register(userRoutes, { prefix: "/users" })
    // fastify.register(productsRoutes, { prefix: "/products" })  //EXAMPLE!

}