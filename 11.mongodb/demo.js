let express = require("express");
let app = express();
let MongoClient = require('mongodb').MongoClient;

//插入
app.get("/add", function (req, res) {
    // Connection URL
    const url = 'mongodb://localhost:27017';
    // Database Name
    const dbName = 'firstdemo';
    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });
    // Use connect method to connect to the server
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        db.collection('user').insertOne({
            "username": "test1",
            "password": parseInt(Math.random() * 100 + 10)
        }, function (err, result) {
            if (err) {
                console.log("插入失败");
                return;
            }
            res.send(result);
            client.close();
        });
    });
});
//查找
app.get("/find", function (req, res) {
    // Connection URL
    const url = 'mongodb://localhost:27017';
    // Database Name
    const dbName = 'firstdemo';
    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });
    // Use connect method to connect to the server
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        db.collection('user').find({}).toArray(function (err, docs) {
            console.log("Found the following records");
            res.send(docs);
            client.close();
        });
    });
});
//修改
app.get("/update", function (req, res) {
    // Connection URL
    const url = 'mongodb://localhost:27017';
    // Database Name
    const dbName = 'firstdemo';
    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });
    // Use connect method to connect to the server
    client.connect(function (err) {
        console.log("Connected successfully to server");
        const db = client.db(dbName);

        db.collection('user').updateMany({ }
            , { $set: { age : Math.random() } }, function(err, result) {
            console.log("Updated the document with the field a equal to 2");
            res.send(result);
            client.close();
          }); 
    });
});
//删除
app.get("/delete", function (req, res) {
    // Connection URL
    const url = 'mongodb://localhost:27017';
    // Database Name
    const dbName = 'firstdemo';
    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });
    // Use connect method to connect to the server
    client.connect(function (err) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
       // Remove a single document
       db.collection('user').deleteOne({name:"test"}, function(err, r) {
        res.send(r);
        client.close();
      });
    });
});
app.listen(3000,'127.0.0.1',function(){
    console.log('server run at:http://localhost:3000')
});