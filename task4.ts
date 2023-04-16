import { fetchUsers } from "./task1";
import { getUserFullName } from "./task3";
import { UserType } from "./types";

// task 4 - Find two users living furthest away from each other
export async function findTwoUsersFurthestAway() {
  const users: UserType[] = await fetchUsers();

  const coordinates: CoordinatesType[] = users.map((user) => ({
    x: Number(user.address.geolocation.lat),
    y: Number(user.address.geolocation.long),
  }));

  const foundUsers = findFarthestPair(coordinates);

  return `Furthest away from each other live ${getUserFullName(
    users[foundUsers[0]]
  )} and ${getUserFullName(users[foundUsers[1]])}`;
}

type CoordinatesType = {
  x: number;
  y: number;
};

export function findFarthestPair(points: CoordinatesType[]) {
  let farthest = 0;
  let farthestPair: number[] = [];

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = Math.sqrt(
        Math.pow(points[j].x - points[i].x, 2) +
          Math.pow(points[j].y - points[i].y, 2)
      );
      if (distance > farthest) {
        farthest = distance;
        farthestPair = [i, j];
      }
    }
  }

  return farthestPair;
}
