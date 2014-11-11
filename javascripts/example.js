function checkformexample() {
    if(document.getElementById("consent").checked) {
	window.location.assign("./cards.html");
	return false;
    } else {
	alert("You must check that you have understood the instructions.");
    }
}
