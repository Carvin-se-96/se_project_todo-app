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

  _showInputError = (inputElement, errorMessage) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage; //inputElement.validatoinMessage
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  resetValidation() {
    this._formElement.reset();
    this._disableButton();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(
          this._inputList,
          this._buttonElement,
          this._settings
        );
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;
