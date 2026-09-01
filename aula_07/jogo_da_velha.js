
        let board = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = "X";
        let gameActive = true;

       
        const winningConditions = [, [3, 4, 5], [6, 7, 8],
        ];

        
        function makeMove(index) {
            
            if (board[index] !== "" || !gameActive) {
                return;
            }

            
            board[index] = currentPlayer;

            
            const cellElement = document.getElementById("cell-" + index);
            cellElement.innerText = currentPlayer;

            
            checkResult();
        }

        function checkResult() {
            let roundWon = false;

            
            for (let i = 0; i < winningConditions.length; i++) {
                const winCondition = winningConditions[i];
                let a = board[winCondition[0]];
                let b = board[winCondition[1]];
                let c = board[winCondition[2]];

                if (a === "" || b === "" || c === "") {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }

            const statusElement = document.getElementById("status");

            if (roundWon) {
                statusElement.innerText = `Jogador ${currentPlayer} venceu!`;
                gameActive = false;
                return;
            }

            
            let roundDraw = !board.includes("");
            if (roundDraw) {
                statusElement.innerText = "O jogo terminou em empate!";
                gameActive = false;
                return;
            }

            
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusElement.innerText = `Vez do jogador ${currentPlayer}`;
        }

        
        function resetGame() {
            board = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            gameActive = true;
            
            
            document.getElementById("status").innerText = "Vez do jogador X";

          
            for (let i = 0; i < 9; i++) {
                document.getElementById("cell-" + i).innerText = "";
            }
        }