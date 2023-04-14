import { findCartWithHighestValueAndItsOwner } from "../task3";

describe("task 3 - Find cart with the highest value and its owner's name", () => {
  let answer = "";
  beforeEach(async () => {
    answer = await findCartWithHighestValueAndItsOwner();
  }, 15000);
  test("returns the right answer", () => {
    expect(answer).toBe(
      "Highest value cart belongs to john doe and its contents are worth 2578.7 $"
    );
  });
});
