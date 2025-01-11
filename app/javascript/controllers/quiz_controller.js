import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["correctCount", "incorrectCount"]; // Declare targets for tracking elements

  connect() {
    console.log('Quiz controller initialized');
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentIndex = 0; // Start with the first flashcard
  
    // Add event listeners to answer buttons within the controller's context
    this.element.querySelectorAll(".answer-btn").forEach(button => {
      button.addEventListener("click", this.handleAnswerClick.bind(this));
    });
  }

  handleAnswerClick(event) {
    const button = event.currentTarget;
    const isCorrect = button.getAttribute("data-correct") === "true";
    
    console.log('Answer clicked:', button.textContent);
    console.log('Is correct:', isCorrect);
  
    // Disable all buttons for the current flashcard
    const flashcard = button.closest(".flashcard");
    flashcard.querySelectorAll(".answer-btn").forEach(btn => (btn.disabled = true));
  
    // Update the score counts
    if (isCorrect) {
      this.correctCount++;
      button.style.backgroundColor = "green"; // Highlight correct answer
    } else {
      this.incorrectCount++;
      button.style.backgroundColor = "red"; // Highlight incorrect answer
    }
  
    // Update the score display
    this.correctCountTarget.textContent = this.correctCount;
    this.incorrectCountTarget.textContent = this.incorrectCount;
  
    // Move to the next flashcard after a short delay
    setTimeout(() => this.showNextFlashcard(), 1000);
  }

  showNextFlashcard() {
    const currentFlashcard = this.element.querySelector(
      `.flashcard[data-quiz-index="${this.currentIndex}"]`
    );

    if (currentFlashcard) {
      currentFlashcard.style.display = "none"; // Hide current flashcard
    }

    this.currentIndex++;

    const nextFlashcard = this.element.querySelector(
      `.flashcard[data-quiz-index="${this.currentIndex}"]`
    );

    if (nextFlashcard) {
      nextFlashcard.style.display = ""; // Show next flashcard
    } else {
      // No more flashcards, show the final score
      this.showFinalScore();
    }
  }

  showFinalScore() {
    const finalMessage = document.createElement("div");
    finalMessage.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Correct Answers: ${this.correctCount}</p>
      <p>Incorrect Answers: ${this.incorrectCount}</p>
      <div class="quiz-options">
        <button class="btn btn-primary" data-action="click->quiz#redoQuiz">Redo Quiz</button>
        <button class="btn btn-secondary" data-action="click->quiz#goBackToDeck">Go Back to Deck</button>
        <button class="btn btn-link" data-action="click->quiz#goBackToDeckIndex">Go Back to Deck Index</button>
      </div>
    `;
    this.element.innerHTML = ""; // Clear the quiz container
    this.element.appendChild(finalMessage); // Show the final score
  }

  // Action to redo the quiz
  redoQuiz() {
    window.location.reload(); // Reload the page to start the quiz again
  }

  // Action to go back to the deck
  goBackToDeck() {
    window.history.back(); // Go back to the previous page (the deck page)
  }

  // Action to go back to the deck index
  goBackToDeckIndex() {
    window.location.href = "/decks"; // Adjust this URL as necessary to point to your deck index page
  }
}
