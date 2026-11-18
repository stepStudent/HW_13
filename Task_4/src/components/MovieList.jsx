import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

/**
 * Компонент MovieList
 * Відображає список фільмів, рендерячи для кожного MovieCard
 * Передає інформацію про фільм та callback-функції через props
 */
function MovieList({ movies = [], onToggleWatch, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="movie-list-empty">
        <div className="empty-icon">🍿</div>
        <h4 className="empty-title">Фільмів не знайдено</h4>
        <p className="empty-description">
          Список перегляду порожній або жоден фільм не відповідає вибраним критеріям. Додайте новий фільм вище!
        </p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genre={movie.genre}
            isWatched={movie.isWatched}
            onToggleWatch={onToggleWatch}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
