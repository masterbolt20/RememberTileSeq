// alert("Hey there adventurer");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level = level + 1 ;
    var randomNumber = Math.floor(Math.random()*4)

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level " + level);
    // console.log(gamePattern);
    // console.log(userClickedPattern);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        // console.log("Success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }
    else{
        // console.log("Wrong")
        wrongClicked();
    }
}

function wrongClicked(){
    $("h1").text("Game Over, Press any key to Play again");
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200)
    playSound("wrong")
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

$(".btn").on("click", function(){
    // alert("Hi");
    // console.log($(this).attr("id"));
    // console.log(userClickedPattern);
    // console.log(userChosenColour);
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

$(document).on("keypress", function(){
    // alert("hi");
    if(gamePattern.length === 0){
        nextSequence();
    }
})

function playSound(name){
    var buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}