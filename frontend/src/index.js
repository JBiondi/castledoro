const pauseTimerButton = document.querySelector('.pause-timer');
const resetTimerButton = document.querySelector('.reset-timer');

const minutesInput = document.querySelector('.minutes-input');
const timerSubmit = document.querySelector('.timer-submit');

const minutesDisplay = document.querySelector('.minutes-display');
const secondsDisplay = document.querySelector('.seconds-display');
const extraZero = document.querySelector('.extra-zero');

const completedBlocks = document.querySelector('.completed-blocks');


let startTimer;
let newSessions = 0;


if (timerSubmit) {
    timerSubmit.addEventListener('click', function () {
        if (startTimer === undefined) {
            minutesDisplay.innerText = minutesInput.value;
            console.log(`MD = ${minutesDisplay.innerText}`)
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
        minutesDisplay.innerText = 45;
        secondsDisplay.innerText = '00';
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

    const seconds = Number(secondsDisplay.innerText);

    console.log(minutesDisplay.innerText, seconds);

    if (seconds < 10 && seconds > 0) {
        console.log('Ever here?')
        extraZero.style.display = 'block';
    }

    if (minutesDisplay.innerText != 0 && seconds === 0) {
        extraZero.style.display = 'none';
        secondsDisplay.innerText = 59;
        minutesDisplay.innerText--;
        console.log(`Did we decrement? ${minutesDisplay.innerText}`)
    }

    else if (minutesDisplay.innerText !==0 && seconds !== 0) {
        extraZero.style.display = 'none';
        secondsDisplay.innerText--;
    }

    else if (minutesDisplay.innerText == 0 && seconds === 0) {
        extraZero.style.display = 'none';
        console.log('ENDED')
        minutesDisplay.innerText = '00';
        secondsDisplay.innerText = '00';
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
