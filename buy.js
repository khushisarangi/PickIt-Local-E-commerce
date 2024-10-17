const cartItems = document.getElementById("cart-items");
function bargin(){
  confirm("Are you sure we should bargin");
}
function addToCartt() {
    // Check if the user is logged in
    const isLoggedIn = confirm("Are you sure we should conform?");

    if (isLoggedIn) {
        // Prompt the user to allow their current location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const Item1 = document.getElementById("item1");
                const cartItem = document.createElement("li");
                cartItem.className = "cart-item";
                cartItem.textContent = `${Item1.textContent} - 60`;
               
                cartItems.appendChild(cartItem);
            });
        } else {
            alert("Geolocation is not supported in your browser.");
        }
    } else {
        alert("You canceled the login. Product was not added to the cart.");
    }
}
function addToCart2() {
    // Check if the user is logged in
    const isLoggedIn = confirm("Are you sure we should conform?");

    if (isLoggedIn) {
        // Prompt the user to allow their current location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const Item2 = document.getElementById("item2");
                const cartItem = document.createElement("li");
                cartItem.className = "cart-item";
                cartItem.textContent = `${Item2.textContent} - 150`;
               
                cartItems.appendChild(cartItem);
            });
        } else {
            alert("Geolocation is not supported in your browser.");
        }
    } else {
        alert("You canceled the login. Product was not added to the cart.");
    }
}
function addToCart3() {
    // Check if the user is logged in
    const isLoggedIn = confirm("Are you sure we should conform?");

    if (isLoggedIn) {
        // Prompt the user to allow their current location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const Item3 = document.getElementById("item3");
                const cartItem = document.createElement("li");
                cartItem.className = "cart-item";
                cartItem.textContent =` ${Item3.textContent} - 50`;
               
                cartItems.appendChild(cartItem);
            });
        } else {
            alert("Geolocation is not supported in your browser.");
        }
    } else {
        alert("You canceled the login. Product was not added to the cart.");
    }
}