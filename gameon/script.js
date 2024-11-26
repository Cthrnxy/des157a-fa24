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
        currentPlayerIndex: 0,
        gameEnd: 29,
    };

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
        const isAlice = player === 'Alice'; // 判断点击的角色是否是 Alice
        const characterImage1 = isAlice ? 'cat1.png' : 'alice1.png'; // 点击 Alice 显示 Cheshire Cat
        const characterImage2 = isAlice ? 'cat2.png' : 'alice2.png'; // 第二帧图片

        sectionPigGame.innerHTML = `
            <div>
                <h2>Game Start</h2>
                <button id="quit">Wanna Quit?</button>
                <p id="currentPlayer">Roll the dice for ${player}</p>
                
                <button id="rollDice">Roll the Dice</button>
                <p id="score">Scores: Alice - 0, Cheshire Cat - 0</p>

                <section id="game">
                    <p>${isAlice ? '&#x1F63C Cheshire Cat' : '&#x1F469 Alice'}</p>
                    <img src="images/${characterImage1}" alt="${isAlice ? 'Cheshire Cat' : 'Alice'}" id="characterImage" class="animation" width="300" height="350">
                    <img src="images/dice1.png" alt="Dice 1" id="dice1" width="100" height="100">
                    <img src="images/dice1.png" alt="Dice 2" id="dice2" width="100" height="100">
                    <img src="images/table.png" alt="table" id="table">
                </section>
            </div>
        `;

        // 开始动画效果
        startAnimation(characterImage1, characterImage2);

        bindDiceRoll();
        document.querySelector('#quit').addEventListener('click', () => location.reload());
    }

    function startAnimation(image1, image2) {
        const characterImage = document.querySelector('#characterImage');
        let toggle = true;

        // 每隔 500ms 切换图片，形成两帧动画
        setInterval(() => {
            characterImage.src = `images/${toggle ? image1 : image2}`;
            toggle = !toggle;
        }, 500);
    }

    function bindDiceRoll() {
        const rollDiceBtn = document.querySelector('#rollDice');
        rollDiceBtn.addEventListener('click', throwDice);
    }

    function throwDice() {
        const dice1 = document.querySelector('#dice1');
        const dice2 = document.querySelector('#dice2');
        const scoreBoard = document.querySelector('#score');

        // 添加摇晃动画
        dice1.classList.add('shaking');
        dice2.classList.add('shaking');

        setTimeout(() => {
            // 移除摇晃动画类
            dice1.classList.remove('shaking');
            dice2.classList.remove('shaking');

            // 掷骰子
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;

            // 更新骰子图片
            dice1.src = gameData.dice[gameData.roll1 - 1];
            dice2.src = gameData.dice[gameData.roll2 - 1];

            // 更新分数并显示
            updateScore();
            checkWinningCondition();
        }, 500); // 与摇晃动画时间一致
    }

    function updateScore() {
        const scoreBoard = document.querySelector('#score');

        if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            // 掷出 1 丢失回合
            scoreBoard.innerHTML = `<p>Oh no! ${gameData.players[gameData.currentPlayerIndex]} rolled a 1 and lost the turn!</p>`;
            switchPlayer();
        } else {
            const rollSum = gameData.roll1 + gameData.roll2;
            gameData.scores[gameData.currentPlayerIndex] += rollSum;
            scoreBoard.innerHTML = `Scores: Alice - ${gameData.scores[0]}, Cheshire Cat - ${gameData.scores[1]}`;
        }
    }

    function checkWinningCondition() {
        if (gameData.scores[gameData.currentPlayerIndex] >= gameData.gameEnd) {
            sectionPigGame.innerHTML = `
                <h2>${gameData.players[gameData.currentPlayerIndex]} wins with ${gameData.scores[gameData.currentPlayerIndex]} points!</h2>
                <button id="restartGame">Start a New Game</button>
            `;
            document.querySelector('#restartGame').addEventListener('click', () => location.reload());
        }
    }

    function switchPlayer() {
        gameData.currentPlayerIndex = 1 - gameData.currentPlayerIndex;
        document.querySelector('#currentPlayer').textContent = `Roll the dice for ${gameData.players[gameData.currentPlayerIndex]}`;
    }

    btnAlice.addEventListener('click', () => switchScene('Alice'));
    btnCheshire.addEventListener('click', () => switchScene('Cheshire Cat'));
})();
