// An alias for a union type
type ID = string | number;

// An alias for an object shape
type Point = {
  x: number;
  y: number;
};

let userId: ID = "abc-123";
let mapCoordinate: Point = { x: 10, y: 20 };

//PRACTICAL EXAMPLE OF ALIASES WITH TYPE

// Define the shape of a User once
type User = {
  id: string | number;
  username: string;
  isPremium: boolean;
};

// Use the alias in a function signature
function greetUser(user: User): string {
  return `Hello, ${user.username}! Welcome back.`;
}

const currentUser: User = {
  id: 101,
  username: "dev_jane",
  isPremium: true,
};

console.log(greetUser(currentUser));

//PRACTICAL EXAMPLE OF INTERFACE

interface User2 {
  id: string | number;
  username: string;
  isPremium: boolean;
}

function greetUser2(user: User2): string {
  return `Hello, ${user.username}! Welcome back.`;
}

// This is a common pattern for extending types from third-party libraries.
interface Customer {
  id: number;
}

// Imagine this definition is in another file, or added later.
interface Customer {
  name: string;
}

// The two interfaces have been merged.
// The 'customer' object must now have both 'id' and 'name'.
const customer: Customer = {
  id: 1,
  name: "ACME Corp",
};

// Trying to do this with 'type' would cause an error.
// type Product = { id: number };
// type Product = { name: string }; // Error: Duplicate identifier 'Product'.

/*
-   Use interface when defining the shape of an object. Its extends keyword is clear, 
    and the ability for declaration merging is a powerful feature, especially when 
    you need to augment types from external libraries.
-   Use type when you need to create an alias for a union type, a tuple, or a primitive.
*/

//Type alias example:
type HttpVerbs = "GET" | "POST" | "PUT" | "DELETE";
type ApiRequest = {
  url: string;
  method: HttpVerbs;
};
function makeRequest(action: ApiRequest): void {
  console.log(`Making a ${action.method} request to ${action.url}`);
}

makeRequest({
  url: "https://api.example.com/users",
  method: "GET",
});

//Interface example:
interface Vehicle {
  make: string;
  model: string;
}
interface Car extends Vehicle {
  numberOfDoors: number;
}
const myCar: Car = {
  make: "Toyota",
  model: "Auris",
  numberOfDoors: 5,
};
console.log(myCar);
