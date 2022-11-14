import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
// startBtn.addEventListener('click', onChooseDate);
startBtn.disabled = true;
const input = document.querySelector('#datetime-picker');

const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let CountingDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    CountingDate = selectedDates[0].getTime();
    console.log(selectedDates[0]);
    if (CountingDate <= 0) {
      alert('"Please choose a date in the future"');
      startBtn.disabled = true;
      return;
    } else {
      startBtn.disabled = false;
    }
    onChooseDate();
  },
};

function onChooseDate() {
  // startBtn.disabled = true;
  timerId = setInterval(() => {
    const counter = CountingDate - Date.now();
    console.log(counter);
    const { days, hours, minutes, seconds } = convertMs(counter);
    if (counter < 1000) {
      clearInterval(timerId);
    }

    day.textContent = days;
    hour.textContent = hours;
    minute.textContent = minutes;
    second.textContent = seconds;
  }, 1000);
}

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const body = document.querySelector('body');
body.classList.add('theme');
