const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from overdraft', (err, rows, fields) => {
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
    mysqlConn.query('select * from overdraft', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findoverdraft', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findoverdraft(fb.Acc_no).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updateoverdraft', (req, res) => {
    let nwoverdraft = req.body;
    // console.log(fb)
    findoverdraft(nwoverdraft.Acc_no).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "overdraft doesn't exists"
                });
            } else {
                let sql1="update overdraft set Od_Acc_no = ? where Acc_no = ?";
                // let sql1="update overdraft set Od_name = "+nwoverdraft.Od_name+" where Acc_no = ?";
                mysqlConn.query(sql1,[nwoverdraft.Od_Acc_no,nwoverdraft.Acc_no], (err, rows, fields) => {
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

router.post('/deloverdraft', (req, res) => {
    let nwoverdraft = req.body;
    // console.log(fb)
    findoverdraft(nwoverdraft.Acc_no).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "overdraft doesn't exists"
                });
            } else {
                let sql1="delete from overdraft where Acc_no = ?";
                // let sql1="update overdraft set Od_name = "+nwoverdraft.Od_name+" where Acc_no = ?";
                mysqlConn.query(sql1,[nwoverdraft.Acc_no], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted overdraft"});
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

const findoverdraft = (Acc_no) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Acc_no)
        mysqlConn.query('select * from overdraft where Acc_no = ?', [Acc_no], (err, rows, fields) => {
            
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

router.post('/newoverdraft', (req, res) => {
    let nwoverdraft = req.body;
    // console.log(nwoverdraft)
    console.log(nwoverdraft.Acc_no)
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
            // let sql = "insert into overdraft (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO overdraft (Acc_no,Od_Acc_no,Od_max_amt,Od_min_amt) VALUES (?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwoverdraft.Acc_no,nwoverdraft.Od_Acc_no,nwoverdraft.Od_max_amt,nwoverdraft.Od_min_amt], (err, rows, fields) => {
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