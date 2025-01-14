import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="toggle-answer"
export default class extends Controller {
    static targets = ["removeList", "addList"];

    toggleRemoveList() {
        console.log("Toggle Remove List Button Clicked");
        this.removeListTarget.classList.toggle("d-none");
        console.log("Remove List visibility: ", this.removeListTarget.classList.contains("d-none"));
    }

    toggleAddList() {
        console.log("Toggle Add List Button Clicked");
        this.addListTarget.classList.toggle("d-none");
        console.log("Add List visibility: ", this.addListTarget.classList.contains("d-none"));
    }
    
}
