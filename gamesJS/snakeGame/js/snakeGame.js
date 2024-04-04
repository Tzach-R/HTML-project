document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score-value');
    const startButton = document.getElementById('startBtn');
    const gridSize = 20;
    const canvasSize = canvas.width / gridSize;
    let score = 0;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let gameRunning = false;
    let snakeMoving = false;

    function drawSnake() {
        ctx.fillStyle = '#2ecc71';
        snake.forEach((segment) => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }

    function drawFood() {
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    function moveSnake() {
        if (!snakeMoving) return;

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        food.x = Math.floor(Math.random() * canvasSize);
        food.y = Math.floor(Math.random() * canvasSize);
    }

    function checkCollision() {
        if (
            snake[0].x < 0 ||
            snake[0].x >= canvasSize ||
            snake[0].y < 0 ||
            snake[0].y >= canvasSize ||
            snake.slice(1).some((segment) => segment.x === snake[0].x && segment.y === snake[0].y)
        ) {
            gameOver();
        }
    }

    function gameOver() {
        gameRunning = false;
        alert('Game Over! Your score: ' + score);
        snake = [{ x: 10, y: 10 }];
        score = 0;
        scoreElement.textContent = score;
        dx = 1;
        dy = 0;
        generateFood();
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
        checkCollision();

        if (gameRunning) {
            requestAnimationFrame(drawGame);
        }
    }

    startButton.addEventListener('click', () => {
        if (!gameRunning) {
            gameRunning = true;
            snakeMoving = false;
            startButton.textContent = 'Restart Game';
            score = 0;
            scoreElement.textContent = score;
            snake = [{ x: 10, y: 10 }];
            dx = 1;
            dy = 0;
            generateFood();
            drawGame();
            setTimeout(() => {
                snakeMoving = true;
            }, 100);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!gameRunning) return;
        const key = event.key.toLowerCase();
        if (key === 'arrowup' && dy !== 1) {
            dx = 0;
            dy = -1;
        } else if (key === 'arrowdown' && dy !== -1) {
            dx = 0;
            dy = 1;
        } else if (key === 'arrowleft' && dx !== 1) {
            dx = -1;
            dy = 0;
        } else if (key === 'arrowright' && dx !== -1) {
            dx = 1;
            dy = 0;
        }
    });
});
