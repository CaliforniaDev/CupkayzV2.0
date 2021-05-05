


window.onload = () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#nav-menu");
    const navLink = document.querySelectorAll(".nav-link");
    
    hamburger.addEventListener("click", openMobileNav);
    navLink.forEach(n => n.addEventListener("click", closeMobileMenu));

    function openMobileNav() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
    function closeMobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
}





