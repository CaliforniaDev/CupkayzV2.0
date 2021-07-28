window.onload = init;

function init() {
    const PRODUCT_CARD = document.querySelectorAll(".card");
    const PRODUCT_IMAGE = document.querySelector(".modal-box__img-container > img").src;
    addClickListener()
    const MODAL_BOX = {
        name: "hello",
    };

    function addClickListener() {
        for(let i = 0; i < PRODUCT_CARD.length; i++) {
            PRODUCT_CARD[i].addEventListener("click", openModalBox);
            console.log("hello World");
        }
    }
    function openModalBox(event) {
        let item = event.currentTarget;
        console.log(item);
        //itemName = item.querySelector("")
        let imageSource = item.querySelector(".card__image-container > img").src;
        console.log(imageSource);
    }

    // function ModalBox(imgSrc, name, detail, price)






}