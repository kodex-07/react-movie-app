import { useState } from "react";

function Movie({ movie, onAddMovie }) {
  const [posterError, setPosterError] = useState(movie.Poster === "N/A");

  function handleAdd() {
    onAddMovie(movie.imdbID);
  }
  return (
    <li onClick={handleAdd}>
      {posterError ? (
        <div className="poster-placeholder" aria-label="Poster unavailable">
          No poster
        </div>
      ) : (
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          onError={() => setPosterError(true)}
        />
      )}
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
export default Movie;
