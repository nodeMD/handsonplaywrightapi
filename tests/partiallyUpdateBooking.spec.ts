import { test, expect } from "@playwright/test";
import { bookingBody } from "../data/bookingBody";
import { authenticate } from "../methods/authenticate";
import { createBooking } from "../methods/createBooking";

test.describe("Partially update booking API tests", () => {
  test.beforeAll(async ({ request }) => {
    await authenticate(
      request,
      process.env.TEST_USERNAME,
      process.env.TEST_PASSWORD
    );
    await createBooking(request, bookingBody);
  });

  test("user is able to partially update booking", async ({ request }) => {
    const partialUpdateBookingReq = await request.patch(
      `/booking/${process.env.ID}`,
      {
        headers: {
          Cookie: `token=${process.env.TOKEN}`,
        },
        data: {
          firstname: "james",
          lastname: "pipolini",
        },
      }
    );
    expect(partialUpdateBookingReq.ok()).toBeTruthy();
    expect(await partialUpdateBookingReq.json()).toEqual({
      firstname: "james",
      lastname: "pipolini",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    });
  });

  test("user is unable to partially update booking without providing booking ID", async ({
    request,
  }) => {
    const partialUpdateBookingReq = await request.patch("/booking/a", {
      headers: {
        Cookie: `token=${process.env.TOKEN}`,
      },
      data: {
        firstname: "james",
        lastname: "pipolini",
      },
    });
    expect(partialUpdateBookingReq.ok()).toBeFalsy();
    expect(partialUpdateBookingReq.status()).toEqual(405);
    expect(await partialUpdateBookingReq.text()).toEqual("Method Not Allowed");
  });

  test("user is unable to partially update booking while using wrong auth token", async ({
    request,
  }) => {
    const partialUpdateBookingReq = await request.patch(
      `/booking/${process.env.ID}`,
      {
        headers: {
          Cookie: "token=something",
        },
        data: {
          firstname: "james",
          lastname: "pipolini",
        },
      }
    );
    expect(partialUpdateBookingReq.ok()).toBeFalsy();
    expect(partialUpdateBookingReq.status()).toEqual(403);
    expect(await partialUpdateBookingReq.text()).toEqual("Forbidden");
  });

  test("user is unable to partial update booking without providing auth token", async ({
    request,
  }) => {
    const partialUpdateBookingReq = await request.patch(
      `/booking/${process.env.ID}`,
      {
        data: {
          firstname: "james",
          lastname: "pipolini",
        },
      }
    );
    expect(partialUpdateBookingReq.ok()).toBeFalsy();
    expect(partialUpdateBookingReq.status()).toEqual(403);
    expect(await partialUpdateBookingReq.text()).toEqual("Forbidden");
  });
});
