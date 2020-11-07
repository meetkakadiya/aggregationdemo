var MongoClient = require('mongodb').MongoClient;
// let {dirPath} = require('../config');
// require('dotenv').config({path: dirPath + '/.env'});

// console.log("process.env",process.env);



// Connection URL
// console.log("mongoUrl>>",mongoUrl);
var url = "mongodb://localhost:27017/"
exports.connection = () => {
    return new Promise(async (resolve, reject) => {
        await MongoClient.connect(url,{ useUnifiedTopology: true }, (err, client) => {
            if (err) console.log("error", err);
            console.log("Connected correctly to database");
            var db = client.db('testdb');
            resolve(db);
        });
    })
}
// Use connect method to connect to the database
