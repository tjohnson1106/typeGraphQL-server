import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../../entity/User";

// User is resolved field
@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return await "Hello World";
  }

  @Mutation(() => User)
  // "schema name" -> function name
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
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
