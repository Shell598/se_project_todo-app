import Section from "./Section.js";

class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

 setEventListeners() {
   this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains(".popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
   }
    });
  }

  _handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
}


  close() {
    this._popupElement.classList.remove("popup_visible");
      document.removeEventListener("keydown", this._handleEscapeClose);
    }
  }

export default Popup;