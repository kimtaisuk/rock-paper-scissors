var countWin = 0;
var countLost = 0;
var countDraw = 0;
var countPlay = 0;

let winCount = 0;
let lossCount = 0;

//Save all the initial state of the player's field (user iput) to restore/reset at the end of the game.
let playChoice0 = document.querySelectorAll("#player-choice");
let computerChoice0 = document.querySelectorAll("#computer-choice");

//Let's play the actual game from here.

let handImages = document.querySelectorAll(".player-hand-image");
//let handTexts = document.querySelectorAll(".hover-text");

handImages.forEach(handImage => handImage.addEventListener('click',playRound));
//handTexts.forEach(handText => handText.addEventListener('click',playRound));

let imagesSelected = document.querySelectorAll(".hand-image");
imagesSelected.forEach(imageSelected => imageSelected.addEventListener('transitionend',removeSelection));

function removeSelection(e) {
    if (e.propertyName !== 'transform') {return;}
    this.classList.remove('image-click');    
}


function playRound(e) {
    this.classList.add('image-click');

    let playerSelection = e.target.id;
    console.log(playerSelection)
    let computerSelection = computerPlay(); //The computer's hand is randomly selected.
    console.log(computerSelection)
    let computerHandImage = document.querySelector(`div#computer-choice div.${computerSelection}-image`)

    console.log(computerHandImage)
    computerHandImage.classList.add('image-click');

    let playerNumber = handToNumber(playerSelection);
    let computerNumber = handToNumber(computerSelection);
    
    let match_result = playerNumber - computerNumber; //Compare the player's card against the computer's.

    let message = "";
    let resultMessage = "";
    let colorCode = "";

    let playerColor = "#719bb2";
    let computerColor = "#c29090"

    if (match_result == 0) {

        resultMessage = "DRAW!"
        message = "You and the computer choose the same hand, " + playerSelection + " and " + computerSelection;
        colorCode = "#FFFFFF"
    }
    else if (match_result == 1 || match_result == -2){
        winCount++;
        resultMessage = "WON!"
        message = "Your " +playerSelection + " beats the computer's " + computerSelection;
        colorCode = "#719bb2"
    }
    // if (match_result == 2 || match_result == -1)
    else {
        lossCount++;
        resultMessage = "LOST!"
        message = "The computer's " + computerSelection + " beats your " + playerSelection;
        colorCode = "#c29090"
    }

    updateStatus();
    updateScore();
    //console.log(countWin);
    //console.log(colorCode);
    
    let finalMessagePlayer = "";
    let finalMessageComputer = "";
    if (winCount >= 5 && lossCount < 5) {
        
        // Show the message that you won the game;
        finalMessagePlayer="WINNER";
        finalMessageComputer="LOSER";
        // Make the images non-clickable
        updateChoiceBox(finalMessagePlayer,finalMessageComputer)
        addPlayAgain();
        // Add RESET button
        

    } 
    else if (winCount < 5 && lossCount >= 5) {
        // Show the message that you lost the game;
        finalMessagePlayer = "LOSER";
        finalMessageComputer = "WINNER";
        // Make the images non-clickable
        updateChoiceBox(finalMessagePlayer,finalMessageComputer)
        addPlayAgain();
        // Update the header
        // Add RESET button
        
    }

    function addPlayAgain(){
        let statusBox= document.getElementById("status-box");
        statusBox.removeChild(statusBox.firstChild);
        let playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('onclick','location.reload()')
        playAgainButton.setAttribute("id","play-again-button")
        playAgainButton.textContent = "PLAY AGAIN"
        statusBox.appendChild(playAgainButton);
 

    }
    
    function updateChoiceBox(messagePlayer,messageComputer){
        let playerChoice= document.getElementById("player-choice");
        let computerChoice= document.getElementById("computer-choice");
        
        
        while (playerChoice.firstChild && computerChoice.firstChild) {
            playerChoice.removeChild(playerChoice.lastChild);
            computerChoice.removeChild(computerChoice.lastChild);
        }
        

        //Add Final Game-Over Message
        let finalMessagePlayer = document.createElement('span');
        let finalMessageComputer = document.createElement('span');
        finalMessagePlayer.classList.add('final-message');  
        finalMessageComputer.classList.add('final-message');  

        finalMessagePlayer.textContent = messagePlayer;
        finalMessageComputer.textContent = messageComputer;
        playerChoice.appendChild(finalMessagePlayer);
        computerChoice.appendChild(finalMessageComputer);
    }

    //Update the Status message
    function updateStatus() {
        let statusResult = document.getElementById("status-result");
        let statusMessage = document.getElementById("status-message");
        statusResult.style.color = colorCode;
        statusResult.textContent = resultMessage;
        statusMessage.textContent = message;
    }

    function updateScore() {
        let playerScore = document.getElementById("player-score");
        let computerScore = document.getElementById("computer-score");
        
        playerScore.textContent = winCount;
        computerScore.textContent = lossCount;
    }




    // Assign number for each hand
    function handToNumber(hand) {                
        switch (hand) {
        case "rock" || "rock-text":
            return hand = 1;
        break;
        case "paper" || "paper-text":
            return hand = 2;
        break;
        case "scissors" || "scissors-text":
            return hand = 3;
        break;
        default:
            return hand = NaN;
        }
    }

    function computerPlay() {
        let rps_array =  ["rock", "paper", "scissors"];
        let computerSelection = rps_array[Math.floor(3*Math.random())];
        return computerSelection;                
    } 


}


