import { fetchCarts, fetchProducts, fetchUsers } from "./task1";
import { UserType, CartType, ProductType } from "./types";

export async function findCartWithHighestValueAndItsOwner() {
  const carts: CartType[] = await fetchCarts();
  const users: UserType[] = await fetchUsers();
  const products: ProductType[] = await fetchProducts();

  let currentMax = 0;
  let highestValueCart: CartType | undefined = undefined;
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

  if (highestValueCart !== undefined) {
    const owner = findElementWithId(highestValueCart.userId, users);
    return `Highest value cart belongs to ${getUserFullName(
      owner
    )} and its contents are worth ${Math.round(currentMax * 100) / 100} $`;
  } else {
    return "Cart or user not found";
  }
}

export function findElementWithId<T extends CartType | UserType | ProductType>(
  id: number,
  list: T[]
): T {
  const foundElements = list.filter((element) => element.id == id);
  return foundElements[0];
}

export function getUserFullName(user: UserType) {
  return user.name.firstname + " " + user.name.lastname;
}
