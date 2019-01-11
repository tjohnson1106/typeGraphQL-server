import { Resolver, Query, Mutation } from "type-graphql";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return await "Hello World";
  }

  @Mutation(() => String)
  async register() {
    return "Hello World";
  }
}
