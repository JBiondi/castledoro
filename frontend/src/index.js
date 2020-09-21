const startTimerButton = document.querySelector('.start-timer');
const pauseTimerButton = document.querySelector('.pause-timer');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');

let startTimer;
let sessions;

startTimerButton.addEventListener('click', function() {
    if (startTimer === undefined) {
        startTimer = setInterval(runTimer, 1000)
    }
    else {
        alert('The timer is already counting down')
    }
})

function runTimer() {
    if(timerSeconds.innerText !== 0) {
        timerSeconds.innerText--;
    }
    else if (timerMinutes.innerText !== 0 && timerSeconds.innerText === 0) {
        timerSeconds.innerText = 59;
        timerMinutes.innerText--;
    }

    else if (timerMinutes.innerText === 0 && timerSeconds.innerText === 0) {
        timerMinutes.innerText = 45;
        timerSeconds.innerText = '00';
        sessions++;
        console.log(`Sessions completed is now: ${sessions}`)
    }
}

