const timerSubmit = document.querySelector('.timer-submit')
const timerInput = document.querySelector('.timer-input')
const timerDisplay = document.querySelector('.timer-display')


timerSubmit.addEventListener('click', startTimer)


function timer(minutes) {

    let seconds = 60;

    minutes--;

    let interval = setInterval(function () {

        seconds--;

        if (minutes < 10 && seconds > 10) {
            timerDisplay.innerHTML = `0${minutes} : ${seconds}`;
        }

        else if (minutes < 10 && seconds < 10) {
            timerDisplay.innerHTML = `0${minutes} : 0${seconds}`;
        }

        else if (minutes > 10 && seconds < 10) {
            timerDisplay.innerHTML = `${minutes} : 0${seconds}`;
        }

        else {
            timerDisplay.innerHTML = `${minutes} : ${seconds}`;
        }

        if (!seconds && !minutes) {
            clearInterval(interval);
            alert("Complete!");
        }

        if (!seconds) {
            minutes--;
            seconds = 60;
        }

    }, 1000)
}


function startTimer() {
    let minutes = timerInput.value
    timer(minutes);
}


