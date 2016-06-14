function testTask(xid, xtype, xinput, xoutput) {
	
	var typeInput = document.getElementById('type').value;
  	var dataInput = document.getElementById('data').value;
	var xhr = new XMLHttpRequest();

	xhr.open('POST', BOTNETURLTASKS, true);
  
  	xhr.responseType = 'json';
  	xhr.setRequestHeader('Content-Type', 'application/json');
  	xhr.setRequestHeader('Token', 'c0724862f1aef7d1fc77488a39718b34');

	var data = {
		id: xid,
    	type: xtype,
    	data: {
        	input: xinput,
        	output: xoutput
    	}
	};

	xhr.onload = function() {
		if(xhr.response.message == "OK"){
			showInfo("taskSend");
			getTasks();
		}
	};

	xhr.send(JSON.stringify(data));
	getTasks();
}


function testStatus() {
	
	var typeInput = document.getElementById('type').value;
  	var dataInput = document.getElementById('data').value;
	var xhr = new XMLHttpRequest();

	xhr.open('POST', "http://localhost:3000/api/status", true);
  
  	xhr.responseType = 'json';
  	xhr.setRequestHeader('Content-Type', 'application/json');
  	xhr.setRequestHeader('Token', 'c0724862f1aef7d1fc77488a39718b34');

	var data = {
		ip: null
		};

	xhr.onload = function() {
		if(xhr.response.message == "OK"){
			showInfo("statusSend");
			getTasks();
		}
	};

	xhr.send(JSON.stringify(data));
	getStatus();
}