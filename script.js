let score = 0;

let correctAnswer = "";

let playerName = "";

let questionData = {};

const scoreDisplay = document.getElementById("score");

const nameInput = document.getElementById("name");

const startButton = document.getElementById("start");

const gameSection = document.getElementById("game-section");

const questionDisplay = document.getElementById("question");

const answerInput = document.getElementById("answer");

const submitButton = document.getElementById("submit");

const resultDisplay = document.getElementById("result");

const leaderboardDisplay = document.getElementById("leaderboard");

function generateQuestion() {

    const level = Math.floor(score / 5) + 1;

    const questionTypes = [

        // Level 1: Derivatives of x^n

        () => {

            const n = Math.floor(Math.random() * 5) + 1;

            return { text: `What is the derivative of x^${n}?`, answer: `${n}x` };

        },

        // Level 2: Integrals of n*x^(n-1)

        () => {

            const n = Math.floor(Math.random() * 5) + 1;

            return { text: `What is the integral of ${n}x^${n - 1} dx?`, answer: `x^${n + 1}/${n + 1}` };

        },

        // Level 3: Trig and exponential derivatives

        () => {

            const funcs = [

                ["sin(x)", "cos(x)"],

                ["cos(x)", "-sin(x)"],

                ["e^x", "e^x"],

                ["ln(x)", "1/x"],

                ["x^2*sin(x)", "2x*sin(x)+x^2*cos(x)"],

                ["e^(2x)", "2e^(2x)"]

            ];

            const [q, a] = funcs[Math.floor(Math.random() * funcs.length)];

            return { text: `What is the derivative of ${q}?`, answer: a };

        }

    ];

    const typeIndex = Math.min(level - 1, questionTypes.length - 1);

    questionData = questionTypes[typeIndex]();

    correctAnswer = questionData.answer;

    questionDisplay.textContent = questionData.text;

}

function updateLeaderboard() {

    if (playerName && score > 0) {

        let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

        leaderboard.push([playerName, score]);

        leaderboard.sort((a, b) => b[1] - a[1]);

        leaderboard = leaderboard.slice(0, 5);

        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    }

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    leaderboardDisplay.innerHTML = "🏆 Leaderboard 🏆<br>" + 

        (leaderboard.length ? leaderboard.map(([n, s]) => `${n}: ${s}`).join("<br>") : "No scores yet!");

}

function flashResult(text, isCorrect) {

    resultDisplay.textContent = text;

    resultDisplay.className = isCorrect ? "flash-correct" : "flash-wrong";

    setTimeout(() => resultDisplay.className = "", 1500);

}

startButton.addEventListener("click", () => {

    playerName = nameInput.value.trim();

    if (!playerName) {

        flashResult("Please enter a name!", false);

        return;

    }

    document.getElementById("name-section").style.display = "none";

    gameSection.style.display = "block";

    generateQuestion();

    updateLeaderboard();

});

submitButton.addEventListener("click", () => {

    const userAnswer = answerInput.value.trim();

    if (userAnswer === correctAnswer) {

        score++;

        scoreDisplay.textContent = `Score: ${score}`;

        flashResult("Correct! 🎉", true);

        generateQuestion();

        answerInput.value = "";

    } else {

        flashResult(`Wrong! Answer was ${correctAnswer}`, false);

        updateLeaderboard();

        startButton.disabled = true;

        submitButton.disabled = true;

        nameInput.disabled = true;

        answerInput.disabled = true;

    }

});

generateQuestion();

updateLeaderboard();