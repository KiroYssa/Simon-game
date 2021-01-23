var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 1;
var start = false;

$(document).on("keydown",function(){
  if(!start){
    $("h1").text("level " + level);
    nextSequence();
    start = true;
  }
});


$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
  // debugger;
  $("h1").text("level " + level);

  userClickedPattern = [];
  level++;

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }

  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    gameOver();
    gameOver();
    gameOver();
    gameOver();
    level = 1;
    start = false;
    gamePattern = [];
    $("h1").text("Game Over! Press Any Key to Restart");
  }

}

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  }, 100)
}

function playSound(name){
  var colorBtn = new Audio("sounds/" + name + ".mp3");
  colorBtn.play();
}

function animatePress(currenColor){
  $("." + currenColor).addClass("pressed").fadeOut(10).fadeIn(10).removeClass("pressed").fadeOut(10).fadeIn(10);
}
