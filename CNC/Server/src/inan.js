// GET /api/Status/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var serverPort = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// CORS Fixing => Now are all Clients able to connect to the Service
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Datenbestand => Kommt noch in Datenbank?
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


app.get('/api/Status', (req, res) => {
	console.log("GET /api/Status");

	res.header("Content-Type", "text/plain");
	res.send(JSON.stringify(meinedatenbank));
});



app.get('/api/Status/:id', (req, res) => {

	var id = req.params.id || null;
	if (id !== null) {

		var consoleOutput = "GET /api/Status/" +id;
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


app.post('/api/Status', (req, res) => {
	var masterToken = 'c0724862f1aef7d1fc77488a39718b34';
	var userToken = req.get('Token') || null;

	console.log(userToken);
	if(userToken !== null){
		if(userToken === masterToken){
			console.log("Token √");
		} else {
			console.log("Wrong Token");
		}
	}

	var workloadID = req.body.id;
	var runCommand = req.body.status;

	var found = meinedatenbank.find(function(obj) {
		return obj.id == workloadID;
	});

	if(workloadID !== null && runCommand !== null){
		if(found !== undefined){
			if(runCommand === true){
				found.workload = 1;
				console.log("Workload "+workloadID+" wurde gestartet");
			} else {
				found.workload = 0;
				console.log("Workload "+workloadID+" wurde angehalten");
			}
			res.send(JSON.stringify({message: "OK"}));
		}
	} else {
		res.send(JSON.stringify({message: "Not OK"}));
	}


});

app.listen(serverPort, () => {
	console.log("Server is running √ http://localhost:"+serverPort);
});