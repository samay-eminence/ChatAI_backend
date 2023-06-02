let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const crawledLink= new Schema({
    total_url:{
        type:Number
    },
    url:{
        type:String
    },
    data:[{
        url:String,
        status:Number,
        characterCount:Number
    }]
},{ collection: "urls", timestamps: { createdAt: true, updatedAt: true } });
let CrawledUrl = mongoose.model("CrawledUrl", crawledLink)
module.exports = CrawledUrl;

