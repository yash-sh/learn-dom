var port  = process.env.PORT || 3088,
    dburi = process.env.DBURI || "mongodb://localhost/code_post";
// require npm packages
// require npm packages
var bodyParser       = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();
// require models
var Question = require("./models/Question.model");
	Request  = require("./models/Request.model");
// connect to database
mongoose.connection.openUri(dburi);
// set views directory path
app.set("views", "./views");
// set templating engine to ejs
app.set("view engine", "ejs");
// host static files (public directory) with express
app.use(express.static("public"));
// use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// use express-sanitizer to sanitize request credentials
app.use(expressSanitizer());

// route to show requests and questions on home page
app.get("/", function(req, res){
	Question.find({}, function (err, allquestions){
		if(err){
			console.log(err);
		}
		Request.find({}, function (err, allrequests){
			if(err){
				console.log(err);
			}
            res.render('index', {questions: allquestions, requests: allrequests});
        });
    });
});
// route to new question form
app.get("/new", function(req, res){
	res.render("new");
});
//route to add new question
app.post("/add",function(req, res){
	Question.create({
		ques: req.body.addques,
		ans: req.body.addans,
		codeNames: [req.body.addCodeNames],
	  	codes: [req.body.addcodes]
	}, function(err, newQuestion){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    });
});
// route to show new code form
app.get("/addanothercode/:quesid",function(req, res){
	Question.findById(req.params.quesid, function(err, foundedQues){
		if(err){
			console.log(err);
		}
		res.render("another",{question: foundedQues})
	});
});
// route to add new code to question
app.post("/addanothercode/:quesid",function(req, res){
	Question.findByIdAndUpdate(req.params.quesid, {
		$push: {
			codeNames: req.body.anothercodename,
			codes: req.body.anothercode
		}
	}, function(err, updatedQues){
		if(err){
			console.log(err);
		}
		res.redirect("/");
	});
});
// route to add new request
app.post("/addrequest", function(req, res){
	Request.create({title: req.body.newrequest}, function(err, newRequest){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    });
});
// route to show solve request form
app.get("/solve/:reqid", function(req, res){
	Request.findById(req.params.reqid, function(err, foundedReq){
		if(err){
			console.log(err);
		}
		res.render("solve", {request: foundedReq});
	});
});
// route to move solved request to question
app.post("/solvereq/:reqid", function(req, res){
	Question.create({
		ques: req.body.addques,
		ans: req.body.addans,
		codeNames: [req.body.addCodeNames],
	  	codes: [req.body.addcodes]
	}, function(err, newQuestion){
        if(err){
            console.log(err);
        } else {
	        Request.findByIdAndRemove(req.params.reqid, function(err){
		        if(err){
		            console.log(err);
		        } else {
		        	res.redirect("/");
		        }
		    });
		}
	});
});
// route to show edit form for question
app.get("/edit/:quesid", function(req, res){
	Question.findById(req.params.quesid, function(err, foundedQues){
		if(err){
			console.log(err);
		}
		res.render("editor", {question: foundedQues});
	});
});
// route to update edited question
app.post("/edit/:quesid", function(req, res){
	Question.findById(req.params.quesid, function(err, foundedQues){
		if(err){
			console.log(err);
		} else {
			for(var i = 0; i < foundedQues.codeNames.length; i++){
				Question.update(
					{
						_id: foundedQues._id,
						codeNames: foundedQues.codeNames[i],
						codes: foundedQues.codes[i]
					},
					{
						$set: {
							ques: req.body.newques,
							ans: req.body.newans,
							"codeNames.$": req.body.codenames[i],
							"codes.$": req.body.codes[i]
						}
					}, function(err){
						if(err){
							console.log(err);
						}
					}
				);
			}
			res.redirect("/");
		}
	});
});
// route to show delete contents page
app.get("/del/del/delete", function(req, res){
	Question.find({}, function (err, allquestions){
		if(err){
			console.log(err);
		}
		Request.find({}, function (err, allrequests){
			if(err){
				console.log(err);
			}
            res.render('delete', {questions: allquestions, requests: allrequests});
        });
    });
});
// route to delete request
app.post("/del/del/delete/request/:reqid",function(req,res){
	Request.findByIdAndRemove(req.params.reqid, function(err){
        if(err){
            console.log(err);
        } else {
        	res.redirect("/del/del/delete");
        }
    });
});
// route to delete question
app.post("/del/del/delete/question/:quesid",function(req,res){
	Question.findByIdAndRemove(req.params.quesid, function(err){
        if(err){
            console.log(err);
        } else {
        	res.redirect("/del/del/delete");
        }
    });
});
// route to delete particular code of question
app.post("/del/del/delete/:quesid/:codenames/:codes",function(req,res){
   Question.findByIdAndUpdate(
		{
			_id: req.params.quesid
		},
		{
			$pull: {
				codeNames: req.params.codenames,
				codes: req.params.codes
			}
		}, function(err){
			if(err){
				console.log(err);
			} else {
				res.redirect("/del/del/delete");
			}
		}
	);

});
// route to show page not found error
app.get("*", function(req, res){
	res.send("404 URL NOT FOUND");
});
// listen to the port
app.listen(port, function(){
    console.log('Server started...');
});