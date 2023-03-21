var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function () { 

    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click (function () { 

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


}

function playSound(name) {  

    var audio = new Audio("/sounds/" + name + ".mp3")
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout( function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
        
    
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();    
            }, 1000);
        }
    } else {
        var wrong = "wrong";
        playSound(wrong);
        console.log("Wrong");

        $("body").addClass("game-over");
        setTimeout(function () { 
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    gamePattern = [];

    started = false;

    level = 0;
}
