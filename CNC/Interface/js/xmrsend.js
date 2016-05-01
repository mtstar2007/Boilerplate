var sendcomand = function(id, comand) {
	var xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');
	
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
	xhr.setRequestHeader();
	var pic;
	fetch(pic).then(function(){
		
	});
	var data;
	xhr.onload = function() {
	alert(id + " " + comand);

	data = { "id": id, "action": comand };
	};
	
	var inan = xhr.send(data);
	alert(xhr.status);
};