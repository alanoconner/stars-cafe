const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
// configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));





// create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alnukod1993',
    database: 'starsCafe'
});

// connect to MySQL
connection.connect();

// handle POST request to /set-order
app.post('/set-order', (req, res) => {
    const { Id ,OrderId ,ItemName, Temp, Size, Quantity, TotalPrice, Price, Place } = req.body;
    console.log(req.body);
    var now = new Date();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    // insert the user data into the database
    const sql = `INSERT INTO orderList (Id, OrderId, ItemName, Temp, Size, Quantity, TotalPrice, Price, Place, OrderTime)
                VALUES ('${Id}','${OrderId}', '${ItemName}', '${Temp}', '${Size}', '${Quantity}','${TotalPrice}', '${Price}','${Place}', '${time}')`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        console.log(`New order added: ${ItemName} `);
        // res.send('Order added successfully');
    });
});

app.get('/get-order', (req, res) => {

    const sql="select * from items";


    connection.query(sql, (error, results) => {
        if (error) {
            throw error;
        }

        // Send the retrieved data as a response
        res.json(results);
    });

});





// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

