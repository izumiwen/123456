var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./sqlite.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
router.get('/', function(req, res, next) {
    sql= "SELECT * FROM price";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});
router.post('/', (req, res) => {
    const {price, Time, name}=req.body;
    sql = "INSERT INTO price (price, Time, name) VALUES (?, ?, ?)";
    db.run(sql, [price, Time, name], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/data.html');
    return res.status(200).send('inserted');
})
module.exports = router;