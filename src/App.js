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
    <MovieCard movie={selectedMovie} />
  );
  return (
    <>
      {header} {singleMovie}
    </>
  );
}

function MovieCard({ movie }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch(
      `https://owen-wilson-wow-api.herokuapp.com/wows/random?movie=${movie}`
    )
      .then((response) => response.json())
      .then(setDetails);
  }, []);

  console.log(details);
  return !details?.length ? (
    <p>This list is empty</p>
  ) : (
    <p style={{ textAlign: "center" }}>
      <img height={500} src={details[0].poster} alt={details[0].movie} />
    </p>
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
