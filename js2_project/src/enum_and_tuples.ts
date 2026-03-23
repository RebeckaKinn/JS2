/*
    ENUM
    - Define a set of named constants, like weekdays, state of a user request etc. 
*/
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

let playerDirection: Direction = Direction.Down;

if (playerDirection === Direction.Down) {
  console.log("Player is moving down."); // This will be logged.
}

console.log(playerDirection); // Logs: 1

//STRING ENUM
enum LogLevel {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
}

function logMessage(message: string, level: LogLevel) {
  console.log(`[${level}] - ${message}`);
}

logMessage("User logged in successfully.", LogLevel.Info); // [INFO] - User logged in successfully.
logMessage("API key is about to expire.", LogLevel.Warning); // [WARNING] - API key is about to expire.

//PRACTICAL EXAMPLE
enum RequestStatus {
  Idle = "IDLE",
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",
}

let currentStatus: RequestStatus = RequestStatus.Idle;

function fetchData() {
  currentStatus = RequestStatus.Loading;
  // ... logic to fetch data
  // On success:
  // currentStatus = RequestStatus.Success;
  // On failure:
  // currentStatus = RequestStatus.Error;
}

/*
    TUPLES
    - Like an array with fixed length and a known, specific sequence of types for its elements. 
    - [string, number] must have exactly two elements: the first must be a string, and the second must be a number

*/
let userProfile: [string, number];

// A valid assignment:
userProfile = ["Alice", 30];

// An invalid assignment (wrong order):
// userProfile = [30, 'Alice']; // Error: Type 'number' is not assignable to type 'string'.

// An invalid assignment (wrong number of elements):
// userProfile = ['Alice']; // Error: Type '[string]' is not assignable to type '[string, number]'.

//PRACTICAL EXAMPLE
type HttpResponse = [number, string]; // [statusCode, responseBody]

function getGameData(): HttpResponse {
  // In a real scenario, this would come from an API call
  const didSucceed = Math.random() > 0.5;

  if (didSucceed) {
    return [200, '{"name": "The Incredible Machine"}'];
  } else {
    return [404, '{"error": "Game not found"}'];
  }
}

const [statusCode, responseBody] = getGameData();

console.log(`Status: ${statusCode}`);
console.log(`Body: ${responseBody}`);
