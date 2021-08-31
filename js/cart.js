(function () {
    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", documentIsReady())
    } else {
        documentIsReady()
    }

    document.querySelector(".delivery-address").innerHTML = localStorage.getItem("recipient-address");

    function documentIsReady() {
        const CART_DESERIALIZED = JSON.parse(localStorage.getItem("cart-array"));
        const cartItemDiv = document.querySelector(".cart-item");
    


        for (let i = 0; i < CART_DESERIALIZED.length; i++) {
            const cartItem = CART_DESERIALIZED[i];
            const title = cartItem.itemName;
            const imageSrc = cartItem.image;
            const price = "$" + cartItem.price + " per dozen";
            const quantity = cartItem.quantity;
            loadItemsToCart(title, imageSrc, price, quantity);
        }
        if (isOrderEmpty()) {
            updateCartTotal();
            return alert("cart is empty");
        } else {
            addQuantityInputListeners();
            addRemoveButtonListeners();
            updateReviewTitle();
            updateCartTotal();
        }
    }

    function loadItemsToCart(title, imageSrc, price, quantity) {
        const cartItem = document.querySelector(".cart-item");
        const cartReceipt = document.querySelector(".cart-receipt-block");
        const cartItemClone = cartItem.cloneNode(true);
        cartItemClone.querySelector(".cart-item__img").src = imageSrc;
        cartItemClone.querySelector(".cart-item__title").innerText = title;
        cartItemClone.querySelector(".cart-item__price").innerText = price;
        cartItemClone.querySelector(".quantity-field").value = quantity;
        cartItem.classList.add("active");
        cartReceipt.classList.add("active");
        console.log(cartItemClone.classList)
        cartItem.after(cartItemClone);
    }
    function addQuantityInputListeners() {
        const QUANTITY_FIELD = document.querySelectorAll(".quantity-field");
        const INPUT_BUTTONS = document.querySelectorAll(".quantity-input button");
        for (let i = 0; i < INPUT_BUTTONS.length; i++) {
            const input = INPUT_BUTTONS[i];
            input.addEventListener("click", updateCartTotal);
        }
        for (let j = 0; j < QUANTITY_FIELD.length; j++) {
            const textField = QUANTITY_FIELD[j];
            textField.addEventListener("change", quantityChange);
            textField.addEventListener("click", (event) => event.currentTarget.select());
        }
    }

    function quantityChange(event) {
        const textField = event.currentTarget;
        if (isNaN(textField.value) || textField.value <= 0) {
            textField.value = 1;
        } else if (textField.value > 100) {
            textField.value = 100;
        }
        updateCartTotal();
    }

    function addRemoveButtonListeners() {
        const REMOVE_CART_ITEM_BUTTONS_ARR = document.querySelectorAll(".cart-item__remove-btn");
        for (let i = 0; i < REMOVE_CART_ITEM_BUTTONS_ARR.length; i++) {
            const removeButton = REMOVE_CART_ITEM_BUTTONS_ARR[i];
            removeButton.addEventListener("click", removeCartItem);
        }

    }

    function removeCartItem(event) {
        const buttonClicked = event.currentTarget;
        buttonClicked.parentElement.remove();
        updateReviewTitle();
        updateCartTotal();
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
        const cartItems = document.querySelectorAll(".cart-item.active");
        console.log(cartItems);
        const itemPriceArr = document.querySelectorAll(".cart-item__price");
        const quantityArray = document.querySelectorAll(".quantity-field");
        const subtotalContainer = document.querySelector(".cart-subtotal__price");
        const totalContainer = document.querySelector(".cart-total__price");
        for (let i = 0; i < itemPriceArr.length; i++) {
            const itemPrice = parseFloat(itemPriceArr[i].innerText.replace("$", ""));
            const itemQuantity = quantityArray[i].value;
            counter += itemQuantity * itemPrice;
        }
        (isOrderEmpty()) ? subtotalContainer.parentElement.parentElement.remove() : false;
        subtotalContainer.innerText = convertDollarAmount(counter);
        return totalContainer.innerText = subtotalContainer.innerHTML;

    }

    function isOrderEmpty() {
        const cartItemsArr = document.querySelectorAll(".cart-item");
        return cartItemsArr.length <= 0 ? true : false;
    }
    function convertDollarAmount(counter) {
        const dollarAmount = "$" + (Math.round(counter * 100) / 100).toFixed(2);
        return dollarAmount;
    }




    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty("--app-height", `${window.innerHeight}px`)
    }
    window.addEventListener("resize", appHeight);
    appHeight()

}());
