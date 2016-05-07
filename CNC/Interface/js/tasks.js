/**
*	Implementierung für die Tasks section
* 	@author Inan Bayram, Mustafa Yildiz & Asim Bababalim
**/

var sendNewTask = function(id, type, data) {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Tasks');
  
  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Token', 'c0724862f1aef7d1fc77488a39718b34');

  var data;
  xhr.onload = function() {
  	console.log("Response: ", xhr.response);
  };

    data = { 
    	"id": parseInt(id,10),
    	"type": type,
    	"data": {
    			'input': data,
    			'output': null  }
    };
  
  xhr.send(JSON.stringify(data));
  showInfo("taskSend");
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
