const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from dependent', (err, rows, fields) => {
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
    mysqlConn.query('select * from dependent', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/finddependent', (req, res) => {
    let fb = req.body;
    console.log(fb)
    finddependent(fb.Dependent_id).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updatedependent', (req, res) => {
    let nwdependent = req.body;
    // console.log(fb)
    finddependent(nwdependent.Dependent_E_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "dependent doesn't exists"
                });
            } else {
                let sql1="update dependent set Dependent_name = ? where Dependent_id = ?";
                // let sql1="update dependent set Dependent_name = "+nwdependent.Dependent_name+" where Dependent_id = ?";
                mysqlConn.query(sql1,[nwdependent.Dependent_name,nwdependent.Dependent_E_id], (err, rows, fields) => {
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

router.post('/deldependent', (req, res) => {
    let nwdependent = req.body;
    // console.log(fb)
    finddependent(nwdependent.Dependent_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "dependent doesn't exists"
                });
            } else {
                let sql1="delete from dependent where Dependent_id = ?";
                // let sql1="update dependent set Dependent_name = "+nwdependent.Dependent_name+" where Dependent_id = ?";
                mysqlConn.query(sql1,[nwdependent.Dependent_id], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted dependent"});
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

const finddependent = (Dependent_id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(Dependent_id)
        mysqlConn.query('select * from dependent where Dependent_id = ?', [Dependent_id], (err, rows, fields) => {
            
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

router.post('/newdependent', (req, res) => {
    let nwdependent = req.body;
    // console.log(nwdependent)
    console.log(nwdependent.Dependent_id)
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
            // let sql = "insert into dependent (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO dependent (Dependent_name,Dependent_age,Dependent_E_id) VALUES (?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwdependent.Dependent_name,nwdependent.Dependent_age,nwdependent.Dependent_E_id], (err, rows, fields) => {
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