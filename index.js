let express=require("express");
const { dbConnection } = require("./dbConnection");

let app=express();
app.use(express.json())

app.get("/student-read",(req,res)=>{
    res.send("student view api")
})

app.post("/student-insert",async (req,res)=>{
    let myDB=await dbConnection();
    let studentCollection=myDB.collection("students")

    let obj={
        sName:req.body.sName,
        sEmail:req.body.sEmail
    }
    console.log(obj)

    let insertRes=await studentCollection.insertOne(obj);

    let resObj={
        status:1,
        msg:"data inserted succesfully",
        insertRes
    }

    res.send(resObj)
})
app.listen("7000",()=>{
    console.log("server is running on port 7000");
    
})