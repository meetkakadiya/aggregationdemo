const { response } = require('express')

const db = require('../index')

const User = db.collection('userData')
const Book = db.collection('bookData')

const invenotry = db.collection('inventory')
const order = db.collection('orderData');

const student = db.collection('studentData');

const Item = db.collection('item');

const addUser = async (req, res) => {

    let user = req.body

    let userData = await User.insert({ user });
    res.json({
        userData
    })
}

const addStudent = async (req, res) => {

    let studentData = await student.insert([
        {
            "_id": 4,
            "grades": [
                { "grade": 80, "mean": 75, "std": 8 },
                { "grade": 85, "mean": 90, "std": 6 },
                { "grade": 85, "mean": 85, "std": 8 }
            ]
        },
        {
            _id: 5,
            grades: [
                { grade: 80, mean: 75, std: 8 },
                { grade: 85, mean: 90, std: 5 },
                { grade: 90, mean: 85, std: 3 }
            ]
        }
    ]);
    res.json({
        studentData
    })
}

const addBook = async (req, res) => {
    let book = req.body

    let bookData = await Book.insertOne({ book })
    res.json({
        bookData
    })
}

const allUser = async (req, res) => {
    let data = await User.find({}).toArray()
    res.json({
        data
    })
}

const filterdata = async (req, res) => {

    await User.aggregate([
        { $match: { 'user.status': "A" } },
        { $group: { _id: "$user.status", total: { $sum: "$user.amount" } } }
    ]).toArray(function (err, data) {
        console.log(data)
        res.json({ data })
    })

}
const findData = async (req, res) => {

    await order.aggregate([
        // stage 1
        {
            $lookup:
            {
                from: "inventory",
                pipeline: [{
                    $match: { sku: 'pecans' }
                }],
                //   localField: "item",
                //   foreignField: "sku",
                as: "inventory_docs",
            }
        },
        // stage 2
        {
            $project: {
                item: 1, price: 1, info: {
                    item: "$order.sku", total: { $sum: "$price" }, type: { $type: "$price" }
                }
            }
        },
        // stage 3
        {
            $sort: { item: -1 }
        },
        //    {
        //        $out:"outCollection" // create new collection of all projet field
        //    }
    ]).toArray(function (err, data) {
        res.json({ data })
    })

}

const updateStudent = async (req, res) => {

    let data = await student.updateOne(
        { _id: 1, grades: 82 },
        { $set: { "grades.$": 60 } }
        // {
        //     _id: 5,
        //     grades: { $elemMatch: { grade: { $lte: 90 }, mean: { $gt: 80 } } }
        //   },
        //   { $set: { "grades.$.std" : 10 } }
    );
    res.json({ data })
}

const getstudent = async (req, res) => {
    let data = await student.find({}).toArray()
    res.json({ data })
}

const addItem = (req, res) => {

    var bulk = Item.initializeOrderedBulkOp()

    bulk.insert({ item: "abc123", defaultQty: 100, status: "A", points: 100 });
    bulk.insert({ item: "ijk123", defaultQty: 200, status: "A", points: 200 });
    bulk.insert({ item: "mop123", defaultQty: 0, status: "P", points: 0 });
    bulk.execute(function(err, data){
        // console.log(data)
        res.json({data})
    });

}

const updateBulk = (req, res) => {

    var bulk = Item.initializeOrderedBulkOp()
    bulk.find( { status: "I" } ).update( { $set: { status: "M", points: "100" } } );
    bulk.find( { item: "abc123" } ).replaceOne( { item: "abc123", status: "P", points: 100 } )

    bulk.execute(function(err, data){
        // console.log(data)
        res.json({ data})
    })

}

const itemdata = async (req, res) => {
    let data = await Item.find({}).toArray()
    res.json({data})
}

const removeBulk = (req, res) => {

    var bulk = Item.initializeOrderedBulkOp()
    bulk.find( { status: "P" } ).remove()

    bulk.execute(function(err, data){
        // console.log(data)
        res.json({ data})
    })
}




module.exports = {
    addUser, addBook, filterdata, allUser, findData, addStudent, updateStudent, getstudent, addItem, updateBulk,
    itemdata, removeBulk

}