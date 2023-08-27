var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$(document).on("keydown", function (event) {
  startGame();
});


function startGame() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
}

function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function nextSequence() {

  level = level + 1;
  $("#level-title").text("Level " + level);

  var randomNumer = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumer];
  gamePattern.push(randomChosenColor);


  var buttonWithTheChosenColor = $(".btn." + randomChosenColor);
  setTimeout(function () {
    buttonWithTheChosenColor.fadeOut();
    buttonWithTheChosenColor.fadeIn();
  }, 500);

  playSound(randomChosenColor);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var wrongSound = new Audio("sounds/" + name + ".mp3");
  wrongSound.play();
}

function animatePress(currentColor) {
  $(".btn").click(function () {
    $(this).addClass("pressed");
    setInterval(() => {
      $(this).removeClass("pressed")
    }, 100);
  })
}

