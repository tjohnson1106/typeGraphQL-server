import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
  // login returns User | null
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    // compare passwords

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    // check for confirmed email

    if (!user.confirmed) {
      return null;
    }

    // return cookie with req object via ctx decorator

    ctx.req.session!.userId = user.id;

    return user;
  }
}
