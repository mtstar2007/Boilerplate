var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require("body-parser");
var arrStatus = [];
var arrTasks = [];
var allowedtoken = '321fdfbda11ed5a87bf30ce14606d384';

// Ohne die hier geht es nicht :)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//////////

app.use(cors());
console.log('Server gestartet...')


app.get('/api/Status', (req, res) => {
    console.log('request!')
	
	fs.readFile('status.txt', (err, data)=>  {
		if(err) throw err;	
		
		arrStatus = JSON.parse(data.toString());
		res.json(arrStatus);
	});
});


app.get('/api/tasks', (req, res) => {
    console.log('request!')
		
	fs.readFile('tasks.txt', (err, data)=>  {
		if(err) throw err;	
		
		arrTasks = JSON.parse(data.toString());
		res.json(arrTasks);
		
	});
}); 


app.post('/api/tasks', (req, res) => {
	console.log('post-request!');
	var newtask = req.body;
	var postedTokenAllowed = req.get('Token') == allowedtoken;

	console.log(newtask);
	console.log(req.body);
	
	if(postedTokenAllowed) {
		console.log('Post mit Token: ' + allowedtoken);
		console.log('Token allowed: ' + postedTokenAllowed);
		
		console.log('new: ' + newtask);
		arrTasks.push(newtask);
		
		console.log(arrTasks);	// test ob eingetragen
		
		fs.writeFile('tasks-test.txt', arrTasks, (err) => {
		if (err) throw err;
			console.log("Neuer Eintrag in Tasks.txt"); 
		});
		
		//res.send(JSON.stringify({message: "OK"}));
		
	} else {
		console.log('Token not allowed');
	}		
		
});


app.listen(3000);
