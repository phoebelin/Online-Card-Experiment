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

/* Changeable variables start */

//number of winning cards
var num_winning_cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//total number of cards
var total_cards = 9;
//number of repetitions
var num_iterations = 1;

//type of payoff
var feature_payoff = [1, 1];
var other_payoff = [2, 1000];

//winning feature
var feature = hearts;
//index that determines what kind of payoff in payoff arrays
var payoff_num;

/* Changeable variables end */

var win_probability;
var feature_names = ["hearts", "spades"];
var feature_tested = "hearts";
var data = new Array();
var display_cards;
var iterate_array = [];
var new_iterate_array = [];
var q = 0;
var payoff_array = [];
var j = 0;
var num_trials = num_iterations * num_winning_cards.length * feature_payoff.length;
var current_trial_num = 1;
var start_time;