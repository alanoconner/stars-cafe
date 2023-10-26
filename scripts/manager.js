document.addEventListener("DOMContentLoaded", function () {

    const orders = []; // Create an empty array to store the order data

    fetch('http://127.0.0.1:3000/get-orders')
      .then(response => response.json())
      .then(orderData => {
        // Handle the order data here
    
        for (var item of orderData) {
          orders.push({
            ID: item.Id,
            OrderID: item.OrderId,
            ItemName: item.ItemName,
            Temp: item.Temp,
            Size: item.Size,
            Quantity: item.Quantity,
            TotalPrice: item.TotalPrice,
            Price: item.Price,
            Place: item.Place,
            OrderTime: item.OrderTime
          });
        }
    
        // Once you have processed the data, create and append rows to the table
        const orderTable = document.getElementById("order-table");
    
        for (var order of orders) { // Use 'order' instead of 'order' for...in
          let row = document.createElement("tr");
          row.innerHTML = `
            <td>${order.ID}</td>
            <td>${order.OrderID}</td>
            <td>${order.ItemName}</td>
            <td>${order.Temp}</td>
            <td>${order.Size}</td>
            <td>${order.Quantity}</td>
            <td>${order.Price}</td>
            <td>${order.TotalPrice}</td>
            <td>${order.Place}</td>
            <td>${order.OrderTime}</td>
            <td><button class="complete" data-orderid="${order.ID}" data-time="${order.OrderTime}">注文完了</button></td>
          `;
          orderTable.appendChild(row);
        }
    
        console.log(orders);
    const completeButtons = document.querySelectorAll(".complete");
    completeButtons.forEach(button => {
        button.addEventListener("click", markOrderCompleted);
    });

    function markOrderCompleted(event) {
        const orderID = event.target.getAttribute("data-orderid");
        const time = event.target.getAttribute("data-time");
        // Send a request to your Node.js server to delete the order
        fetch(`http://127.0.0.1:3000/delete-order/${orderID}/${time}`, {
        method: 'DELETE',
        })
        .then(response => {
            if (response.status === 200) {
                event.target.parentElement.parentElement.remove();
            } else {
                console.error("Error marking order as completed");
            }
        })
        .catch(error => console.error(error));

        window.location.reload();
    }


      })
      .catch(error => console.error(error));
    

    
});
