const data = [
    {
        id: 1,
        question: 'Question 1',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correct: 1,
        score: 10
    },
    {
        id: 2,
        question: 'Question 2',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4', 'Answer 5'],
        correct: 3,
        score: 20
    },
    {
        id: 3,
        question: 'Question 3',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correct: 2,
        score: 30
    },
    {
        id: 4,
        question: 'Question 4',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correct: 0,
        score: 40
    },
    {
        id: 5,
        question: 'Question 5',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correct: 3,
        score: 50
    }
];

const container = document.querySelector('#container');
let nextButton;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function createNextButton() {
    nextButton = document.createElement('button');
    nextButton.classList.add('btn', 'btn-primary', 'mt-3');
    nextButton.textContent = 'Next';
    nextButton.disabled = true;
    container.appendChild(nextButton);

    nextButton.addEventListener('click', () => {
        clearInterval(timer);
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            const answerIndex = Array.from(document.querySelectorAll('input[name="answer"]')).indexOf(selectedAnswer);
            if (answerIndex === data[currentQuestionIndex].correct) {
                score += data[currentQuestionIndex].score;
                alert(`Duzgundur. Baliniz: ${score}`);
                document.querySelector(`#answer-${data[currentQuestionIndex].correct}`).nextElementSibling.classList.add('text-success');
            } else {
        
                document.querySelector(`#answer-${answerIndex}`).nextElementSibling.classList.add('text-danger');
               
                
                alert('Cavab Sehvdir!');
            }
        } else {
            alert('Cavab Vermediniz.');
        }
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    });
}

function showQuestion(index) {
    if (index >= data.length) {
        container.innerHTML = `<h2>Umumi baliniz: ${score}</h2>`;
        return;
    }

    container.innerHTML = `
        <div class="card mt-3">
            <div class="card-header">
                <div class="card-title">${data[index].question}</div>
            </div>
            <div class="card-body">
                ${data[index].answers.map((answer, i) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer" id="answer-${i}">
                        <label class="form-check-label" for="answer-${i}">
                            ${answer}
                        </label>
                    </div>
                `).join('')}
                <div id="timer" class="mt-2">00:30</div>
            </div>
        </div>
    `;
    createNextButton();
    
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.addEventListener('change', () => {
            nextButton.disabled = false;
        });
    });
    
    resetTimer();
    timer = setInterval(updateTimer, 1000);
    
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.querySelector('#timer').textContent = '00:30';
}

function updateTimer() {
    timeLeft--;
    const timerElement = document.querySelector('#timer');
    timerElement.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
    if (timeLeft <= 10) {
        timerElement.style.color = 'red';
    } else {
        timerElement.style.color = 'black';
    }
    if (timeLeft <= 0) {
        clearInterval(timer);
        nextButton.click();
    }
}

showQuestion(currentQuestionIndex);




