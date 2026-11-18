import React, { useState, useMemo } from 'react';
import StudentCard from './components/StudentCard';
import Counter from './components/Counter';
import StudentControls from './components/StudentControls';
import './App.css';

// Повний масив студентів з різними курсами для повноцінної перевірки фільтрації
const STUDENTS_DATA = [
  {
    id: 1,
    name: 'Олександр Мельник',
    age: 19,
    course: 2,
    avatar: '👨‍💻',
    specialty: 'Веб-розробка та Front-End',
    gpa: 4.9
  },
  {
    id: 2,
    name: 'Анна Коваленко',
    age: 20,
    course: 3,
    avatar: '👩‍💻',
    specialty: 'Штучний інтелект & Data Science',
    gpa: 5.0
  },
  {
    id: 3,
    name: 'Максим Шевченко',
    age: 18,
    course: 1,
    avatar: '🧑‍🎓',
    specialty: 'Кібербезпека та захист даних',
    gpa: 4.8
  },
  {
    id: 4,
    name: 'Софія Бондаренко',
    age: 21,
    course: 4,
    avatar: '👩‍🔬',
    specialty: 'Програмна інженерія',
    gpa: 4.9
  },
  {
    id: 5,
    name: 'Дмитро Ткаченко',
    age: 22,
    course: 5,
    avatar: '🚀',
    specialty: 'Хмарні технології & DevOps',
    gpa: 5.0
  },
  {
    id: 6,
    name: 'Юлія Литвин',
    age: 18,
    course: 1,
    avatar: '👩‍🎨',
    specialty: 'Комп’ютерна графіка & UI/UX',
    gpa: 4.7
  },
  {
    id: 7,
    name: 'Анастасія Мороз',
    age: 19,
    course: 2,
    avatar: '📱',
    specialty: 'Мобільна розробка (Flutter & iOS)',
    gpa: 4.6
  },
  {
    id: 8,
    name: 'Богдан Кравчук',
    age: 20,
    course: 3,
    avatar: '🎮',
    specialty: 'Game Development & Unity',
    gpa: 4.5
  },
  {
    id: 9,
    name: 'Владислав Козак',
    age: 21,
    course: 4,
    avatar: '⚙️',
    specialty: 'Backend-розробка (Go & Node.js)',
    gpa: 4.8
  }
];

// Унікальні доступні курси
const AVAILABLE_COURSES = [1, 2, 3, 4, 5];

export default function App() {
  // Вимога 1: Кнопка «Показати / приховати студентів» через useState
  const [showStudents, setShowStudents] = useState(true);

  // Вимога 2: Фільтр студентів за курсом навчання через useState
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Підрахунок кількості студентів за кожним курсом (для бейджів)
  const courseCounts = useMemo(() => {
    const counts = { all: STUDENTS_DATA.length };
    AVAILABLE_COURSES.forEach(c => {
      counts[c] = STUDENTS_DATA.filter(s => s.course === c).length;
    });
    return counts;
  }, []);

  // Відфільтрований список студентів за обраним курсом
  const filteredStudents = useMemo(() => {
    if (selectedCourse === 'all') {
      return STUDENTS_DATA;
    }
    return STUDENTS_DATA.filter(student => student.course === Number(selectedCourse));
  }, [selectedCourse]);

  // Вимога 3: Лічильник кількості студентів, які зараз відображаються на сторінці
  // Якщо список приховано, на сторінці відображається 0 студентів
  const displayedCount = showStudents ? filteredStudents.length : 0;

  // Обробник перемикання видимості студентів
  const handleToggleVisibility = () => {
    setShowStudents(prev => !prev);
  };

  // Обробник зміни фільтра за курсом
  const handleCourseChange = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="app-container">
      {/* Шапка застосунку */}
      <header className="app-header">
        <div className="header-badge">IT STEP Academy • React Homework 13 (Завдання 3)</div>
        <h1 className="app-title">Інтерактивний каталог студентів</h1>
        <p className="app-subtitle">
          Розширений застосунок із керуванням видимістю через <code>useState</code>,
          фільтрацією за курсом навчання та динамічним лічильником студентів на сторінці.
        </p>
      </header>

      {/* Секція інтерактивного лічильника відвідувань заняття (із Завдання 2) */}
      <section className="section-counter" aria-label="Журнал відвідувань">
        <Counter />
      </section>

      {/* Панель керування: показати/приховати + фільтр + лічильник відображених */}
      <StudentControls
        showStudents={showStudents}
        onToggleVisibility={handleToggleVisibility}
        selectedCourse={selectedCourse}
        onCourseChange={handleCourseChange}
        courses={AVAILABLE_COURSES}
        totalStudents={STUDENTS_DATA.length}
        displayedCount={displayedCount}
        courseCounts={courseCounts}
      />

      {/* Секція каталогу студентів */}
      <section className="section-students" aria-label="Каталог студентів">
        <div className="section-header">
          <div>
            <h2 className="section-title">Картки студентів</h2>
            <p className="section-desc">
              {showStudents
                ? selectedCourse === 'all'
                  ? 'Відображаються студенти всіх курсів'
                  : `Відображаються студенти ${selectedCourse}-го курсу`
                : 'Список студентів тимчасово приховано перемикачем'}
            </p>
          </div>

          <div className="section-badges">
            <span className={`status-pill ${showStudents ? 'pill-visible' : 'pill-hidden'}`}>
              {showStudents ? '● Список відкритий' : '○ Список прихований'}
            </span>
            <span className="students-total-badge">
              На сторінці: <strong>{displayedCount}</strong> із {STUDENTS_DATA.length}
            </span>
          </div>
        </div>

        {/* Умовне відображення: якщо приховано через useState */}
        {!showStudents ? (
          <div className="students-state-card students-hidden-card">
            <div className="state-icon" aria-hidden="true">🙈</div>
            <h3 className="state-title">Каталог студентів приховано</h3>
            <p className="state-description">
              Студенти приховані за допомогою стану <code>showStudents = false</code>.
              Натисніть кнопку нижче, щоб повернути відображення карток на сторінку.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleToggleVisibility}
            >
              👁️ Показати студентів
            </button>
          </div>
        ) : filteredStudents.length === 0 ? (
          /* Якщо фільтр не дав результатів */
          <div className="students-state-card students-empty-card">
            <div className="state-icon" aria-hidden="true">🔍</div>
            <h3 className="state-title">Студентів не знайдено</h3>
            <p className="state-description">
              На {selectedCourse}-му курсі наразі немає зареєстрованих студентів.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSelectedCourse('all')}
            >
              Показати всі курси
            </button>
          </div>
        ) : (
          /* Відображення карток студентів через props */
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                age={student.age}
                course={student.course}
                avatar={student.avatar}
                specialty={student.specialty}
                gpa={student.gpa}
              />
            ))}
          </div>
        )}
      </section>

      {/* Футер */}
      <footer className="app-footer">
        <p>
          Інтерактивний каталог студентів © 2026 • IT STEP Academy • React 18 & Vite
        </p>
      </footer>
    </div>
  );
}
