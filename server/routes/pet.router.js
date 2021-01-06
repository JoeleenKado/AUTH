const express = require('express');
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in users pets

//THIS IS AUTHENTICATION
// router.get('/', (req, res) => {
//     if(req.isAuthenticated() && req.user.access_level > 2) {
//     console.log('/pet GET route');
//     console.log('is authenticated?', req.isAuthenticated());
//     console.log('user', req.user);
//     let queryText = `SELECT * FROM "pet" WHERE "user_id" = $1`;
    
//     pool.query(queryText, [req.user.id]).then((result) => {
//         res.send(result.rows);
//     }).catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//     });
// }else{
//     res.sendStatus(403);
// }
// });









router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/pet GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `SELECT * FROM "pet" WHERE "user_id" = $1`;
    
    pool.query(queryText, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    console.log('/pet POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

const queryText = `INSERT INTO "pet" ("firstname", "user_id")
                    VALUES ($1, $2)`;

pool.query(query, [req.body.firstname, req.user.id])
.then((result) => {
    res.sendStatus(201)
}).catch((error) => {
    console.log(error);
    res.sendStatus(500);
    
})

    //res.sendStatus(200);
    
});

module.exports = router;
