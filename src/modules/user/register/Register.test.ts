import { testConnection } from "../../../test-utils/testConnection";
import { Connection } from "typeorm";
import { graphql } from "graphql";
import { gCall } from "../../../test-utils/gCall";

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
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstname: "thomas",
            lastname: "lastthomas",
            email: "thomas@thomas.com",
            password: "password01"
          }
        }
      })
    );
  });
});
