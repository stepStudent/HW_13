/**
 * Завдання 1. Генератор випадкових фактів
 * Використання fetch() та async/await з обробкою помилок та станів завантаження
 */

// Посилання на елементи DOM
const getFactBtn = document.getElementById('getFactBtn');
const retryBtn = document.getElementById('retryBtn');
const copyBtn = document.getElementById('copyBtn');

const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const contentState = document.getElementById('contentState');

const factUa = document.getElementById('factUa');
const factEn = document.getElementById('factEn');
const factSource = document.getElementById('factSource');
const errorMessage = document.getElementById('errorMessage');
const funnyLoadingText = document.getElementById('funnyLoadingText');
const translationStatus = document.getElementById('translationStatus');

const uaView = document.getElementById('uaView');
const enView = document.getElementById('enView');
const btnShowUa = document.getElementById('btnShowUa');
const btnShowEn = document.getElementById('btnShowEn');
const btnShowBoth = document.getElementById('btnShowBoth');

// Ендпоінт випадкових фактів
const RANDOM_FACT_API = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en';

// Кумедні фрази для екрана завантаження
const FUNNY_LOADING_PHRASES = [
  'Дзвонимо у всесвітню бібліотеку дивацтв... 📞',
  'Шукаємо мудрість у квантових полях... ⚛️',
  'Запитуємо у штучного інтелекту, що він думає про пінгвінів... 🐧',
  'Перекладаємо мовою людей... 🧠',
  'Розпитуємо кота про таємниці всесвіту... 🐱',
  'Витягуємо найбезглуздіший, але правдивий факт... 🔍'
];

// Поточний стан
let currentFact = {
  en: '',
  ua: '',
  sourceUrl: ''
};

let currentLanguageMode = 'ua'; // 'ua', 'en', 'both'

/**
 * Перемикання станів відображення (loading, error, content)
 */
function setViewState(state) {
  loadingState.classList.add('hidden');
  errorState.classList.add('hidden');
  contentState.classList.add('hidden');

  if (state === 'loading') {
    loadingState.classList.remove('hidden');
    getFactBtn.disabled = true;
  } else if (state === 'error') {
    errorState.classList.remove('hidden');
    getFactBtn.disabled = false;
  } else if (state === 'content') {
    contentState.classList.remove('hidden');
    getFactBtn.disabled = false;
  }
}

/**
 * Оновлення відображення блоків мов
 */
function updateLanguageVisibility(mode) {
  currentLanguageMode = mode;

  btnShowUa.classList.toggle('active', mode === 'ua');
  btnShowEn.classList.toggle('active', mode === 'en');
  btnShowBoth.classList.toggle('active', mode === 'both');

  if (mode === 'ua') {
    uaView.classList.remove('hidden');
    enView.classList.add('hidden');
  } else if (mode === 'en') {
    uaView.classList.add('hidden');
    enView.classList.remove('hidden');
  } else if (mode === 'both') {
    uaView.classList.remove('hidden');
    enView.classList.remove('hidden');
  }
}

/**
 * Асинхронний переклад тексту на українську мову через MyMemory API
 */
