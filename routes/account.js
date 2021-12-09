const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from account', (err, rows, fields) => {
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
    mysqlConn.query('select * from account', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findaccount', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findaccount(fb.Acc_no).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updateaccount', (req, res) => {
    let nwaccount = req.body;
    // console.log(fb)
    findaccount(nwaccount.Acc_no).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "account doesn't exists"
                });
            } else {
                let sql1="update account set acc_balance = ? where Acc_no = ?";
                // let sql1="update account set Acc_name = "+nwaccount.Acc_name+" where Acc_no = ?";
                mysqlConn.query(sql1,[nwaccount.acc_balance,nwaccount.Acc_no], (err, rows, fields) => {
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

router.post('/delaccount', (req, res) => {
    let nwaccount = req.body;
    // console.log(fb)
    findaccount(nwaccount.Acc_no).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "account doesn't exists"
                });
            } else {
                let sql1="delete from account where Acc_no = ?";
                // let sql1="update account set Acc_name = "+nwaccount.Acc_name+" where Acc_no = ?";
                mysqlConn.query(sql1,[nwaccount.Acc_no], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted account"});
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

const findaccount = (Acc_no) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Acc_no)
        mysqlConn.query('select * from account where Acc_no = ?', [Acc_no], (err, rows, fields) => {
            
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

router.post('/newaccount', (req, res) => {
    let nwaccount = req.body;
    // console.log(nwaccount)
    console.log(nwaccount.Acc_no)
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
            // let sql = "insert into account (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO account (Acc_no,Acc_last_access,acc_balance,acc_type,Acc_Cust_id,Acc_sav_interest,Acc_mo_mar_interest,Acc_chk_overdraft,Acc_chk_max_amt,Acc_chk_min_amt,Acc_loan_interest) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwaccount.Acc_no,nwaccount.Acc_last_access,nwaccount.acc_balance,nwaccount.acc_type,nwaccount.Acc_Cust_id,nwaccount.Acc_sav_interest,nwaccount.Acc_mo_mar_interest,nwaccount.Acc_chk_overdraft,nwaccount.Acc_chk_max_amt,nwaccount.Acc_chk_min_amt,nwaccount.Acc_loan_interest], (err, rows, fields) => {
                    if (!err) {
                    // console.log(rows.insertId);
                    // rows.userid=emp.userid;
                    res.send({"Acc_no":nwaccount.Acc_no});
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