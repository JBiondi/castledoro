const timerHTML = document.querySelector('.timer')

function timer(minutes) {
    let hours = '00';
    let seconds = 60;

    minutes--;

    if (minutes > 60) {
        hours = 60 / minutes;
    }

    let interval = setInterval(function () {

        seconds--;

        if (minutes < 10 && seconds > 10) {
            timerHTML.innerHTML = `${hours} : 0${minutes} : ${seconds}`;
        }

        else if (minutes < 10 && seconds < 10) {
            timerHTML.innerHTML = `${hours} : 0${minutes} : 0${seconds}`;
        }

        else {
            timerHTML.innerHTML = `${hours} : ${minutes} : ${seconds}`;
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


timer(2);

