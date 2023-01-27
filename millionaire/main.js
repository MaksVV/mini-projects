const questions = [
    {
        question: 'Пляшку чого розбивають при спуску корабля на воду?',
        answers: ['Шампанського', 'Пива', 'Рому', 'Горілки'],
        correctAnswer: 'Шампанського',
    },
    {
        question: 'При падінні чого прийнято загадувати бажання?',
        answers: ['Метеориту', 'Зірки', 'Каменю', 'Виделки'],
        correctAnswer: 'Зірки',
    },
    {
        question: 'Скільки разів потрібно відміряти, перед тим, як відрізувати?',
        answers: ['7', '40', '10', 'Не потрібно відміряти'],
        correctAnswer: '7',
    },
    {
        question: 'Хто був першим президентом України?',
        answers: ['Кучма', 'Янукович', 'Ющенко', 'Кравчук'],
        correctAnswer: 'Кравчук',
    },
    {
        question: 'Яке найбільше місто у світі за щільністю населення?',
        answers: ['Пекін', 'Мумбаї', 'Нью-Йорк', 'Маніла'],
        correctAnswer: 'Маніла',
    }, 
    {
        question: 'Яке з цих міст має найбільше населення?',
        answers: ['Нью-Делі', 'Мехіко', 'Шанхай', 'Сан-Паулу'],
        correctAnswer: 'Шанхай',
    },
    {
        question: 'Яка річка двічі перетинає екватор?',
        answers: ['Амазонка', 'Ніл', 'Конго', 'Міссісіпі'],
        correctAnswer: 'Конго',
    },
    {
        question: 'Коли розпочалась друга світова війна?',
        answers: ['1914р', '1941р', '1939р', '2022р'],
        correctAnswer: '1939р',
    },
    {
        question: 'Скільки гравців на місцях в команді з американського футболу?',
        answers: ['9', '11р', '12', '14'],
        correctAnswer: '11',
    },
    {
        question: 'Яка з планет є найближчою до Землі?',
        answers: ['Марс', 'Венера', 'Меркурій', 'Юпітер'],
        correctAnswer: 'Венера',
    },
    {
        question: 'В якому році був створений перший комп’ютер?',
        answers: ['1889р', '1914p', '1941p', '1954p'],
        correctAnswer: '1941р',
    },
    {
        question: 'Звідки походить хачапурі?',
        answers: ['Албанія', 'Кіпр', 'Грузія', 'Вірменія'],
        correctAnswer: 'Грузія',
    },
    {
        question: 'Яку ємність мав перший жорсткий диск?',
        answers: ['4-5mb', '10-12mb', '2-3mb', '6-8mb'],
        correctAnswer: '4-5mb',
    },
    {
        question: 'Якими, на думку, приказки мають бути вовки, щоб вівці були цілі?',
        answers: ['Беззубими', 'Вегетаріанцями', 'Ситими', 'Ледачими'],
        correctAnswer: 'Ситими',
    },
    {
        question: 'Яка найглибша станція метро у Світі?',
        answers: ['Арсенальна, Київʼ', 'Історичний музей, Харків', 'Адміралтейська, Петербург', 'Вашингтон Парк, Портленд'],
        correctAnswer: 'Арсенальна, Київ',
    },
];

let correctAnswer = 'correct-answer';
let incorrectAnswer = 'incorrect-answer';
let selectedReward = 'selected-reward';
let blockAnswer = 'block-answer';
let radioInputs = document.querySelectorAll('.answer-radio');
let callAnswerModal = document.querySelector('.call-answer-modal');
let rewardModal = document.querySelector('.reward-modal');
let fixedRewards = [0, 1000, 32000];
let currentReward;
let currentQuestion;
let areLabelsBlocked;

function renderLabels(answers) {
    let answerLabels = getLabels();

    answers.forEach((answer, index) => {
        answerLabels[index].children[0].innerText = answer;
        answerLabels[index].children[1].setAttribute('value', answer);
    });

    answerLabels.forEach((answer) => answer.classList.remove(blockAnswer));
}

