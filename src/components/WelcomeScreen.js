import { getTopicIcon } from "../utils/helpers.js";
import { renderHeader } from "./Header.js";
import { gsap } from "gsap";

export function renderWelcomeScreen(appElement, quizData, onTopicSelect) {
  appElement.innerHTML = `
    <div class="welcome-page-container">
      <section class="welcome-text-section">
        <h1>Welcome to the <br> Frontend Quiz!</h1>
        <p>Pick a subject to get started.</p>
      </section>

      <section class="quiz-options-section">
        <ul class="quiz-options">
          ${Object.keys(quizData)
            .map(
              (topic) => `
                <li class="option" data-topic="${topic}">
                  <div class="icon-container">${getTopicIcon(topic)}</div>
                  <span>${topic}</span>
                </li>`
            )
            .join("")}
        </ul>
      </section>
    </div>
  `;

  renderHeader(appElement);

  gsap.from(".welcome-text-section h1", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".welcome-text-section p", {
    opacity: 0,
    y: -20,
    delay: 0.3,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".quiz-options .option", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    delay: 0.6,
    duration: 0.5,
    ease: "power2.out",
  });

  appElement.querySelectorAll(".option").forEach((el) => {
    el.addEventListener("click", () => {
      onTopicSelect(el.dataset.topic);
    });
  });
}
