const game = ()=>{
    //setting the dcore for both the computer and player to zero
    let pScore =0;
    let compScore=0;
    const gameScreen = document.querySelector(".match");
    const gameScore = document.querySelector(".scores");

    //starting the game fading out the intro screen and fading in the game screen
    const startGame  = ()=>{
        const playBtn = document.querySelector(".open-screen button");
        const introScreen = document.querySelector(".open-screen");
        
        playBtn.addEventListener("click", ()=>{
            introScreen.classList.add("fadeOut");
            gameScreen.classList.add("fadeIn");
            gameScore.classList.add("fadeIn");
        });
    };

    //function to play the game: 1-computer choice/ 2- comparing the choices/ 3-changing the pictures/4-calculate the score
    const playTheGame = ()=>{
        //selecting all the options buttons
        const playerChoice= document.querySelectorAll(".options button");
        const playerHand= document.querySelector(".player-hand");
        const computerHand= document.querySelector(".computer-hand");
        const hands= document.querySelectorAll(".hands img");

        hands.forEach(function(hand){
            hand.addEventListener("animationend", function(){
                this.style.animation="";
            });
        });

        //computer array choices
        const computerChoices = ["rock", "paper", "scissors"];
        //iterating through each button
        playerChoice.forEach(function(option){
            option.addEventListener("click", function(){
                //getting the computer choice I multiplied by 30 so that the proba of getting the same nb in succession get smaller
                const randomNb = Math.floor(Math.random()*32);
                //if the randomNb is btw 0 and 10 let's make it point to rock by making the computerNb be 0
                if(randomNb<=10){
                    computerNumber=0;
                }
                //if the randomNb is btw 10 and 20 let's make it point to paper by making the computerNb be 1
                if(randomNb>10 && randomNb<=21){
                    computerNumber=1;
                }
                //if the randomNb is btw 10 and 20 let's make it point to scissors by making the computerNb be 2
                if(randomNb>21 && randomNb<=31){
                    computerNumber=2;
                }

                const computerChoice = computerChoices[computerNumber];
                //we dalay the answer for the winner and the changing picture until after the animation of shaking is done so it look like a real life match (timeout is 2000 cz the animation take 2s so 2000ms)
                setTimeout(()=>{
                    //calling the comparing function
                compareChoices(this.textContent ,computerChoice);
                //Updating the hands after choosing a choice
                playerHand.src=`./imgs/${this.textContent}.png`;
                computerHand.src=`./imgs/${computerChoices[computerNumber]}.png`;
                },1510);
                //animation for the hands
                playerHand.style.animation= "shakePlayer 1.5s ease";
                computerHand.style.animation= "shakeComputer 1.5s ease";
            });
        });
    };

    //Update The Scores and put winner screen out when score=5
    const updateScores= ()=>{
        const playerScore= document.querySelector(".player-score p");
        const computerScore= document.querySelector(".computer-score p");
        const playerWinScreen = document.querySelector(".end-player-win");
        const computerWinScreen= document.querySelector(".end-computer-win");
        playerScore.textContent= pScore;
        computerScore.textContent= compScore;
        
        if(pScore===5 && compScore<pScore){
            gameScreen.classList.remove("fadeIn");
            gameScreen.classList.add("fadeOut");
            gameScore.classList.remove("fadeIn");
            gameScore.classList.add("fadeOut");
            playerWinScreen.classList.add("fadeIn");
           return;
        }
        if(compScore===5 && pScore<compScore){
            gameScreen.classList.remove("fadeIn");
            gameScreen.classList.add("fadeOut");
            gameScore.classList.remove("fadeIn");
            gameScore.classList.add("fadeOut");
            computerWinScreen.classList.add("fadeIn");
            return;
        }
    };

    //function to compare the two choices to see who is the winner
    const compareChoices = (pChoice, cChoice)=>{
        const winner= document.querySelector(".winner");
        //if both choices are the same
        if(pChoice===cChoice){
            winner.textContent="It's A Tie!";
            return;
        }
        //checking if the player choose rock
        if(pChoice==="rock"){
            if(cChoice==="paper"){
                winner.textContent="Computer Win This Round";
                compScore++;
                updateScores();
                return;
            }else{
                winner.textContent="Player Win This Round";
                pScore++;
                updateScores();
                return;
            }
        }
        //checking if the player choose paper
        if(pChoice==="paper"){
            if(cChoice==="rock"){
                winner.textContent="Player Win This Round";
                pScore++;
                updateScores();
                return;
            }else{
                winner.textContent="Computer Win This Round";
                compScore++;
                updateScores();
                return;
            }
        }
        //checking if the player choose scissors
        if(pChoice==="scissors"){
            if(cChoice==="rock"){
                winner.textContent="Computer Win This Round";
                compScore++;
                updateScores();
                return;
            }else{
                winner.textContent="Player Win This Round";
                pScore++;
                updateScores();
                return;
            }
        }
    };

    //starting the sub functions in this big function
    startGame();
    playTheGame();
}

//starting the game function to start all the other funvtions
game();