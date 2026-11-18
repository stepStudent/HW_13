import React from 'react';
import './MovieCard.css';

/**
 * Компонент MovieCard
 * Відображає назву фільму, жанр та статус перегляду.
 * Отримує дані через props та містить кнопку для перемикання статусу «Переглянуто».
 */
function MovieCard(props) {
  // Підтримка передачі як окремих пропсів, так і об'єкта movie
  const movie = props.movie || props;
  const { id, title, genre, isWatched } = movie;
  const onToggleWatch = props.onToggleWatch || props.onToggleWatched;
  const onDelete = props.onDelete;

  const handleToggle = () => {
    if (onToggleWatch) {
      onToggleWatch(id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <article className={`movie-card ${isWatched ? 'watched' : 'unwatched'}`}>
      <div className="movie-card-header">
        <div className="movie-title-wrap">
          <h3 className="movie-title" title={title}>
            {title}
          </h3>
          <span className="movie-genre">
            <span role="img" aria-label="genre">🏷️</span> {genre}
          </span>
        </div>

        {/* Статус перегляду */}
        <span className={`movie-status-pill ${isWatched ? 'watched' : 'unwatched'}`}>
          <span className="movie-status-indicator" />
          {isWatched ? 'Переглянуто' : 'Не переглянуто'}
        </span>
      </div>

      <div className="movie-card-footer">
        {/* Кнопка «Переглянуто», яка змінює статус фільму */}
        <button
          type="button"
          className={`btn-toggle-watched ${isWatched ? 'is-watched' : ''}`}
          onClick={handleToggle}
          title={isWatched ? 'Змінити на непереглянутий' : 'Відмітити як переглянутий'}
          aria-label={isWatched ? `Повернути ${title} до перегляду` : `Позначити ${title} як переглянутий`}
        >
          {isWatched ? (
            <>
              <span>✓</span>
              <span>Переглянуто</span>
            </>
          ) : (
            <>
              <span>▶</span>
              <span>Переглянуто</span>
            </>
          )}
        </button>

        {/* Кнопка видалення (додатковий функціонал для зручності) */}
        {onDelete && (
          <button
            type="button"
            className="btn-delete"
            onClick={handleDelete}
            title="Видалити зі списку"
            aria-label={`Видалити фільм ${title}`}
          >
            ✕
          </button>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
