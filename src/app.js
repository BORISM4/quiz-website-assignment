// src/app.js
import { loadQuizData } from "./services/quizService.js";
import { renderWelcomeScreen } from "./components/WelcomeScreen.js";
import { renderQuestionScreen } from "./components/QuestionScreen.js";
import { renderFinalScreen } from "./components/FinalScreen.js";

const app = document.querySelector("#app");

let quizData = null;
let currentTopic = null;
let currentQuestionIndex = 0;
let score = 0;

async function startApp() {
  try {
    quizData = await loadQuizData();
    showWelcomeScreen();
  } catch (error) {
    app.innerHTML = `
      <div class="error-message">
        <p>❌ Ocurrió un error al cargar el cuestionario.</p>
        <p>Detalles: ${error.message}</p>
      </div>
    `;
  }
}

function showWelcomeScreen() {
  renderWelcomeScreen(app, quizData, (topic) => {
    currentTopic = topic;
    currentQuestionIndex = 0;
    score = 0;
    showQuestionScreen();
  });
}

function showQuestionScreen() {
  const questionData = quizData[currentTopic][currentQuestionIndex];
  const totalQuestions = quizData[currentTopic].length;

  renderQuestionScreen(
    app,
    currentTopic,
    questionData,
    currentQuestionIndex,
    totalQuestions,
    (isNextClicked, isCorrect) => {
      if (isNextClicked) {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
          showQuestionScreen();
        } else {
          showFinalScreen();
        }
      } else {
        if (isCorrect) {
          score++;
        }
      }
    }
  );
}

function showFinalScreen() {
  renderFinalScreen(
    app,
    currentTopic,
    score,
    quizData[currentTopic].length,
    () => {
      showWelcomeScreen();
    }
  );
}

export { startApp };
