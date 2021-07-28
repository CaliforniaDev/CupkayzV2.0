window.onload = init;

function init() {
    const PRODUCT_CARD = document.querySelectorAll(".card");
    const MODAL_CONTAINER = document.querySelector(".modal-container");
    const closeBtn = document.querySelector(".close-btn");
    const modalBoxImage = document.querySelector(".modal-box > figure > img");
    const modalBoxName = document.querySelector(".info-container > h4");
    const modalBoxDetail = document.querySelector(".info-container > p");
    const modalBoxPrice = document.querySelector(".total-price");

    addClickListener()

    function addClickListener() {
        for(let i = 0; i < PRODUCT_CARD.length; i++) {
            PRODUCT_CARD[i].addEventListener("click", setAndOpenModalBox);
            console.log("hello World");
        }
        closeBtn.addEventListener("click", closeModalContainer);
    }

    function setAndOpenModalBox(event) {
        let item = event.currentTarget;
        let imageSource = item.querySelector(".item-img").getAttribute("src");
        let itemName = item.querySelector(".item-name").innerHTML;
        let itemDetail = item.querySelector(".item-detail").innerHTML;
        let itemPrice = item.querySelector(".item-price").innerHTML;
        let modalBoxCard = new ModalBox(imageSource, itemName, itemDetail, itemPrice);
        setModalBox(modalBoxCard);
        openModalContainer()
    }
    function setModalBox(object) {
        modalBoxImage.src = object.image;
        modalBoxName.innerHTML = object.name;
        modalBoxDetail.innerHTML = object.detail;
        modalBoxPrice.innerHTML = object.price;
    }

    function openModalContainer() {
        MODAL_CONTAINER.classList.toggle("active");
    }
    function closeModalContainer() {
        MODAL_CONTAINER.classList.toggle("active");
    }

    function ModalBox(image, name, detail, price) {
        this.image = image;
        this.name = name;
        this.detail = detail;
        this.price = price;
    }

    // function ModalBox(imgSrc, name, detail, price)






}