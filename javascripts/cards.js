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
	shuffleArray(spades);
	//i = getRandomInt(1,8);
	var num_feature_cards = new_iterate_array[q];
	//console.log(num_feature_cards);
	win_probability = num_feature_cards/total_cards;
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
		document.getElementById("card-grid").replaceChild(card, document.getElementById("cards"+i));
	    } else {
		document.getElementById("card-grid").appendChild(card);
	    }
	}
	document.getElementById("card-grid").title = "cardgroup";
	document.getElementById("trial-num").innerHTML = "Gamble 1 / " + num_trials + "";
    
    //Start the timer
    start_time=new Date().getTime();
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
w = new Array();
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
        RT=new Date().getTime()-start_time;
        w.push(Math.round(RT/1000));
        nr_winning_cards=total_cards-total_cards*win_probability;
        y.push(nr_winning_cards);
	    x.push(document.getElementById("amount-box").value);
	    //z.push([feature_payoff[payoff_array[j]], other_payoff[payoff_array[j]]]);
        z.push((Math.max(feature_payoff[payoff_array[j-1]], other_payoff[payoff_array[j-1]])==1000)+0);
	    //console.log("x" , x);
	    //data['prices'] = x;
		//data['probabilities'] = y;
		//data['payoffs'] = z;
	    //console.log(data);
        
	    display_cards(total_cards, feature, new_iterate_array[q]);
	    q++;
	    printHeader(feature_payoff, other_payoff, payoff_array[j]);
	    j++;
	    current_trial_num++;
	    document.getElementById("trial-num").innerHTML = "" + current_trial_num + " / " + num_trials + "";
	}
	if(current_trial_num > num_trials) {
		
        data={
            RT: w,
            prices: x,
            nr_winning_cards: y,
            payoffs: payoff_array            
        }
		//console.log('data before turk', data);
		//submitTurk();
	    //console.log("data submitted");
        RT_string=data.RT.toString();
        check_sum=sumArray(data.payoffs)+sumArray(data.prices)+sumArray(data.nr_winning_cards)+sumArray(data.RT);
        secret_code=(data.payoffs.toString()).replace(/\,/g,'')+";"+ data.prices.toString()+";"+ data.nr_winning_cards.toString()+ ";"+ RT_string+ ";" + check_sum;
        $("#Trial").hide()
        $("#Finished").show()
        $("#SecretCode").html(secret_code);
        
	    document.getElementById("next-button").disabled = true;
	}
	
	document.getElementById("amount-box").value = "";
	//console.log("current trial number: " + current_trial_num);
	
    }


function submitTurk() {
    alert('Submitting to Turk!')
    setTimeout(function() { turk.submit(data) }, 1500);
}

function sumArray(numeric_array){
    sum=0;
    for (c=0;c<numeric_array.length;c++){
        sum+=parseFloat(numeric_array[c]);
    }
    return sum;
}