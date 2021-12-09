const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from loan', (err, rows, fields) => {
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
    mysqlConn.query('select * from loan', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findloan', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findloan(fb.Loan_no).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updateloan', (req, res) => {
    let nwloan = req.body;
    // console.log(fb)
    findloan(nwloan.Loan_no).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "loan doesn't exists"
                });
            } else {
                let sql1="update loan set Loan_amount = ? where Loan_no = ?";
                // let sql1="update loan set Loan_name = "+nwloan.Loan_name+" where Loan_no = ?";
                mysqlConn.query(sql1,[nwloan.Loan_amount,nwloan.Loan_no], (err, rows, fields) => {
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

router.post('/delloan', (req, res) => {
    let nwloan = req.body;
    // console.log(fb)
    findloan(nwloan.Loan_no).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "loan doesn't exists"
                });
            } else {
                let sql1="delete from loan where Loan_no = ?";
                // let sql1="update loan set Loan_name = "+nwloan.Loan_name+" where Loan_no = ?";
                mysqlConn.query(sql1,[nwloan.Loan_no], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted loan"});
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

const findloan = (Loan_no) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Loan_no)
        mysqlConn.query('select * from loan where Loan_no = ?', [Loan_no], (err, rows, fields) => {
            
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

router.post('/newloan', (req, res) => {
    let nwloan = req.body;
    // console.log(nwloan)
    console.log(nwloan.Loan_no)
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
            // let sql = "insert into loan (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO loan (Loan_no,Loan_monthly_repay,Loan_amount,Loan_type,Loan_Cust_id,Loan_Branch_id,Loan_Acc_no) VALUES (?,?,?,?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwloan.Loan_no,nwloan.Loan_monthly_repay,nwloan.Loan_amount,nwloan.Loan_type,nwloan.Loan_Cust_id,nwloan.Loan_Branch_id,nwloan.Loan_Acc_no], (err, rows, fields) => {
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