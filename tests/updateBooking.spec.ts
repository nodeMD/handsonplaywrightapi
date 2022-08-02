import { test, expect } from "@playwright/test";
import { bookingBody } from "../data/bookingBody";
import { authenticate } from "../methods/authenticate";
import { createBooking } from "../methods/createBooking";

test.describe("Update booking API tests", () => {
  test.beforeAll(async ({ request }) => {
    await authenticate(
      request,
      process.env.TEST_USERNAME,
      process.env.TEST_PASSWORD
    );
    await createBooking(request, bookingBody);
  });

  test("user is able to update booking", async ({ request }) => {
    const updateBookingReq = await request.put(`/booking/${process.env.ID}`, {
      headers: {
        Cookie: `token=${process.env.TOKEN}`,
      },
      data: bookingBody,
    });
    expect(updateBookingReq.ok()).toBeTruthy();
    expect(await updateBookingReq.json()).toEqual(bookingBody);
  });

  test("user is unable to update booking while using wrong id", async ({
    request,
  }) => {
    const updateBookingReq = await request.put("/booking/a", {
      headers: {
        Cookie: `token=${process.env.TOKEN}`,
      },
      data: bookingBody,
    });
    expect(updateBookingReq.ok()).toBeFalsy();
    expect(await updateBookingReq.text()).toEqual("Method Not Allowed");
  });

  test("user is unable to update booking without providing auth token", async ({
    request,
  }) => {
    const updateBookingReq = await request.put(`/booking/${process.env.ID}`, {
      data: bookingBody,
    });
    expect(updateBookingReq.ok()).toBeFalsy();
    expect(await updateBookingReq.text()).toEqual("Forbidden");
  });

  test("user is unable to update booking while using wrong token", async ({
    request,
  }) => {
    const updateBookingReq = await request.put(`/booking/${process.env.ID}`, {
      headers: {
        Cookie: "token=something",
      },
      data: bookingBody,
    });
    expect(updateBookingReq.ok()).toBeFalsy();
    expect(await updateBookingReq.text()).toEqual("Forbidden");
  });

  test("user is unable to update booking without providing request data", async ({
    request,
  }) => {
    const updateBookingReq = await request.put(`/booking/${process.env.ID}`, {
      headers: {
        Cookie: `token=${process.env.TOKEN}`,
      },
      data: "",
    });
    expect(updateBookingReq.ok()).toBeFalsy();
    expect(await updateBookingReq.text()).toEqual("Bad Request");
  });
});
