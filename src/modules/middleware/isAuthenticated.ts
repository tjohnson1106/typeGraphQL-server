import { MiddlewareFn } from "type-graphql";

import { MyContext } from "../../types/MyContext";

// req property required <MyContext> typee

export const isAuthenticated: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  if (!context.req.session!.userId) {
    throw new Error("Not Authenticated");
  }

  return next();
};