async function translateText(text) {
  try {
    const encoded = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|uk`;
    
    // Встановлюємо таймаут для запиту перекладу
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Помилка перекладу: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    return text;
  } catch (err) {
    console.warn('Не вдалося отримати переклад:', err);
    return null; // Якщо переклад не вдався, відобразимо оригінал
  }
}

/**
 * Головна функція отримання факту за допомогою fetch() та async/await
 */
async function fetchRandomFact() {
  // 1. Встановлюємо випадкову гумористичну фразу для очікування
  const randomPhrase = FUNNY_LOADING_PHRASES[Math.floor(Math.random() * FUNNY_LOADING_PHRASES.length)];
  funnyLoadingText.textContent = randomPhrase;

  // 2. Включаємо стан «Завантаження...»
  setViewState('loading');

  try {
    // Встановлюємо ліміт очікування запиту 10 секунд
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(RANDOM_FACT_API, { signal: controller.signal });
    clearTimeout(timeoutId);

    // Перевірка на успішний статус HTTP відповіді (200-299)
    if (!response.ok) {
      throw new Error(`Сервер повернув статус помилки: ${response.status} (${response.statusText})`);
    }

    // Парсинг отриманого JSON
    const data = await response.json();

    if (!data || !data.text) {
      throw new Error('Отримано некоректну відповідь від сервера.');
    }

    const englishFact = data.text.trim();
    currentFact.en = englishFact;
    currentFact.sourceUrl = data.source_url || data.permalink || '';

    // Отримуємо переклад тексту українською мовою
    funnyLoadingText.textContent = 'Перекладаємо солов’їною мовою... 🇺🇦';
    const ukrainianFact = await translateText(englishFact);

    if (ukrainianFact) {
      currentFact.ua = ukrainianFact;
      translationStatus.textContent = 'автоматичний переклад';
    } else {
      // Якщо сервіс перекладу тимчасово недоступний
      currentFact.ua = englishFact;
      translationStatus.textContent = 'оригінал (переклад недоступний)';
    }

    // 3. Відображаємо отримані дані у DOM
    renderFact();

    // 4. Перемикаємо екран на відображення контенту
    setViewState('content');

  } catch (error) {
    console.error('Помилка при завантаженні факту:', error);

    // Зрозуміле людині повідомлення про помилку
    let userFriendlyMsg = 'Не вдалося зв’язатися з сервером фактів. Перевірте з’єднання з інтернетом або спробуйте пізніше.';
    
    if (error.name === 'AbortError') {
      userFriendlyMsg = 'Сервер занадто довго думав і не відповів вчасно (Timeout). Спробуйте ще раз!';
    } else if (error.message) {
      userFriendlyMsg = `${userFriendlyMsg} (Деталі: ${error.message})`;
    }

    errorMessage.textContent = userFriendlyMsg;
    setViewState('error');
  }
}

/**
 * Відображення тексту та метаданих факту
 */
function renderFact() {
  factUa.textContent = currentFact.ua;
  factEn.textContent = currentFact.en;

  if (currentFact.sourceUrl) {
    factSource.innerHTML = `Джерело: <a href="${currentFact.sourceUrl}" target="_blank" rel="noopener noreferrer">Переглянути оригінал 🔗</a>`;
  } else {
    factSource.textContent = 'Джерело: Useless Facts Archive';
  }
}

/**
 * Копіювання поточного факту в буфер обміну
 */
async function copyCurrentFact() {
  const textToCopy = currentLanguageMode === 'en' 
    ? currentFact.en 
    : currentLanguageMode === 'ua' 
      ? currentFact.ua 
      : `${currentFact.ua}\n\n[Original]: ${currentFact.en}`;

  try {
    await navigator.clipboard.writeText(textToCopy);
    const copyTextSpan = copyBtn.querySelector('.copy-text');
    copyBtn.classList.add('copied');
    copyTextSpan.textContent = 'Скопійовано! 👍';

    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyTextSpan.textContent = 'Скопіювати';
    }, 2000);
  } catch (err) {
    console.warn('Не вдалося скопіювати через Clipboard API', err);
  }
}

// Слухачі подій для кнопок
getFactBtn.addEventListener('click', fetchRandomFact);
retryBtn.addEventListener('click', fetchRandomFact);
copyBtn.addEventListener('click', copyCurrentFact);

// Слухачі перемикання мови
btnShowUa.addEventListener('click', () => updateLanguageVisibility('ua'));
btnShowEn.addEventListener('click', () => updateLanguageVisibility('en'));
btnShowBoth.addEventListener('click', () => updateLanguageVisibility('both'));

// Автоматичне завантаження першого факту при відкритті сторінки
document.addEventListener('DOMContentLoaded', () => {
  updateLanguageVisibility('ua');
  fetchRandomFact();
});
