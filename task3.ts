import { fetchCarts, fetchProducts, fetchUsers } from "./task1";
import { User, Cart, Product } from "./types";

// task 3 - Finds a cart with the highest value, determines its value and full name of its owner
export async function findCartWithHighestValueAndItsOwner() {
  // fetch carts, users and products
  const carts = (await fetchCarts()) as Cart[];
  const users = (await fetchUsers()) as User[];
  const products = (await fetchProducts()) as Product[];

  // iterate through carts to find the one with the highest value
  let currentMax = 0;
  let highestValueCart: Cart | undefined = undefined;
  for (let cart of carts) {
    let sum = 0;
    for (let product of cart.products) {
      const foundProduct = findElementWithId(product.productId, products);
      sum += foundProduct.price * product.quantity;
    }
    if (sum > currentMax) {
      currentMax = sum;
      highestValueCart = cart;
    }
  }
  // find owner of the cart
  console.log("\n----------Task #3----------");
  if (highestValueCart != undefined) {
    const owner = findElementWithId(highestValueCart.userId, users);
    console.log(
      `Highest value cart belongs to ${getUserFullName(
        owner
      )} and its contents are worth ${Math.round(currentMax * 100) / 100} $`
    );
  }
}

// function for finding element with given id
export function findElementWithId<T extends Cart | User | Product>(
  id: number,
  list: T[]
): T {
  const foundElements = list.filter((element) => element.id == id);
  return foundElements[0];
}

// function for getting user's full name
export function getUserFullName(user: User) {
  return user.name.firstname + " " + user.name.lastname;
}
