/*
    Skipping Elements
        Sometimes you are only interested in certain elements of an array and want to disregard others. 
        You can do this by using a comma (,) as a placeholder in the destructuring pattern. 
        For each comma you use without a variable name, one element from the beginning of the array is skipped.
*/
const numbers = [10, 20, 30, 40, 50];

// We want to get the first, third, and fifth elements.
// We skip the second and fourth elements.
const [first, , third, , fifth] = numbers;

console.log(first); // 10
console.log(third); // 30
console.log(fifth); // 50

/*
    Practical Example
        Imagine you have an array representing a record from a CSV file, where each position has a specific meaning. 
        You might only need the product name and the price, ignoring the ID and category.
*/
// CSV data: [id, category, name, price]
const productRecord = ["prod-123", "Electronics", "Laptop", 1200];

// We skip the id and category to get the name and price.
const [, , productName, productPrice] = productRecord;

console.log(productName); // 'Laptop'
console.log(productPrice); // 1200

/*
    The Rest Operator in Array Destructuring
        The rest operator (...) can be used to collect the remaining elements of an array into a new array. 
        This is incredibly useful when you want to process the first few elements individually and the rest of the elements as a group.

        The rest operator must always be the last element in the destructuring pattern.
*/
const scores = [98, 85, 76, 65, 54];

// Get the top score, and put the rest into a separate array.
const [topScore, ...otherScores] = scores;

console.log(topScore); // 98
console.log(otherScores); // [85, 76, 65, 54]

/*
    Practical Example
        This pattern is great for working with lists where the first element is special. For example, 
        in a list of players, the first might be the team captain, and the rest are team members.
*/
const players = ["Alice", "Bob", "Charlie", "David"];

function setupTeam(playerList: any) {
  const [captain, ...members] = playerList;

  console.log(`Team Captain: ${captain}`);
  console.log("Team Members:", members);
}

setupTeam(players);
// Logs: Team Captain: Alice
// Logs: Team Members: [ 'Bob', 'Charlie', 'David' ]

/*
    Nested Array Destructuring
        Just like with objects, you can destructure nested arrays. 
        The destructuring pattern should match the structure of the nested array itself.
*/

//const nestedData = [1, 2, [30, 40]];
const nestedData: [number, number, [number, number]] = [1, 2, [30, 40]];
// Destructure the nested array.
const [first1, second1, [third1, fourth1]] = nestedData;

console.log(first1); // 1
console.log(second1); // 2
console.log(third1); // 30
console.log(fourth1); // 40

/*
    Practical Example
        Consider an array representing a line segment, where each point is itself an array [x, y].
*/
const lineSegment = [
  [10, 20], // Start point [x1, y1]
  [50, 60], // End point [x2, y2]
];

// We can extract all coordinates at once.
const [[x1, y1], [x2, y2]] = lineSegment;

console.log(`Line starts at (${x1}, ${y1}) and ends at (${x2}, ${y2}).`);
// Logs: Line starts at (10, 20) and ends at (50, 60).
