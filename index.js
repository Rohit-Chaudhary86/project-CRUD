let express = require("express");
const { dbConnection } = require("./dbConnection");
const { ObjectId } = require("mongodb");

let app = express();
app.use(express.json());

app.get("/student-read", async (req, res) => {
  let myDB = await dbConnection();
  let studentCollection = myDB.collection("students");
  let data = await studentCollection.find().toArray();

  let resObj = {
    status: 1,
    msg: "Student list",
    data,
  };
  res.send(resObj);
});

app.post("/student-insert", async (req, res) => {
  let myDB = await dbConnection();
  let studentCollection = myDB.collection("students");

  let obj = {
    sName: req.body.sName,
    sEmail: req.body.sEmail,
  };
  console.log(obj);

  let insertRes = await studentCollection.insertOne(obj);

  let resObj = {
    status: 1,
    msg: "data inserted succesfully",
    insertRes,
  };

  res.send(resObj);
});

app.delete("/student-delete/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let myDB = await dbConnection();
  let studentCollection = myDB.collection("students");

  let objId = new ObjectId(id); // Convert the id to ObjectId type for MongoDB

  let deleteRes = await studentCollection.deleteOne({ _id: objId });

  if (deleteRes.deletedCount === 1) {
    res.send({
      status: 1,
      msg: `Student with ID ${id} deleted successfully`,
    });
  } else {
    res.send({
      status: 0,
      msg: `No student found with ID ${id}`,
    });
  }
});

app.put("/student-update/:id", async (req, res) => {
  console.log("update working");
  let myDB = await dbConnection();
  let studentCollection = myDB.collection("students");

  let { id } = req.params;
  let{sName,sEmail}=req.body;
  let obj={sName,sEmail};
  
  let updateRes=await studentCollection.updateOne(
    {
        _id:new ObjectId(id)},
        {
            $set:{
              sName,
              sEmail
            }
        })
   let resObj={
     status:1,
     msg:"updated succesfully",
     updateRes
   }
   res.send(resObj)
});

app.listen("7000", () => {
  console.log("server is running on port 7000");
});
