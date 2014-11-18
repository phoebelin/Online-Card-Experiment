window.onload = function() {

    
    
    
    
    for (var x = 0; x < num_trials; x++) {
    	payoff_array.push(getRandomInt(0,1))
    }
    shuffleArray(payoff_array);

    printHeader(feature_payoff, other_payoff, payoff_array[j]);
    j++;

	for (var x = 0; x < num_iterations; x++) {
		for (var i = 0; i <= 9; i++) {
			iterate_array.push(i)
		}
	}
	var iterate_array_copy = iterate_array.slice(0);
	new_iterate_array = iterate_array.concat(iterate_array_copy);
	shuffleArray(new_iterate_array);
    display_cards(total_cards, feature, new_iterate_array[q]);
    q++;
    //loadScript("session.js", process_data);
}

function printHeader(feature_payoff, other_payoff, payoff_num) {
	var header = document.getElementById("header");
	//console.log(header);
	var heart = document.getElementById("heart");
	heart.innerHTML = "&" + feature_tested+ ";";
	heart.style.color = "#ff0000";
	header.innerHTML = "= &#36;" + parseFloat(feature_payoff[payoff_num]).toFixed(2)+ ", &spades; = &#36;" + parseFloat(other_payoff[payoff_num]).toFixed(2);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




function display_cards(total_cards, feature, i) {

	

	/*shuffling cards and setting up variables*/
	shuffleArray(feature);
	//shuffleArray(all);
	//shuffleArray(all_but_hearts);
	shuffleArray(spades);
	//i = getRandomInt(1,8);
	var num_feature_cards = new_iterate_array[q];
	//console.log(num_feature_cards);
	win_probability = num_feature_cards/total_cards;
	//console.log("win probability");
	//console.log(win_probability);
	//var num_feature_cards = 5
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
		//console.log("node getting replaced");
		//document.getElementById("card-grid").innerHTML = 
		document.getElementById("card-grid").replaceChild(card, document.getElementById("cards"+i));
		//document.getElementById("card-grid").appendChild(card);
	    } else {
		//console.log("node getting appended");
		document.getElementById("card-grid").appendChild(card);
	    }
	}
	document.getElementById("card-grid").title = "cardgroup";
	document.getElementById("trial-num").innerHTML = "Gamble 1 / " + num_trials + "";
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

var data = new Object;
data['prices'] = [];
x = data['prices'];
data['probabilities'] = [];
y = data['probabilities'];
data['payoffs'] = [];
z = data['payoffs'];
// var amount = document.getElementById("amount-box").value;
//console.log(document.getElementById("amount-box").value);
    function nextTrial() {
	//document.getElementById("amount-box").reset();
	if (document.getElementById("amount-box").value == "") {
	    window.alert("You must input a number");
	} else {
	    //console.log("amount: " + document.getElementById("amount-box").value);
	    //var datacell = {probability: win_probability};
	    //console.log(win_probability);
	    y.push(win_probability);
	    x.push(document.getElementById("amount-box").value);
	    z.push([feature_payoff[payoff_array[j]], other_payoff[payoff_array[j]]]);
	    //console.log("x" , x);
	    data['prices'] = x;
		data['probabilities'] = y;
		data['payoffs'] = z;
	    //console.log(data);

	    display_cards(total_cards, feature, new_iterate_array[q]);
	    q++;
	    printHeader(feature_payoff, other_payoff, payoff_array[j]);
	    j++;
	    current_trial_num++;
	    document.getElementById("trial-num").innerHTML = "" + current_trial_num + " / " + num_trials + "";
	}
	if(current_trial_num > num_trials-1) {
		
		//console.log('data before turk', data);
		submitTurk();
	    //console.log("data submitted");
	    document.getElementById("next-button").disabled = true;
	}
	
	document.getElementById("amount-box").value = "";
	//console.log("current trial number: " + current_trial_num);
	
    }


function submitTurk() {
    alert('Submitting to Turk!')
    setTimeout(function() { turk.submit(data) }, 1500);
}