/*
    Renaming Variables
        Sometimes, the property name on an object is not the variable name you want to use in your code. 
        This could be due to a naming collision, or the original name might be unclear or not follow 
        your project's conventions. Destructuring allows you to rename the variable as you extract 
        it using the syntax sourceProperty: newVariableName.
*/

const user = {
  firstName: "John",
  id: 123,
};

// We rename 'firstName' to 'userName' and 'id' to 'userId'.
const { firstName: userName, id: userId } = user;

console.log(userName); // 'John'
console.log(userId); // 123
// console.log(firstName); // ReferenceError: firstName is not defined
//After renaming, the original property name (firstName) is no longer available as a variable in that scope; only the new name (userName) is.

/*
    Practical Example
        When working with APIs, you often receive data with naming conventions that differ from your own 
        (e.g., snake_case from a Python backend vs. camelCase in your JavaScript). 
        Destructuring is a perfect way to clean this up on the fly.
*/

const apiResponse = {
  data: {
    user_id: "xyz-789",
    user_name: "dev_jane",
    is_premium_member: true,
  },
};

// Extract and rename the properties to fit our camelCase convention.
const {
  user_id: userId2,
  user_name: userName2,
  is_premium_member: isPremium,
} = apiResponse.data;

console.log(userId2); // 'xyz-789'
console.log(userName2); // 'dev_jane'
console.log(isPremium); // true

/*
    Nested Destructuring
        Modern applications often deal with deeply nested objects. 
        Instead of chaining property accessors like data.details.metadata.title, 
        you can destructure nested properties directly. The syntax mirrors the structure of the object itself.
*/

const person = {
  name: "Alice",
  contact: {
    email: "alice@example.com",
    phone: "123-456-7890",
  },
};

// To get the email, we follow the object's structure.
const {
  contact: { email },
} = person;

console.log(email); // 'alice@example.com'

/*
    Practical Example
        Let's look at a common API response for a single product, where key information is nested.
*/
const product = {
  id: "prod-001",
  title: "Wireless Headphones",
  details: {
    manufacturer: "AudioCo",
    image: {
      url: "https://example.com/image.jpg",
      altText: "A pair of black wireless headphones.",
    },
  },
};

// We want the URL of the image directly.
const {
  details: {
    image: { url },
  },
} = product;

console.log(url); // 'https://example.com/image.jpg'

/*
    Default Values
        Sometimes, a property you are trying to destructure might not exist on the object. 
        In this case, the resulting variable would be undefined. 
        To make your code more robust, you can provide a default value for a property 
        using the = syntax. The default value is only used if the property is undefined.
*/
const settings: { username: string; theme?: string } = {
  username: "Admin",
  // The 'theme' property is missing.
};

// We provide a default value for 'theme'.
const { username, theme = "light" } = settings;

console.log(username); // 'Admin'
console.log(theme); // 'light'

/*
    Practical Example
    This is extremely useful when defining functions that accept an options object. 
    You can destructure the parameters and provide default values for 
    any missing options in a single, clean line.
*/
function createChart(options: any) {
  // We expect a 'data' array, but 'type' and 'showGrid' are optional.
  const { data, type = "line", showGrid = true } = options;

  console.log(`Creating a ${type} chart.`);
  if (showGrid) {
    console.log("Grid lines will be shown.");
  }
  // ... rest of the chart creation logic using 'data'.
}

createChart({ data: [1, 2, 3], type: "bar" });
// Logs: Creating a bar chart.
// Logs: Grid lines will be shown.

createChart({ data: [4, 5, 6] });
// Logs: Creating a line chart. (Uses default)
// Logs: Grid lines will be shown. (Uses default)

/*
    Combining All Techniques
        The true power of advanced destructuring comes from combining these techniques. 
        You can destructure nested properties, rename them, and provide default values all at once.
*/

/*
    Practical Example
        Let's pull together everything we have learned with a complex object representing a game from an API.
*/
//la til type GameData siden default value ikke vil fungere.
type GameData = {
  id: string;
  game_title: string;
  metadata: {
    publisher: string;
    releaseYear?: number;
  };
  config: {
    isMultiplayer: boolean;
  };
};
const gameData = {
  id: "g-987",
  game_title: "Stardew Valley",
  metadata: {
    publisher: "ConcernedApe",
    // 'releaseYear' is missing here.
  },
  config: {
    isMultiplayer: true,
  },
};

// We will extract, rename, and set defaults in one go.
const {
  game_title: title,
  metadata: { publisher, releaseYear = 2016 },
  config: { isMultiplayer: multiplayer },
}: GameData = gameData;

console.log(title); // 'Stardew Valley'
console.log(publisher); // 'ConcernedApe'
console.log(releaseYear); // 2016
console.log(multiplayer); // true
