// require npm packages
var mongoose = require("mongoose");
// request schema
var requestSchema = new mongoose.Schema({
   title: String
});
// export post schema to use in main app
module.exports = mongoose.model("Request", requestSchema);