function renderQuestion(question) {
    let questionLabel = getQuestion();
    questionLabel.innerText = question;
}

function renderRewards() {
    let rewards = getRewards();

    [...rewards].reverse().forEach((reward, index, total) => {
        if (index === currentQuestion) {
            reward.classList.add(selectedReward);
            currentReward = (index - 1) >= 0 ? +total[index - 1].children[0].innerText.split(' ').join('').slice(1) : 0;
        } else {
            reward.classList.remove(selectedReward);
        }
    });
}

function renderAll(item) {
    renderRewards();
    renderQuestion(item.question);
    renderLabels(item.answers);
}

radioInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
        let labelClasses = e.target.parentElement.classList;
        let isLabelBlocked = labelClasses.contains(blockAnswer);

        if (areLabelsBlocked || isLabelBlocked) return;

        areLabelsBlocked = true;

        let isCorrectAnswer = e.target.value === questions[currentQuestion].correctAnswer;

        if (isCorrectAnswer) {
            labelClasses.add(correctAnswer);

            setTimeout(() => {
                labelClasses.remove(correctAnswer);
                areLabelsBlocked = false;

                if (currentQuestion < (questions.length - 1)) {
                    currentQuestion++;
                    renderAll(questions[currentQuestion]);
                } else {
                    showRewardModal(`₴ 1 000 000`, true);
                }
            }, 3000);
        } else {
            labelClasses.add(incorrectAnswer);
            showRewardModal(`Ваш виграш: ${getGameReward()} грн.`);
        }
    })
});

function showRewardModal(reward, isVictory = false) {
    if (isVictory) {
        let span = document.createElement('span');
        span.classList.add('winner');
        span.innerText = 'Вітаємо вас. Ви виграли один мільйон гривень!!!';
        rewardModal.insertBefore(span, null);
    }

    document.querySelector('.game-reward').innerText = reward;
    rewardModal.style.display = 'block';
    areLabelsBlocked = true;
}

function getRewards() {
    return document.querySelectorAll('.win');
}

function getLabels() {
    return document.querySelectorAll('.answer-label');
}

function getQuestion() {
    return document.querySelector('.question');
}

function getGameReward() {
    return [...fixedRewards].reverse().find((reword) => reword <= currentReward);
}

function random(minValue, maxValue, except) {
    let getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    let result;
    if (!except) {
        return getRandom(minValue, maxValue);
    }

    while (!result) {
        let num = getRandom(minValue, maxValue);
        if (num !== except) {
            result = num;
        }
    }
    return result;
}

function helpFifty() {
    let answerLabels = getLabels();
    let correctAnswer = questions[currentQuestion].correctAnswer;
    let correctAnswerIndex = questions[currentQuestion].answers.findIndex((answer) => answer === correctAnswer);
    let randomIndex = random(0, 3, correctAnswerIndex);

    answerLabels.forEach((answer, index) => {
        if (index !== randomIndex && index !== correctAnswerIndex) {
            answer.classList.add(blockAnswer);
        }
    });
}

function helpCall() {
    let randomIndex = random(0, 3);
    let randomAnswer = questions[currentQuestion].answers[randomIndex];

    callAnswerModal.style.display = 'block';
    callAnswerModal.innerText = `На мою думку, правильна відповідь: ${ randomAnswer }`;

    setTimeout(() => {
        callAnswerModal.style.display = 'none';
    }, 4000);
}

function newGame() {
    let answerLabels = getLabels();

    answerLabels.forEach((label) => {
        label.classList.remove('incorrect-answer');
        label.classList.remove('correct-answer');
    });

    rewardModal.style.display = 'none';
    callAnswerModal.style.display = 'none';
    currentQuestion = 0;
    currentReward = 0;
    areLabelsBlocked = false;
    renderAll(questions[currentQuestion]);
}

newGame();