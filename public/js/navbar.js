function displayNavbarMobile() {
    let burgerNavbar = document.getElementById("burger-navbar") // .classList.add("is-active");
    let navbar = document.getElementById("navbar"); // .classList.add("is-active");

    burgerNavbar.classList.toggle("is-active");
    navbar.classList.toggle("is-active");
}

function toggleModal() {
    let modal = document.getElementById("modal");
    modal.classList.toggle('is-active');
}