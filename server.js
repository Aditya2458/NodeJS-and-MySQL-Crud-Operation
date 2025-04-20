'use strict'; 
const express = require("express");
require('dotenv').config();
const app = express();
var bodyparser = require("body-parser");

app.set("view engine","ejs");


const connection = require("./config/db"); 
const { name } = require("ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

app.get("/",(req, res) => {
    res.redirect("/create.html")
});

app.get("/update-data", (req,res) =>{
 connection.query("select * from crud_table where id =?", [req.query.id], (err,eachrow)=>{
    if (err) {
        console.log(err);
    } else{
         var result = JSON.parse(JSON.stringify(eachrow[0]));
        console.log(result);
        res.render("edit.ejs",{result});
    }
 })
})



app.get("/delete-data",(req,res)=>{
const deletequery = "delete from crud_table where id=?";

connection.query(deletequery,[req.query.id],(err,rows)=>{
    if(err){
        console.log(err);
    }else{
        res.redirect("/data");
    }
});

});




app.get("/data",(req,res)=> {
    connection.query("select * from crud_table",(err,rows) =>{
        if (err){
            console.log(err);
        } 
        else{
            res.render("read.ejs",{rows});
           
        }
        
        
    })
})

app.post("/final-update",(req,res)=>{
    const id = req.body.hidden_id;
    console.log(req.body);
    var name =req.body.name;
    var email =req.body.email;

    var updatequery = "update crud_table set name=?,email=? where id=?";
try {
 connection.query(updatequery,[name,email,id],(err,rows)=>{
    if (err){
       console.log(err);
    }
    else {
        res.redirect("/data")
    }
});
} catch (err) {
    console.log(err);
}
});






















app.post("/create",(req,res)=>{
    console.log(req.body);
    const name =req.body.name;
    const email =req.body.email;
try {
 connection.query("INSERT into crud_table (name,email)values(?,?)"
    ,[name,email],(err,rows)=>{
    if (err){
       console.log(err);
    }
    else {
        res.redirect("/data")
    }
});

    
} catch (error) {
    console.log(err);
}
})

app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log(`server running on ${process.env.PORT || 4000}`);
});
