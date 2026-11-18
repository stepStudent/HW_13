import React from 'react';
import './StudentControls.css';

/**
 * Панель керування каталогом студентів:
 * 1. Кнопка «Показати / приховати студентів» (useState у батьківському компоненті)
 * 2. Фільтр студентів за курсом навчання
 * 3. Лічильник кількості студентів, які зараз відображаються на сторінці
 */
export default function StudentControls({
  showStudents,
  onToggleVisibility,
  selectedCourse,
  onCourseChange,
  courses = [1, 2, 3, 4, 5],
  totalStudents,
  displayedCount,
  courseCounts = {}
}) {
  return (
    <section className="student-controls-panel" aria-label="Панель фільтрації та керування списком">
      {/* Верхній рядок: кнопка показати/приховати + лічильник кількості на сторінці */}
      <div className="controls-top-row">
        <div className="visibility-control">
          <button
            type="button"
            className={`btn-toggle ${showStudents ? 'btn-toggle-active' : 'btn-toggle-hidden'}`}
            onClick={onToggleVisibility}
            aria-pressed={showStudents}
            title={showStudents ? 'Натисніть, щоб приховати список студентів' : 'Натисніть, щоб показати список студентів'}
          >
            <span className="btn-icon">{showStudents ? '👁️' : '👁️‍🗨️'}</span>
            <span className="btn-text">
              {showStudents ? 'Приховати студентів' : 'Показати студентів'}
            </span>
            <span className="btn-indicator" />
          </button>
          
          <span className="visibility-status-hint">
            {showStudents ? 'Картки відображаються' : 'Картки приховано'}
          </span>
        </div>

        {/* Лічильник кількості студентів, що відображаються на сторінці */}
        <div className="display-counter-card">
          <div className="display-counter-label">
            <span className="counter-pulse-dot" data-active={showStudents && displayedCount > 0} />
            Зараз відображається на сторінці:
          </div>
          <div className="display-counter-value">
            <span className="count-number">{displayedCount}</span>
            <span className="count-divider">/</span>
            <span className="count-total">{totalStudents}</span>
            <span className="count-unit">
              {displayedCount === 1 ? 'студент' : (displayedCount >= 2 && displayedCount <= 4) ? 'студенти' : 'студентів'}
            </span>
          </div>
        </div>
      </div>

      {/* Нижня секція: Фільтр за курсом навчання */}
      <div className="filter-section">
        <div className="filter-header">
          <span className="filter-title">
            <span className="filter-icon">🎯</span> Фільтр за курсом навчання:
          </span>
          {selectedCourse !== 'all' && (
            <button
              type="button"
              className="btn-reset-filter"
              onClick={() => onCourseChange('all')}
              title="Скинути фільтр та показати всі курси"
            >
              ✕ Скинути фільтр
            </button>
          )}
        </div>

        {/* Швидкі чіпси / кнопки для кожного курсу */}
        <div className="filter-chips" role="group" aria-label="Вибір курсу навчання">
          <button
            type="button"
            className={`filter-chip ${selectedCourse === 'all' ? 'active' : ''}`}
            onClick={() => onCourseChange('all')}
          >
            <span>Всі курси</span>
            <span className="chip-badge">{courseCounts['all'] ?? totalStudents}</span>
          </button>

          {courses.map((courseNum) => (
            <button
              key={courseNum}
              type="button"
              className={`filter-chip ${String(selectedCourse) === String(courseNum) ? 'active' : ''}`}
              onClick={() => onCourseChange(String(courseNum))}
            >
              <span>{courseNum} курс</span>
              {courseCounts[courseNum] !== undefined && (
                <span className="chip-badge">{courseCounts[courseNum]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Випадаючий список селектора для зручності */}
        <div className="filter-select-wrapper">
          <label htmlFor="course-select" className="filter-select-label">
            Швидкий вибір курсу:
          </label>
          <select
            id="course-select"
            className="filter-select"
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
          >
            <option value="all">🎓 Всі курси ({totalStudents})</option>
            {courses.map((courseNum) => (
              <option key={courseNum} value={String(courseNum)}>
                {courseNum} курс ({courseCounts[courseNum] ?? 0} студ.)
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
