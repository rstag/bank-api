const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from transaction', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send({
                "error": "values test"
            });
        }
    });
});

router.get('/all', (req, res) => {
    // console.log("/all")
    mysqlConn.query('select * from transaction', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findtransaction', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findtransaction(fb.Trans_code).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updatetransaction', (req, res) => {
    let nwtransaction = req.body;
    // console.log(fb)
    findtransaction(nwtransaction.Trans_code).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "transaction doesn't exists"
                });
            } else {
                let sql1="update transaction set Trans_name = ? where Trans_code = ?";
                // let sql1="update transaction set Trans_name = "+nwtransaction.Trans_name+" where Trans_code = ?";
                mysqlConn.query(sql1,[nwtransaction.Trans_name,nwtransaction.Trans_code], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" updated"});
                } else {
                    console.log(err.sqlMessage);

                    res.send({
                        "error": "values error "+ err.sqlMessage
                    });
                }
            });
            // res.send({"result":result}) 
        }
    })
    

});

router.post('/deltransaction', (req, res) => {
    let nwtransaction = req.body;
    // console.log(fb)
    findtransaction(nwtransaction.Trans_code).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "transaction doesn't exists"
                });
            } else {
                let sql1="delete from transaction where Trans_code = ?";
                // let sql1="update transaction set Trans_name = "+nwtransaction.Trans_name+" where Trans_code = ?";
                mysqlConn.query(sql1,[nwtransaction.Trans_code], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted transaction"});
                } else {
                    console.log(err.sqlMessage);

                    res.send({
                        "error": "values error "+ err.sqlMessage
                    });
                }
            });
            // res.send({"result":result}) 
        }
    })
    

});

const findtransaction = (Trans_code) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Trans_code)
        mysqlConn.query('select * from transaction where Trans_code = ?', [Trans_code], (err, rows, fields) => {
            
            if (!err) {
                
                if (rows.length > 0) {
                    // console.log(rows)
                    pn = rows[0];
                }
                // console.log("c2"+pn)
                resolve(pn)
            } else {
                console.log(err);
                // pn = err;
                resolve(pn)
            }
        });
    }, 3000)
   
})

router.post('/newtransaction', (req, res) => {
    let nwtransaction = req.body;
    // console.log(nwtransaction)
    console.log(nwtransaction.Trans_code)
    // findPhoneno(emp.phoneno).then((butter) => {

        // if (butter == emp.phoneno) {

            // res.send({
            //     "test": "phone already exists"
            // });
        // } else {
            let t; 
            // {
            //     t = random(16);
            //     console.log(t);
            // }
            // while (t == findUserId(t));
            // emp.userid = t;
            // emp.userid = "22";
// `senderid`, `receiverid`, `msgtxt`, `msgid`
            // let sql = "insert into transaction (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO transaction (Trans_code,Trans_desc,Trans_name,Trans_is_charged) VALUES (?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwtransaction.Trans_code,nwtransaction.Trans_desc,nwtransaction.Trans_name,nwtransaction.Trans_is_charged], (err, rows, fields) => {
                    if (!err) {
                    // console.log(rows.insertId);
                    // rows.userid=emp.userid;
                    res.send(rows);
                } else {
                    console.log(err.sqlMessage);

                    res.send({
                        "error": "values error "+ err.sqlMessage
                    });
                }
            });
        
        // return butter;
    // });
});

module.exports = router;