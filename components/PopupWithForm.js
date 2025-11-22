import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelector(".popup__input");
    console.log(this._inputList);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        console.log("submitted");
        this._handleFormSubmit();
      });
  }
}
export default PopupWithForm;
