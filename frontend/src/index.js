const startTimerButton = document.querySelector('.start-timer');
const pauseTimerButton = document.querySelector('.pause-timer');
const resetTimerButton = document.querySelector('.reset-timer');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');

let startTimer;
let sessions = 0;


startTimerButton.addEventListener('click', function() {
    if (startTimer === undefined) {
        startTimer = setInterval(runTimer, 1000)
    }
    else {
        alert('The timer is already counting down')
    }
})


pauseTimerButton.addEventListener('click', function() {
    clearInterval(startTimer);
    startTimer = undefined;
    console.log('Timer paused)')
})


resetTimerButton.addEventListener('click', function () {
    clearInterval(startTimer);
    startTimer = undefined;
    timerMinutes.innerText = 45;
    timerSeconds.innerText = '00';
    console.log('Timer has been reset')
})


function runTimer() {

    console.log("Running timer!")
    const seconds = Number(timerSeconds.innerText);
    const minutes = Number(timerMinutes.innerText);

    console.log(minutes, seconds);

    if (seconds !== 0) {
        console.log('Timer goin')
        timerSeconds.innerText--;
    }

    else if (minutes !== 0 && seconds === 0) {
        timerSeconds.innerText = 59;
        timerMinutes.innerText--;
    }

    else if (minutes === 0 && seconds === 0) {
        console.log('ENDED')
        timerMinutes.innerText = '00';
        timerSeconds.innerText = '00';
        sessions++;
        console.log(`Sessions completed is now: ${sessions}`);
        clearInterval(startTimer);
    }
}

