import { Connection } from "typeorm";
import faker from "faker";

import { gCall } from "../../../test-utils/gCall";
import { testConnection } from "../../../test-utils/testConnection";

let conn: Connection;

beforeAll(async () => {
  await testConnection();
});

afterAll(async () => {
  await conn.close;
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
      firstname: faker.name.firstName,
      lastname: faker.name.lastName,
      email: faker.internet.email,
      password: faker.internet.password
    };

    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: user
        }
      })
    );
  });
});
