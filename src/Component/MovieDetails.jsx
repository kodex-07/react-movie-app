import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import StarRating from "./StarRating";

function MovieDetails({ selectedId, KEY, watched, onCloseMovie, onAddWatch }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    imbIDRating,
    plot,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
  } = movie;
  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          );
          if (!res.ok) throw new Error("unable to fetch movie detail");
          const data = await res.json();
          setMovie(data);
          console.log(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [selectedId],
  );
  useEffect(function () {
    if (!title) return;
    document.title = `movie|${title}`;
    return function () {
      document.title = "My Movie App";
    };
  });
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("")[0]),
      userRating,
    };
    onAddWatch(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && title && (
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <button>
            <img src={poster} alt={`poster of the ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull;{runtime}
              </p>
              <p>{genre}</p>
              <p>
                {""}
                <span>⭐</span>
                {imdbRating} imdb rating
              </p>
            </div>
          </button>
        </header>
      )}
      {!isLoading && !error && title && (
        <section>
          <div className="rating">
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    Add to List
                  </button>
                )}
              </>
            ) : (
              <>
                <p> you rated this Movie {watchedUserRating}</p>
                <span>⭐</span>
              </>
            )}
          </div>
          <p>
            <em>{plot}</em>
            <p> starring {actors}</p>
            <p> Directed by {director}</p>
          </p>
        </section>
      )}
    </div>
  );
}
export default MovieDetails;
