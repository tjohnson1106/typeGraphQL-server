import { redis } from "../../redis";
import { v4 } from "uuid";
import { confirmationPrefix } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (userId: number) => {
  // send token to server to verify
  // token should be stored in Redis
  const token = v4();
  await redis.set(confirmationPrefix + token, userId, "ex", 60 * 60 * 24); // 1 Day

  // redirect
  return `http://localhost:3000/user/confirm/${token}`;
};
