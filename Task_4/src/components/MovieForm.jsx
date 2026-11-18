import React, { useState } from 'react';
import './MovieForm.css';

const GENRE_SUGGESTIONS = [
  'Наукова фантастика',
  'Драма',
  'Бойовик',
  'Комедія',
  'Трилер',
  'Жахи',
  'Анімація',
  'Детектив',
  'Фентезі',
  'Пригоди',
  'Кримінал',
  'Історичний',
  'Документальний'
];

/**
 * Компонент MovieForm
 * Форма для введення назви та жанру нового фільму.
 * Керує станом полів через useState та викликає onAddMovie при відправці.
 */
function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedGenre = genre.trim();

    if (!trimmedTitle) {
      setError('Будь ласка, введіть назву фільму.');
      return;
    }

    if (!trimmedGenre) {
      setError('Будь ласка, вкажіть жанр фільму.');
      return;
    }

    onAddMovie({
      title: trimmedTitle,
      genre: trimmedGenre,
      isWatched: false
    });

    setTitle('');
    setGenre('');
    setError('');
  };

  return (
    <div className="movie-form-card">
      <div className="form-header">
        <h2 className="form-title">
          <span>➕</span> Додати новий фільм
        </h2>
      </div>

      <form className="movie-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="movie-title" className="form-label">
            <span>🎬</span> Назва фільму
          </label>
          <div className="form-input-wrap">
            <input
              id="movie-title"
              type="text"
              className="form-input"
              placeholder="Наприклад: Інтерстеллар"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="movie-genre" className="form-label">
            <span>🏷️</span> Жанр
          </label>
          <div className="form-input-wrap">
            <input
              id="movie-genre"
              type="text"
              list="genre-list"
              className="form-input"
              placeholder="Виберіть або введіть жанр"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                if (error) setError('');
              }}
              required
            />
            <datalist id="genre-list">
              {GENRE_SUGGESTIONS.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>
        </div>

        <button type="submit" className="btn-submit-movie">
          <span>+</span> Додати до списку
        </button>

        {error && (
          <div className="form-error" role="alert">
            <span>⚠️</span> {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default MovieForm;
