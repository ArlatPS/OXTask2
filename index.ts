// create functions for fetching - task 1 (Retrieves user, product and shopping cart data)
function fetchFakeStoreApi(route: string) {
  return async function fetchFakeStoreApiWithRoute() {
    const response = await fetch(`https://fakestoreapi.com/${route}`);
    const responseAfterJSON = await response.json();
    return responseAfterJSON;
  };
}

const fetchUsers = fetchFakeStoreApi("users");
const fetchCarts = fetchFakeStoreApi(
  "carts/?startdate=2000-01-01&enddate=2023-04-07"
);
const fetchProducts = fetchFakeStoreApi("products");

// task 2 - Creates a data structure containing all available product categories
// and the total value of products of a given category
async function createProductCategoriesListWithValue() {
  // fetch products and for every product add its value to its category
  const products = (await fetchProducts()) as Product[];
  const list: { [key: string]: number } = {};
  for (let product of products) {
    if (typeof list[product.category] == "undefined") {
      list[product.category] = product.price;
    } else {
      list[product.category] += product.price;
    }
  }
  console.log("\n----------Task #2----------");
  // for every category log the result with an appropriate padding
  for (let key in list) {
    const sumToDisplay = String(Math.round(list[key] * 100) / 100).padStart(7);
    console.log(
      `Total value of products in ${key.padEnd(17)}: ${sumToDisplay} $`
    );
  }
}

// task 3 - Finds a cart with the highest value, determines its value and full name of its owner
async function findCartWithHighestValueAndItsOwner() {
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
      `Highest value cart belongs to ${owner.name.firstname} ${
        owner.name.lastname
      } and its contents are worth ${Math.round(currentMax * 100) / 100} $`
    );
  }
}

// helper function for finding element with given id
function findElementWithId<T extends Cart | User | Product>(
  id: number,
  list: T[]
): T {
  const foundElements = list.filter((element) => element.id == id);
  return foundElements[0];
}

// task 4 - Finds the two users living furthest away from each other
async function findTwoUsersFurthestAway() {
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
  // create strings with full names
  const name1 =
    users[foundUsers[0]].name.firstname +
    " " +
    users[foundUsers[0]].name.lastname;
  const name2 =
    users[foundUsers[1]].name.firstname +
    " " +
    users[foundUsers[1]].name.lastname;

  console.log("\n----------Task #4----------");
  console.log(`Furthest away from each other live ${name1} and ${name2}`);
}

async function main() {
  await createProductCategoriesListWithValue();
  await findCartWithHighestValueAndItsOwner();
  await findTwoUsersFurthestAway();
}

main();

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type Cart = {
  id: number;
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
};

type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
};
