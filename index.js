var gameStart = false;
var currentLevel = 0;
var bttnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickPattern = [];


function nextColorFun() {
    return Math.floor(Math.random() * 4);
}


function soundFun(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animateFun(name) {
    soundFun(name);
    $("." + name).fadeOut(150).fadeIn(150); //Flash
    $("." + name).addClass("pressed");

    setTimeout(function() {
        $("." + name).removeClass("pressed");
    }, 100);  
}


function pushRandomColorFun() {
    clickPattern = [];
    currentLevel++;
    $("h1").text("currentLevel " + currentLevel);
    var randomChosenColor = bttnColors[nextColorFun()];
    gamePattern.push(randomChosenColor);
    animateFun(randomChosenColor);
}



function patternCheckFun(currentcurrentLevel) {
    if(clickPattern[currentcurrentLevel] === gamePattern[currentcurrentLevel]) {
        if(clickPattern.length === gamePattern.length) {
            setTimeout(function() {
                pushRandomColorFun();
            }, 1000);
        }
    }
    else {
        soundFun("wrong");
        $("h1").text("Game Over! Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        gameRestartFun();
    }
}


function gameRestartFun() {
    gameStart = false;
    currentLevel = 0;
    gamePattern = [];
}



$(".bttn").click(function() {
    var colorName = this.id;
    clickPattern.push(colorName);
    animateFun(colorName);
    patternCheckFun(clickPattern.length - 1);
});


$("h1").text("Press a keyboard button to start the game");
$(document).keypress(function() {
    if(!gameStart) {
        gameStart = true;
        $("h1").text("currentLevel " + currentLevel);
        pushRandomColorFun();
    }
}) 