function myBurger() {
    var burger = document.getElementById('burger');
    if(burger.className === "navbar") {
        burger.className += " responsive";
    }

    else {
        burger.className = "navbar";
    }

    var topNav = document.getElementById('topNav');
    if (topNav.className === "response") {
        topNav.classList.remove("response");
    }

    else {
        topNav.classList.add("response");

    }
}

