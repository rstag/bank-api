const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from employee', (err, rows, fields) => {
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
    mysqlConn.query('select * from employee', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findemployee', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findemployee(fb.E_id).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updateemployee', (req, res) => {
    let nwemployee = req.body;
    // console.log(fb)
    findemployee(nwemployee.E_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "employee doesn't exists"
                });
            } else {
                let sql1="update employee set E_ssn = ? where E_id = ?";
                // let sql1="update employee set E_name = "+nwemployee.E_name+" where E_id = ?";
                mysqlConn.query(sql1,[nwemployee.E_ssn,nwemployee.E_id], (err, rows, fields) => {
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

router.post('/delemployee', (req, res) => {
    let nwemployee = req.body;
    // console.log(fb)
    findemployee(nwemployee.E_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "employee doesn't exists"
                });
            } else {
                let sql1="delete from employee where E_id = ?";
                // let sql1="update employee set E_name = "+nwemployee.E_name+" where E_id = ?";
                mysqlConn.query(sql1,[nwemployee.E_id], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted employee"});
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

const findemployee = (E_id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(E_id)
        mysqlConn.query('select * from employee where E_id = ?', [E_id], (err, rows, fields) => {
            
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

router.post('/newemployee', (req, res) => {
    let nwemployee = req.body;
    // console.log(nwemployee)
    console.log(nwemployee.E_id)
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
            // let sql = "insert into employee (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO employee (E_id,E_ssn,E_name,E_telephone,E_start_date,E_length_emp,Branch_id) VALUES (?,?,?,?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwemployee.E_id,nwemployee.E_ssn,nwemployee.E_name,nwemployee.E_telephone,nwemployee.E_start_date,nwemployee.E_length_emp,nwemployee.Branch_id], (err, rows, fields) => {
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