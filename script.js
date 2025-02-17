document.addEventListener("DOMContentLoaded", function () {
    const bird = document.getElementById("bird");
    const gameContainer = document.getElementById("game-container");
    const scoreboard = document.getElementById("score");
    const highScoreBoard = document.getElementById("high-score");
    const gameOverScreen = document.getElementById("game-over");
    const finalScoreDisplay = document.getElementById("final-score");
    const restartBtn = document.getElementById("restart-btn");

    let birdY = 200;
    let velocity = 0;
    let gravity = 0.3;
    let jumpStrength = -6;
    let maxFallSpeed = 2;
    let gameRunning = true;

    let pipes = [];
    let pipeWidth = 50;
    let pipeGap = 120;
    let pipeSpeed = 2;
    let score = 0;
    let highScore = localStorage.getItem("flappyHighScore") || 0;
    highScoreBoard.textContent = highScore;

    function jump() {
        if (gameRunning) {
            velocity = jumpStrength;
        }
    }

    // ✅ Add Keyboard & Touch Controls
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space" || event.code === "ArrowUp") {
            jump();
        }
    });

    document.addEventListener("touchstart", function () {
        jump();
    });

    function createPipe() {
        let topHeight = Math.random() * 150 + 50;
        let bottomHeight = 500 - topHeight - pipeGap;

        let topPipe = document.createElement("div");
        topPipe.classList.add("pipe", "top-pipe");
        topPipe.style.height = topHeight + "px";
        topPipe.style.left = "400px";

        let bottomPipe = document.createElement("div");
        bottomPipe.classList.add("pipe", "bottom-pipe");
        bottomPipe.style.height = bottomHeight + "px";
        bottomPipe.style.left = "400px";

        gameContainer.appendChild(topPipe);
        gameContainer.appendChild(bottomPipe);

        pipes.push({ topPipe, bottomPipe, x: 400 });
    }

    function gameLoop() {
        if (!gameRunning) return;

        velocity += gravity;
        if (velocity > maxFallSpeed) velocity = maxFallSpeed;
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

        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x -= pipeSpeed;
            pipes[i].topPipe.style.left = pipes[i].x + "px";
            pipes[i].bottomPipe.style.left = pipes[i].x + "px";

            if (
                pipes[i].x < 90 &&
                pipes[i].x > 50 &&
                (birdY < parseInt(pipes[i].topPipe.style.height) || 
                 birdY > 500 - parseInt(pipes[i].bottomPipe.style.height) - 40)
            ) {
                gameOver();
            }

            if (pipes[i].x < -pipeWidth) {
                gameContainer.removeChild(pipes[i].topPipe);
                gameContainer.removeChild(pipes[i].bottomPipe);
                pipes.splice(i, 1);
                score++;
                scoreboard.textContent = score;
            }
        }

        requestAnimationFrame(gameLoop);
    }

    function gameOver() {
        gameRunning = false;
        gameOverScreen.style.display = "flex";
        finalScoreDisplay.textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("flappyHighScore", highScore);
            highScoreBoard.textContent = highScore;
        }
    }

    restartBtn.addEventListener("click", function () {
        location.reload();
    });

    setInterval(createPipe, 2000);
    gameLoop();
});
