
let wordDisplay=document.querySelector(".word-display");
let guessesText=document.querySelector(".guesses-text b");
let keyboardDiv=document.querySelector(".keyboard");
let img = document.querySelector(".hangman-box img");
let gameModal = document.querySelector(".game-modal");
let playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters ,wrongGuessCount ;
const maxGuesses=6;

const resetGame=()=>{
    correctLetters=[] ;
    wrongGuessCount = 0;
    img.src=`images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord=()=>{
    const {word,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    console.log(word);
    currentWord=word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}

const gameOver=(isVictory)=>{
    setTimeout(()=>{
        const modalText = isVictory ? `you find the word : ` : `The Correct word is : `;
        gameModal.querySelector("img").src=`images/${isVictory ? 'victory': 'lost'}.gif`;
        gameModal.querySelector("h4").innerText=`${isVictory ? 'Congrats!': 'Game over'}`;
        gameModal.querySelector("p").innerHTML=`${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300)
}

const initGame = ( button , clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index)=>{
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");


            }
        });
    }else{
        wrongGuessCount++;
        img.src=`images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`;
    if(wrongGuessCount===maxGuesses){
        return gameOver(false);
    }
    if(correctLetters.length===currentWord.length){
        return gameOver(true);
    }
}

//create keyboard buttons
for (let i = 97 ; i <= 122 ; i++){
    let button = document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e => initGame(e.target , String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord)