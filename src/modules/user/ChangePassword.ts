import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  // login returns User | null
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    // auto login after password change
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    // check for token
    const userId = await redis.get(forgotPasswordPrefix + token);

    // check for user id

    if (!userId) {
      return null;
    }

    // fetch associated user

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}
