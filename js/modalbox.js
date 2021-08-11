


    addClickListener()

    function addClickListener() {
        const productCard = document.querySelectorAll(".card");
        const closeBtn = document.querySelector(".close-btn");
        for(let i = 0; i < productCard.length; i++) {
            productCard[i].addEventListener("click", setAndOpenModalBox);
        }
        closeBtn.addEventListener("click", closeModalContainer);
    }

    function ModalBox(image, name, detail, price) {
        this.image = image;
        this.name = name;
        this.detail = detail;
        this.price = price;
    }

    function setAndOpenModalBox(event) {
        const item = event.currentTarget;
        const imageSource = item.querySelector(".item-img").getAttribute("src");
        const itemName = item.querySelector(".item-name").innerHTML;
        const itemDetail = item.querySelector(".item-detail").innerHTML;
        const itemPrice = item.querySelector(".item-price").innerHTML;
        const modalBoxCard = new ModalBox(imageSource, itemName, itemDetail, itemPrice);

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
        console.log(orderButton);


        imageContainer.src = object.image;
        itemNameContainer.innerHTML = object.name;
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

    function addToCart() {
        const cartNotificationBar = document.querySelector("#cart-notification-bar");
        const itemName = document.querySelector(".modal-box__info-container > h4").innerHTML;
        const itemPrice = document.querySelector(".total-price");
        
        const itemQuantity = document.querySelector(".item-qty").value;
        
        document.querySelector("#cart-notification-bar .item-name").innerHTML = itemName;
        document.querySelector("#cart-notification__item-quantity").innerHTML = itemQuantity;
        cartNotificationBar.classList.toggle("active");
        setTimeout(function() {
            cartNotificationBar.classList.toggle("active");
        }, 3000);

    }







