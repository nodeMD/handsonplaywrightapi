import { APIRequestContext } from "@playwright/test";

export const createBooking = async (request: APIRequestContext, body) => {
  const createBookingReq = await request.post("/booking", {
    data: body,
  });
  await createBookingReq.json().then((body) => {
    process.env.ID = body.bookingid;
  });
  return createBookingReq;
};
