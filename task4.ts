import { fetchUsers } from "./task1";
import { getUserFullName } from "./task3";
import { User } from "./types";

// task 4 - Finds the two users living furthest away from each other
export async function findTwoUsersFurthestAway() {
  const users = (await fetchUsers()) as User[];

  /// iterate through unique pairs of users to find the pair that lives furthest away
  let foundUsers: [number, number] = [0, 0];
  let furthest = 0;
  for (let i = 0; i < users.length - 1; i++) {
    for (let j = i + 1; j < users.length; j++) {
      // calculate distance using Pythagorean theorem
      const latDifference = Math.pow(
        +users[i].address.geolocation.lat - +users[j].address.geolocation.lat,
        2
      );
      const longDifference = Math.pow(
        +users[i].address.geolocation.long - +users[j].address.geolocation.long,
        2
      );
      const distance = latDifference + longDifference;
      if (distance > furthest) {
        foundUsers = [i, j];
        furthest = distance;
      }
    }
  }
  console.log("\n----------Task #4----------");
  console.log(
    `Furthest away from each other live ${getUserFullName(
      users[foundUsers[0]]
    )} and ${getUserFullName(users[foundUsers[1]])}`
  );
}
