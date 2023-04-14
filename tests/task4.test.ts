import { findTwoUsersFurthestAway } from "../task4";

describe("task 4 - Find two users living furthest away from each other", () => {
  let answer = "";
  beforeEach(async () => {
    answer = await findTwoUsersFurthestAway();
  }, 15000);
  test("returns the right answer", () => {
    expect(answer).toBe(
      "Furthest away from each other live john doe and derek powell"
    );
  });
});
