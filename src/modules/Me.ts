import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../entity/User";
import { MyContext } from "src/types/MyContext";

// Current session? -> return User

@Resolver()
export class MeResolver {
  @Query(() => User, {
    nullable: true,
    complexity: 10
  })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    // check for user id

    if (!ctx.req.session!.userId) {
      // make sure graphql casts undefined to null

      return undefined;
    }

    return User.findOne(ctx.req.session!.userId);
  }
}
