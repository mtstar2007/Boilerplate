function toggleText(button_id) {            
  if (document.getElementById(button_id).innerHTML == "Start") {
    if(sendcomand(button_id, true)) {
      document.getElementById(button_id).innerHTML = "Stop";
      document.getElementById(button_id).style.background = "red";
      showInfo("start");
    } else {
      showInfo("error");
    }
  } else {
    if(sendcomand(button_id, false)) {
      document.getElementById(button_id).innerHTML = "Start";
      document.getElementById(button_id).style.background = "#4CAF50";
      showInfo("stop");
    } else {
      showInfo("error");
    }
  }
};




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





var sendcomand = function(id, command) {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');
  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Token', 'c0724862f1aef7d1fc77488a39718b34');

  console.log(id +" "+ command);
 
  xhr.onload = function() {
  	console.log("Answer ", xhr.response);
  	// data is now a Object
  } ;
var data = { 
  		"id": parseInt(id, 10),
  		"status": command };
 
  xhr.send(JSON.stringify(data));
  return true;
};




var showInfo = function(comand) {
      document.getElementById("showInfo").style.top = "0px";
      if(comand == "start"){
        document.getElementById("showInfo").innerHTML = "Erfolgreich gestartet :)"
        document.getElementById("showInfo").style.background = "#4CAF50";
        hideInfo();
      }
      if(comand == "stop"){
        document.getElementById("showInfo").innerHTML = "Erfolgreich angehalten :)"
        document.getElementById("showInfo").style.background = "red";
        hideInfo();
      }
      if(comand == "error"){
        document.getElementById("showInfo").innerHTML = "Ooooops. Etwas ging schief :("
        hideInfo();
      }
      if(comand == "taskSend"){
      	document.getElementById("showInfo").innerHTML = "Neuer Task wurde angelegt"
        hideInfo();
      }

      
};

var my_timeout = null;
var hideInfo = function(){
  if (my_timeout !== null) return false;
my_timeout = setTimeout(function() {
    document.getElementById("showInfo").style.top = "-30px";
    my_timeout = null;
}, 3000);

};