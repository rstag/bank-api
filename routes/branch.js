const express = require('express');

const router = express.Router();
// import mysqlConn from '../services/dbUtils';
const mysqlConn = require('../services/dbUtils');

router.get('/', (req, res) => {
    mysqlConn.query('select * from branch', (err, rows, fields) => {
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
    mysqlConn.query('select * from branch', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});



router.post('/findbranch', (req, res) => {
    let fb = req.body;
    console.log(fb)
    findBranch(fb.Branch_id).then((result)=>{
        // console.log("c1"+result)
        res.send({"result":result}) 
    })
    

});

router.post('/updatebranch', (req, res) => {
    let nwbranch = req.body;
    // console.log(fb)
    findBranch(nwbranch.Branch_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "branch doesn't exists"
                });
            } else {
                let sql1="update branch set branch_name = ? where Branch_id = ?";
                // let sql1="update branch set branch_name = "+nwbranch.branch_name+" where Branch_id = ?";
                mysqlConn.query(sql1,[nwbranch.branch_name,nwbranch.Branch_id], (err, rows, fields) => {
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

router.post('/delbranch', (req, res) => {
    let nwbranch = req.body;
    // console.log(fb)
    findBranch(nwbranch.Branch_id).then((result)=>{
        // console.log("c1"+result)
            if (!result) {

                res.send({
                    "test": "branch doesn't exists"
                });
            } else {
                let sql1="delete from branch where Branch_id = ?";
                // let sql1="update branch set branch_name = "+nwbranch.branch_name+" where Branch_id = ?";
                mysqlConn.query(sql1,[nwbranch.Branch_id], (err, rows, fields) => {
                    if (!err) {
                    console.log(rows);
                    // rows.userid=emp.userid;
                    res.send({"success":" deleted branch"});
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

const findBranch = (branch_id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn=false;
        console.log(branch_id)
        mysqlConn.query('select * from branch where branch_id = ?', [branch_id], (err, rows, fields) => {
            
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

router.post('/newbranch', (req, res) => {
    let nwbranch = req.body;
    // console.log(nwbranch)
    console.log(nwbranch.Branch_id)
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
            // let sql = "insert into branch (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            let sql1="INSERT INTO branch (Branch_id,branch_name,branch_assets,branch_state,branch_city,branch_zip,branch_manager,branch_asst_manager) VALUES (?,?,?,?,?,?,?,?)";

            // mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
            mysqlConn.query(sql1, [nwbranch.Branch_id,nwbranch.branch_name,nwbranch.branch_assets,nwbranch.branch_state,nwbranch.branch_city,nwbranch.branch_zip,nwbranch.branch_manager,nwbranch.branch_asst_manager], (err, rows, fields) => {
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