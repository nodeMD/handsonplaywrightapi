import { test, expect } from "@playwright/test";
import { bookingBody } from "../data/bookingBody";
import { createBooking } from "../methods/createBooking";

test.describe("Get booking by ID API tests", () => {
  test.beforeAll(async ({ request }) => {
    await createBooking(request, bookingBody);
  });

  test("user is able get booking by id", async ({ request }) => {
    const bookingReq = await request.get(`/booking/${process.env.ID}`);
    expect(bookingReq.ok()).toBeTruthy();
    expect(await bookingReq.json()).toEqual(bookingBody);
  });

  test("user is unable to get booking with wrong id", async ({ request }) => {
    const bookingReq = await request.get("/booking/a");
    expect(bookingReq.ok()).toBeFalsy();
    expect(await bookingReq.text()).toEqual("Not Found");
  });
});
