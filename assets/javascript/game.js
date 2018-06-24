var newGameNext = true;
var wins = 0;
var losses = 0;
var game = {};
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

document.onkeyup = function(event) {

    // Creates a new game with a random Pokemon. The pokemonList variable can be found in the other .js file.
    function newGame() {
        var pokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)]
        var name = cleanup(pokemon.name);
        var hangmanText = [];
        name.forEach(function(letter){
            hangmanText.push("_");
        });
        return { pokemon, name, hangmanText, lettersGuessed: [], incorrectGuesses: [], guessesRemaining: 13 }
    }
    
    // Increments the win counter.
    function win() {
        wins++;
        document.getElementById("winCount").textContent = wins;
    }
    
    // Increments the loss counter.
    function lose() {
        losses++;
        document.getElementById("lossCount").textContent = losses;
    }

    // Cleans up the Pokemon's name -- some Pokemon names include unusual characters.
    function cleanup(string){
        var temp = Array.from(string.toLowerCase());
        var result = [];
        temp.forEach(function(letter){
            if(letter==="é"){
                result.push("e");
            }
            else if(letters.indexOf(letter)===-1){
                result.push(" ");
            }
            else{
                result.push(letter);
            }
        });
        return result;
    }

    // Displays everything that needs to be changed on the screen.
    function displayAll(){
        // Fetches the Pokemon's image from Bulbapedia and darkens it if in the middle of a game.
        var pokemonImg = document.getElementById("pokemon");
        pokemonImg.setAttribute("src",game.pokemon.image);
        if(newGameNext){
            pokemonImg.style.webkitFilter="brightness(100%)";
        }
        else{
            pokemonImg.style.webkitFilter="brightness(-50%)";
        }
        // Display the hangman text with spaces between letters and underscores for letters not yet guessed
        var hangman = document.getElementById("hangman");
        hangman.textContent = "";
        game.hangmanText.forEach(function(letter){
            hangman.textContent = hangman.textContent + letter.toUpperCase() + " ";
        });
    }

    var userGuess = event.key;
    if(newGameNext){
        game = newGame();
        newGameNext = false;
        displayAll();
    }
    else{
        if(game.lettersGuessed.indexOf(userGuess)===-1){
            if(letters.indexOf(userGuess)===-1){
            }
            else{
                game.lettersGuessed.push(userGuess);
                game.guessesRemaining--;
                if(game.name.indexOf(userGuess)>=0){
                    game.name.forEach(function(letter, index){
                        if(letter===userGuess){
                            game.hangmanText[index] = letter;
                        }
                    });
                }
                else{
                    game.incorrectGuesses.push(userGuess);
                }
                displayAll();
            }
        }
        else{

        }
    }
}