import { test, expect } from "@playwright/test";
import { bookingBody } from "../data/bookingBody";
import { incorrectBookingBody } from "../data/incorrectBookingBody";
import { createBooking } from "../methods/createBooking";

test.describe("Create booking API tests", () => {
    test("user is able to create booking", async ({ request }) => {
        const createBookingReq = await createBooking(request, bookingBody);
        expect(createBookingReq.ok()).toBeTruthy();
        expect(await createBookingReq.json()).toHaveProperty("bookingid");
    });

    // Bug! The server is not prepared for a request with wrong types for parameters
    // throws Internal Server Error :<
    test.skip("user is unable to create booking with wrong data", async ({
        request,
    }) => {
        const createdBookingReq = await request.post("/booking", {
            data: incorrectBookingBody,
        });
        expect(createdBookingReq.ok()).toBeFalsy();
        expect(await createdBookingReq.text()).toEqual(
            "Validation with info which parameter has wrong type"
        );
    });

    // Bug! The server is not prepared for a request with missing parameters
    // throws Internal Server Error :<
    test.skip("user is unable to create booking without data", async ({ request }) => {
        const createdBookingReq = await request.post("/booking", {
            data: "",
        });
        expect(createdBookingReq.ok()).toBeFalsy();
        expect(await createdBookingReq.text()).toEqual(
            "Validation with info which parameter is missing"
        );
    });
});
