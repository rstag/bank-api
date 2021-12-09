const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from acc_transaction', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send({
                "test": "values test"
            });
        }
    });
});

router.get('/all', (req, res) => {
    // console.log("/all")
    mysqlConn.query('select * from acc_transaction', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findacc_transaction', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findacc_transaction(fb.Trans_id).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/findacc_transaction_for_cust', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findacc_transaction_cust(fb.Trans_Cust_id).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

const findacc_transaction_cust = (Trans_Cust_id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Trans_Cust_id)
        mysqlConn.query('select * from acc_transaction where Trans_Cust_id = ? order by Trans_date, Trans_hour', [Trans_Cust_id], (err, rows, fields) => {
            
            if (!err) {
                
                if (rows.length > 0) {
                    // console.log(rows)
                    // pn = rows[0];
                    pn = rows;

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

router.post('/updateacc_transaction', (req, res) => {
    let nwacc_transaction = req.body;
    // console.log(fb)
    findacc_transaction(nwacc_transaction.Trans_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "acc_transaction doesn't exists"
                });
            } else {
                let sql1="update acc_transaction set Trans_amount = ? where Trans_id = ?";
                // let sql1="update acc_transaction set Trans_name = "+nwacc_transaction.Trans_name+" where Trans_id = ?";
                mysqlConn.query(sql1,[nwacc_transaction.Trans_amount,nwacc_transaction.Trans_id], (err, rows, fields) => {
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

router.post('/delacc_transaction', (req, res) => {
    let nwacc_transaction = req.body;
    // console.log(fb)
    findacc_transaction(nwacc_transaction.Trans_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "acc_transaction doesn't exists"
                });
            } else {
                let sql1="delete from acc_transaction where Trans_id = ?";
                // let sql1="update acc_transaction set Trans_name = "+nwacc_transaction.Trans_name+" where Trans_id = ?";
                mysqlConn.query(sql1,[nwacc_transaction.Trans_id], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted acc_transaction"});
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

const findacc_transaction = (Trans_id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Trans_id)
        mysqlConn.query('select * from acc_transaction where Trans_id = ?', [Trans_id], (err, rows, fields) => {
            
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

router.post('/newacc_transaction', (req, res) => {
    let nwacc_transaction = req.body;
    // console.log(nwacc_transaction)
    console.log(nwacc_transaction.Trans_id)
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
            // let sql = "insert into acc_transaction (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO acc_transaction (Trans_id,Trans_date,Trans_hour,Trans_amount,Trans_payment_mode,Trans_type,Trans_Cust_id,Trans_Acc_no,Trans_code) VALUES (?,?,?,?,?,?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwacc_transaction.Trans_id,nwacc_transaction.Trans_date,nwacc_transaction.Trans_hour,nwacc_transaction.Trans_amount,nwacc_transaction.Trans_payment_mode,nwacc_transaction.Trans_type,nwacc_transaction.Trans_Cust_id,nwacc_transaction.Trans_Acc_no,nwacc_transaction.Trans_code], (err, rows, fields) => {
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