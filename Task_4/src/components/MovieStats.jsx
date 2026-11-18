import React from 'react';
import './MovieStats.css';

/**
 * Компонент MovieStats
 * Відображає кількість переглянутих і непереглянутих фільмів, загальну кількість
 * та прогрес-бар перегляду списку.
 */
function MovieStats({ total = 0, watched = 0, unwatched = 0 }) {
  const percentage = total > 0 ? Math.round((watched / total) * 100) : 0;

  return (
    <section className="stats-section" aria-label="Статистика списку фільмів">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total" aria-hidden="true">
            🎞️
          </div>
          <div className="stat-info">
            <span className="stat-label">Всього фільмів</span>
            <span className="stat-value">{total}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon unwatched" aria-hidden="true">
            🍿
          </div>
          <div className="stat-info">
            <span className="stat-label">До перегляду</span>
            <span className="stat-value">{unwatched}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon watched" aria-hidden="true">
            ✅
          </div>
          <div className="stat-info">
            <span className="stat-label">Переглянуто</span>
            <span className="stat-value">{watched}</span>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="progress-container">
          <div className="progress-header">
            <span>Прогрес перегляду списку</span>
            <span className="progress-percentage">{percentage}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieStats;
