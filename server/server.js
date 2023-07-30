const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');


const pool = new pg.Pool({
             host: 'localhost',
             port: 5432,
             database: 'weekend-to-do-app', 
         });
//const PORT = process.env.PORT || 5000;
//const toDoRouter = require('./routes/toDo.router.js')
//const pool = require('./modules/pool')

const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//app.use('/toDoItems', pool) 


app.get ('/toDoItems', (req, res) => {
         console.log('in toDoItems GET');
    
         const query = `SELECT * FROM "toDoItems" ORDER BY "id";`;
    
         pool.query (query)
        .then( (results) => {
             console.log('toDoRouter is working')
            res.send(results.rows);
         })
         .catch( (err) =>{
             console.log('Error with GET', err);
             res.sendStatus( 500 );
         })  
     }
)

app.post( '/toDoItems', ( req, res ) => {
    console.log( 'in /toDoItems POST:', req.body);

    const query = `INSERT INTO "toDoItems" ("itemName", "itemDone") VALUES ( $1, $2);`;

    const values = [req.body.itemName, req.body.itemDone];

    pool.query( query, values ).then( results => {
        res.sendStatus( 201 );
    }).catch( (err) => {
        console.log('Error with INSERT:', err);
        res.sendStatus(500);
    })
})

app.delete( '/toDoItems:id', (req, res) => {
    console.log('in DELETE hit:', req.params.id);

    const query = `DELETE FROM "toDoItems" WHERE id=$1;`;
    const values = [req.params.id];

    pool.query( query, values ).then( (response)  => {
        res.sendStatus( 200 );
    }).catch( (err) => {
        console.log
    })
})





app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });