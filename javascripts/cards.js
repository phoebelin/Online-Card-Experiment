/*Creating arrays with each specific type of card*/

var hearts = new Array("images/3.png", "images/19.png", "images/23.png", "images/27.png", "images/31.png", "images/35.png", "images/39.png", "images/43.png", "images/47.png", "images/51.png", "images/3.png");

var spades = new Array("images/2.png", "images/18.png", "images/22.png", "images/26.png", "images/30.png", "images/34.png", "images/38.png", "images/42.png", "images/46.png", "images/50.png");

var clubs = new Array("images/1.png", "images/5.png", "images/9.png", "images/13.png", "images/17.png", "images/21.png", "images/25.png", "images/29.png", "images/33.png", "images/37.png", "images/41.png", "images/45.png", "images/49.png");

var diamonds = new Array("images/4.png", "images/8.png", "images/12.png", "images/16.png", "images/20.png", "images/24.png", "images/28.png", "images/32.png", "images/36.png", "images/40.png", "images/44.png", "images/48.png", "images/52.png");

var faces = new Array("images/5.png", "images/6.png", "images/7.png", "imagesg/8.png", "images/9.png", "images/10.png", "images/11.png", "images/12.png", "images/13.png", "images/14.png", "images/15.png", "images/16.png");

var all = new Array();
all = all.concat(hearts, spades, clubs, diamonds);

var all_but_hearts = new Array();
all_but_hearts = all_but_hearts.concat(spades, clubs, diamonds);
/*Changeable variables*/

//var probability = 0.7;
var num_winning_cards = 4;
var total_cards = 9;
var win_probability = num_winning_cards/total_cards;
var feature = hearts;
var feature_payoff = 1000;
var other_payoff = 500;
var feature_names = ["hearts", "spades"];
var feature_tested = "hearts";
var data = new Array();
var display_cards;
var num_trials = 10;
var current_trial_num = 1;

window.onload = function() {

    
    function printHeader(feature_payoff, other_payoff) {
	var header = document.getElementById("header");
	//console.log(header);
	var heart = document.getElementById("heart");
	heart.innerHTML = "&" + feature_tested+ ";";
	heart.style.color = "#ff0000";
	header.innerHTML = "= &#36;" + parseFloat(feature_payoff).toFixed(2)+ ", &spades; = &#36;" + parseFloat(other_payoff).toFixed(2);
    }
    
    /**    function loadScript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javscript';
	script.src = url;

	script.onreadystatechange = callback;
	script.onload = callback;

	head.appendChild(script);
	}**/

    //var data = Session.get("data");
    
    //process_data();
    //console.log("data: " + data);
    printHeader(feature_payoff, other_payoff);
    display_cards(total_cards, feature);
    //loadScript("session.js", process_data);
}

function display_cards(total_cards, feature) {

	/*shuffling cards and setting up variables*/
	shuffleArray(feature);
	//shuffleArray(all);
	//shuffleArray(all_but_hearts);
	shuffleArray(spades);
	var num_feature_cards = num_winning_cards;
	var num_remaining_cards = total_cards - num_feature_cards;
	
	if(num_feature_cards > 13) {
	    num_feature_cards = 13;
	    num_remaining_cards = total_cards - 13;
	}
	
	/*populating master array*/
	var master_array = [];
	for (i = 0; i < num_feature_cards; i++) {
	    master_array.push(feature[i]);
	}
	for (i = 0; i < num_remaining_cards; i++) {
	    /*if(isInArray(all[i], feature)) {
	      i--;
	      } else {
	      master_array.push(all[i]);
	      }*/
	    master_array.push(spades[i]);
	}

	shuffleArray(master_array); //the master array is the deck thatcontains cards the participant will see.
	str = "";
	str += "<table>";
	for (i = 0; i < total_cards; i++) {
	    var card = document.createElement("img");
	    card.src = master_array[i];
	    card.setAttribute("id", "cards"+i);
	    if(document.getElementById("card-grid").title != "") {
		console.log("node getting replaced");
		//document.getElementById("card-grid").innerHTML = 
		document.getElementById("card-grid").replaceChild(card, document.getElementById("cards"+i));
		//document.getElementById("card-grid").appendChild(card);
	    } else {
		console.log("node getting appended");
		document.getElementById("card-grid").appendChild(card);
	    }
	}
	document.getElementById("card-grid").title = "cardgroup";
	document.getElementById("trial-num").innerHTML = "Gamble (1 / " + num_trials + ")";
    }

    /*returns an array that is in a randomized order
      using Fisher-Yates shuffle algorithm*/
    function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.random() * (i+1));
	    var temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
    }

    /*returns true if element is in given array*/
    function isInArray(value, array) {
	return (array.indexOf(value) > -1);
    }


// var amount = document.getElementById("amount-box").value;
console.log(document.getElementById("amount-box").value);
    function nextTrial() {
	//document.getElementById("amount-box").reset();
	if (document.getElementById("amount-box").value == "") {
	    window.alert("You must input a number");
	} else {
	    console.log("amount: " + document.getElementById("amount-box").value);
	    var datacell = {probability: win_probability, price: document.getElementById("amount-box").value};
	    console.log("datacell: " + datacell);
	    data.push(datacell);
	    console.log(data);
	    display_cards(total_cards, feature);
	    current_trial_num++;
	    document.getElementById("trial-num").innerHTML = "(" + current_trial_num + " / " + num_trials + ")";
	}
	if(current_trial_num > num_trials-1) {
	    submitTurk();
	    console.log("data submitted");
	    document.getElementById("next-button").disabled = true;
	}
	
	console.log("current trial number: " + current_trial_num);
	
    }


function submitTurk() {
    turk.submit(data);
}