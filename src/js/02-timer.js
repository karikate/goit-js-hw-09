import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');
const wrapTimer = document.querySelector('.timer');

btnStart.toggleAttribute('disabled');
wrapTimer.style.dispay = 'block';

let currentDate = new Date().getTime();
let targetDate = 0;
let timeToTarget = 0;
let timeId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    chekingData();
  },
};

function chekingData() {
  if (currentDate > targetDate) {
    return alert('Please choose a date in the future!');
  } else {
    btnStart.toggleAttribute('disabled');
  }
}

const fp = flatpickr(inputEl, options);

btnStart.addEventListener('click', onClick);

function onClick() {
  timeId = setInterval(() => {
    currentDate = new Date().getTime();
    timeToTarget = targetDate - currentDate;
    convertMs();
    stopInt();
  }, 1000);
}

function convertMs() {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(timeToTarget / day)
    .toString()
    .padStart(2, 0);
  const hours = Math.floor((timeToTarget % day) / hour)
    .toString()
    .padStart(2, 0);
  const minutes = Math.floor(((timeToTarget % day) % hour) / minute)
    .toString()
    .padStart(2, 0);
  const seconds = Math.floor((((timeToTarget % day) % hour) % minute) / second)
    .toString()
    .padStart(2, 0);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minEl.textContent = minutes;
  secEl.textContent = seconds;

  return { days, hours, minutes, seconds };
}

function stopInt() {
  if (timeToTarget < 1000) {
    clearInterval(timeId);
  }
}
