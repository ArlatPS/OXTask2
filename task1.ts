// create functions for fetching - task 1 (Retrieves user, product and shopping cart data)
function fetchFakeStoreApi(route: string) {
  return async function fetchFakeStoreApiWithRoute() {
    try {
      const response = await fetch(`https://fakestoreapi.com/${route}`);
      const responseAfterJSON = await response.json();
      return responseAfterJSON;
    } catch {
      throw new Error("API unavailable");
    }
  };
}

export const fetchUsers = fetchFakeStoreApi("users");
export const fetchCarts = fetchFakeStoreApi(
  "carts/?startdate=2000-01-01&enddate=2023-04-07"
);
export const fetchProducts = fetchFakeStoreApi("products");
