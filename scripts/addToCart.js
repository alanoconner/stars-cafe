var addToCartBtn = document.getElementById('add-to-cart');
var itemId = document.querySelector('.insert-cart-content').getAttribute('item-id');

var sizeShort = document.querySelector('#size-short');
var sizeGrand = document.querySelector('#size-grand');
var itemSize;

var tempHot = document.querySelector('#option-1');
var tempCold = document.querySelector('#option-2');
var itemTemp;

var itemQuantity = document.querySelector('#quantity');
var itemQuant;

var itemPrice = document.querySelector('.insert-cart-content').getAttribute('price');



addToCartBtn.addEventListener("click", function(){


    if(sizeShort.checked) {
        itemSize = sizeShort.value;
    } else {
        itemSize = sizeGrand.value;
    }

    if(tempHot.checked) {
        itemTemp = tempHot.value;
    } else {
        itemTemp = tempCold.value;
    }

    itemQuant = parseInt(itemQuantity.value);

    if (typeof(Storage) !== "undefined"){
        var cart=[];
        
        // check if there are items in the cart already
        if (localStorage.getItem("cart")) {
            // get current contents of cart
            cart = JSON.parse(localStorage.getItem("cart"));
            // check if the item is already in the cart
            var itemIndex = cart.findIndex(item => item.id === itemId && item.temp === itemTemp && item.size === itemSize && item.quantity === itemQuant && item.price === itemPrice);
            if (itemIndex > -1) {
                // update quantity of existing item
                // cart[itemIndex].quantity += itemQuant;
            } else {
                // add new item to cart
                var itemContent={
                    id: itemId,
                    name: coffeeName,
                    temp: itemTemp,
                    size: itemSize,
                    quantity: itemQuant,
                    price: itemPrice
                };
                cart.push(itemContent);
            }
        } else {
            // add new item to empty cart
            var itemContent={
                id: itemId,
                name: coffeeName,
                temp: itemTemp,
                size: itemSize,
                quantity: itemQuant,
                price: itemPrice
            };
            cart.push(itemContent);
        }
        // store updated cart in local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();

    }else{
        alert("Storage full, reload the website");
        
        localStorage.clear();

    }

    // localStorage.clear();
    console.log(JSON.parse(localStorage.getItem("cart")));

});


