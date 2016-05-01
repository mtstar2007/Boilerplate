/**
*	Get Status Information from BotnetServer
*/

var iii;
var getStatus = function() {

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');

	xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Status');
	xhr.responseType = 'json';
	
	xhr.onload = function() {
	
		var data = xhr.response;
		iii = data;
		if (data instanceof Array) {

			var code = '';

			for (var d = 0, dl = data.length; d < dl; d++) {
				var entry = data[d];

				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.ip + '</td>';
				code += '<td>' + entry.task + '</td>';
				code += '<td>' + entry.workload + '</td>';
				code += '<td><button class="button" id="button_id' + entry.id + '" onClick="toggleText(this.id);">Start</button></td>';
				code += '</tr>';

			}
			var date = new Date();
			document.getElementById("lastChange").innerHTML = "Letzte Aktualisierung: " + date.getDate() + "/" + (date.getMonth(1)+1) + "/" + date.getFullYear()+" Uhrzeit: " +date.getHours()+ ":"+ date.getMinutes()+ ":"+date.getSeconds();
			content.innerHTML = code;
		} else {
			content.innerHTML = 'Failed to load :(';
		}
	
	};
	
	xhr.send(null);

};

/**
*	Get Tasks Information from BotnetServer
* 	(Waiting for activtating of Tasks api)
*/
var getTasks = function() {

	var xhr    = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');
	
	xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Tasks');
	xhr.responseType = 'json';
	
	xhr.onload = function() {
	
		var data = xhr.response;
		if (data instanceof Array) {

			var code = '';

			for (var d = 0, dl = data.length; d < dl; d++) {
				var entry = data[d];

				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.ip + '</td>';
				code += '<td>' + entry.task + '</td>';
				code += '<td>' + entry.workload + '</td>';
				code += '</tr>';

			}
			content.innerHTML = code;
		} else {
			content.innerHTML = 'Failed to load :(';
		}
	
	};
	
	xhr.send(null);

};


/**
* It's only a test for Sorting
**/
var richtung = true;
var sortierer = function(){
	//var zahlen = new Array(0.5, 0.1, 1, 27, 2, 10, 4, "192.168.1.1", "192.168.1.7");
	var zahlen = iii.join();

	//var test = zahlen[7].split(".");
	//console.log(test);
	if(richtung == true) {
			zahlen.sort(function(a,b){return a-b});
			richtung = false;
		} else if(richtung == false) {
			zahlen.sort(function(a,b){return b-a});
			richtung = true;	
		}

	alert(zahlen);
};


