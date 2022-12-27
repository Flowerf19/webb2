var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://Flowerf19:12345@cluster0.b0idulb.mongodb.net/?retryWrites=true&w=majority'
const { Int32, ObjectId } = require('bson')

// var MongoClient = require('mongodb').MongoC
// var url = 'mongodb+srv://Flowerf19:12345@cluster0.b0idulb.mongodb.net/GCH1003?retryWrites=true&w=majority'
// const { Int32, ObjectId } = require('bson')
// 
module.exports = MongoClient;

async function insertProduct(newProduct) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    let newId = await db.collection("products").insertOne(newProduct)
    return newId
}
async function getAllProducts() {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("products").find().toArray()
    return results
}
async function deleteProductById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}
async function updateProduct(id, name, price, picture, amount) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "pictureURL": picture, "amount": amount } })
}
async function findProductById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
    return productToEdit
}
async function searchProductByName(name){
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("products").find({ name: new RegExp(name,'i') }).toArray()
    return results
}
module.exports = {insertProduct,getAllProducts,deleteProductById,updateProduct,
    findProductById,searchProductByName}
