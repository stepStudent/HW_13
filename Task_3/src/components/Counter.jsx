import React, { useState } from 'react';
import './Counter.css';

/**
 * Компонент лічильника відвідувань заняття (Завдання 2)
 */
export default function Counter() {
  // Використовуємо useState для збереження кількості відвідувань
  const [attendanceCount, setAttendanceCount] = useState(0);

  // Функція додавання відвідування
  const handleAddAttendance = () => {
    setAttendanceCount(prevCount => prevCount + 1);
  };

  // Функція скидання значення лічильника
  const handleReset = () => {
    setAttendanceCount(0);
  };

  return (
    <div className="attendance-counter">
      <div className="counter-header">
        <div className="counter-icon-wrap">
          <span className="counter-icon">📋</span>
        </div>
        <div>
          <h2 className="counter-title">Журнал відвідувань заняття</h2>
          <p className="counter-desc">Фіксуйте присутність студентів на лекції чи практиці</p>
        </div>
      </div>

      <div className="counter-display">
        <span className="counter-label">Всього присутніх сьогодні:</span>
        <div className="counter-number-badge">
          <span className="counter-number">{attendanceCount}</span>
          <span className="counter-unit">
            {attendanceCount === 1 ? 'студент' : (attendanceCount >= 2 && attendanceCount <= 4) ? 'студенти' : 'студентів'}
          </span>
        </div>
      </div>

      <div className="counter-actions">
        <button 
          className="btn btn-primary"
          onClick={handleAddAttendance}
          type="button"
        >
          ➕ Зареєструвати присутність (+1)
        </button>

        <button 
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={attendanceCount === 0}
          type="button"
        >
          🔄 Скинути
        </button>
      </div>

      {attendanceCount > 0 && (
        <div className="counter-notice">
          💡 Чудова явка! Заняття проходить продуктивно.
        </div>
      )}
    </div>
  );
}
