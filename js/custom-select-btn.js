(function() {

  if (document.readyState = "loading") {
    document.addEventListener("DOMContentLoaded", documentIsReady());
  } else {
    documentIsReady();
  }

  function documentIsReady() {
    const MINUS_BUTTON = document.querySelectorAll(".minus-btn");
    const PLUS_BUTTON = document.querySelectorAll(".plus-btn");
    for (let i = 0; i < MINUS_BUTTON.length; i++) {
      MINUS_BUTTON[i].setAttribute("disabled", "disabled");
      PLUS_BUTTON[i].addEventListener("click", addQuantity);
    }
    
  }

  function addQuantity(event) {
    const plusButton = event.currentTarget;
    const inputField = plusButton.previousElementSibling;
    inputField.value == 100 ? plusButton.setAttribute("disabled", "disabled") : inputField.value++;
    plusButton.getAttribute("disabled") ? alert("reached max quantity") : false;

  }




}());



