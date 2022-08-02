import { test, expect } from "@playwright/test";

test.describe("Get booking IDs API tests", () => {
  test("user is able to get booking IDs", async ({ request }) => {
    const bookingIdsReq = await request.get("/booking");
    expect(bookingIdsReq.ok()).toBeTruthy();
    expect(
      await bookingIdsReq.json().then((body) => {
        return body[0];
      })
    ).toHaveProperty("bookingid");
  });
});
