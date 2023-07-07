const { MongoClient, ObjectId } = require("mongodb");

let singleton;
async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;

}
let findAll = async (collection) => {
    const db = await connect();
    let resp = await db.collection(collection).find().toArray();
    return resp;
}
let insertOne = async (collection, objeto) => {
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}
let findOne = async (collection, _id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    console.log(obj);
    if (obj)
        return obj[0];
    return false;
}
let updateOne = async (collection, object, param)=>{
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, {$set: object});
    return result;
}
let deleteOne = async (collection, _id)=>{
    const db = await connect();
    let result = await db.collection(collection).deleteOne({'_id':new ObjectId(_id)});
    return result;
}

module.exports = { findAll, insertOne, findOne, updateOne, deleteOne }

