(function () {
    document.querySelector(".delivery-address").innerHTML = localStorage.getItem("recipient-address");
    const shoppingCart_deserialized = JSON.parse(localStorage.getItem("cart-array"));




    addClickEventListener();
    updateReviewTitle();
    isOrderEmpty();

    function addClickEventListener() {
        const removeCartItemButton = document.querySelectorAll(".cart-item__remove-btn");
        for (let i = 0; i < addEventListener.length; i++) {
            let button = removeCartItemButton[i];
            button.addEventListener("click", removeItem);
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

        (isOrderEmpty(totalItems) ? console.log(true) : console.log(false));
        return orderReviewTitle.innerHTML = "Review Order " + "(" + totalItems + ")";
    }
    function isOrderEmpty(totalItems) {
        return totalItems <= 0 ? true : false;
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
        subtotalContainer.innerHTML = "$" + (Math.round(counter * 100) / 100).toFixed(2);
        return totalContainer.innerHTML = subtotalContainer.innerHTML;

    }


    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty("--app-height", `${window.innerHeight}px`)
    }
    window.addEventListener("resize", appHeight);
    appHeight()

}());
