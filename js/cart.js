(function () {
    document.querySelector(".delivery-address").innerHTML = localStorage.getItem("recipient-address");
    console.log(localStorage);
    let shoppingCart_deserialized = JSON.parse(localStorage.getItem("cart-array"));
    console.log(shoppingCart_deserialized);


    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty("--app-height", `${window.innerHeight}px`)
    }
    window.addEventListener("resize", appHeight);
    appHeight()

}());
