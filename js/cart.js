console.log(localStorage);
let shoppingCart_deserialized = JSON.parse(localStorage.getItem("cart-array"));
console.log(shoppingCart_deserialized);


const INVENTORY = [
    {
        productId: 0001,
        name: "Stuffed Oreo Cupkay",
        imgSrc: "images/stuffed-oreo.jpg",
        price: 26
    },
    {
        productId: 0002,
        name: "Stuffed Reese's Cupkay",
        imgSrc: "images/reeses-cup.jpg",
        price: 26
    },
    {
        productId: 0003,
        name: "Strawberry Special",
        imgSrc: "images/strawberry-special.jpg",
        price: 22
    },
    {
        productId: 0004,
        name: "Dulce de Leche",
        imgSr: "images/banana-nut.jpg",
        price: 28,
    }
]