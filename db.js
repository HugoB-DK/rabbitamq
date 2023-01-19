const mongoose = require("mongoose")

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://ampq:password@ampq_mongodb:27017/ampq", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))