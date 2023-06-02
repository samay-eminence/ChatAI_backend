const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connection = async () => {
    try {
        const dbConnect = mongoose.connect(process.env.MONGO_URI, {
            dbName: "chatBot_AI",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to DataBase");
        return dbConnect;

    } catch (error) {
        console.log("error", error);
    }
}

module.exports = connection();