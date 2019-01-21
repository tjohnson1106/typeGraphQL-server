import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field,
  UseMiddleware
} from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";
import { Product } from "../../entity/Product";
import { Middleware } from "type-graphql/interfaces/Middleware";

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  // may need "isAbstract: true, abstract class" when extends as opposed to return
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(
      @Arg("data", () => inputType)
      data: any
    ) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User
);

export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  Product
);

// abstact extending

// @Resolver()
// export class CreateUserResolver extends BaseCreateUser {
//   //   @Mutation(() => User)
//   //   async createUser(
//   //     @Arg("data")
//   //     data: RegisterInput
//   //   ) {
//   //     return User.create(data).save();
//   //   }
// }

// @Resolver()
// export class CreateProductResolver extends BaseCreateProduct {}
