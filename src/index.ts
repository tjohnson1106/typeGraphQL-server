import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { RegisterResolver } from "./modules/user/Register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/Me";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

const SESSION_SECRET = "ajslkjalksjdfkl";

const main = async () => {
  // test email

  // db connect
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      MeResolver,
      RegisterResolver,
      LoginResolver,
      ConfirmUserResolver
    ],
    // remember: roles can be added here
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });

  // create a req object after redis implementation

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => ({ req })
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000/graphql");
  });
};

main();
