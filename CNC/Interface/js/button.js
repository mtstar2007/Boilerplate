function toggleText(button_id) {            
  if (document.getElementById(button_id).innerHTML == "Start") {
    if(sendcomand(button_id, "start")) {
      document.getElementById(button_id).innerHTML = "Stop";
      document.getElementById(button_id).style.background = "red";
      showInfo("start");
    } else {
      showInfo("error");
    }
  } else {
    if(sendcomand(button_id, "stop")) {
      document.getElementById(button_id).innerHTML = "Start";
      document.getElementById(button_id).style.background = "#4CAF50";
      showInfo("stop");
    } else {
      showInfo("error");
    }
  }
}

var sendcomand = function(id, comand) {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');
  
  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader('X-CSRF-TOKEN', 'c0724862f1aef7d1fc77488a39718b34');
  var pic;
  fetch(pic).then(function(){
    
  });
  var data;
  xhr.onload = function() {

  // data is now a Object
  data = { "id": id, "action": comand };
  };
  
  xhr.send(data);
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

      
};

var my_timeout = null;
var hideInfo = function(){
  if (my_timeout !== null) return false;
my_timeout = setTimeout(function() {
    document.getElementById("showInfo").style.top = "-30px";
    my_timeout = null;
}, 3000);

};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};