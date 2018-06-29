var express = require("express");
var app 	= express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var questions=[{quesID: "Jaiho",
				ques: "Why i am doing this?",
				ans: "sab moh maya hai...",
				codeNames:["C","JAVA","JS","PYTHON"],
				codes:["it's a C code","it's a JAVA code","it's a JS code","it's a PYTHON code"]}
				];
 var requests=["How to do the insertion sort?"," what is binary search and How to do it?"];  



app.get("/",function(req,res){
	res.render("index",{questions:questions, requests:requests})});
app.get("/new",function(req,res){
	res.render("new",{questions:questions, requests:requests})});
app.post("/add",function(req,res){
	var newquestion={  "ques": req.body.addques,
	  "quesID": req.body.addquesID,
	  "ans": req.body.addans,
	  "codeNames": [req.body.addCodeNames],
	  "codes": [req.body.addcodes]}
	  questions.push(newquestion);
	  res.redirect("/");

});

var quesnum,reqnum,editnum;
app.get("/addanothercode/:qnum",function(req,res){
	var qnum= req.params.qnum;
	quesnum=qnum;
	res.render("another",{questions:questions, requests:requests,qnum:qnum})});
app.post("/addanother",function(req,res){
	var newcodename=req.body.anothercodename;
	var newcode=req.body.anothercode;
	questions[quesnum-1].codeNames.push(newcodename);
	questions[quesnum-1].codes.push(newcode);
	  res.redirect("/");

});


app.post("/addrequest",function(req,res){
   var addnewrequest=req.body.newrequest;
   requests.push(addnewrequest);
     res.redirect("/");
});
app.get("/solve/:rnum",function(req,res){
	var rnum= req.params.rnum;
	reqnum=rnum-1;
	res.render("solve",{questions:questions, requests:requests,reqnum:reqnum})});
app.post("/solvereq",function(req,res){
	var newquestion={  "ques": req.body.addques,
	  "quesID": req.body.addquesID,
	  "ans": req.body.addans,
	  "codeNames": [req.body.addCodeNames],
	  "codes": [req.body.addcodes]}
	  requests.splice(reqnum,1);
	  questions.push(newquestion);

	  res.redirect("/");

});

app.get("/edit/:ednum",function(req,res){
	var ednum= req.params.ednum;
	editnum=ednum;
	editnum--;
	res.render("editor",{questions:questions, requests:requests,pageno:editnum})});
app.post("/edited",function(req,res){
	questions[editnum].ques=req.body.newques;
	questions[editnum].quesID=req.body.newquesID;
	questions[editnum].ans=req.body.newans;
	if(questions[editnum].codeNames.length>=2){for (var i = 0; i < questions[editnum].codeNames.length; i++) {
		questions[editnum].codeNames[i]=req.body.newCodeNames[i];
		questions[editnum].codes[i]=req.body.newcodes[i];
	}}
    if(questions[editnum].codeNames.length===1){
		questions[editnum].codeNames[0]=req.body.newCodeNames;
		questions[editnum].codes[0]=req.body.newcodes;
	}
	
	
	console.log(req.body);
	  res.redirect("/");
});
app.get("/del/del/delete",function(req,res){
res.render("delete",{questions:questions, requests:requests});
});
app.post("/del/del/deleted/request/:delreq",function(req,res){
	   var delreq = req.params.delreq;
	   requests.splice(delreq,1);
	   res.redirect("/");

});
app.post("/del/del/deleted/question/:delque",function(req,res){
	   var delque = req.params.delque;
	   questions.splice(delque,1);
	   res.redirect("/");

});
app.post("/del/del/deleted/code/:delque/:delcode",function(req,res){
	   var delque = req.params.delque;
	   var delcode = req.params.delcode;
	   questions[delque].codeNames.splice(delcode,1);
	   questions[delque].codes.splice(delcode,1);
	   res.redirect("/");

});

app.get("*",function(req,res){res.send("404 URL NOT FOUND");});

app.listen(8800,function(){console.log("Server Started!");});