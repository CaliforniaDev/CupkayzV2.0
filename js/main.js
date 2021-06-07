


window.onload = () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#mobile-nav-menu");
    const navOverlay = document.querySelector(".nav-overlay");
    const navLink = document.querySelectorAll(".nav-link");
 
    
    hamburger.addEventListener("click", openMobileNav);
    navLink.forEach(n => n.addEventListener("click", closeMobileMenu));
    emailInput.addEventListener("click", selectText);

    function openMobileNav() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        navOverlay.classList.toggle("active");
    }
    function closeMobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        navOverlay.classList.toggle("active");
    }
}





