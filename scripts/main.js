const coffeeCorner = document.getElementById("coffee-corner")


// Fetch items from DB
// fetch('http://localhost:3000/get-order')
// .then(response => response.json())
// .then(orderData => {
//             // Handle the order data here
//             console.log('Retrieved orders:', orderData);

//             for (var item of orderData) {
//               coffeeCorner.innerHTML += `
//                 <li>
//                   <button class="product-button" id="product-button-${item.Id}">
//                     <div class="item-id" item-id="0${item.Id}">
//                       <img src="https://via.placeholder.com/150" alt="Coffee">
//                       <div class="button-content">
//                         <h3 class="pop-up-header">${item.name}</h3>
//                         <p class="description">${item.description}</p>
//                         <p class="price">${item.price}</p>
//                       </div>
//                     </div>
//                   </button>
//                 </li>`;
//               }
//             })
// .catch(error => console.error(error));

//


const productButtons = document.querySelectorAll("[id^='product-button-']");
const popupContainer = document.getElementById("insert-cart-container");
const closeButton = document.getElementById("close-button");
const cartButton = document.getElementById("cart-button");
var quantityInput = document.getElementById('quantity');
let _itemId;
let coffeeName;
let _price;



for (let i = 0; i < productButtons.length; i++) {
  productButtons[i].addEventListener("click", function() {

    popupContainer.style.display = "block";

    coffeeName = productButtons[i].querySelector(".pop-up-header").textContent;

    _itemId = productButtons[i].querySelector('.item-id').getAttribute('item-id');
    console.log(_itemId);

    _price = productButtons[i].querySelector(".price").textContent;
    
    popupContainer.querySelector("#set-pop-up-header").innerHTML = coffeeName;
    popupContainer.querySelector(".insert-cart-content").setAttribute('item-id',_itemId);
    popupContainer.querySelector(".insert-cart-content").setAttribute('price', _price);

    var script = document.createElement("script");
    script.src = "../scripts/addToCart.js";
    document.head.appendChild(script);

  });
};

closeButton.addEventListener("click",  function() {
    popupContainer.style.display = "none"
});


//--------------------------------


function increment() {
  quantityInput.value++;
}

function decrement() {
  if (quantityInput.value > 0) {
    quantityInput.value--;
  }
}

quantityInput.addEventListener('change', function() {
  if (quantityInput.value < 1) {
    quantityInput.value = 1;
  }
});




cartButton.addEventListener('click', function (){

  if (localStorage.getItem("cart")){
    window.location.href = "127.0.0.1:5500/stars-cafe/pages/cart.html";
  }
})


// Function to update the cart counter
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemCounter = document.querySelector('.item-counter');
  itemCounter.textContent = cart.length;
}

// Call the function to update the counter when the page loads
updateCartCounter();





