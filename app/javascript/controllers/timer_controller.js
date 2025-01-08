import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["display", "progressBar"];

  start() {
    let timeLeft = 20; // seconds
    this.updateTimer(timeLeft);

    const timer = setInterval(() => {
      timeLeft--;
      this.updateTimer(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  updateTimer(timeLeft) {
    if (this.hasDisplayTarget) {
      this.displayTarget.textContent = `Time left: ${timeLeft} seconds`;
    }
    if (this.hasProgressBarTarget) {
      this.progressBarTarget.style.width = `${(timeLeft / 20) * 100}%`;
    }
  }
}
