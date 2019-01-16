import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { logger } from "../middleware/logger";

// User is resolved field
@Resolver()
export class RegisterResolver {
  // isAuthenticated
  @UseMiddleware(isAuthenticated, logger)
  @Query(() => String)
  async hello() {
    return await "Hello World";
  }

  @Mutation(() => User)
  // "schema name" -> function name
  async register(@Arg("data")
  {
    email,
    firstName,
    lastName,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
