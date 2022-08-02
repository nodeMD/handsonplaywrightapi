import { APIRequestContext } from "@playwright/test";

export const authenticate = async (
  request: APIRequestContext,
  username,
  password
) => {
  const tokenReq = await request.post("/auth", {
    data: {
      username,
      password,
    },
  });
  await tokenReq.json().then((body) => {
    process.env.TOKEN = body.token;
  });
  return tokenReq;
};
