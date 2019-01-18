import { Connection } from "typeorm";
import faker from "faker";

import { gCall } from "../../../test-utils/gCall";
import { testConnection } from "../../../test-utils/testConnection";
import { User } from "../../../entity/User";

let conn: Connection;

beforeAll(async () => {
  await testConnection();
});

afterAll(async () => {
  await conn.close();
});

// call schema with graphql schema

const registerMutation = `
mutation: Register($data: RegisterInput!) {
    register(
        data: $data
    ) {
        id
        firstname
        lastname
        email
        password
        name
    }
}
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email
        }
      }
    });

    const dbUser = await User.findOne({
      where: { email: user.email }
    });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstname);
  });
});
