type Movie = {
  id: string;
  details: {
    title: string;
    director: {
      name: string;
    };
  };
  meta: {
    rating: string;
    genres: string[];
    year?: number; // 👈 optional
  };
};

const movie: Movie = {
  id: "m-001",
  details: {
    title: "Inception",
    director: { name: "Christopher Nolan" },
  },
  meta: {
    rating: "8.8",
    genres: ["Sci-Fi", "Action", "Thriller"],
  },
};

const {
  details: {
    title: movieTitle,
    director: { name: directorName },
  },
  meta: {
    genres: [primaryGenre],
    year,
  },
} = movie;

const releaseYear = year ?? 2010;

console.log(movieTitle);
console.log(directorName);
console.log(primaryGenre);
console.log(releaseYear);
