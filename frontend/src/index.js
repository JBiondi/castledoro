const startTimerButton = document.querySelector('.start-timer');
const pauseTimerButton = document.querySelector('.pause-timer');
const resetTimerButton = document.querySelector('.reset-timer');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const completedBlocks = document.querySelector('.completed-blocks');

let startTimer;
let newSessions = 0;


if (startTimerButton) {
    startTimerButton.addEventListener('click', function () {
        if (startTimer === undefined) {
            startTimer = setInterval(runTimer, 1000)
        } else {
            alert('The timer is already counting down')
        }
    })
}


if (pauseTimerButton) {
    pauseTimerButton.addEventListener('click', function() {
        clearInterval(startTimer);
        startTimer = undefined;
        console.log('Timer paused)')
    })
}


if (resetTimerButton) {
    resetTimerButton.addEventListener('click', function () {
        clearInterval(startTimer);
        startTimer = undefined;
        timerMinutes.innerText = 45;
        timerSeconds.innerText = '00';
        console.log('Timer has been reset')
    })
}

function getCookie(flavor) {
    const allCookies = document.cookie.split(';');
    const trimmedCookies = allCookies.map(cookie => cookie.trim())
    const matchingCookie = trimmedCookies.find(cookie => cookie.startsWith(flavor + '='));

    return matchingCookie.split('=')[1];
}

const csrftoken = getCookie('csrftoken');


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
        newSessions++;
        console.log(`Sessions completed is now: ${newSessions}`);
        updateCastleBlocks();
        clearInterval(startTimer);
    }
}


function updateCastleBlocks() {
    fetch(`http://127.0.0.1:8000/session_completed_api_endpoint/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    })
    .then(response => {
            return response.json();
        })
    .then(function updateBlocksHTML (data) {
            console.log(`This is the data ${data}`);
            completedBlocks.innerHTML = `Completed Blocks: ${JSON.stringify(data)}`;
        })
}
