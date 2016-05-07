/**
*	Implementierung für die Status section
* 	@author Inan Bayram, Mustafa Yildiz & Asim Bababalim
**/


const BOTNETURL = "http://botnet.artificial.engineering:8080/api/Status";


/**
*	Methode zum ansteuern der Buttons
**/
function toggleButton(button_id) {            
  if (document.getElementById(button_id).innerHTML == "Start") {
		controlBot(button_id, true);
  } else {
 		controlBot(button_id, false);
  }
};


/**
*	Methode zum ändern der Inhalt des Buttons nach POST
**/
var changeInner = function(button_id){

	var status = document.getElementById(button_id).innerHTML;
	if(status == "Start"){
		document.getElementById(button_id).innerHTML = "Stop";
    	document.getElementById(button_id).style.background = "red";
	} else {
		document.getElementById(button_id).innerHTML = "Start";
    	document.getElementById(button_id).style.background = "#4CAF50";
	}
}


/**
*	Get Status Information from BotnetServer
*/
var getStatus = function() {

	var xhr = new XMLHttpRequest();
	var content = document.querySelector('#status-overview tbody');

	xhr.open('GET', BOTNETURL);
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
				code += '<td><button class="button" id="' + entry.id + '" onClick="toggleButton(this.id);">Start</button></td>';
				code += '</tr>';

			}
			content.innerHTML = code;

			// Buttons erhalten durch diese Implementierung die richtigen Texte und Farben (Fuer die Initialisierung)
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
			} 
		} else {
			//content.innerHTML = 'Failed to load :(';
			showInfo()
		}
	};
	xhr.send(null);
};

var controlBot = function(id, command) {
	var xhr = new XMLHttpRequest();

	xhr.open('POST', BOTNETURL, true);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Token', 'c0724862f1aef7d1fc77488a39718b34');
 
	xhr.onload = function() {
  		if(xhr.response.message == "OK") {
  			changeInner(id);
  			if(command == true){
  				showInfo("start");
  			} else {
  				showInfo("stop");
  			}	
  		} else {
  			showInfo("error");
  		}
  	};

var data = { 
  		"id": parseInt(id, 10), 
  		"status": command };
 
	xhr.send(JSON.stringify(data));
};