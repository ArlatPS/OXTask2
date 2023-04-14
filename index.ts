import { createProductCategoriesListWithValue } from "./task2";
import { findCartWithHighestValueAndItsOwner } from "./task3";
import { findTwoUsersFurthestAway } from "./task4";

async function main() {
  await createProductCategoriesListWithValue();
  await findCartWithHighestValueAndItsOwner();
  await findTwoUsersFurthestAway();
}

main();
