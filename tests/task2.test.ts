import { createProductCategoriesListWithValue } from "../task2";

describe("task 2 - create list of categories with their value", () => {
  let list = {};
  beforeEach(async () => {
    list = await createProductCategoriesListWithValue();
  }, 15000);
  test("contains all categories", () => {
    expect(Object.keys(list)).toStrictEqual([
      "men's clothing",
      "jewelery",
      "electronics",
      "women's clothing",
    ]);
  });
  test("categories have correct values", () => {
    expect(Math.round(list["men's clothing"])).toBe(204);
    expect(Math.round(list["jewelery"])).toBe(884);
    expect(Math.round(list["electronics"])).toBe(1995);
    expect(Math.round(list["women's clothing"])).toBe(158);
  });
});
