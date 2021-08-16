document.getElementById("address-result").innerHTML = localStorage.getItem("recipient-address");
const shoppingCart = []; 

    addClickListener()
    function addClickListener() {
        const productCard = document.querySelectorAll(".card");
        const closeBtn = document.querySelector(".close-btn");
        for(let i = 0; i < productCard.length; i++) {
            productCard[i].addEventListener("click", setAndOpenModalBox);
        }
        closeBtn.addEventListener("click", closeModalContainer);
    }

    function ModalBox(image, itemName, price, detail) {
        this.image = image;
        this.itemName = itemName;
        this.price = price;
        this.detail = detail;
    }


    CartItem.prototype = new ModalBox();
    CartItem.prototype.constructor = CartItem;

    function CartItem(image, itemName, price, detail, quantity) {
        ModalBox.call(this, image, itemName, price, detail);
        this.quantity = quantity;
    }



  
   

    function setAndOpenModalBox(event) {
        const item = event.currentTarget;
        const imageSource = item.querySelector(".item-img").getAttribute("src");
        const itemName = item.querySelector(".item-name").innerHTML;
        const itemDetail = item.querySelector(".item-detail").innerHTML;
        const itemPrice = item.querySelector(".item-price").innerHTML;
        const modalBoxCard = new ModalBox(imageSource, itemName, itemPrice, itemDetail);

        setModalBox(modalBoxCard);
        openModalContainer()
    }
    function setModalBox(object) {
        const imageContainer = document.querySelector(".modal-box__img-container > img");
        const itemNameContainer = document.querySelector(".modal-box__info-container > h4");
        const itemDetailContainer = document.querySelector(".modal-box__info-container > p");
        const itemPriceContainer = document.querySelector(".modal-box__total-price");
        const itemQuantity = document.querySelector(".item-qty");
        const orderButton = document.querySelector(".order-btn");

        imageContainer.src = object.image;
        itemNameContainer.innerHTML = object.itemName;
        itemDetailContainer.innerHTML = object.detail;
        itemPriceContainer.innerHTML = object.price;
        itemQuantity.value = 1;

        orderButton.addEventListener("click", addToCart);
        orderButton.addEventListener("click", closeModalContainer);
    }

    function openModalContainer() {
        const MODAL_CONTAINER = document.querySelector(".modal-container");
        MODAL_CONTAINER.classList.toggle("active");
    }
    function closeModalContainer() {
        const MODAL_CONTAINER = document.querySelector(".modal-container");
        MODAL_CONTAINER.classList.toggle("active");
    }
    function addTotalItemsInCart() {
        return shoppingCart.length + 1;
    }

    function addToCart() {
        const bottomNav = document.querySelector("#bottom-nav");
        const bagIcon = document.querySelector(".bottom-nav__cart-container > img");
        const cartTotalQuantity = bottomNav.querySelector(".cart-quantity");
        const cartNotificationBar = document.querySelector("#cart-notification-bar");
        const imgSrc = document.querySelector(".modal-box__img-container > img").getAttribute("src");
        const itemName = document.querySelector(".modal-box__info-container > h4").innerHTML;
        const itemPrice = document.querySelector(".modal-box__total-price").innerHTML;
        const itemQuantity = document.querySelector(".item-qty").value;
        const cartItem = new CartItem(imgSrc, itemName, itemPrice, undefined, itemQuantity);
        const clipIcon = document.querySelector(".clip-icon");
        const clipCircle = document.querySelector(".clip-circle");
        clipIcon.style.width="70px";
        clipCircle.style.width="120px";

        if (itemQuantity < 1 || itemQuantity === NaN) {
            alert("invalid quantity, please add a number between 1 - 99");
            openModalContainer();
            return false;
        }
        
        document.querySelector("#cart-notification-bar .item-name").innerHTML = itemName;
        document.querySelector("#cart-notification__item-quantity").innerHTML = itemQuantity;
        document.querySelector(".clip-circle").src = imgSrc;
        bagIcon.src = "images/icon-shopping-bag-filled.svg";
        cartNotificationBar.classList.toggle("active");
        
        setTimeout(function() {
            cartNotificationBar.classList.toggle("active");

        }, 3000);
        setTimeout(function() {
            clipIcon.style.width="0px";
            clipCircle.style.width="0px";

        }, 2000);
        
        cartTotalQuantity.innerHTML = addTotalItemsInCart();
        shoppingCart.push(cartItem) ;
        
        let shoppingCart_serialized = JSON.stringify(shoppingCart);
        localStorage.setItem("cart-array", shoppingCart_serialized);
        console.log(localStorage);

    }
    







