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

const quizDataLevel2 = [
    { question: "In DeepBook’s CLOB, how are orders prioritized?", options: ["By wallet size", "By price first, then time", "By validator votes", "Random matching"], correct: 1 },
    { question: "Why does DeepBook not use AMM-style liquidity pools?", options: ["Because Sui does not support tokens", "Because CLOB provides deeper liquidity and fairer pricing", "Because liquidity pools are illegal", "Because AMMs require Bitcoin miners"], correct: 1 },
    { question: "What is the key advantage of shared CLOB design in DeepBook?", options: ["It prevents validators from joining", "Multiple protocols can access the same liquidity", "It allows NFT-only trading", "It removes limit orders"], correct: 1 },
    { question: "In DeepBook, what happens when a buy and sell order do not immediately match?", options: ["The trade fails permanently", "The order is canceled instantly", "The order is placed in the order book", "The validator modifies the price"], correct: 2 },
    { question: "What is slippage protection in DeepBook?", options: ["Preventing order book from showing empty slots", "Ensuring traders don’t pay higher/lower than set price", "Blocking small trades", "Avoiding validator downtime"], correct: 1 },
    { question: "Why is DeepBook considered a shared infrastructure in Sui DeFi?", options: ["Because all dApps can plug into the same liquidity", "Because it only supports one protocol", "Because it stores NFTs", "Because it’s run off-chain"], correct: 0 },
    { question: "In DeepBook, a “maker” is:", options: ["A trader who provides liquidity by placing limit orders", "A trader who removes liquidity instantly", "A validator controlling block time", "A developer writing Move contracts"], correct: 0 },
    { question: "In DeepBook, a “taker” is:", options: ["A trader who provides liquidity", "A trader who removes liquidity by matching existing orders", "A validator node", "A protocol developer"], correct: 1 },
    { question: "Which type of execution model ensures fairness in DeepBook order matching?", options: ["First-come, first-served", "Random order picking", "Validator-only priority", "Wallet age-based"], correct: 0 },
    { question: "What ensures that tokens in DeepBook cannot be accidentally duplicated or lost?", options: ["Proof-of-work", "Move’s resource-oriented design", "Order book timestamps", "Gas fee penalties"], correct: 1 },
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

// Timer bar for feedback delay
const timerFill = document.createElement("div");
timerFill.style.height = "5px";
timerFill.style.background = "linear-gradient(45deg, #0d47a1, #1976d2)";
timerFill.style.width = "0%";
timerFill.style.marginTop = "10px";
feedback.appendChild(timerFill);

// Start quiz with selected level
function selectLevel(level) {
    if(level === 1) {
        quizData = quizDataLevel1;
        totalQuestionsSpan.textContent = quizData.length;
        levelLabel.textContent = "Level: Basic";
    } else if(level === 2) {
        quizData = quizDataLevel2;
        totalQuestionsSpan.textContent = quizData.length;
        levelLabel.textContent = "Level: Intermediate";
    } else {
        alert("This level is not available yet!");
        return;
    }
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const q = quizData[currentQuestion];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    feedback.style.display = "none";
    timerFill.style.width = "0%";

    q.options.forEach((option, index) => {
        const btn = document.createElement("div");
        btn.textContent = option;
        btn.classList.add("option");
        btn.style.pointerEvents = "auto";
        btn.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(btn);
    });

    currentQuestionSpan.textContent = currentQuestion + 1;
    progressFill.style.width = ((currentQuestion) / quizData.length) * 100 + "%";
}

function selectOption(selectedIndex) {
    const q = quizData[currentQuestion];
    const optionElements = optionsContainer.querySelectorAll(".option");

    // Disable clicks
    optionElements.forEach((el) => el.style.pointerEvents = "none");

    optionElements.forEach((el, idx) => {
        el.classList.remove("correct", "incorrect", "selected");
        if(idx === selectedIndex) el.classList.add("selected");
    });

    // Show feedback
    if(selectedIndex === q.correct) {
        score++;
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
    } else {
        feedback.textContent = `Incorrect! Correct answer: ${q.options[q.correct]}`;
        feedback.className = "feedback incorrect";
        optionElements[q.correct].classList.add("correct");
    }
    feedback.style.display = "block";

    // Timer bar animation for 1.5s
    let width = 0;
    const interval = setInterval(() => {
        width += 100 / (1500 / 50);
        timerFill.style.width = width + "%";
        if(width >= 100) {
            clearInterval(interval);
            timerFill.style.width = "0%";
            currentQuestion++;
            if(currentQuestion < quizData.length) {
                showQuestion();
            } else {
                showResults();
            }
        }
    }, 50);
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
    levelLabel.textContent = "Level: Select Below";
}

function goToLevelSelect() {
    resultsScreen.classList.remove("active");
    startScreen.classList.add("active");
    levelLabel.textContent = "Level: Select Below";
}

function shareOnX() {
    const levelName = levelLabel.textContent.split(": ")[1];
    const text = `I just completed the Deepbook Quiz (${levelName})! My score: ${score}/${quizData.length} 💙 Can you beat it? Thanks to @LoserVineet for creating this quiz`;
    const url = `https://deepbook-quiz.vercel.app/`; // Replace with your deployed URL
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
}
