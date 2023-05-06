// function conToDB(){
//
//     // Load MySQL module
//     const express = require('express');
//     const bodyParser = require('body-parser');
//     const mysql = require('mysql');
//
//     const app = express();
//
//     // Create database connection
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'alnukod1993',
//         database: 'starsCafe'
//     });
//
//
//     // Connect to database
//     connection.connect((err) => {
//         if (err) {
//           console.error('Error connecting to database: ', err);
//         } else {
//           console.log('Connected to database');
//         }
//     });
// }
//
// function setOrder(id, name, temp, size, quant) {
//
//     conToDB();
//
//     // handle POST request to /add-user
//     conToDB().app.post('/set-order', (req, res) => {
//         // const {name, email} = req.body;
//
//         let query = `INSERT INTO orderList (Id, ItemName, Temp, Size, Quantity)
//                 VALUES ('${id}', '${name}', '${temp}', '${size}', '${quant}')`;
//
//         // Execute insert query
//         conToDB().connection.query(query, (err, results) => {
//             if (err) {
//                 console.error('Error executing insert query: ', err);
//             } else {
//                 console.log('Data added to database');
//             }
//
//
//         });
//
//     })
//
//
// }
// //    EXPORT
//
// conToDB().app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });
//
//
// module.exports = {
//   conToDB: conToDB,
//   setOrder: setOrder
// }
