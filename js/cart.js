(function () {
    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", documentIsReady)
    } else {
        documentIsReady()
    }

    function documentIsReady() {
        document.querySelector(".delivery-address").innerText = getAddress()
        const CART_DESERIALIZED = JSON.parse(localStorage.getItem("cart-array"));
        const HIDDEN_CART_ITEM = document.querySelector(".cart-item.hidden");
        const payButton = document.querySelector(".google-pay-btn");
        if (isOrderEmpty()) {
            updateCartTotal();
            return alert("cart is empty");
        } else {
            for (let i = 0; i < CART_DESERIALIZED.length; i++) {
                const cartItem = CART_DESERIALIZED[i];
                const title = cartItem.itemName;
                const imageSrc = cartItem.image;
                const price = "$" + cartItem.price + " per dozen";
                const quantity = cartItem.quantity;
                loadItemsToCart(title, imageSrc, price, quantity);
            }

            HIDDEN_CART_ITEM.remove()

            addQuantityInputListeners();
            addRemoveButtonListeners();
            updateReviewTitle();
            updateCartTotal();
        }
    }
    function getAddress() {
        const storedAddress = localStorage.getItem("recipient-address");
        const instructions = "Please click here to confirm a valid address...";
        return (storedAddress !== null) ? storedAddress : instructions;         
    }
    
    function loadItemsToCart(title, imageSrc, price, quantity) {
        const cartItem = document.querySelector(".cart-item.hidden");
        const cartReceipt = document.querySelector(".cart-receipt-block");
        const cartItemClone = cartItem.cloneNode(true);
        const payButton = document.querySelector(".google-pay-btn");
        cartItemClone.querySelector(".cart-item__img").src = imageSrc;
        cartItemClone.querySelector(".cart-item__title").innerText = title;
        cartItemClone.querySelector(".cart-item__price").innerText = price;
        cartItemClone.querySelector(".quantity-field").value = quantity;
        cartItemClone.classList.replace("hidden", "active");
        payButton.classList.add("active");
        cartReceipt.classList.add("active");
        return cartItem.after(cartItemClone);
    }

    function addQuantityInputListeners() {
        const QUANTITY_FIELD = document.querySelectorAll(".quantity-field");
        const MINUS_BUTTON = document.querySelectorAll(".minus-btn");
        const PLUS_BUTTON = document.querySelectorAll(".plus-btn");
        for (let i = 0; i < MINUS_BUTTON.length; i++) {
            MINUS_BUTTON[i].setAttribute("disabled", "disabled");
            MINUS_BUTTON[i].addEventListener("click", subtractQuantityClicked)
            MINUS_BUTTON[i].addEventListener("click", updateCartTotal);
            PLUS_BUTTON[i].addEventListener("click", incrementQuantityClicked);
            PLUS_BUTTON[i].addEventListener("click", updateCartTotal);

        }
        for (let j = 0; j < QUANTITY_FIELD.length; j++) {
            const textField = QUANTITY_FIELD[j];
            textField.addEventListener("change", quantityChange);
            textField.addEventListener("click", (event) => event.currentTarget.select());
        }
    }

    function incrementQuantityClicked(event) {
        const plusButton = event.currentTarget;
        const inputField = plusButton.previousElementSibling;
        const minusButton = inputField.previousElementSibling;
        inputField.value == 100 ? plusButton.setAttribute("disabled", "disabled") : inputField.value++;
        inputField.value > 1 ? minusButton.removeAttribute("disabled") : false;
        plusButton.getAttribute("disabled") ? alert("reached max quantity") : false;
    }

    function subtractQuantityClicked(event) {
        const minusButton = event.currentTarget;
        const inputField = minusButton.nextElementSibling;
        inputField.value == 1 ? minusButton.setAttribute("disabled", "disabled") : inputField.value--;
        minusButton.getAttribute("disabled") ? alert("please enter valid amount") : false;
    }

    function quantityChange(event) {
        const textField = event.currentTarget;
        if (isNaN(textField.value) || textField.value <= 0) {
            textField.value = 1;
        } else if (textField.value > 100) {
            textField.value = 100;
        }
        return updateCartTotal();
    }

    function addRemoveButtonListeners() {
        const REMOVE_CART_ITEM_BUTTONS_ARR = document.querySelectorAll(".cart-item__remove-btn");
        for (let i = 0; i < REMOVE_CART_ITEM_BUTTONS_ARR.length; i++) {
            const removeButton = REMOVE_CART_ITEM_BUTTONS_ARR[i];
            removeButton.addEventListener("click", updateLocalStorage);
            removeButton.addEventListener("click", removeCartItem);
        }
    }

    function removeCartItem(event) {
        const buttonClicked = event.currentTarget;
        buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
        return updateReviewTitle(), updateCartTotal();
    }

    function updateReviewTitle() {
        let totalItems = 0;
        const orderReviewTitle = document.querySelector(".order-review__title");
        const orderItems = document.querySelectorAll(".cart-item.active");
        for (let i = 0; i < orderItems.length; i++) {
            totalItems++;
        }
        return orderReviewTitle.innerHTML = "Review Order " + "(" + totalItems + ")";
    }

    function updateCartTotal() {
        let counter = 0;
        const itemPriceArr = document.querySelectorAll(".cart-item__price");
        const quantityArray = document.querySelectorAll(".quantity-field");
        const subtotalContainer = document.querySelector(".cart-subtotal__price");
        const totalContainer = document.querySelector(".cart-total__price");
        const payButton = document.querySelector(".google-pay-btn");

        for (let i = 0; i < itemPriceArr.length; i++) {
            const itemPrice = parseFloat(itemPriceArr[i].innerText.replace("$", ""));
            const itemQuantity = quantityArray[i].value;
            counter += itemQuantity * itemPrice;
        }
        if (isOrderEmpty()) {
            payButton.remove();
            subtotalContainer.parentElement.parentElement.remove()
        } 
        subtotalContainer.innerText = convertDollarAmount(counter);

        return totalContainer.innerText = subtotalContainer.innerHTML;
    }

    function isOrderEmpty() {
        const cartItemsArr = document.querySelectorAll(".cart-item.active");
        if (cartItemsArr.length <= 0 && !("cart-array" in localStorage)) {
            return true;
        }
        return false
    }
    function convertDollarAmount(counter) {
        const dollarAmount = "$" + (Math.round(counter * 100) / 100).toFixed(2);
        return dollarAmount;
    }

    function updateLocalStorage(event) {
        const CART_DESERIALIZED = JSON.parse(localStorage.getItem("cart-array"));
        const removedCartItem = event.currentTarget.parentElement;
        const itemName = removedCartItem.querySelector(".cart-item__title").innerText;
        for (let i = 0; i < CART_DESERIALIZED.length; i++) {
            if (CART_DESERIALIZED[i].itemName.includes(itemName)) {
                CART_DESERIALIZED.splice(i, 1);
                const CART_SERIALIZED = JSON.stringify(CART_DESERIALIZED);
                localStorage.setItem("cart-array", CART_SERIALIZED);
            }
            if (CART_DESERIALIZED.length === 0) {
                localStorage.removeItem("cart-array");
                console.log("removed cart array from local storage");
            }
        }
    }

    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty("--app-height", `${window.innerHeight}px`)
    }
    window.addEventListener("resize", appHeight);
    appHeight()

}());
