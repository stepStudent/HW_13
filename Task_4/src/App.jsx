import React, { useState, useEffect, useMemo } from 'react';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieStats from './components/MovieStats';
import './App.css';

// Початковий демонстраційний набір фільмів
const INITIAL_MOVIES = [
  {
    id: 1,
    title: 'Інтерстеллар',
    genre: 'Наукова фантастика',
    isWatched: true,
  },
  {
    id: 2,
    title: 'Початок',
    genre: 'Трилер',
    isWatched: true,
  },
  {
    id: 3,
    title: 'Памфір',
    genre: 'Драма',
    isWatched: false,
  },
  {
    id: 4,
    title: 'Дюна: Частина друга',
    genre: 'Фантастика / Пригоди',
    isWatched: false,
  },
  {
    id: 5,
    title: 'Оппенгеймер',
    genre: 'Біографічна драма',
    isWatched: true,
  },
  {
    id: 6,
    title: 'Довбуш',
    genre: 'Історичний екшн',
    isWatched: false,
  },
];

const STORAGE_KEY = 'movie_watchlist_data_v1';

function App() {
  // Додаткове ускладнення: ініціалізація стану з localStorage
  const [movies, setMovies] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Не вдалося завантажити фільми з localStorage:', err);
    }
    return INITIAL_MOVIES;
  });

  // Фільтри та пошук
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'unwatched' | 'watched'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Додаткове ускладнення: синхронізація з localStorage при зміні списку
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    } catch (err) {
      console.error('Не вдалося зберегти фільми в localStorage:', err);
    }
  }, [movies]);

  // Функціональна вимога 5: додавання фільмів за допомогою useState
  const handleAddMovie = ({ title, genre, isWatched = false }) => {
    const newMovie = {
      id: Date.now(),
      title,
      genre,
      isWatched,
    };
    setMovies((prevMovies) => [newMovie, ...prevMovies]);
  };

  // Функціональна вимога 6: зміна статусу фільму
  const handleToggleWatch = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isWatched: !movie.isWatched } : movie
      )
    );
  };

  // Видалення фільму зі списку
  const handleDeleteMovie = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  // Скидання до початкових фільмів
  const handleResetToDefaults = () => {
    if (window.confirm('Скинути список до початкових демонстраційних фільмів?')) {
      setMovies(INITIAL_MOVIES);
    }
  };

  // Очищення всього списку
  const handleClearAll = () => {
    if (window.confirm('Ви впевнені, що хочете видалити всі фільми зі списку?')) {
      setMovies([]);
    }
  };

  // Функціональна вимога 7: підрахунок кількості переглянутих і непереглянутих фільмів
  const totalCount = movies.length;
  const watchedCount = movies.filter((m) => m.isWatched).length;
  const unwatchedCount = totalCount - watchedCount;

  // Отримання унікальних жанрів для швидкого фільтру
  const availableGenres = useMemo(() => {
    const genres = new Set(movies.map((m) => m.genre));
    return Array.from(genres).sort();
  }, [movies]);

  // Відфільтровані фільми за статусом, пошуковим запитом та жанром
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Фільтр за статусом перегляду
      if (filterStatus === 'watched' && !movie.isWatched) return false;
      if (filterStatus === 'unwatched' && movie.isWatched) return false;

      // Фільтр за обраним жанром
      if (selectedGenre !== 'all' && movie.genre !== selectedGenre) return false;

      // Пошук за назвою або жанром
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = movie.title.toLowerCase().includes(query);
        const matchGenre = movie.genre.toLowerCase().includes(query);
        if (!matchTitle && !matchGenre) return false;
      }

      return true;
    });
  }, [movies, filterStatus, selectedGenre, searchQuery]);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {/* Заголовок та опис застосунку */}
        <header className="app-header">
          <div className="app-badge">
            <span>🎬</span> Movie Watchlist
          </div>
          <h1 className="app-title">
            Список <span>Улюблених Фільмів</span>
          </h1>
          <p className="app-subtitle">
            Додавайте фільми до свого списку перегляду, відмічайте переглянуті шедеври
            та керуйте власною кіноколекцією зі збереженням у LocalStorage.
          </p>
        </header>

        {/* Форма додавання нового фільму */}
        <MovieForm onAddMovie={handleAddMovie} />

        {/* Статистика переглянутих та непереглянутих фільмів */}
        <MovieStats
          total={totalCount}
          watched={watchedCount}
          unwatched={unwatchedCount}
        />

        {/* Панель керування: фільтри, пошук, жанри та швидкі дії */}
        <div className="controls-bar">
          <div className="filter-tabs" role="tablist" aria-label="Фільтри за статусом">
            <button
              type="button"
              className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              Всі ({totalCount})
            </button>
            <button
              type="button"
              className={`filter-tab ${filterStatus === 'unwatched' ? 'active' : ''}`}
              onClick={() => setFilterStatus('unwatched')}
            >
              🍿 До перегляду ({unwatchedCount})
            </button>
            <button
              type="button"
              className={`filter-tab ${filterStatus === 'watched' ? 'active' : ''}`}
              onClick={() => setFilterStatus('watched')}
            >
              ✅ Переглянуті ({watchedCount})
            </button>
          </div>

          <div className="secondary-controls">
            {/* Пошук за назвою */}
            <div className="search-input-wrap">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Пошук фільму..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Пошук фільму"
              />
            </div>

            {/* Випадаючий список жанрів */}
            {availableGenres.length > 0 && (
              <select
                className="genre-select"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                aria-label="Фільтр за жанром"
              >
                <option value="all">Усі жанри</option>
                {availableGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            )}

            {/* Додаткові кнопки керування */}
            <div className="action-buttons">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleResetToDefaults}
                title="Відновити стандартні фільми"
              >
                ↺ Скинути
              </button>
              {movies.length > 0 && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleClearAll}
                  title="Видалити всі фільми"
                >
                  🗑️ Очистити
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Список фільмів через компонент MovieList */}
        <main>
          <MovieList
            movies={filteredMovies}
            onToggleWatch={handleToggleWatch}
            onDelete={handleDeleteMovie}
          />
        </main>
      </div>

      {/* Футер */}
      <footer className="app-footer">
        <p>
          IT Step Academy • Домашнє завдання 13 • Завдання 4: Movie Watchlist (React + useState + localStorage)
        </p>
      </footer>
    </div>
  );
}

export default App;
