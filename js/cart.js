(function () {
    document.querySelector(".delivery-address").innerHTML = localStorage.getItem("recipient-address");
    const shoppingCart_deserialized = JSON.parse(localStorage.getItem("cart-array"));
    
    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", documentIsReady())
    } else {
        documentIsReady()
    }
    function documentIsReady() {
        if (isOrderEmpty()){
            return alert("cart is empty");
        }
        const REMOVE_CART_ITEM_BUTTONS_ARR = document.querySelectorAll(".cart-item__remove-btn");
        for (let i = 0; i < addEventListener.length; i++) {
            const removeButton = REMOVE_CART_ITEM_BUTTONS_ARR[i];
            removeButton.addEventListener("click", removeItem);
            updateReviewTitle();
            updateCartTotal();
        }
    }
    function removeItem(event) {
        const buttonClicked = event.currentTarget;
        buttonClicked.parentElement.remove();
        updateReviewTitle();
        updateCartTotal();
    }

    function updateReviewTitle() {
        let totalItems = 0;
        const orderReviewTitle = document.querySelector(".order-review__title");
        const orderItems = document.querySelectorAll(".cart-item");
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
        const cartItemsArr =  document.querySelectorAll(".cart-item");
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
