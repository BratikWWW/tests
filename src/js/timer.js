const buttonRun = document.querySelector(".contents__body__start-btn")
const timerShow = document.querySelector(".timer");
const footerButton = document.querySelector(".contents__body__footer__btn");

let timer
let timeMinut = 5 * 60

function Timer() {
    seconds = timeMinut%60
    minutes = timeMinut/60%60
    hour = timeMinut/60/60%60
    if (timeMinut <= 0) {
        clearInterval();
        alert("Время закончилось");
    } else {
        let strTimer = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
        timerShow.innerHTML = strTimer;
    }
    --timeMinut;

}

buttonRun.addEventListener('click', function() {
    timer = setInterval(Timer, 1000)
})


footerButton.addEventListener('click', (e) => {
    if(e.target.innerHTML === 'Завершить') {
        clearInterval(timer)
        timeMinut = 5 * 60
    }else {
        timer = setInterval(Timer, 1000)
    }
})