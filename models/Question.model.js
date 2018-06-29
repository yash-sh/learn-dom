// require npm packages
var mongoose = require("mongoose");
// question schema
var questionSchema = new mongoose.Schema({
    ques: String,
    ans: String,
    codeNames: {type: Array, "default": []},
    codes: {type: Array, "default": []}
});
// export post schema to use in main app
module.exports = mongoose.model("Question", questionSchema);