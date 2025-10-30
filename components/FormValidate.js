class FormValidator {
  constructor(settings, formElement) {
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputSelector = settings.inputSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
    this._formSelector = settings._formSelector;
    this._settings = settings;
    this._inputList = settings.inputList;
  }

  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  }

  resetValidation() {
    this._formElement.reset();
    this._submitButtonSelector.disabled = true;
  }

  _hasInvalidInput(inputList) {
    return this._inputList((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(this._formElement, inputElement, this._settings);
        this._toggleButtonState(this._inputList, buttonElement, this._settings);
      });
    });

    console.log("success");
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;
