import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card"];

  flip() {
    this.cardTarget.classList.toggle("flipped");
  }
}
