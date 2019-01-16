import { Resolver, Mutation, Arg } from "type-graphql";
import { redis } from "../../redis";

import { User } from "../../entity/User";

@Resolver()
export class ConfirmUserResolver {
  // login returns User | null
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(token);

    if (!userId) {
      return false;
    }

    await User.update(
      {
        // if problematic cast to any
        id: parseInt(userId, 10)
      },
      {
        confirmed: true
      }
    );

    await redis.del(token);

    return true;
  }
}
