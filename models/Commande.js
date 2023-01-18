const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CommandeSchema = new Schema({
    id: ObjectId,
    name: String,
    flag: String
})

module.exports = mongoose.model("Commande", CommandeSchema)