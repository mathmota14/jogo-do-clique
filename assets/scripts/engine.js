const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 600,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
    },
    actions:{
        countdownTimerId: setInterval(countdown, 1000),
    }
};

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(() => {
        if (state.values.currentTime > 0) {
            randomSquare();
        } else {
            clearInterval(state.values.timerId);
        }
    }, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (state.values.currentTime > 0 && square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function countdown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countdownTimerId);
        document.getElementById("result-display").textContent = "Acabou o tempo! O seu resultado foi: " + state.values.result;
    }
}

function playSound() {
    let audio = new Audio("/assets/audios/hit.mp3");
    audio.play();
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();