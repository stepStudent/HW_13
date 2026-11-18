import React from 'react';
import './StudentCard.css';

/**
 * Компонент картки студента (Завдання 2 & Завдання 3)
 * @param {string} name - Ім'я студента
 * @param {number} age - Вік студента
 * @param {number|string} course - Курс навчання
 * @param {string} avatar - Посилання на аватар або емодзі
 * @param {string} specialty - Спеціальність / напрямок
 * @param {number} gpa - Середній бал (додатково)
 */
export default function StudentCard({
  name,
  age,
  course,
  avatar = '🎓',
  specialty = 'Комп’ютерні науки',
  gpa
}) {
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
    <article className="student-card" aria-label={`Картка студента ${name}`}>
      <div className="card-top">
        <div className="student-avatar" aria-hidden="true">
          {avatar}
        </div>
        <span className="course-badge" data-course={course}>
          {course} курс
        </span>
      </div>

      <div className="card-body">
        <h3 className="student-name">{name}</h3>
        <p className="student-specialty">{specialty}</p>

        <div className="student-details">
          <div className="detail-item">
            <span className="detail-label">Вік:</span>
            <span className="detail-value">{age} {getAgeEnding(age)}</span>
          </div>

          {gpa && (
            <div className="detail-item">
              <span className="detail-label">Середній бал:</span>
              <span className="detail-value gpa-value">⭐ {gpa.toFixed(1)}</span>
            </div>
          )}

          <div className="detail-item">
            <span className="detail-label">Статус:</span>
            <span className="detail-value status-active">Активний студент</span>
          </div>
        </div>
      </div>
    </article>
  );
}
