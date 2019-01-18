import { buildSchema } from "type-graphql";

import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/Me";
import { RegisterResolver } from "../modules/user/Register";

export const createSchema = () =>
  buildSchema({
    // 10182019 reverted back to manual resolver imports from globbing
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver
    ],

    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
