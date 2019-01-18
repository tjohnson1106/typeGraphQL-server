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

const meQuery = `
{
   me {
       id
       firstName
       lastName
       email
       name
   }
}
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      // hashing possible
      password: faker.internet.password()
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id
    });
    console.log(response);
  });
});
