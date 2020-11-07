const { response } = require('express')

const db = require('../index')

const User = db.collection('userData')
const Book = db.collection('bookData')

const invenotry = db.collection('inventory')
const order = db.collection('orderData');

const addUser = async (req, res) => {

    let user = req.body

    let userData = await User.insert({ user });
    res.json({
        userData
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
        {
            $project: {
                item: 1, price: 1, info: {
                    item: "$order.sku", total: { $sum: "$price" }, type: { $type: "$price" }
                }
            }
        },
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





module.exports = {
    addUser, addBook, filterdata, allUser, findData

}