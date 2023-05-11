import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/sarpras-app");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error."));
db.once("open", () => {
    console.log("MongoDB connection is established.");
});

export default db;