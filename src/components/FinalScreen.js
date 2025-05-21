import { renderHeader } from "./Header.js";

export function renderFinalScreen(
  appElement,
  topic,
  score,
  totalQuestions,
  onPlayAgain
) {
  appElement.innerHTML = `
    <section class="final-section">
      <h2>🎉 You've completed the quiz!</h2>
      <p>Your score: ${score} / ${totalQuestions}</p>
      <button class="submit-button" id="play-again">Play Again</button>
    </section>
  `;

  renderHeader(appElement);

  appElement
    .querySelector("#play-again")
    .addEventListener("click", onPlayAgain);
}
