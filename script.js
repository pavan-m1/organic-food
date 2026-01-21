
// ----------------------------
// CART LOADING FROM LOCALSTORAGE
// ----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ----------------------------
// ADD TO CART
// ----------------------------
function addToCart(name, price) {
  cart.push({ name: name, price: price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart 🌱");
}

// ----------------------------
// DISPLAY CART ITEMS
// ----------------------------
function displayCart() {
  let cartItems = document.getElementById("cartItems");
  let total = 0;

  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  document.getElementById("total").textContent = "Total: $" + total;
}
displayCart();

// ----------------------------
// PLACE ORDER
// ----------------------------
function placeOrder(event) {
  event.preventDefault();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let name = document.querySelector("input[placeholder='Your Name']").value;
  let address = document.querySelector("input[placeholder='Address']").value;

  let orderInfo = {
      name: name,
      address: address,
      cart: cart,
      time: new Date().toLocaleString()
  };

  fetch("http://localhost:5000/saveOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderInfo)
  })
  .then(res => res.json())
  .then(data => {
      alert("Order placed successfully! ✔");
      localStorage.removeItem("cart");
  })
  .catch(err => console.error("Error:", err));
}

// ----------------------------
// SUBMIT FEEDBACK
// ----------------------------
function submitFeedback(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let feedback = document.getElementById("feedback").value;

  let fbData = {
      name: name,
      feedback: feedback,
      time: new Date().toLocaleString()
  };

  fetch("http://localhost:5000/saveFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fbData)
  })
  .then(res => res.json())
  .then(data => {
      alert("Feedback submitted successfully! ✔");
      document.getElementById("name").value = "";
      document.getElementById("feedback").value = "";
  })
  .catch(err => console.error("Error:", err));
}

