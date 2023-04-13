var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// create functions for fetching - task 1 (Retrieves user, product and shopping cart data)
function fetchFakeStoreApi(route) {
    return function fetchFakeStoreApiWithRoute() {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseAfterJSON;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://fakestoreapi.com/".concat(route))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseAfterJSON = _a.sent();
                        return [2 /*return*/, responseAfterJSON];
                }
            });
        });
    };
}
var fetchUsers = fetchFakeStoreApi("users");
var fetchCarts = fetchFakeStoreApi("carts/?startdate=2000-01-01&enddate=2023-04-07");
var fetchProducts = fetchFakeStoreApi("products");
// task 2 - Creates a data structure containing all available product categories
// and the total value of products of a given category
function createProductCategoriesListWithValue() {
    return __awaiter(this, void 0, void 0, function () {
        var products, list, _i, products_1, product, key, sumToDisplay;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchProducts()];
                case 1:
                    products = (_a.sent());
                    list = {};
                    for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                        product = products_1[_i];
                        if (typeof list[product.category] == "undefined") {
                            list[product.category] = product.price;
                        }
                        else {
                            list[product.category] += product.price;
                        }
                    }
                    console.log("\n----------Task #2----------");
                    // for every category log the result with an appropriate padding
                    for (key in list) {
                        sumToDisplay = String(Math.round(list[key] * 100) / 100).padStart(7);
                        console.log("Total value of products in ".concat(key.padEnd(17), ": ").concat(sumToDisplay, " $"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// task 3 - Finds a cart with the highest value, determines its value and full name of its owner
function findCartWithHighestValueAndItsOwner() {
    return __awaiter(this, void 0, void 0, function () {
        var carts, users, products, currentMax, highestValueCart, _i, carts_1, cart, sum, _a, _b, product, foundProduct, owner;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetchCarts()];
                case 1:
                    carts = (_c.sent());
                    return [4 /*yield*/, fetchUsers()];
                case 2:
                    users = (_c.sent());
                    return [4 /*yield*/, fetchProducts()];
                case 3:
                    products = (_c.sent());
                    currentMax = 0;
                    highestValueCart = undefined;
                    for (_i = 0, carts_1 = carts; _i < carts_1.length; _i++) {
                        cart = carts_1[_i];
                        sum = 0;
                        for (_a = 0, _b = cart.products; _a < _b.length; _a++) {
                            product = _b[_a];
                            foundProduct = findElementWithId(product.productId, products);
                            sum += foundProduct.price * product.quantity;
                        }
                        if (sum > currentMax) {
                            currentMax = sum;
                            highestValueCart = cart;
                        }
                    }
                    console.log("\n----------Task #3----------");
                    if (highestValueCart != undefined) {
                        owner = findElementWithId(highestValueCart.userId, users);
                        console.log("Highest value cart belongs to ".concat(owner.name.firstname, " ").concat(owner.name.lastname, " and its contents are worth ").concat(Math.round(currentMax * 100) / 100, " $"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// helper function
function findElementWithId(id, list) {
    var foundElements = list.filter(function (element) { return element.id == id; });
    return foundElements[0];
}
createProductCategoriesListWithValue();
findCartWithHighestValueAndItsOwner();
