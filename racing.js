document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const restartButton = document.getElementById("restartButton");
 
    let carX = canvas.width / 2 - 15;
    let carY = canvas.height - 60;
    let carWidth = 30;
    let carHeight = 60;
    let velocityX = 0;
    let obstacles = [];
    let gameIsRunning = false;
    let score = 0;
 
    function startGame() {
        carX = canvas.width / 2 - 15;
        carY = canvas.height - 60;
        velocityX = 0;
        obstacles = [];
        score = 0;
        gameIsRunning = true;
        restartButton.style.display = "none";
        gameLoop();
    }
 
    function gameLoop() {
        if (gameIsRunning) {
            updateGame();
            drawGame();
            requestAnimationFrame(gameLoop);
        }
    }
 
    function updateGame() {
        carX += velocityX;
        if (carX < 0) carX = 0;
        if (carX + carWidth > canvas.width) carX = canvas.width - carWidth;
 
        if (Math.random() < 0.02) {
            let obstacleX = Math.random() * (canvas.width - carWidth);
            obstacles.push({ x: obstacleX, y: 0, width: carWidth, height: carHeight });
        }
 
        obstacles.forEach(obstacle => {
            obstacle.y += 5;
            if (obstacle.y > canvas.height) {
                obstacles.shift();
                score++;
            }
            if (carX < obstacle.x + obstacle.width &&
                carX + carWidth > obstacle.x &&
                carY < obstacle.y + obstacle.height &&
                carY + carHeight > obstacle.y) {
                gameOver();
            }
        });
    }
 
    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "silver";
        ctx.fillRect(carX, carY, carWidth, carHeight);
 
        obstacles.forEach(obstacle => {
            ctx.fillStyle = "red";
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
 
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);
    }
 
    function gameOver() {
        gameIsRunning = false;
        restartButton.style.display = "block";
    }
 
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            velocityX = -5;
        } else if (event.key === "ArrowRight") {
            velocityX = 5;
        }
    });
 
    document.addEventListener("keyup", () => {
        velocityX = 0;
    });
 
    restartButton.onclick = startGame;
 
    startGame();
 });
 