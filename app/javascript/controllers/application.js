import { Application } from "@hotwired/stimulus"

// Start the Stimulus application
const application = Application.start()

// Import all controllers manually
import FlashcardController from "./controllers/flashcard_controller.js"
import TimerController from "./controllers/timer_controller.js"
// Add more controllers as needed

// Load controllers into Stimulus
application.register("flashcard", FlashcardController)
application.register("timer", TimerController)
// Register additional controllers as needed

// Configure Stimulus development experience (optional)
application.debug = false
window.Stimulus = application

export { application }
