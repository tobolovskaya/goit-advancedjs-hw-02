import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;
button.disabled = true;

const addLeadingZero = num => num.toString().padStart(2, '0');

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateTimer = ({ days, hours, minutes, seconds }) => {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
};

const setTimer = () => {
  button.disabled = true;
  input.disabled = true;

  const countdownInterval = setInterval(() => {
    const timeRemaining = userSelectedDate - new Date();

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimer(convertMs(0));
      iziToast.show({
        message: 'Time is up!',
        position: 'topRight',
        color: 'green',
      });
      input.disabled = false;
      return;
    }
    const convertedTime = convertMs(timeRemaining);
    updateTimer(convertedTime);
  }, 1000);
};

button.addEventListener('click', () => setTimer());

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    if (selectedDate <= new Date()) {
      button.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: 'red',
      });
    } else {
      button.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
});
