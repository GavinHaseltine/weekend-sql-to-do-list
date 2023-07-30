// const express = require('express');
// const toDoRouter = express.Router();
// const pool = require('../modules/pool');


// toDoRouter.get ('/toDoItems'), (req, res) => {
//     console.log('in toDoItems GET');

//     const query = `SELECT * FROM "toDoItems" ORDER BY "id";`;

//     pool.query (query)
//     .then( (results) => {
//         console.log('toDoRouter is working')
//         res.send(results.rows);
//     })
//     .catch( (err) =>{
//         console.log('Error with GET', err);
//         res.sendStatus( 500 );
//     })  
// }



// module.exports = toDoRouter;