class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      console.log("key pressed");
    }
  }
  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }
  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", (evt) => {
      const clickedOverlay = evt.target === this._popupElement;
      const clickedClose = evt.target.closest(".popup__close-button");
      if (clickedOverlay || clickedClose) {
        this.close();
      }
    });
  }
}

export default Popup;
