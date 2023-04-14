import { createProductCategoriesListWithValue } from "./task2";
import { findCartWithHighestValueAndItsOwner } from "./task3";
import { findTwoUsersFurthestAway } from "./task4";

// main function for logging output of the task functions
async function main() {
  const list = await createProductCategoriesListWithValue();
  console.log("----------Task #2----------");
  // for every category log the result with an appropriate padding
  for (let key in list) {
    const sumToDisplay = String(Math.round(list[key] * 100) / 100).padStart(7);
    console.log(
      `Total value of products in ${key.padEnd(17)}: ${sumToDisplay} $`
    );
  }
  console.log("\n----------Task #3----------");
  console.log(await findCartWithHighestValueAndItsOwner());
  console.log("\n----------Task #4----------");
  console.log(await findTwoUsersFurthestAway());
}

main();
