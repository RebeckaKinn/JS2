const movie = {
  id: "m-001",
  details: {
    title: "Inception",
    director: {
      name: "Christopher Nolan",
    },
  },
  meta: {
    rating: "8.8",
    genres: ["Sci-Fi", "Action", "Thriller"],
  },
};

// Single destructuring statement combining:
// - Nesting:        drilling into details, details.director, and meta.genres
// - Renaming:       title → movieTitle, name → directorName, genres[0] → primaryGenre
// - Array in object: destructuring the genres array inline to grab the first element
// - Default value:  releaseYear doesn't exist on the object, so it falls back to 2010
const {
  details: {
    title: movieTitle,
    director: { name: directorName },
  },
  meta: {
    genres: [primaryGenre],
  },
  releaseYear = 2010,
} = movie;

console.log(movieTitle); // "Inception"
console.log(directorName); // "Christopher Nolan"
console.log(primaryGenre); // "Sci-Fi"
console.log(releaseYear); // 2010
