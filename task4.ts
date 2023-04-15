import { fetchUsers } from "./task1";
import { getUserFullName } from "./task3";
import { UserType } from "./types";

// task 4 - Find two users living furthest away from each other
export async function findTwoUsersFurthestAway() {
  const users: UserType[] = await fetchUsers();
  let foundUsers: [number, number] = [0, 0];
  let furthest = 0;
  for (let i = 0; i < users.length - 1; i++) {
    const { lat: latI, long: longI } = users[i].address.geolocation;
    for (let j = i + 1; j < users.length; j++) {
      const { lat: latJ, long: longJ } = users[j].address.geolocation;
      const latDifference = Math.pow(Number(latI) - Number(latJ), 2);
      const longDifference = Math.pow(Number(longI) - Number(longJ), 2);
      const distance = latDifference + longDifference;
      if (distance > furthest) {
        foundUsers = [i, j];
        furthest = distance;
      }
    }
  }
  return `Furthest away from each other live ${getUserFullName(
    users[foundUsers[0]]
  )} and ${getUserFullName(users[foundUsers[1]])}`;
}
