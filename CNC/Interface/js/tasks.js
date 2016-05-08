/**
*	Implementierung für die Tasks section
* 	@author Inan Bayram, Mustafa Yildiz & Asim Bababalim
**/

const BOTNETURLTASKS = "http://botnet.artificial.engineering:8080/api/Tasks";

function sendNewTask(e) {
	
	var typeInput = document.getElementById('type').value;
  	var dataInput = document.getElementById('data').value;
	var xhr = new XMLHttpRequest();

	xhr.open('POST', BOTNETURLTASKS, true);
  
  	xhr.responseType = 'json';
  	xhr.setRequestHeader('Content-Type', 'application/json');
  	xhr.setRequestHeader('Token', 'c0724862f1aef7d1fc77488a39718b34');

	var data = {
    	type: typeInput,
    	data: {
        	input: dataInput
    	}
	};

	xhr.onload = function() {
		if(xhr.response.message == "OK"){
			showInfo("taskSend");
			getTasks();
		}
	};

	e.preventDefault();
	xhr.send(JSON.stringify(data));
	getTasks();
}

/**
*	Get Tasks Informaton with Fetch
*/
function getTasks(){
	var table = document.querySelector('#tasks-overview tbody');

	fetch(BOTNETURLTASKS, {
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
				taskTable += '</tr>';
			}
		table.innerHTML = taskTable;
		} else {
			table.innerHTML = 'Failed to load :('
		}
	}).catch(function(err){
		showInfo("error");
	});
}
