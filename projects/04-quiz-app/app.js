const QUIZ_TIME = 30;

const questions = [
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: [
      "const",
      "let",
      "var",
      "static"
    ],
    answer: 1
  },
  {
    question: "Which array method creates a new array containing elements that pass a test?",
    options: [
      "forEach()",
      "reduce()",
      "filter()",
      "find()"
    ],
    answer: 2
  },
  {
    question: "Which method converts a JavaScript object into a JSON string?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "Object.toJSON()",
      "JSON.convert()"
    ],
    answer: 1
  },
  {
    question: "What does Promise.all() do when one of its promises rejects?",
    options: [
      "Ignores the rejection",
      "Waits for every promise and always resolves",
      "Rejects with the first rejection",
      "Retries the rejected promise"
    ],
    answer: 2
  },
  {
    question: "Which API is commonly used to store small amounts of key-value data in the browser?",
    options: [
      "localStorage",
      "fetch()",
      "Worker",
      "History"
    ],
    answer: 0
  },
  {
    question: "Which operator returns the right-hand value only when the left-hand value is null or undefined?",
    options: [
      "||",
      "&&",
      "??",
      "?."
    ],
    answer: 2
  },
  {
    question: "Which method is used to attach an event listener to a DOM element?",
    options: [
      "listen()",
      "addEventListener()",
      "onEvent()",
      "attach()"
    ],
    answer: 1
  },
  {
    question: "Which statement about arrow functions is correct?",
    options: [
      "They always have their own dynamic this",
      "They inherit this from the surrounding scope",
      "They cannot return values",
      "They must always contain a block body"
    ],
    answer: 1
  },
  {
    question: "Which function is used to schedule code to run repeatedly after a fixed interval?",
    options: [
      "setTimeout()",
      "setInterval()",
      "queueMicrotask()",
      "requestIdleCallback()"
    ],
    answer: 1
  },
  {
    question: "Which browser API can cancel an in-progress fetch request?",
    options: [
      "AbortController",
      "RequestCancel",
      "FetchController",
      "CancelToken"
    ],
    answer: 0
  }
];

const questionNumberElement =
  document.querySelector("#questionNumber");

const scoreElement =
  document.querySelector("#score");

const progressBar =
  document.querySelector("#progressBar");

const timerElement =
  document.querySelector("#timer");

const questionElement =
  document.querySelector("#question");

const answersElement =
  document.querySelector("#answers");

const feedbackElement =
  document.querySelector("#feedback");

const nextButton =
  document.querySelector("#nextButton");

const quizSection =
  document.querySelector("#quizSection");

const resultSection =
  document.querySelector("#resultSection");

const finalScoreElement =
  document.querySelector("#finalScore");

const finalPercentageElement =
  document.querySelector("#finalPercentage");

const resultMessageElement =
  document.querySelector("#resultMessage");

const restartButton =
  document.querySelector("#restartButton");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = QUIZ_TIME;
let timerId = null;
let answerSelected = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = QUIZ_TIME;
  answerSelected = false;

  quizSection.hidden = false;
  resultSection.hidden = true;

  startTimer();
  renderQuestion();
}

function startTimer() {
  stopTimer();

  timerId = setInterval(() => {
    timeLeft -= 1;

    updateTimer();

    if (timeLeft <= 0) {
      handleTimeUp();
    }
  }, 1000);

  updateTimer();
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateTimer() {
  timerElement.textContent = `${timeLeft}s`;

  timerElement.classList.toggle(
    "warning",
    timeLeft <= 10 && timeLeft > 5
  );

  timerElement.classList.toggle(
    "danger",
    timeLeft <= 5
  );
}

function renderQuestion() {
  const question =
    questions[currentQuestionIndex];

  answerSelected = false;

  questionNumberElement.textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  scoreElement.textContent =
    `Score: ${score}`;

  progressBar.style.width =
    `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  questionElement.textContent =
    question.question;

  answersElement.replaceChildren();

  question.options.forEach(
    (option, index) => {
      const button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "answer-button";

      button.dataset.answerIndex =
        String(index);

      const letter =
        document.createElement("span");

      letter.className =
        "answer-letter";

      letter.textContent =
        String.fromCharCode(65 + index);

      const text =
        document.createElement("span");

      text.textContent =
        option;

      button.append(letter, text);

      answersElement.appendChild(button);
    }
  );

  feedbackElement.hidden = true;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";

  nextButton.disabled = true;

  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "Finish Quiz"
      : "Next Question";
}

function selectAnswer(selectedIndex) {
  if (answerSelected) {
    return;
  }

  answerSelected = true;

  const question =
    questions[currentQuestionIndex];

  const buttons =
    answersElement.querySelectorAll(
      ".answer-button"
    );

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    }

    if (
      index === selectedIndex &&
      index !== question.answer
    ) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === question.answer) {
    score += 1;

    feedbackElement.textContent =
      "Correct answer!";

    feedbackElement.className =
      "feedback correct";
  } else {
    feedbackElement.textContent =
      `Incorrect. The correct answer is "${question.options[question.answer]}".`;

    feedbackElement.className =
      "feedback incorrect";
  }

  scoreElement.textContent =
    `Score: ${score}`;

  feedbackElement.hidden = false;
  nextButton.disabled = false;
}

function handleTimeUp() {
  if (answerSelected) {
    return;
  }

  answerSelected = true;

  const question =
    questions[currentQuestionIndex];

  const buttons =
    answersElement.querySelectorAll(
      ".answer-button"
    );

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    }
  });

  feedbackElement.textContent =
    `Time is up. The correct answer is "${question.options[question.answer]}".`;

  feedbackElement.className =
    "feedback timeout";

  feedbackElement.hidden = false;

  nextButton.disabled = false;

  stopTimer();
}

function goToNextQuestion() {
  if (!answerSelected) {
    return;
  }

  if (
    currentQuestionIndex <
    questions.length - 1
  ) {
    currentQuestionIndex += 1;
    timeLeft = QUIZ_TIME;

    startTimer();
    renderQuestion();

    return;
  }

  finishQuiz();
}

function finishQuiz() {
  stopTimer();

  quizSection.hidden = true;
  resultSection.hidden = false;

  const percentage =
    Math.round(
      (score / questions.length) * 100
    );

  finalScoreElement.textContent =
    `${score} / ${questions.length}`;

  finalPercentageElement.textContent =
    `${percentage}%`;

  resultMessageElement.textContent =
    getResultMessage(percentage);
}

function getResultMessage(percentage) {
  if (percentage === 100) {
    return "Perfect score. Excellent JavaScript knowledge.";
  }

  if (percentage >= 80) {
    return "Great result. You have a strong understanding of the fundamentals.";
  }

  if (percentage >= 60) {
    return "Good result. Keep reviewing the concepts and continue practicing.";
  }

  if (percentage >= 40) {
    return "You have a foundation to build on. Review the reference and try again.";
  }

  return "Keep learning and practicing. A second attempt can help reinforce the concepts.";
}

answersElement.addEventListener(
  "click",
  (event) => {
    const answerButton =
      event.target.closest(
        ".answer-button"
      );

    if (!answerButton) {
      return;
    }

    const selectedIndex =
      Number(answerButton.dataset.answerIndex);

    selectAnswer(selectedIndex);
  }
);

nextButton.addEventListener(
  "click",
  goToNextQuestion
);

restartButton.addEventListener(
  "click",
  startQuiz
);

startQuiz();