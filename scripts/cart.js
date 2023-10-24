const cartItems = JSON.parse(localStorage.getItem("cart"));
const cartItemsElement = document.getElementById("items");
const cartTotalElement = document.getElementById("total");
const cartOrderPlace = document.getElementById("order-place");
/////

const orderBtn = document.getElementById('order-button');
const cancelBtn = document.getElementById('cancel-button');

/////


//Return if number of items == 0
if(cartItems.length===0){
    window.location.href= 'http://3.112.118.227/stars-cafe/pages/index.html';
}
//

///// clear current cart items

cartItemsElement.innerHTML = "";

// add each item to cart items element
let delBtnId=0;
cartItems.forEach(item => {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item")
    itemElement.setAttribute("id", item.id);
    itemElement.innerHTML = `
    <div class="item-content">
    <img src = "../components/coffee-icon.svg">
    <div class = "item-info">
        <h3>${item.name}</h3>
        <p>てんぷ: ${item.temp}</p>
        <p>サイズ: ${item.size}</p>
        <p>数量: ${item.quantity}</p>
        <p>小計: ${item.price}</p>
    </div>
    </div>
    <button class="delete-button" id="delete-button-${delBtnId}">削除</button>`;
    delBtnId++;
    cartItemsElement.appendChild(itemElement);
});



// calculate total price and update cart total element
const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
let totalElement = document.createElement("div");
totalElement.classList.add("total");

totalElement.innerHTML = `
                    <h2>合計:&nbsp; </h2>
                    <h2>&nbsp; ${totalPrice}　円</h2>`

cartTotalElement.appendChild(totalElement);



// Order Place

const orderPlace = document.createElement("div");
orderPlace.classList.add("order-place");
orderPlace.innerHTML=`
                <label for="place-select">受け取りオプション選択:</label>

                <select name="places" id="place-select" required>
                    <option value="none">選択してください</option>
                    <option value="takeout">Take Out</option>
                    <option value="Cafeteria">Cafeteria</option>

                </select>`   ;

cartOrderPlace.appendChild(orderPlace);
//


//Items DELETE Button
let delBtn = document.querySelectorAll("[id^='delete-button-']");

for (let l = 0; l < delBtn.length; l++) {
    delBtn[l].addEventListener('click', function (){
        let parentDiv = delBtn[l].parentNode;
        let parentDivId = parentDiv.id;
        console.log(cartItems);
        for(let i = 0; i<cartItems.length;i++){
            console.log(cartItems[i].name);
            if(cartItems[i].id===parentDivId){
                console.log(cartItems[i].name+"DEL");
                cartItems.splice(i,1);
                localStorage.setItem("cart", JSON.stringify(cartItems));
            }
        }

        window.location.reload();
    });
}

//


orderBtn.addEventListener("click", function(){
    //Creating unique orderID
    let orderId = cartItems[0].id+cartItems[0].temp.charAt(0)+cartItems[0].size.charAt(0)+getRandomArbitrary(1,1000).toString();
    //

    //Getting an Order Place
    let place = document.getElementById('place-select').value;
    //

    // console.log(cartItems);
    if(place!=='none'){
        cartItems.forEach(item => {

            fetch('http://3.112.118.227:3000/set-order', {
                method:'POST',
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `Id=${encodeURIComponent(parseInt(item.id))}&OrderId=${orderId}&ItemName=${item.name}&Temp=${item.temp}&Size=${item.size}&Quantity=${item.quantity}&TotalPrice=${totalPrice}&Price=${parseInt(item.price)}&Place=${place}`

            })
                .then(response => response.text())
                .then(data => {alert(data);})
                .catch(error => console.error(error));
        });

        localStorage.clear();
        alert("注文受け取りました、注文番号："+orderId);
        window.location.href= 'http://3.112.118.227/stars-cafe/pages/index.html';

    } else {
        alert("受け取り方法を選択してください");
    }

})

cancelBtn.addEventListener("click", function(){
    localStorage.clear();
    window.location.href= 'http://3.112.118.227/stars-cafe/pages/index.html';
})


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

    


