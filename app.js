const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.PORT || 3000;


// app.use(require('./routes/register'));
app.use('/branch', require('./routes/branch'));
app.use('/employee', require('./routes/employee'));
app.use('/customer', require('./routes/customer'));
app.use('/account', require('./routes/account'));
app.use('/transaction', require('./routes/transaction'));
app.use('/acc_transaction', require('./routes/acc_transaction'));
app.use('/loan', require('./routes/loan'));
app.use('/dependent', require('./routes/dependent'));
app.use('/overdraft', require('./routes/overdraft'));

app.get('/', (req, res) => {
    res.send({
        "status": "server started"
    });
});

app.listen(port, () =>
    console.log(`server started on port ${port}!`)
);