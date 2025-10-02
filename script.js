// Quiz data
const quizDataLevel1 = [
    { question: "What is Deepbook?", options: ["A social media platform", "A decentralized trading platform on Sui", "A cloud storage service", "A cryptocurrency wallet"], correct: 1 },
    { question: "Deepbook is built on which blockchain?", options: ["Ethereum", "Bitcoin", "Sui", "Solana"], correct: 2 },
    { question: "Deepbook is mainly designed for:", options: ["DeFi and trading activities", "Social networking", "Cloud computing", "Video streaming"], correct: 0 },
    { question: "What is the main advantage of Deepbook on Sui?", options: ["High-speed transactions", "Free internet", "Unlimited storage", "Automated social media posts"], correct: 0 },
    { question: "Which programming language is mainly used for smart contracts on Sui (and Deepbook)?", options: ["Solidity", "Move", "Rust", "Python"], correct: 1 },
    { question: "What does CLOB stand for in trading platforms like Deepbook?", options: ["Central Limit Order Book", "Crypto Ledger of Blockchain", "Coin Liquidity on Blockchain", "Centralized Ledger of Bitcoins"], correct: 0 },
    { question: "What is the benefit of using a CLOB system in Deepbook?", options: ["Transparency and fairness in matching trades", "Free storage", "Faster gaming", "Unlimited tokens"], correct: 0 },
    { question: "What is the difference between AMM and CLOB?", options: ["AMM uses liquidity pools, CLOB uses order books", "AMM is faster than Sui", "CLOB is only for NFTs", "AMM is centralized, CLOB is not"], correct: 0 },
    { question: "What is a limit order?", options: ["An order set at a specific price to buy or sell", "An order without price", "An unlimited buy", "An admin-only trade"], correct: 0 },
    { question: "Which advantage does Sui give to Deepbook over other chains?", options: ["Parallel transaction processing", "No smart contracts allowed", "Slower trades", "Expensive gas fees"], correct: 0 },
    { question: "What is the ticker symbol of DeepBook Protocol’s native token?", options: ["DBK", "DEEP", "BOOK", "SUI"], correct: 1 },
    { question: "What is the maximum total supply of DEEP tokens?", options: ["1 billion DEEP", "5 billion DEEP", "10 billion DEEP", "20 billion DEEP"], correct: 2 },
    { question: "At the Token Generation Event (TGE), what percentage of DEEP was initially unlocked / circulating?", options: ["10%", "25%", "50%", "75%"], correct: 1 },
    { question: "Which company is closely involved in building DeepBook?", options: ["Mysten Labs", "OpenAI", "Binance Labs", "Google"], correct: 0 },
    { question: "Which protocol is known as the backbone of Sui DeFi?", options: ["Cetus Protocol", "DeepBook", "Turbos Finance", "Scallop"], correct: 1 },
];

let currentQuestion = 0;
let score = 0;
let quizData = [];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const progressFill = document.getElementById("progress-fill");

const scoreCircle = document.getElementById("score-circle");
const scorePercentage = document.getElementById("score-percentage");
const resultsMessage = document.getElementById("results-message");
const correctCount = document.getElementById("correct-count");
const incorrectCount = document.getElementById("incorrect-count");
const totalCount = document.getElementById("total-count");
const levelLabel = document.getElementById("level-label");

// Start quiz with selected level
function selectLevel(level) {
    if(level === 1) {
        quizData = quizDataLevel1;
        totalQuestionsSpan.textContent = quizData.length;
        levelLabel.textContent = "Level: Basic";
        startScreen.classList.remove("active");
        quizScreen.classList.add("active");
        currentQuestion = 0;
        score = 0;
        showQuestion();
    } else {
        alert("This level is not available yet!");
    }
}

function showQuestion() {
    const q = quizData[currentQuestion];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    feedback.style.display = "none";
    nextBtn.disabled = true;

    q.options.forEach((option, index) => {
        const btn = document.createElement("div");
        btn.textContent = option;
        btn.classList.add("option");
        btn.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(btn);
    });

    currentQuestionSpan.textContent = currentQuestion + 1;
    progressFill.style.width = ((currentQuestion) / quizData.length) * 100 + "%";
}

function selectOption(selectedIndex) {
    const q = quizData[currentQuestion];
    const optionElements = optionsContainer.querySelectorAll(".option");
    optionElements.forEach((el, idx) => {
        el.classList.remove("correct", "incorrect", "selected");
        if(idx === selectedIndex) el.classList.add("selected");
    });

    if(selectedIndex === q.correct) {
        score++;
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
    } else {
        feedback.textContent = `Incorrect! Correct answer: ${q.options[q.correct]}`;
        feedback.className = "feedback incorrect";
    }
    feedback.style.display = "block";
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove("active");
    resultsScreen.classList.add("active");

    correctCount.textContent = score;
    incorrectCount.textContent = quizData.length - score;
    totalCount.textContent = quizData.length;

    const percent = Math.round((score / quizData.length) * 100);
    scorePercentage.textContent = percent + "%";

    if(percent === 100) {
        resultsMessage.textContent = "🎉 Perfect score! You're a Deepbook pro!";
        scoreCircle.className = "score-circle excellent";
    } else if(percent >= 80) {
        resultsMessage.textContent = "💪 Great job!";
        scoreCircle.className = "score-circle good";
    } else if(percent >= 50) {
        resultsMessage.textContent = "🙂 Not bad, keep practicing!";
        scoreCircle.className = "score-circle average";
    } else {
        resultsMessage.textContent = "😓 Keep trying!";
        scoreCircle.className = "score-circle poor";
    }
}

function restartQuiz() {
    resultsScreen.classList.remove("active");
    startScreen.classList.add("active");
}

function goToLevelSelect() {
    resultsScreen.classList.remove("active");
    startScreen.classList.add("active");
    levelLabel.textContent = "Level: Select Below";
}

function shareOnX() {
    const text = `I just completed the Deepbook Quiz! My score: ${score}/${quizData.length} 💙 Can you beat it? Thanks to @LoserVineet for creating this quiz`;
    const url = `https://deepbook-quiz.vercel.app/`; // Replace with your deployed URL
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
}
