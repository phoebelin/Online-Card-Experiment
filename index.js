function checkform() {
    if(document.getElementById("consent").checked) {
	window.location.assign("file:///Users/phoebelin/Documents/research/cards.html");
	return false;
    } else {
	alert("You must check the form above");
    }
}

function display_cards(int probability, int num_cards) {


}
