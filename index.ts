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
