const timerHTML = document.querySelector('.timer')

function timer(minutes) {
    let hours = '00';
    let seconds = 60;
    let specialZero;

    minutes--;

    if (minutes > 60) {
        hours = 60 / minutes;
    }

    let interval = setInterval(function () {

        seconds--;

        if (minutes < 10){
            specialZero = '0';
        }

        if (specialZero) {
            timerHTML.innerHTML = `${hours} : ${specialZero}${minutes} : ${seconds}`;
        }

        timerHTML.innerHTML = `${hours} : ${minutes} : ${seconds}`;

        if (!seconds) {
            minutes--;
            seconds = 60;
        }



        if (!seconds && !minutes) {
            clearInterval(interval);
            alert("Complete!")
        }
    }, 1000)
}

timer(10);

