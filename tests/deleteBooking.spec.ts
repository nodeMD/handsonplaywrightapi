import { test, expect } from "@playwright/test";
import { bookingBody } from "../data/bookingBody";
import { authenticate } from "../methods/authenticate";
import { createBooking } from "../methods/createBooking";

test.describe.serial("Delete booking API tests", () => {
  test.beforeAll(async ({ request }) => {
    await authenticate(
      request,
      process.env.TEST_USERNAME,
      process.env.TEST_PASSWORD
    );
    await createBooking(request, bookingBody);
  });
  test("user is unable to delete booking with wrong id", async ({
    request,
  }) => {
    const deleteBookingReq = await request.delete("/booking/a", {
      headers: {
        Cookie: `token=${process.env.TOKEN}`,
      },
    });
    expect(deleteBookingReq.ok()).toBeFalsy();
    expect(deleteBookingReq.status()).toEqual(405);
    expect(await deleteBookingReq.text()).toEqual("Method Not Allowed");
  });

  test("user is unable to delete booking with wrong token", async ({
    request,
  }) => {
    const deleteBookingReq = await request.delete(
      `/booking/${process.env.ID}`,
      {
        headers: {
          Cookie: "token=something",
        },
      }
    );
    expect(deleteBookingReq.ok()).toBeFalsy();
    expect(deleteBookingReq.status()).toEqual(403);
    expect(await deleteBookingReq.text()).toEqual("Forbidden");
  });

  test("user is unable to delete booking without token", async ({
    request,
  }) => {
    const deleteBookingReq = await request.delete(`/booking/${process.env.ID}`);
    expect(deleteBookingReq.ok()).toBeFalsy();
    expect(deleteBookingReq.status()).toEqual(403);
    expect(await deleteBookingReq.text()).toEqual("Forbidden");
  });

  test("user is able to delete booking", async ({ request }) => {
    const deleteBookingReq = await request.delete(
      `/booking/${process.env.ID}`,
      {
        headers: {
          Cookie: `token=${process.env.TOKEN}`,
        },
      }
    );
    expect(deleteBookingReq.ok()).toBeTruthy();
  });
});
