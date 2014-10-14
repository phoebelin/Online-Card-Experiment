function checkform() {
    if(document.getElementById("consent").checked) {
	window.location.assign("./cards.html");
	return false;
    } else {
	alert("You must check the consent form");
    }
}
