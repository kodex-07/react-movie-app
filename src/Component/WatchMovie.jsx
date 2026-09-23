import { useState } from "react";

function WatchedMovie({ movie, onDeleteWatched }) {
  const [posterError, setPosterError] = useState(movie.Poster === "N/A");
  function handleDeletewatched() {
    onDeleteWatched(movie.imdbID);
  }
  return (
    <li>
      {posterError ? (
        <div className="poster-placeholder" aria-label="Poster unavailable">
          No poster
        </div>
      ) : (
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          onError={() => setPosterError(true)}
        />
      )}
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={handleDeletewatched}>
          X
        </button>
      </div>
    </li>
  );
}
export default WatchedMovie;
