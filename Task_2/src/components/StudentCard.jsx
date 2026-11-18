import React from 'react';
import './StudentCard.css';

/**
 * Компонент картки студента
 * @param {string} name - Ім'я студента
 * @param {number} age - Вік студента
 * @param {number|string} course - Курс навчання
 * @param {string} avatar - Посилання на аватар або емодзі (опціонально)
 * @param {string} specialty - Спеціальність / напрямок (опціонально)
 */
export default function StudentCard({ name, age, course, avatar = '🎓', specialty = 'Комп’ютерні науки' }) {
  // Визначаємо правильне закінчення для слова "років / роки / рік"
  const getAgeEnding = (years) => {
    const lastDigit = years % 10;
    const lastTwoDigits = years % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'років';
    if (lastDigit === 1) return 'рік';
    if (lastDigit >= 2 && lastDigit <= 4) return 'роки';
    return 'років';
  };

  return (
    <div className="student-card">
      <div className="card-top">
        <div className="student-avatar" aria-hidden="true">
          {avatar}
        </div>
        <span className="course-badge">{course} курс</span>
      </div>

      <div className="card-body">
        <h3 className="student-name">{name}</h3>
        <p className="student-specialty">{specialty}</p>

        <div className="student-details">
          <div className="detail-item">
            <span className="detail-label">Вік:</span>
            <span className="detail-value">{age} {getAgeEnding(age)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Статус:</span>
            <span className="detail-value status-active">Активний студент</span>
          </div>
        </div>
      </div>
    </div>
  );
}
