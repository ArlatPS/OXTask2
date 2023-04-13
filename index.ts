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
  // for every category log the result with an appropriate padding
  for (let key in list) {
    const sumToDisplay = String(Math.round(list[key] * 100) / 100).padStart(7);
    console.log(
      `Total value of products in ${key.padEnd(17)}: ${sumToDisplay}`
    );
  }
}

createProductCategoriesListWithValue();

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
