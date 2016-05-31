// GET /api/Tasks/

var express = require('express');
var app = express();
var serverPort = 3000;

 
// CORS Fixing => Now are all Clients able to connect to the Service
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-auth-token,Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/Tasks', (req, res) => {
	console.log("GET /api/Tasks");

	res.header("Content-Type", "text/plain");
	res.send(JSON.stringify(meinedatenbank));
});

var meinedatenbank = [{
	id: 0,
	ip: "95.215.45.239",
	task: 1,
	workload: 0.6
}, {
	id: 1,
	ip: "192.30.252.153",
	task: 0,
	workload: 1.0
},{
	id: 2,
	ip: "192.30.253.154",
	task: 0,
	workload: 1.0
}];

app.get('/api/Tasks/:id', (req, res) => {

	var id = req.params.id || null;
	if (id !== null) {

		var consoleOutput = "GET /api/Tasks/" +id;
		var found = meinedatenbank.find(function(obj) {
			return obj.id == id;
		});

		if(found === undefined) {
			consoleOutput += " => Not Found";
		} else {
			consoleOutput += " => Found";
		}

		console.log(consoleOutput);
		res.send(JSON.stringify(found));

	}

});

app.post('/api/Tasks', (req, res) => {
	var masterToken = 'c0724862f1aef7d1fc77488a39718b34';
	var userToken = req.get('Token');

	console.log(userToken);
	if(userToken !== null){
		if(userToken === masterToken){
			console.log("Token √");
		} else {
			console.log("Wrong Token");
		}
		if(userToken == masterToken){
			console.log("Oooo AAG");
		}
	}


});

app.listen(app.get('port'),function(){
	console.log('Server is ready')
});




var xhr = new XMLHttpRequest();
//var jsTokens = require("js-tokens");

var jstoken = xhr.getRequestHeader("token");
var index=null;

function checkID(id){
	
	if(id === null){
		
		var id=1;
		
	}else{
		if(){
			
		}else{
			
		}
	}
	
}



var response = [{
    id: 0,
    type: 'hash-md5',
    data: {
        input: 'woot',
        output: null // Not computed yet, String if computed
    }
}];

var data = {
	    type: 'hash-md5',
	    data: {
	        input: 'woot' // output is generated by Bots
	    }
	};