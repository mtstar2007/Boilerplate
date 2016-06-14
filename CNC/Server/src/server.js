// GET /api/Status/

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var serverPort = 3000;
const masterToken = 'c0724862f1aef7d1fc77488a39718b34';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var counter = 0;


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


// Equal Token
function checkToken(userToken) {
	if(userToken !== null){
		if(userToken === masterToken){
			console.log("Token √");
			return true;
		} else {
			console.log("Wrong Token");
			return false;
		}
	}
}


// Datenbestand => Kommt noch in Datenbank?
var statusDatenbank = [];

app.get('/api/Status', (req, res) => {
	console.log("GET /api/Status");

	res.header("Content-Type", "text/plain");
	res.send(JSON.stringify(statusDatenbank));
});

app.get('/api/Status/:id', (req, res) => {

	var id = req.params.id || null;
	if (id !== null) {
		var consoleOutput = "GET /api/Status/" +id;
		var found = statusDatenbank.find(function(obj) {
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

var tasksDatenbank = [];

app.get('/api/Tasks', (req, res) => {
	console.log("GET /api/Tasks");

	res.header("Content-Type", "text/plain");
	res.send(JSON.stringify(tasksDatenbank));
});

app.post('/api/Tasks', (req,res) => {
	var userToken = req.get('Token') || null;
	var request = req.body;
	var allowedTypes = ["hash-md5","hash-sha256","crack-md5"];
	var allowed = allowedTypes.indexOf(request.type) > -1;
	var rights = checkToken(userToken);

	console.log("Create a new Task");
	if(rights){
		if(allowed) {
			if(request.id !== undefined) { // ID wird übergeben

			var checkID = tasksDatenbank.find(function(obj) {
				return obj.id == request.id;
			});

			// Wenn ID angegeben aber nicht existiert
			if(checkID === undefined) {
				res.send(JSON.stringify({message: "Not OK"}));
				return;
			} else { // ID existiert ==> Modifizierung
				
				var sendid = {
                   type:request.type,
                   data:{ input:request.data.input,
                          output:request.data.output
                   },
                   id:request.id
      			};
				
				for (var i = 0; i < tasksDatenbank.length; i++) {
          			if(tasksDatenbank[i].id==request.id) {
            			tasksDatenbank[i]=sendid;
          			}
        		}
				res.send(JSON.stringify({message: "OK"}));
				}
			} else { // Keine ID angeben ==> Neue Task
				request.id = counter;
				request.data.output = 'null';
				counter++;
				tasksDatenbank.push(request);
				res.send(JSON.stringify({message: "OK"}));
			}
		} else {
			res.send(JSON.stringify({message: "Not OK"}));
		}
	} else {
		res.send(JSON.stringify({message: "Not OK"}));
	}

	fs.writeFile('./tasks.txt', JSON.stringify(tasksDatenbank), function(err) {
		if(err) throw err;
		console.log("Tasks Datenbank wurde aktualisiert");
	});
});


app.post('/api/Status', (req, res) => {
	var userToken = req.get('Token') || null;
	var workloadID = req.body.id;
	var runCommand = req.body.status;
	rights = checkToken(userToken);

	var found = statusDatenbank.find(function(obj) {
    console.log(obj.id == workloadID);
    return obj.id == workloadID;
	});

	if(rights) {
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
	} else {
		res.send(JSON.stringify({message: "Not OK"}));
	}

	fs.writeFile('./status.txt', JSON.stringify(statusDatenbank), function(err) {
		if(err) throw err;
		console.log("Status Datenbank wurde aktualisiert");
	});
});

function getFilesizeInBytes(filename) {
	var stats = fs.statSync(filename);
	var fileSizeInBytes = stats["size"];
	return fileSizeInBytes;
}

app.listen(serverPort, () => {
	console.log("Server is running on http://localhost:"+serverPort + " √");

	fs.readFile('./tasks.txt', (err, data) => {

	if (err) throw err;
		if(getFilesizeInBytes('./tasks.txt') !== 0) {
			tasksDatenbank = JSON.parse(data.toString('utf8'));
			counter = tasksDatenbank.length;
		}
	});

	fs.readFile('./status.txt', (err, data) => {

	if (err) throw err;
		if(getFilesizeInBytes('./status.txt') !== 0) {
			statusDatenbank = JSON.parse(data.toString('utf8'));
		}
	});
});
