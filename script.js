const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");

let birdY = 200;
let gravity = 0.5;
let velocity = 0;
let isJumping = false;

document.addEventListener("keydown", () => {
    velocity = -8; // Jump when any key is pressed
});

function gameLoop() {
    velocity += gravity;
    birdY += velocity;
    
    if (birdY >= gameContainer.clientHeight - 40) {
        birdY = gameContainer.clientHeight - 40;
        velocity = 0;
    }

    if (birdY <= 0) {
        birdY = 0;
        velocity = 0;
    }

    bird.style.top = birdY + "px";

    requestAnimationFrame(gameLoop);
}

function createPipe() {
    let pipeGap = 120;
    let randomHeight = Math.random() * 200 + 50;
    let topPipeHeight = randomHeight;
    let bottomPipeHeight = gameContainer.clientHeight - topPipeHeight - pipeGap;

    let topPipe = document.createElement("div");
    topPipe.classList.add("pipe", "top-pipe");
    topPipe.style.height = topPipeHeight + "px";
    topPipe.style.left = "400px";
    
    let bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe", "bottom-pipe");
    bottomPipe.style.height = bottomPipeHeight + "px";
    bottomPipe.style.left = "400px";

    gameContainer.appendChild(topPipe);
    gameContainer.appendChild(bottomPipe);

    let movePipes = setInterval(() => {
        let pipeLeft = parseInt(topPipe.style.left);
        if (pipeLeft <= -50) {
            topPipe.remove();
            bottomPipe.remove();
            clearInterval(movePipes);
        } else {
            topPipe.style.left = pipeLeft - 3 + "px";
            bottomPipe.style.left = pipeLeft - 3 + "px";
        }
    }, 20);
}

setInterval(createPipe, 2000);
gameLoop();
