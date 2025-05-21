import { getTopicIcon } from "../utils/helpers.js";
import { renderHeader } from "./Header.js";
import { gsap } from "gsap";

export function renderQuestionScreen(
  appElement,
  topic,
  questionData,
  currentQuestionIndex,
  totalQuestions,
  onSubmitAnswer
) {
  const progress = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  );

  appElement.innerHTML = `
    <div class="question-page-container">
      <section class="question-section">
        <div class="accessibility-info">
          <div class="icon-container">
            ${getTopicIcon(topic)}
          </div>
          <span>${topic}</span>
        </div>
        <div class="question-number">Question ${
          currentQuestionIndex + 1
        } of ${totalQuestions}</div>
        <h2 class="question-title">${questionData.question}</h2>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%;"></div>
        </div>
      </section>

      <section class="quiz-options-section-question">
        <ul class="quiz-options">
          ${questionData.options
            .map(
              (opt, idx) => `
                <li class="option" data-index="${idx}">
                  <div class="icon-container">${String.fromCharCode(
                    65 + idx
                  )}</div>
                  <span>${opt}</span>
                </li>
              `
            )
            .join("")}
        </ul>
        <div id="error-msg" style="color: red; display: none; text-align: center; margin-top: 15px; font-weight: bold;">Please select an answer.</div>
        <button class="submit-button">Submit answer</button>
      </section>
    </div>
  `;

  renderHeader(appElement);

  let selectedIndex = null;
  let isAnswerSubmitted = false;

  appElement.querySelectorAll(".option").forEach((el) => {
    el.addEventListener("click", () => {
      if (isAnswerSubmitted) return;

      appElement
        .querySelectorAll(".option")
        .forEach((opt) => opt.classList.remove("selected"));
      el.classList.add("selected");
      selectedIndex = parseInt(el.dataset.index);

      document.querySelector("#error-msg").style.display = "none";
    });
  });

  const submitBtn = appElement.querySelector(".submit-button");
  submitBtn.addEventListener("click", () => {
    if (selectedIndex === null && !isAnswerSubmitted) {
      document.querySelector("#error-msg").style.display = "block";
      return;
    }

    if (isAnswerSubmitted) {
      onSubmitAnswer(true);
    } else {
      isAnswerSubmitted = true;
      const isCorrect = selectedIndex === questionData.answer;

      appElement
        .querySelectorAll(".option")
        .forEach((el) => el.classList.add("disabled"));

      appElement
        .querySelector(`.option[data-index="${selectedIndex}"]`)
        .classList.add(isCorrect ? "correct" : "incorrect");
      appElement
        .querySelector(`.option[data-index="${questionData.answer}"]`)
        .classList.add("correct");

      submitBtn.textContent = "Next";
      onSubmitAnswer(false, isCorrect);
    }
  });
  gsap.from(".question-section", {
    x: -20,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
  });

  gsap.from(".quiz-options .option", {
    x: 0,
    opacity: 0,
    stagger: 0.15,
    delay: 0.3,
    duration: 0.6,
    ease: "power2.out",
  });

  gsap.from(".submit-button", {
    opacity: 0,
    y: 10,
    delay:
      0.3 + 0.15 * document.querySelectorAll(".quiz-options .option").length,
    duration: 0.4,
    ease: "power2.out",
  });
}
