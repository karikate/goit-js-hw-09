import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector("form.form input[name='delay']");
const inputStepEl = document.querySelector("form.form input[name='step']");
const inputAmountEl = document.querySelector("form.form input[name='amount']");

formEl.addEventListener('submit', onClick);

// function checkValue() {
//   if (Number(inputAmountEl.value) < 0) {
//     Notify.warning(
//       'The amount cannot be negative. Please enter the correct amount.'
//     );
//     formEl.reset;
//   }
// }

function onClick(e) {
  e.preventDefault();
  // checkValue();
  let delay = Number(inputDelayEl.value);
  const step = Number(inputStepEl.value);
  const amount = Number(inputAmountEl.value);

  for (position = 1; position <= amount; position++) {
    if (position != 1) {
      delay += step;
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
