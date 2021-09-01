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
      MINUS_BUTTON[i].addEventListener("click", subtractQuantityField)
      PLUS_BUTTON[i].addEventListener("click", incrementQuantity);
    }
    
  }

  function incrementQuantity(event) {
    const plusButton = event.currentTarget;
    const inputField = plusButton.previousElementSibling;
    const minusButton = inputField.previousElementSibling;
    inputField.value > 1 ? minusButton.removeAttribute("disabled") : false; 
    inputField.value == 100 ? plusButton.setAttribute("disabled", "disabled") : inputField.value++;
    plusButton.getAttribute("disabled") ? alert("reached max quantity") : false;
   

  }

  function subtractQuantityField(event) {
    const minusButton = event.currentTarget;
    const inputField = minusButton.nextElementSibling;
    inputField.value == 1 ? minusButton.setAttribute("disabled", "disabled") : inputField.value--;
    minusButton.getAttribute("disabled") ? alert("please enter valid amount") : false;
  } 



}());



