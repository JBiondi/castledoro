const timerHTML = document.querySelector('.timer')

function timer(minutes) {
    let seconds = minutes * 60;

    let interval = setInterval(function () {
        seconds--;
        timerHTML.innerHTML = `Seconds remaining: ${seconds}`;

        if(!seconds) {
            clearInterval(interval);
            alert("Complete!")
        }
    }, 1000)
}

timer(1);

