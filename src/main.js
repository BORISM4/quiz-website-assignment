import "./style.css";

document.querySelector("#app").innerHTML = `
 
    <section class="welcome-section">
            <h1>Welcome to the <br> Frontend Quiz!</h1>
            <p>Pick a subject to get started.</p>
        </section>
        <section class="quiz-options-section">
            <ul class="quiz-options">
                <li class="option">
                    <div class="icon-container">&lt;/&gt;</div>
                    <span>HTML</span>
                </li>
                <li class="option">
                    <div class="icon-container">🖌️</div>
                    <span>CSS</span>
                </li>
                <li class="option">
                    <div class="icon-container">JS</div>
                    <span>Javascript</span>
                </li>
                <li class="option">
                    <div class="icon-container">♿</div>
                    <span>Accessibility</span>
                </li>
            </ul>
        </section>
        <div class="top-right">
            <div class="theme-toggle">
                <span class="light"></span>
                <span class="dark"></span>
            </div>
            <span class="profile-icon">👤</span>
        </div>
`;

setupCounter(document.querySelector("#counter"));
