import { findTwoUsersFurthestAway, findFarthestPair } from "../task4";

describe("find farthest pair function", () => {
  test("returns the right answer", () => {
    const input = [
      { x: 12, y: 19 },
      { x: 0, y: 0 },
      { x: -20, y: -100 },
      { x: 2, y: -1 },
      { x: 23, y: -60.6 },
      { x: 0, y: 20.2 },
    ];
    const result = findFarthestPair(input);
    expect(result).toStrictEqual([0, 2]);
  });
});

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
