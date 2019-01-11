import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";

// test resolver
@Resolver()
class HelloResolver {
  @Query(() => String, {
    name: "HelloWorldAdjust"
  })
  async hello() {
    return await "Hello World";
  }
}

const main = async () => {
  // db connect
  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000/graphql");
  });
};

main();
