import React from 'react';
import StudentCard from './components/StudentCard';
import Counter from './components/Counter';
import './App.css';

// Початковий список студентів (щонайменше 4 картки за вимогою)
const STUDENTS_DATA = [
  {
    id: 1,
    name: 'Олександр Мельник',
    age: 19,
    course: 2,
    avatar: '👨‍💻',
    specialty: 'Веб-розробка та Front-End'
  },
  {
    id: 2,
    name: 'Анна Коваленко',
    age: 20,
    course: 3,
    avatar: '👩‍💻',
    specialty: 'Штучний інтелект & Data Science'
  },
  {
    id: 3,
    name: 'Максим Шевченко',
    age: 18,
    course: 1,
    avatar: '🧑‍🎓',
    specialty: 'Кібербезпека'
  },
  {
    id: 4,
    name: 'Софія Бондаренко',
    age: 21,
    course: 4,
    avatar: '👩‍🔬',
    specialty: 'Програмна інженерія'
  },
  {
    id: 5,
    name: 'Дмитро Ткаченко',
    age: 22,
    course: 5,
    avatar: '🚀',
    specialty: 'Хмарні технології & DevOps'
  }
];

export default function App() {
  return (
    <div className="app-container">
      {/* Шапка застосунку */}
      <header className="app-header">
        <div className="header-badge">IT STEP Academy • React Homework 13</div>
        <h1 className="app-title">Каталог студентів академії</h1>
        <p className="app-subtitle">
          Навчальний проєкт на React + Vite: передача props, робота з компонентами та стан через useState.
        </p>
      </header>

      {/* Секція інтерактивного лічильника */}
      <section className="section-counter">
        <Counter />
      </section>

      {/* Секція каталогу студентів */}
      <section className="section-students">
        <div className="section-header">
          <div>
            <h2 className="section-title">Список студентів групи</h2>
            <p className="section-desc">Картки студентів з передачею даних через props</p>
          </div>
          <span className="students-total-badge">
            Всього в базі: {STUDENTS_DATA.length}
          </span>
        </div>

        <div className="students-grid">
          {STUDENTS_DATA.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              age={student.age}
              course={student.course}
              avatar={student.avatar}
              specialty={student.specialty}
            />
          ))}
        </div>
      </section>

      {/* Футер */}
      <footer className="app-footer">
        <p>Каталог студентів © 2026 • Побудовано на React 18 & Vite</p>
      </footer>
    </div>
  );
}
