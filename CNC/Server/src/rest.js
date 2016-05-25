var express = require('express');
var app = express();
var parser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


app.get('/test', (req, res) => {
	res.send("CORS Actice");
});

app.get('/api/Tasks', (req, res) => {
	res.send("GET Tasks NAO");
});


app.post('/api/Tasks/:id', (req, res) => {
	console.log('Received data', req.body);
	res.json({ id: req.params.id, body: req.body });

	// Try / Catch ist auch möglich!
	// try{
	// 	x = getfromdatabase();
	// } catch(e){
	// 	x = null;
	// }
});

// Fehlerbehandlung, ansonsten Unexpected und Server muss neugestartet werden
// Fehlerbehandlung für äußere Bereiche also wenn man anstatt Try/Catch ==> Throws Exception macht
app.use(function(err, req, res, next) {
	res.json({ message: 'NOT OK'})
});

app.listen(3000);