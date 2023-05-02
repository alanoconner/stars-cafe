const productButtons = document.querySelectorAll("[id^='product-button-']");
const popupContainer = document.getElementById("insert-cart-container");
const closeButton = document.getElementById("close-button");
let coffeeName;

for (let i = 0; i < productButtons.length; i++) {
  productButtons[i].addEventListener("click", function() {
    console.log("pop-up");
    popupContainer.style.display = "block";
    coffeeName = productButtons[i].querySelector("#pop-up-header").textContent;
    popupContainer.querySelector("#set-pop-up-header").innerHTML = coffeeName;
  });
};

closeButton.addEventListener("click",  function() {
    popupContainer.style.display = "none"
});

