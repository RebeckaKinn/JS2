/*
    IN
    -   The in operator is a built-in JavaScript operator that checks if a specified property exists on an object. 
        TypeScript understands this and will use it to narrow a union of object types.
*/
interface Cat {
  meow: () => void;
}

interface Dog {
  bark: () => void;
}

function speak(animal: Cat | Dog) {
  // We check for the presence of the 'meow' property
  if ("meow" in animal) {
    // Inside this block, TypeScript knows 'animal' is a Cat
    animal.meow();
  } else {
    // It must be a Dog here
    animal.bark();
  }
}
/*
    INSTANCEOF
    -   The instanceof operator is another JavaScript feature that works as a type guard. 
        It checks if an object is an instance of a particular class by checking its constructor's 
        prototype property in the prototype chain. 
        This is the go-to method for narrowing types that were created using the class keyword.
*/
class Player {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  move() {
    console.log(`${this.name} is moving.`);
  }
}

class Monster {
  health: number;
  constructor(health: number) {
    this.health = health;
  }
  attack() {
    console.log(`The monster attacks!`);
  }
}

function handleCharacter(char: Player | Monster) {
  if (char instanceof Player) {
    // TypeScript knows 'char' is a Player instance
    console.log(`Welcome, ${char.name}`);
    char.move();
  } else {
    // TypeScript knows 'char' is a Monster instance
    console.log(`Monster has ${char.health} HP.`);
    char.attack();
  }
}

const gamePlayer = new Player("Hero");
const gameMonster = new Monster(100);

handleCharacter(gamePlayer);
handleCharacter(gameMonster);

/*
    DISCRIMINATED UNIONS
    -   A discriminated union (also known as a tagged union) is one of the most powerful and common patterns 
        in TypeScript. 
        It works by having a common, literal property (the "discriminant") in each of the object types in a union. 
        You can then use a switch statement or if checks on this property to narrow the type with 100% certainty.

        The discriminant property must be a literal type, like a string literal ("success"), number literal (1), 
        or an enum member.
*/
// Each interface has a common 'status' property with a literal type.
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: { id: number; title: string }[];
}

interface ErrorState {
  status: "error";
  errorMessage: string;
}

// A union of all possible states
type ApiState = LoadingState | SuccessState | ErrorState;

function handleApiResponse(response: ApiState) {
  switch (response.status) {
    case "loading":
      console.log("Loading data...");
      break;
    case "success":
      // TypeScript knows 'response' is a SuccessState here
      console.log("Data loaded:", response.data);
      break;
    case "error":
      // TypeScript knows 'response' is an ErrorState here
      console.error("Error:", response.errorMessage);
      break;
  }
}

/*
    USER-DEFINED TYPE GUARDS
    -   Sometimes, the checks we need to perform are more complex than the built-in guards can handle. 
        In these situations, we can create our own type guard functions. 
        A user-defined type guard is a function that returns a special type predicate: parameterName is Type.

        This predicate tells TypeScript that if the function returns true, 
        it should narrow the type of the parameter to the specified Type.
*/
interface User {
  id: number;
  name: string;
  email: string;
}

// This function is our user-defined type guard.
// The return type 'data is User' is the type predicate.
function isUser(data: unknown): data is User {
  // First, check if it's a non-null object
  if (typeof data !== "object" || data === null) {
    return false;
  }
  // Now, check for the required properties
  const user = data as User; // Cast to User to check properties
  return (
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}

async function fetchUser() {
  const response = await fetch("/api/user");
  const data: unknown = await response.json();

  if (isUser(data)) {
    // Inside this block, TypeScript knows 'data' is a valid User.
    console.log(`Welcome, ${data.name}!`);
  } else {
    console.error("The fetched data is not a valid User object.");
  }
}
