const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from customer', (err, rows, fields) => {
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
    mysqlConn.query('select * from customer', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findcustomer', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findcustomer(fb.Cust_id).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updatecustomer', (req, res) => {
    let nwcustomer = req.body;
    // console.log(fb)
    findcustomer(nwcustomer.Cust_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "customer doesn't exists"
                });
            } else {
                let sql1="update customer set cust_ssn = ? where Cust_id = ?";
                // let sql1="update customer set cust_name = "+nwcustomer.cust_name+" where Cust_id = ?";
                mysqlConn.query(sql1,[nwcustomer.cust_ssn,nwcustomer.Cust_id], (err, rows, fields) => {
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

router.post('/delcustomer', (req, res) => {
    let nwcustomer = req.body;
    // console.log(fb)
    findcustomer(nwcustomer.Cust_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "customer doesn't exists"
                });
            } else {
                let sql1="delete from customer where Cust_id = ?";
                // let sql1="update customer set cust_name = "+nwcustomer.cust_name+" where Cust_id = ?";
                mysqlConn.query(sql1,[nwcustomer.Cust_id], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted customer"});
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

const findcustomer = (Cust_id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Cust_id)
        mysqlConn.query('select * from customer where Cust_id = ?', [Cust_id], (err, rows, fields) => {
            
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

router.post('/newcustomer', (req, res) => {
    let nwcustomer = req.body;
    // console.log(nwcustomer)
    console.log(nwcustomer.Cust_id)
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
            // let sql = "insert into customer (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO customer (Cust_id,cust_ssn,cust_state,cust_city,cust_zip,cust_street,cust_apt,Branch_id,Cust_E_id) VALUES (?,?,?,?,?,?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwcustomer.Cust_id,nwcustomer.cust_ssn,nwcustomer.cust_state,nwcustomer.cust_city,nwcustomer.cust_zip,nwcustomer.cust_street,nwcustomer.cust_apt,nwcustomer.Branch_id,nwcustomer.Cust_E_id], (err, rows, fields) => {
                    if (!err) {
                    // console.log(rows.insertId);
                    // rows.userid=emp.userid;
                    res.send({"Cust_id":nwcustomer.Cust_id});
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