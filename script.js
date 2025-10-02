// Quiz Data
const quizData = [
    {
        question: "What is Deepbook?",
        options: ["A social media platform", "A decentralized trading platform on Sui", "A cloud storage service", "A cryptocurrency wallet"],
        correct: 1
    },
    {
        question: "Deepbook is built on which blockchain?",
        options: ["Ethereum", "Bitcoin", "Sui", "Solana"],
        correct: 2
    },
    {
        question: "Deepbook is mainly designed for:",
        options: ["DeFi and trading activities", "Social networking", "Cloud computing", "Video streaming"],
        correct: 0
    },
    {
        question: "What is the main advantage of Deepbook on Sui?",
        options: ["High-speed transactions", "Free internet", "Unlimited storage", "Automated social media posts"],
        correct: 0
    },
    {
        question: "Which programming language is mainly used for smart contracts on Sui (and Deepbook)?",
        options: ["Solidity", "Move", "Rust", "Python"],
        correct: 1
    },
    {
        question: "What does CLOB stand for in trading platforms like Deepbook?",
        options: ["Central Limit Order Book", "Crypto Ledger of Blockchain", "Coin Liquidity on Blockchain", "Centralized Ledger of Bitcoins"],
        correct: 0
    },
    {
        question: "What is the benefit of using a CLOB system in Deepbook?",
        options: ["Transparency and fairness in matching trades", "Free storage", "Faster gaming", "Unlimited tokens"],
        correct: 0
    },
    {
        question: "What is the difference between AMM and CLOB?",
        options: ["AMM uses liquidity pools, CLOB uses order books", "AMM is faster than Sui", "CLOB is only for NFTs", "AMM is centralized, CLOB is not"],
        correct: 0
    },
    {
        question: "What is a limit order?",
        options: ["An order set at a specific price to buy or sell", "An order without price", "An unlimited buy", "An admin-only trade"],
        correct: 0
    },
    {
        question: "Which advantage does Sui give to Deepbook over other chains?",
        options: ["Parallel transaction processing", "No smart contracts allowed", "Slower trades", "Expensive gas fees"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = -1;

// Start Quiz
function startQuiz() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    document.getElementById('total-questions').textContent = quizData.length;
    loadQuestion();
}

// Load Question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showResults();
        return;
    }

    const question = quizData[currentQuestion];
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });

    const progress = ((currentQuestion) / quizData.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';

    selectedOption = -1;
    document.getElementById('next-btn').disabled = true;
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('feedback').className = 'feedback';
}

// Select Option
function selectOption(index) {
    if (selectedOption !== -1) return;

    selectedOption = index;
    const options = document.querySelectorAll('.option');
    const question = quizData[currentQuestion];
    
    options.forEach((option, i) => {
        if (i === question.correct) option.classList.add('correct');
        else if (i === selectedOption) option.classList.add('incorrect');
        option.style.pointerEvents = 'none';
    });

    const feedback = document.getElementById('feedback');
    if (selectedOption === question.correct) {
        score++;
        feedback.textContent = '🎉 Correct! Well done!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `❌ Incorrect. The correct answer is: ${question.options[question.correct]}`;
        feedback.className = 'feedback incorrect';
    }
    
    feedback.style.display = 'block';
    document.getElementById('next-btn').disabled = false;
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    setTimeout(loadQuestion, 300);
}

// Show Results
function showResults() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('results-screen').classList.add('active');
    
    const percentage = Math.round((score / quizData.length) * 100);
    const scoreCircle = document.getElementById('score-circle');
    
    document.getElementById('score-percentage').textContent = percentage + '%';
    document.getElementById('correct-count').textContent = score;
    document.getElementById('incorrect-count').textContent = quizData.length - score;
    document.getElementById('total-count').textContent = quizData.length;
    
    let message = '';
    if (percentage === 100) {
        scoreCircle.className = 'score-circle excellent';
        message = '🏆 Perfect! You got all answers right!';
    } else if (percentage >= 80) {
        scoreCircle.className = 'score-circle excellent';
        message = '🏆 Excellent! You\'re a quiz master!';
    } else if (percentage >= 60) {
        scoreCircle.className = 'score-circle good';
        message = '👏 Good job! You did well!';
    } else if (percentage >= 40) {
        scoreCircle.className = 'score-circle average';
        message = '👍 Not bad! Keep practicing!';
    } else {
        scoreCircle.className = 'score-circle poor';
        message = '💪 Don\'t give up! Try again!';
    }
    
    document.getElementById('results-message').textContent = message;

    // Share button functionality
    const shareButton = document.getElementById('share-btn');
    shareButton.onclick = () => {
        const totalQuestions = quizData.length;
        const scoreText = `${score}/${totalQuestions}`;
        const tweetText = `I just completed the Deepbook Quiz! My score: ${scoreText} 💙 Can you beat me? https://deepbook-quiz.example.com`;
        const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, '_blank');
    };
}

// Restart Quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = -1;
    document.getElementById('results-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
}
