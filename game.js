var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

//handles button clicks
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//detects keys on keyboard
$(document).keydown(function(event) {
  if(!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence(); //first time nextSequence is called
    gameStarted = true;
  }
});

//plays sound associated with color - name
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//animates appropriate button that is clicked by user
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//starts game over
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
//creates next button in sequence to remember
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //fair bc 0.1-0.9 -> 0 ... 3.1-3.9-> 3
  //console.log(randomNumber); print testing
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); //adds next color to end of sequence

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //flash
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000)
    }
  }
  else { //a wrong pattern is clicked by the user = game over
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
