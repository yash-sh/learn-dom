var request = require("request");
var express = require("express");
var app 	= express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/",function(req,res){
	
	var query = Number(req.query.page);
		if (isNaN(query)){query=1;}
		query--;query*=40;
	var pageno= query/40;
		pageno++;
	
	if (pageno<650 && pageno>0)
		{var url = "https://wrapapi.com/use/yash/bitcoin/access/0.0.3?board=159."+query+"&wrapAPIKey=vtPtMUS0XvvakbnYsWimo8YiEQSuQCvH";
	} else {var url ="https://wrapapi.com/use/yash/bitcoinorg/accessing/0.0.3?board=159."+query+"&wrapAPIKey=vtPtMUS0XvvakbnYsWimo8YiEQSuQCvH";}
	request(url, function(error, response ,body){
  
   if(!error && response.statusCode == 200)
		{ var result = JSON.parse(body);
			
			if(pageno <=0){res.send("404 URL NOT FOUND");}		
		}
		res.render("home", {result:result,pageno:pageno});});
	});

app.get("*",function(req,res){res.send("404 URL NOT FOUND");});

app.listen(8800,function(){console.log("Server Started!!");});