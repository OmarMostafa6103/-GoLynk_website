/* eslint-env jest */
/* global describe test expect */

import {
  createSenderFromPayload,
  createTravelerFromPayload,
} from "../createUtils";

describe("createUtils", () => {
  test("createSenderFromPayload returns sender with orders and coordinates", () => {
    const payload = { item: "Box", from: "A", to: "B", lat: 10, lng: 20 };
    const sender = createSenderFromPayload(payload, null);
    expect(sender).toBeDefined();
    expect(sender.id).toBeDefined();
    expect(sender.name).toBe("Box");
    expect(sender.lat).toBe(10);
    expect(sender.lng).toBe(20);
    expect(Array.isArray(sender.orders)).toBe(true);
    expect(sender.orders[0].item).toBe("Box");
  });

  test("createTravelerFromPayload returns traveler with trips and coordinates", () => {
    const payload = {
      title: "Trip1",
      from: "X",
      to: "Y",
      seats: 3,
      lat: 30,
      lng: 40,
    };
    const traveler = createTravelerFromPayload(payload, null);
    expect(traveler).toBeDefined();
    expect(traveler.id).toBeDefined();
    expect(traveler.name).toBe("Trip1");
    expect(traveler.lat).toBe(30);
    expect(traveler.lng).toBe(40);
    expect(Array.isArray(traveler.trips)).toBe(true);
    expect(traveler.trips[0].title).toBe("Trip1");
  });
});
