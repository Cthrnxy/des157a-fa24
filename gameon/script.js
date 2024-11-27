(function () {
    "use strict";

    console.log("Reading JS");

    const btnAlice = document.querySelector('#Alice');
    const btnCheshire = document.querySelector('#Cheshire');
    const sectionIntro = document.querySelector('#intro');
    const sectionPigGame = document.querySelector('#piggame');

    const gameData = {
        dice: ['images/dice1.png', 'images/dice2.png', 'images/dice3.png', 'images/dice4.png', 'images/dice5.png', 'images/dice6.png'],
        players: ['Alice', 'Cheshire Cat'],
        scores: [0, 0],
        roll1: 0,
        roll2: 0,
        currentPlayerIndex: 0, // 0: Alice, 1: Cheshire Cat
        gameEnd: 29,
    };

    let animationInterval;

    function switchScene(targetPlayer) {
        sectionIntro.classList.add('hidden');
        setTimeout(() => {
            sectionIntro.style.display = 'none';
            sectionPigGame.style.display = 'block';
            sectionPigGame.classList.add('visible');
            startGame(targetPlayer);
        }, 500); // 延迟时间等于 CSS 动画时间
    }

    function startGame(player) {
        const playerIndex = gameData.players.indexOf(player);
        gameData.currentPlayerIndex = playerIndex;

        updateGameScreen();
        updateCharacterAnimation();
        bindButtons();
    }

    function updateGameScreen() {
        const currentPlayer = gameData.players[gameData.currentPlayerIndex];
        const isAliceTurn = gameData.currentPlayerIndex === 0;

        sectionPigGame.innerHTML = `
            <div>
                <h2>Game Start</h2>
                <button id="quit">Wanna Quit?</button>
                <p id="currentPlayer">Roll the dice for ${currentPlayer}</p>
                
                <button id="rollDice">Roll the Dice</button>
                <button id="pass">Pass Turn</button>
                <p id="score">Scores: Alice - ${gameData.scores[0]}, Cheshire Cat - ${gameData.scores[1]}</p>
                <p id="message"></p>

                <section id="game">
                    <p id="characterName">${isAliceTurn ?  '&#x1F469 Alice':'&#x1F63C Cheshire Cat'}</p>
                    <img src="images/alice1.png" alt="Character" id="characterImage" class="animation" width="300" height="350">
                        <img src="images/dice1.png" alt="Dice 1" id="dice1" width="100" height="100">
                        <img src="images/dice1.png" alt="Dice 2" id="dice2" width="100" height="100">
                    <img src="images/table.png" alt="table" id="table">
                </section>
            </div>
        `;

        bindButtons(); 
    }

    function updateCharacterAnimation() {
        const characterImage = document.querySelector('#characterImage');
        let toggle = true;

        clearInterval(animationInterval); 

        
        const isAliceTurn = gameData.currentPlayerIndex === 0;
        const image1 = isAliceTurn ? 'cat1.png' : 'alice1.png';
        const image2 = isAliceTurn ? 'cat2.png' : 'alice2.png';

        
        animationInterval = setInterval(() => {
            characterImage.src = `images/${toggle ? image1 : image2}`;
            toggle = !toggle;
        }, 1000);
    }

    function bindButtons() {
        const rollDiceBtn = document.querySelector('#rollDice');
        const passBtn = document.querySelector('#pass');
        const quitButton = document.querySelector('#quit');

        rollDiceBtn.addEventListener('click', throwDice); 
        passBtn.addEventListener('click', switchPlayer); 
        quitButton.addEventListener('click', resetGame); 
    }

    function throwDice() {
        const dice1 = document.querySelector('#dice1');
        const dice2 = document.querySelector('#dice2');
        const scoreBoard = document.querySelector('#score');
        const message = document.querySelector('#message');
    
        
        dice1.classList.add('shaking');
        dice2.classList.add('shaking');
    
        setTimeout(() => {
        
            dice1.classList.remove('shaking');
            dice2.classList.remove('shaking');
    
          
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;
            gameData.rollSum = gameData.roll1 + gameData.roll2;
    
            
            dice1.src = gameData.dice[gameData.roll1 - 1];
            dice2.src = gameData.dice[gameData.roll2 - 1];
    
            if (gameData.rollSum === 2) {
                
                message.innerHTML = `<p>Oh snap! Snake eyes! ${gameData.players[gameData.currentPlayerIndex]} loses all their points!</p>`;
                gameData.scores[gameData.currentPlayerIndex] = 0; 
                scoreBoard.innerHTML = `Scores: Alice - ${gameData.scores[0]}, Cheshire Cat - ${gameData.scores[1]}`;
                setTimeout(() => switchPlayer(), 2000); 
            } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
                
                message.innerHTML = `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[1 - gameData.currentPlayerIndex]}.</p>`;
                setTimeout(() => switchPlayer(), 2000); 
            } else {
                
                const rollSum = gameData.roll1 + gameData.roll2;
                gameData.scores[gameData.currentPlayerIndex] += rollSum;
                message.textContent = `${gameData.players[gameData.currentPlayerIndex]} rolled a total of ${rollSum}!`;
                scoreBoard.innerHTML = `Scores: Alice - ${gameData.scores[0]}, Cheshire Cat - ${gameData.scores[1]}`;
            }
    
            
            checkWinningCondition();
        }, 500); 
    }
    

    function checkWinningCondition() {
        if (gameData.scores[gameData.currentPlayerIndex] >= gameData.gameEnd) {
            sectionPigGame.innerHTML += `
                <div id="result">
                    <h2>${gameData.players[gameData.currentPlayerIndex]} wins with ${gameData.scores[gameData.currentPlayerIndex]} points!</h2>
                    <button id="restartGame">Start a New Game</button>
                </div>
            `;
            document.querySelector('#restartGame').addEventListener('click', restartGame);
        }
    }

    function switchPlayer() {
        gameData.currentPlayerIndex = 1 - gameData.currentPlayerIndex; 
        updateGameScreen(); 
        updateCharacterAnimation(); 
    }

    function resetGame() {
        location.reload(); 
    }

    function restartGame() {
        gameData.scores = [0, 0]; 
        gameData.currentPlayerIndex = 1 - gameData.currentPlayerIndex; 
        updateGameScreen(); 
        updateCharacterAnimation(); 
        bindButtons(); 
    }

    btnAlice.addEventListener('click', () => switchScene('Alice'));
    btnCheshire.addEventListener('click', () => switchScene('Cheshire Cat'));
})();
