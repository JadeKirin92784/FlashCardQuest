import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card"];

  connect() {
    this.currentCardIndex = 0; // Start with the first card
  }

  flip(event) {
    // Find the current card and toggle the "flipped" class
    const card = this.cardTargets[this.currentCardIndex];
    if (card) {
      card.classList.toggle("flipped");
    }
  }

  nextCard() {
    // Hide the current card
    this.cardTargets[this.currentCardIndex].style.display = "none";

    // Increment the index or loop back to the beginning
    this.currentCardIndex = (this.currentCardIndex + 1) % this.cardTargets.length;

    // Show the next card (or the first card if at the end)
    this.cardTargets[this.currentCardIndex].style.display = "block";
  }
}
