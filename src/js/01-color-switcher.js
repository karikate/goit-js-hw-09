const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bcgColor = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timeId = null;

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

function onClickStart() {
  timeId = setInterval(changeBgrClr, 1000);
  btnStart.toggleAttribute('disabled');
}

function onClickStop() {
  clearInterval(timeId);
  btnStart.toggleAttribute('disabled');
}

function changeBgrClr() {
  bcgColor.style.backgroundColor = getRandomHexColor();
}
