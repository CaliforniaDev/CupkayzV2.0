window.onload = init;

function init() {

    addClickListener()

    function addClickListener() {
        let productCard = document.querySelectorAll(".card");
        let closeBtn = document.querySelector(".close-btn");
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
        let modalBoxImage = document.querySelector(".modal-box > figure > img");
        let modalBoxName = document.querySelector(".info-container > h4");
        let modalBoxDetail = document.querySelector(".info-container > p");
        let modalBoxPrice = document.querySelector(".total-price");

        modalBoxImage.src = object.image;
        modalBoxName.innerHTML = object.name;
        modalBoxDetail.innerHTML = object.detail;
        modalBoxPrice.innerHTML = object.price;
    }

    function openModalContainer() {
        const MODAL_CONTAINER = document.querySelector(".modal-container");
        MODAL_CONTAINER.classList.toggle("active");
    }
    function closeModalContainer() {
        const MODAL_CONTAINER = document.querySelector(".modal-container");
        MODAL_CONTAINER.classList.toggle("active");
    }






}