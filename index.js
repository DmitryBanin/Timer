const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timer = null;
  let totalSeconds = 0;

  return (seconds) => {
    if (timer) {
      clearInterval(timer);
    }

    totalSeconds = seconds;
    timer = setInterval(() => {
      const hour = 3600;
      const minute = 60;
      let hoursLeft = Math.floor(totalSeconds / hour);
      let minutesLeft = Math.floor((totalSeconds - hoursLeft * hour) / minute);
      let secondsLeft = Math.floor(
        totalSeconds - hoursLeft * hour - minutesLeft * minute
      );

      const setTimerFormatting = (time) => time.toString().padStart(2, '0');

      timerEl.textContent = `${setTimerFormatting(
        hoursLeft
      )}:${setTimerFormatting(minutesLeft)}:${setTimerFormatting(secondsLeft)}`;

      if (totalSeconds === 0) {
        clearInterval(timer);
        inputEl.placeholder = 'Seconds';
        timer = null;
      }

      --totalSeconds;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const inputValue = Number(inputEl.value);
  if (Number.isNaN(inputValue)) {
    inputEl.setCustomValidity('Enter a number');
  } else {
    inputEl.setCustomValidity('');
    inputEl.placeholder = inputValue;
  }
  inputEl.value = inputEl.value.replace(/[^0-9]/g, '');
  inputEl.reportValidity();
  
  // Еще вариант - в input указать type="number"
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
