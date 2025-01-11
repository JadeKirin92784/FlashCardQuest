import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["correctCount", "incorrectCount", "timer", "quitButton", "remainingCount"];

  connect() {
    console.log('Quiz controller initialized');
    console.log('Available targets:', this.targets);  // Logs all targets
  
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentIndex = 0; // Start with the first flashcard
    this.totalPoints = 0;
    this.timerInterval = null;
    this.timeLeft = 10;
  
    // Access the total number of flashcards from the data attribute
    this.totalFlashcards = parseInt(this.element.dataset.quizTotalFlashcards, 10);

    if (isNaN(this.totalFlashcards)) {
      console.error('Error: totalFlashcards is not a valid number');
    }
  
    this.updateRemainingCount(); // Initialize remaining count display
    this.correctCountTarget.textContent = this.correctCount; // Initialize correct count
    this.incorrectCountTarget.textContent = this.incorrectCount; // Initialize incorrect count
  
    this.startTimer();
  
    setTimeout(() => {
      console.log('Quit Button Target:', this.quitButtonTarget);
      if (this.quitButtonTarget) {
        this.quitButtonTarget.addEventListener("click", this.quitQuiz.bind(this));
      } else {
        console.log('Quit button target not found');
      }
    }, 100);  // Delay to ensure the DOM has fully loaded
  
    // Add event listeners to answer buttons within the controller's context
    this.element.querySelectorAll(".answer-btn").forEach(button => {
      button.addEventListener("click", this.handleAnswerClick.bind(this));
    });
  }  

  startTimer() {
    console.log("Starting timer...");
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timerTarget.textContent = this.timeLeft; // Update the timer display
      } else {
        clearInterval(this.timerInterval);
        console.log("Time is up!");
        // Handle timeout logic (e.g., move to the next flashcard or end quiz)
        this.showNextFlashcard();
      }
    }, 1000); // Update every second
  }


  updateRemainingCount() {
    if (isNaN(this.totalFlashcards)) {
      console.error('Error: totalFlashcards is NaN');
      return;
    }
  
    const remainingFlashcards = this.totalFlashcards - this.currentIndex;
    this.remainingCountTarget.textContent = `${remainingFlashcards} left`; // Update the remaining flashcards display
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
      const pointsForThisAnswer = this.timeLeft; // Points equal to the remaining time
      this.totalPoints += pointsForThisAnswer; // Add to total points
      console.log(`Points earned for this answer: ${pointsForThisAnswer}`);
      console.log(`Total points: ${this.totalPoints}`);
      button.style.backgroundColor = "green"; // Highlight correct answer
    } else {
      this.incorrectCount++;
      button.style.backgroundColor = "red"; // Highlight incorrect answer
    }
  
    // Update the score display immediately
    this.correctCountTarget.textContent = this.correctCount;
    this.incorrectCountTarget.textContent = this.incorrectCount;
  
    // Update current score display (real-time)
    this.updateCurrentScore();
  
    // Move to the next flashcard after a short delay
    setTimeout(() => this.showNextFlashcard(), 1000);
  }
  
  updateCurrentScore() {
    const currentScoreTarget = document.querySelector(".current-score");
    if (currentScoreTarget) {
      currentScoreTarget.textContent = `Current Score: ${this.totalPoints}`;
    }
  }
  

  showNextFlashcard() {
    // Clear the current timer
    clearInterval(this.timerInterval);
  
    const currentFlashcard = this.element.querySelector(
      `.flashcard[data-quiz-index="${this.currentIndex}"]`
    );
  
    if (currentFlashcard) {
      currentFlashcard.style.display = "none"; // Hide current flashcard
    }
  
    this.currentIndex++;  // Increment the index first
  
    const nextFlashcard = this.element.querySelector(
      `.flashcard[data-quiz-index="${this.currentIndex}"]`
    );
  
    if (nextFlashcard) {
      nextFlashcard.style.display = ""; // Show next flashcard
      this.timeLeft = 10; // Reset the timer to the initial value
      this.startTimer(); // Restart the timer for the new flashcard
    } else {
      // No more flashcards, show the final score
      this.showFinalScore();
    }
  
    // Update remaining flashcards count after index change
    this.updateRemainingCount();
  }
  
  showFinalScore() {
    const finalMessage = document.createElement("div");
    finalMessage.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Correct Answers: ${this.correctCount}</p>
      <p>Incorrect Answers: ${this.incorrectCount}</p>
      <p>Total Points: ${this.totalPoints}</p>
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

  quitQuiz(event) {
    event.preventDefault(); // Prevent default behavior
    console.log("Quit button clicked");
    window.history.back();  // Go back to the previous page (deck page)
  }
}
