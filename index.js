var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var mysqldb = require('mysql')

var app = express()
app.use(cors())
app.use(bodyParser.json())

var connection = mysqldb.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    port:3306,
    database:"angular_assignment"
})

app.get("/getAllProducts", (req, res)=>{
    connection.query("select * from products", (err, resultset)=>{
        res.json(resultset)
        res.end();
    })
})
app.post("/createProduct", (req, res)=>{
    var query = "insert into products(productname, productprice, productimage) VALUES(?, ?, ?)"
    connection.query(query, [req.body.prdtName, req.body.prdtPrice, req.body.prdtImg], (err, resultset)=>{       
        console.log(resultset.affectedRows)
        if(resultset.affectedRows >= 1) res.send({"status":"success"})
        else res.send({"status":"failed"})        
        res.end()
    })
})
app.listen(1234)