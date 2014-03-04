function checkform() {
    if(document.getElementById("consent").checked) {
	window.location.assign("file:///Users/phoebelin/Documents/research/Online%20Card%20Experiment/cards.html");
	return false;
    } else {
	alert("You must check the form above");
    }
}
