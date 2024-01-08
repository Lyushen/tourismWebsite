document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
    clearCartButton.addEventListener("click", clearCart);

    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    // Load cart items from local storage
    loadCart();

    function addToCart(event) {
        const ticket = event.target.parentElement;
        const ticketId = ticket.getAttribute("data-id");
        const ticketName = ticket.querySelector("h2").textContent;
        const ticketPrice = parseFloat(ticket.querySelector("p").textContent.slice(8));


        //changing on adding new item we update quantity in existing list if it exists
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
 
        if (!(ticketId in cart)) {
            // Create a new cart item with data-id attribute
            const cartItem = document.createElement("li");
            cartItem.setAttribute('data-id', ticketId);
            cartItem.innerHTML = `${ticketName} - ₴${ticketPrice}`;
            cartItems.appendChild(cartItem);
        } else {
            // Update existing cart item
            const existingCartItem = document.querySelector(`#cart-items [data-id="${ticketId}"]`);
            const quantity = cart[ticketId] + 1;
            existingCartItem.innerHTML = `${ticketName} - ₴${ticketPrice} x ${quantity}`;
        }

        // Update the cart total
        const currentTotal = parseFloat(cartTotal.textContent);
        cartTotal.textContent = (currentTotal + ticketPrice).toFixed(2);

        // Save the cart to local storage
        saveCart(ticketId);
    }
    

    function saveCart(itemId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[itemId] = (cart[itemId] || 0) + 1;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            for (let itemId in cart) {
                const ticket = document.querySelector(`[data-id="${itemId}"]`);
                const ticketName = ticket.querySelector("h2").textContent;
                const ticketPrice = parseFloat(ticket.querySelector("p").textContent.slice(8));
                const quantity = cart[itemId];
    
                // Create a new cart item with data-id attribute
                const cartItem = document.createElement("li");
                cartItem.setAttribute('data-id', itemId); // Set data-id attribute
                cartItem.innerHTML = `${ticketName} - ₴${ticketPrice} x ${quantity}`;
                cartItems.appendChild(cartItem);
    
                // Update the cart total
                const currentTotal = parseFloat(cartTotal.textContent);
                cartTotal.textContent = (currentTotal + ticketPrice * quantity).toFixed(2);
            }
        }
    }
    
    function clearCart() {
        // Clear the visual representation of the cart
        cartItems.innerHTML = '';

        // Reset the cart total
        cartTotal.textContent = '0.00';

        // Clear the cart from local storage
        localStorage.removeItem("cart");
    }
});