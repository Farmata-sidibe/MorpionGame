const btns = document.querySelectorAll('button');
const statut = document.querySelector('.statut');
let scoreX = document.querySelector('.scoreJ1');
let scoreO = document.querySelector('.scoreJ2');

let scorePlayerX = 0;
let scorePlayerO = 0;

// class case game and player

let gameStart = true;
let playerPlay = "✘";

let gameState = ["", "", "", "", "", "", "", "", ""];

const conditionsWin = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

// send message
const win = () => `Le joueur ${playerPlay} a gagné`;
const equality = () => 'Egalité'
const tourPlayer = () => `C'est au tour du joueyr ${playerPlay}`;

statut.innerHTML = tourPlayer();

document.querySelectorAll('.cell').forEach(cell => cell.
    addEventListener("click", gestionClick))
document.querySelector('.restart').addEventListener("click", restart);

function gestionClick(){
    // on recupére l'index de la case cliquée ici
    const indexCell = parseInt(this.dataset.index)
    // console.log(indexCell)

    if(gameState[indexCell] !== "" || !gameStart){
        return
    }

    gameState[indexCell] = playerPlay;
    this.innerHTML = playerPlay;

    checkWinner();
}

function checkWinner(){
    let tourWinner = false;

    for(let conditionWin of conditionsWin){
        // pour chaque play state
        let val1 = gameState[conditionWin[0]]
        let val2 = gameState[conditionWin[1]]
        let val3 = gameState[conditionWin[2]]

        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }
        
        if(val1 === val2 && val2 === val3){
            tourWinner = true
            if (playerPlay === "✘"){
                scorePlayerX += 1
                scoreX.textContent = scorePlayerX
                // console.log(scorePlayerX)
            } if (playerPlay === "❍"){
                scorePlayerO += 1
                scoreO.textContent = scorePlayerO

        
            }
            break
        }

    }
    if(tourWinner){
        statut.innerHTML = win()
        gameStart = false
        return
    }
    if(!gameState.includes("")){
        statut.innerHTML= equality()
        gameStart = false
        return
    }
    // le joueur qui joue est le X c'est au tour de O sinon au tour de X
    playerPlay = playerPlay === "✘" ? "❍" : "✘";

    statut.innerHTML = tourPlayer()
}


function restart(){
    playerPlay = "✘";
    gameStart = true
    gameState = ["", "", "", "", "", "", "", "", ""];
    statut.innerHtml = tourPlayer()
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "")
}
