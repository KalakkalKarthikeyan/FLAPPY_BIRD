const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");

let birdY = 200;
let velocity = 0;
let gravity = 0.5;  // Adjusted for smooth falling
let jumpStrength = -8; // Adjusted for balanced jumping
let maxFallSpeed = 5; // Limits fall speed

let pipes = [];
let pipeWidth = 50;
let pipeGap = 120;
let pipeSpeed = 2;
let score = 0;
let gameRunning = true;

// Function to make the bird jump
function jump() {
    if (gameRunning) {
        velocity = jumpStrength;
    }
}

// Function to create pipes
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

// Function to update game logic
function gameLoop() {
    if (!gameRunning) return;

    velocity += gravity;
    if (velocity > maxFallSpeed) velocity = maxFallSpeed;
    
    birdY += velocity;

    // Prevent bird from going out of bounds
    if (birdY >= gameContainer.clientHeight - 40) {
        birdY = gameContainer.clientHeight - 40;
        velocity = 0;
    }
    if (birdY <= 0) {
        birdY = 0;
        velocity = 0;
    }

    bird.style.top = birdY + "px";

    // Move pipes and check for collisions
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeSpeed;
        pipes[i].topPipe.style.left = pipes[i].x + "px";
        pipes[i].bottomPipe.style.left = pipes[i].x + "px";

        // Collision detection
        if (
            pipes[i].x < 90 &&
            pipes[i].x > 50 &&
            (birdY < parseInt(pipes[i].topPipe.style.height) || 
             birdY > 500 - parseInt(pipes[i].bottomPipe.style.height) - 40)
        ) {
            gameOver();
        }

        // Remove pipes that go off-screen
        if (pipes[i].x < -pipeWidth) {
            gameContainer.removeChild(pipes[i].topPipe);
            gameContainer.removeChild(pipes[i].bottomPipe);
            pipes.splice(i, 1);
            score++;
        }
    }

    requestAnimationFrame(gameLoop);
}

// Function to handle game over
function gameOver() {
    gameRunning = false;
    alert("Game Over! Score: " + score);
    location.reload();
}

// Start game loop and pipe creation
document.addEventListener("keydown", jump);
setInterval(createPipe, 2000);
gameLoop();
