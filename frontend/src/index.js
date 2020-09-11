const timerHTML = document.querySelector('.timer')
const minutesInput = document.querySelector('.timer-input')

minutesInput.addEventListener('submit', runTimer);



function timer(minutes) {

    let seconds = 60;

    minutes--;

    let interval = setInterval(function () {

        seconds--;

        if (minutes < 10 && seconds > 10) {
            timerHTML.innerHTML = `0${minutes} : ${seconds}`;
        }

        else if (minutes < 10 && seconds < 10) {
            timerHTML.innerHTML = `0${minutes} : 0${seconds}`;
        }

        else if (minutes > 10 && seconds < 10) {
            timerHTML.innerHTML = `${minutes} : 0${seconds}`;
        }

        else {
            timerHTML.innerHTML = `${minutes} : ${seconds}`;
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


function runTimer() {
    timer(minutesInput);
}

