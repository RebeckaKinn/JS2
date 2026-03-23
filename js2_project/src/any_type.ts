//instead of:
function getFirstNumber(items: number[]): number {
  return items[0];
}

function getFirstString(items: string[]): string {
  return items[0];
}

//we can use:
function getFirstElement<T>(items: T[]): T {
  return items[0];
}

/*
if we use "any" - we lose the safety from typescript to check if it is the correct data type. 
Instead we do the example above. 
- <T>: This declares a generic type parameter T. It tells TypeScript, "We're about to use a placeholder type named T."
- items: T[]: This means the items parameter is an array of whatever type T happens to be.
- : T: This means the function will return a value of the same type T.
*/
//using it like this:
const numbers = [10, 20, 30];
getFirstElement(numbers);

const strings = ["apple", "banana", "cherry"];
getFirstElement(strings);

//PRACTICAL EXAMPLE:
//Let's create a function that takes some data and returns it in a standardised object format.
function createDataResponse<T>(data: T): { success: boolean; data: T } {
  return {
    success: true,
    data: data,
  };
}

const user = { name: "Alice", id: 1 };
createDataResponse(user);
// userResponse is of type: { success: boolean; data: { name: string; id: number; } }

const products = ["Laptop", "Mouse"];
createDataResponse(products);
// productResponse is of type: { success: boolean; data: string[] }

//Generic Constraints
// We constrain T to be any type that has a 'length' property of type 'number'.
interface WithLength {
  length: number;
}

function logLength<T extends WithLength>(arg: T): void {
  console.log(`Length is: ${arg.length}`);
}

logLength("Hello, world!"); // Works, strings have a length property.
logLength([1, 2, 3, 4]); // Works, arrays have a length property.
// logLength(123); // Error: Argument of type 'number' is not assignable to parameter of type 'WithLength'.

//Generic Interfaces and Types
// A generic interface for our API responses
interface ApiResponse<DataType> {
  data: DataType;
  meta: {
    requestTime: number;
    source: string;
  };
}

// Specific types for our application data
interface User {
  id: number;
  name: string;
}

interface Product {
  sku: string;
  price: number;
}

// Now we can reuse our ApiResponse for different endpoints.
const userResponse: ApiResponse<User> = {
  data: {
    id: 1,
    name: "Alice",
  },
  meta: {
    requestTime: 120,
    source: "user-db",
  },
};

const productListResponse: ApiResponse<Product[]> = {
  data: [
    { sku: "LPT-01", price: 1200 },
    { sku: "MOU-02", price: 50 },
  ],
  meta: {
    requestTime: 80,
    source: "inventory-api",
  },
};
