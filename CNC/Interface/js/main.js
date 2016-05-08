function refreshPage(){
	var page = window.location.hash;

	if(page === "#tasks"){
		getTasks();
	} else {
		getStatus();
	}
  showInfo("listRefreshed");
}

function showInfo(command) {
      document.getElementById("showInfo").style.top = "0px";

      if(command == "start"){
        document.getElementById("showInfo").innerHTML = "Erfolgreich gestartet :)"
        document.getElementById("showInfo").style.background = "#4CAF50";
        hideInfo();
      }
      if(command == "stop"){
        document.getElementById("showInfo").innerHTML = "Erfolgreich angehalten :)"
        document.getElementById("showInfo").style.background = "red";
        hideInfo();
      }
      if(command == "error"){
        document.getElementById("showInfo").innerHTML = "Ooooops. Etwas ging schief :("
        hideInfo();
      }
      if(command == "taskSend"){
      	document.getElementById("showInfo").innerHTML = "Neue Task wurde angelegt"
        hideInfo();
      } 
      if(command == "listRefreshed"){
        document.getElementById("showInfo").innerHTML = "Liste wurde aktualisiert";
        hideInfo();
      }
}

var my_timeout = null;
function hideInfo(){
  if (my_timeout !== null) return false;
	my_timeout = setTimeout(function() {
    document.getElementById("showInfo").style.top = "-30px";
    my_timeout = null;
	}, 3000);
}

