import { Resolver, Mutation, Arg } from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("data")
    data: RegisterInput
  ) {
    return User.create(data).save();
  }
}
