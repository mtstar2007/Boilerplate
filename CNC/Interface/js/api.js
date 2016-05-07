/**
*	Get Status Information from BotnetServer
*/
var getStatus = function() {

	//setTimeout(function(){
   	//	getStatus();
	//}, 100000000000);

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');

	xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Status');
	xhr.responseType = 'json';

	xhr.onload = function() {
	
		var data = xhr.response;
		if (data !== null){
			if (data instanceof Array) {

			var code = '';

			for (var d = 0, dl = data.length; d < dl; d++) {
				var entry = data[d];

				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.ip + '</td>';
				code += '<td>' + entry.task + '</td>';
				code += '<td>' + entry.workload + '</td>';
				code += '<td><button class="button" id="' + entry.id + '" onClick="toggleText(this.id);">Start</button></td>';
				code += '</tr>';

			}

			content.innerHTML = code;

			for (var d = 0, dl = data.length; d < dl; d++) {
				var entry = data[d];
				var bId = entry.id;
				if(entry.workload === 0) {
					document.getElementById(bId).innerHTML = "Start";
					document.getElementById(bId).style.background = "#4CAF50";
				} else {
					document.getElementById(bId).innerHTML = "Stop";
					document.getElementById(bId).style.background = "red";
				}
				
			}
			var date = new Date();
			document.getElementById("lastChange").innerHTML = "Letzte Aktualisierung: " + date.getDate() + "/" + (date.getMonth(1)+1) + "/" + date.getFullYear()+" Uhrzeit: " +date.getHours()+ ":"+ date.getMinutes()+ ":"+date.getSeconds();
			
		} else {
			content.innerHTML = 'Failed to load :(';
		}
	}
	
	};
	
	xhr.send(null);

};


var refreshPage = function(){
	var page = window.location.hash;

	if(page === "#tasks"){
		getTasks();
	} else {
		getStatus();
	}
};

/**
*	Get Tasks Informaton with Fetch
*/
var getTasks = function(){
	var table = document.querySelector('#tasks-overview tbody');

	fetch('http://botnet.artificial.engineering:8080/api/Tasks', {
		method: 'get'
	}).then(function(response){
		return response.json();
	}).then(function(data){
		if(data instanceof Array){
			var taskArr = data;
			var taskTable = '';
			for(var i = 0, il = data.length; i < il; i++) {
				taskTable += '<tr>';
				taskTable += '<td>' + taskArr[i].id + '</td>';
				taskTable += '<td>' + taskArr[i].type + '</td>';
				taskTable += '<td>' + taskArr[i].data.input + '</td>';
				taskTable += '<td>' + taskArr[i].data.output + '</td>';
				taskTable += '<tr>';
			}
		table.innerHTML = taskTable;
		} else {
			table.innerHTML = 'Failed to load :('
		}
	}).catch(function(err){
		console.log("No Connection to the Tasks API :(")
	});
};


