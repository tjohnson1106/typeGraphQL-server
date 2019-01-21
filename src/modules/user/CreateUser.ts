import { Resolver, Mutation, Arg, ClassType } from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";

function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `${suffix}` })
    async create(
      @Arg("data", () => inputType)
      data: any
    ) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

const BaseCreateUser = createBaseResolver("User", User, RegisterInput, User);

@Resolver()
export class CreateUserResolver extends BaseCreateUser {
  //   @Mutation(() => User)
  //   async createUser(
  //     @Arg("data")
  //     data: RegisterInput
  //   ) {
  //     return User.create(data).save();
  //   }
}
