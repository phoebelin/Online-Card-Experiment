function checkform() {
    if(document.getElementById("consent").checked) {
	window.location.assign("./example.html");
	return false;
    } else {
	alert("If you wish to participate, please check the box next to 'I consent to participate.'");
    }
}
