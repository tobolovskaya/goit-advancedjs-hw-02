import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const delay = parseInt(form.delay.value, 10);
  const state = form.state.value;
  form.reset()
  
  const createPromise = (delay, state) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };

  createPromise(delay, state)
    .then((delay) => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green'
      });
    })
    .catch((delay) => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red'
      });
    });
});