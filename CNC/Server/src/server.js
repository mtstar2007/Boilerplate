// GET /api/Status/

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var app = express();
var serverPort = 3000;
const masterToken = 'c0724862f1aef7d1fc77488a39718b34';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var counter = 0;
var statusCounter = 0;

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

	if(rights){
		if(allowed) {
			if(request.id !== undefined) { // ID wird übergeben

			var checkID = tasksDatenbank.find(function(obj) {
				return obj.id == request.id;
			});

			// Wenn ID angegeben aber nicht existiert
			if(checkID === undefined) {
				console.log("ID angegeben, existiert aber nicht");
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
        		console.log("ID existiert => Modifizierung");
				res.send(JSON.stringify({message: "OK"}));
				}
			} else { // Keine ID angeben ==> Neue Task
				request.id = counter;
				request.data.output = 'null';
				counter++;
				tasksDatenbank.push(request);
				console.log("Neue Task");
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

/**
* POST Status
*/
app.post('/api/Status', (req, res) => {
	var userToken = req.get('Token') || null;
	var workloadID = req.body.id;
	var runCommand = req.body.status;
	rights = checkToken(userToken);

	var found = statusDatenbank.find(function(obj) {
    	return obj.id == workloadID;
	});

	if(rights) {
		if(workloadID !== null && workloadID !== undefined && runCommand !== null) {
			if(found !== undefined){
				if(runCommand === true){
					found.workload = 1;
					console.log("Workload " + workloadID + " wurde gestartet");
				} else {
					found.workload = 0;
					console.log("Workload " + workloadID + " wurde angehalten");
				}
				res.send(JSON.stringify({message: "OK"}));
			}
		} else if(workloadID == undefined) { // Neue Status erstellen
			var newStatusIP = req.body.ip || "127.0.0.1";
			var newStatusTask = req.body.task || 0;
			var newStatusWorkload = req.body.workload || 0;
			var newStatus = {
                   id: statusCounter,
                   ip: newStatusIP,
                   task: newStatusTask,
                   workload: newStatusWorkload
      		};
      		statusDatenbank.push(newStatus);
      		console.log("Neue Status wurde angelegt");
      		statusCounter++;
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
			statusCounter = statusDatenbank.length;
		}
	});
});
