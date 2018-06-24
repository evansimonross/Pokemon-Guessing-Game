var newGameNext = true;
var wins = 0;
var losses = 0;
var game = {};

document.onkeyup = function(event) {

    function newGame() {
        var randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)]
        return { pokemon: randomPokemon, guessesRemaining: 13, lettersGuessed: [] }
    }
    
    function win() {
        wins++;
        document.getElementById("winCount").textContent = wins;
    }
    
    function lose() {
        losses++;
        document.getElementById("lossCount").textContent = losses;
    }

    function displayAll(){
        var pokemonImg = document.getElementById("pokemon");
        pokemonImg.setAttribute("src",game.pokemon.image);
        if(newGameNext){
            pokemonImg.style.webkitFilter="brightness(100%)";
        }
        else{
            pokemonImg.style.webkitFilter="brightness(0%)";
        }
    }

    var userGuess = event.key;
    if(newGameNext){
        game = newGame();
        newGameNext = false;
        displayAll();
    }
}