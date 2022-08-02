import { test, expect } from "@playwright/test";
import { authenticate } from "../methods/authenticate";

test.describe("Authentication API tests", () => {
  test("user is able to authenticate", async ({ request }) => {
    const req = await authenticate(
      request,
      process.env.TEST_USERNAME,
      process.env.TEST_PASSWORD
    );
    expect(req.ok()).toBeTruthy();
    expect(process.env.TOKEN).toBeTruthy();
  });

  test("user is unable to authenticate while using wrong data", async ({
    request,
  }) => {
    const req = await authenticate(request, "name", "pass");
    expect(await req.text()).toEqual('{"reason":"Bad credentials"}');
  });
});
