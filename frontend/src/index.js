const pauseTimerButton = document.querySelector('#pause-timer-button');
const resetTimerButton = document.querySelector('#reset-timer-button');

const minutesInput = document.querySelector('.minutes-input');
const timerSubmit = document.querySelector('.timer-submit');

const minutesDisplay = document.querySelector('.minutes-display');
const secondsDisplay = document.querySelector('.seconds-display');
const secondsExtraZero = document.querySelector('.seconds-extra-zero');
const minutesExtraZero = document.querySelector('.minutes-extra-zero');

const completedBlocksText = document.querySelector('.completed-blocks-value');
const timerContainer = document.querySelector('.timer-container');

const congratsMessage = document.querySelector('.congrats-message');
const returnToProfileLink = document.querySelector('.return-to-profile-link');

const blocksArray = [...Array(165).keys()]
    .map(index => document.querySelector((`.block${index+1}`)));


let startTimer;

if (timerSubmit) {
    timerSubmit.addEventListener('click', function () {
        if (minutesInput.value > 0 && minutesInput.value < 100) {
            if (startTimer === undefined) {
                minutesDisplay.innerText = minutesInput.value;
                startTimer = setInterval(runTimer, 1000);

            } else {
                alert('The timer is already counting down');
            }
        }
        else {
            alert('Enter a valid number of minutes (more than zero, less than 100)');
        }
    })
}


if (pauseTimerButton) {
    pauseTimerButton.addEventListener('click', function() {
        if (startTimer) {
            clearInterval(startTimer);
            startTimer = undefined;
            pauseTimerButton.innerHTML = 'resume';
        }
        else {
            startTimer = setInterval(runTimer, 1000)
            pauseTimerButton.innerHTML = 'pause';
        }
    })
}


if (resetTimerButton) {
    resetTimerButton.addEventListener('click', function () {
        clearInterval(startTimer);
        startTimer = undefined;
        location.reload(true);
    })
}


function getCookie(flavor) {
    const allCookies = document.cookie.split(';');
    const trimmedCookies = allCookies.map(cookie => cookie.trim())
    const matchingCookie = trimmedCookies.find(cookie => cookie.startsWith(flavor + '='));

    return matchingCookie.split('=')[1];
}

const csrftoken = getCookie('csrftoken');


function populateCompletedBlocks() {
    fetch(`https://castledoro.com/populate_prev_blocks_api_endpoint/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    })
    .then(response => {
            return response.json();
        })

    .then(function colorBlocks (data) {
            const stringData = JSON.stringify(data);
            const numData = parseInt(stringData, 10);
            const indexesArray = [...Array(numData + 1).keys()]

            blocksArray.forEach(block => {
                indexesArray.forEach(idx => {
                    if (block.classList.contains(`block${idx}`)) {
                        block.style.fill = 'lavender';
                    }
                })
            });
        })
}


if(document.URL.indexOf("make_progress") >= 0){
    populateCompletedBlocks();
}


function runTimer() {
       const seconds = Number(secondsDisplay.innerText);

    // Dont worry about this warning, we are taking advantage of the type coercion
    if (minutesDisplay.innerText != 0 && seconds === 0) {

        if (minutesDisplay.innerText < 10) {
            minutesExtraZero.style.display = 'block';
            secondsExtraZero.style.display = 'none';
            // to speed up when testing use this
            // secondsDisplay.innerText = 3;
            secondsDisplay.innerText = 59;
            minutesDisplay.innerText--;
        }

        else {
            secondsExtraZero.style.display = 'none';
            secondsDisplay.innerText = 59;
            minutesDisplay.innerText--;
        }

    }

    else if (minutesDisplay.innerText !==0 && seconds !== 0) {

        if (minutesDisplay.innerText < 10) {
            minutesExtraZero.style.display = 'block';

            if (secondsDisplay.innerText < 11) {
                secondsExtraZero.style.display = 'block';
                secondsDisplay.innerText--;
            }

            else {
                secondsDisplay.innerText--;
            }
        }

        else {

            if (secondsDisplay.innerText < 11) {
                secondsExtraZero.style.display = 'block';
                secondsDisplay.innerText--;
            }

            else {
                secondsDisplay.innerText--;
            }
        }
    }

    else if (minutesDisplay.innerText == 0 && seconds === 0) {
        minutesExtraZero.style.display = 'none';
        secondsExtraZero.style.display = 'none';
        minutesDisplay.innerText = '00';
        secondsDisplay.innerText = '00';

        updateCastleBlocks(() => {
            clearInterval(startTimer);
            if (congratsMessage.style.display !== 'flex') {
                location.reload(true);
            }
        });
    }
}


function updateCastleBlocks(callback) {
    fetch(`https://castledoro.com/session_completed_api_endpoint/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    })
    .then(response => {
            return response.json();
        })
    .then(function updateBlocksHTML (data) {
            const completedBlocksAsString = JSON.stringify(data);
            const completedBlocksAsInt = parseInt(completedBlocksAsString);

            if (completedBlocksAsInt < 165) {
                completedBlocksText.innerHTML = `${completedBlocksAsString} /165`;
                alert('Session complete, a new block is about to be added to your castle!');
                blocksArray.forEach(block => {
                    if (block.classList.contains(`block${completedBlocksAsString}`)) {
                            block.style.fill = 'dimgrey';
                    }
                });
            }
            else if (completedBlocksAsInt === 165) {
                completedBlocksText.innerHTML = `${completedBlocksAsString} /165`;
                blocksArray.forEach(block => {
                    if (block.classList.contains(`block${completedBlocksAsString}`)) {
                            block.style.fill = 'slategrey';
                            timerContainer.style.display = 'none';
                            congratsMessage.style.display = 'flex';
                            returnToProfileLink.style.display = 'flex';
                    }
                });
            }
            callback();
        })
}
