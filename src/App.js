import "./App.css";
import { useState, useEffect } from "react";

function MoviesHeader({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  let header = !movies?.length ? (
    <p>This list is empty</p>
  ) : (
    <>
      <ul>
        {movies.map((movie) => (
          <button
            key={movie}
            onClick={() => {
              setSelectedMovie(movie);
            }}
          >
            {movie}
          </button>
        ))}
      </ul>
    </>
  );
  let singleMovie = !selectedMovie ? (
    <p>This list is empty</p>
  ) : (
    <p>{selectedMovie}</p>
  );
  return (
    <>
      {header} {singleMovie}
    </>
  );
}

function MovieCard({ movie }) {
  return !movie?.length ? (
    <p>This list is empty</p>
  ) : (
    <>
      <ul></ul>
    </>
  );
}

function App() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://owen-wilson-wow-api.herokuapp.com/wows/movies`)
      .then((response) => response.json())
      .then(setMovies)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!movies) return null;
  return <MoviesHeader movies={movies} />;
}

export default App;
