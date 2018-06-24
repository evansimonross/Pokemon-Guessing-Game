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

            // Display the hangman text with spaces between letters and underscores for letters not yet guessed
            var hangman = document.getElementById("hangman");
            hangman.textContent = "";
            game.hangmanText.forEach(function(letter){
                hangman.textContent += letter.toUpperCase() + " ";
            });

            // Display guesses made
            document.getElementById("guessesMadeHeader").textContent = "Guesses Made"
            var guessesMade = document.getElementById("guessesMade");
            guessesMade.textContent = "";
            game.incorrectGuesses.forEach(function(letter, index, array){
                guessesMade.textContent += letter.toUpperCase();
                if(index<array.length-1){
                    guessesMade.textContent += ", ";
                }
            });

            // Display guesses remaining
            document.getElementById("guessesLeftHeader").textContent = "Guesses Left";
            document.getElementById("guessesLeft").textContent = game.guessesRemaining;
        }
    }

    // Saves user input as a variable
    var userGuess = event.key;

    // Create a new game
    if(newGameNext){
        game = newGame();
        newGameNext = false;
        displayAll();
    }

    // Continues an ongoing game
    else{
        // User makes a new guess
        if(game.lettersGuessed.indexOf(userGuess)===-1){

            // User guess is not an alphabetic character
            if(letters.indexOf(userGuess)===-1){
            }

            // User guess is an alphabetic character, adds the letter to guess list and decrements remaining guesses.
            else{
                game.lettersGuessed.push(userGuess);
                game.guessesRemaining--;

                // If the guess is in the Pokemon's name
                if(game.name.indexOf(userGuess)>=0){
                    game.name.forEach(function(letter, index){
                        if(letter===userGuess){
                            game.hangmanText[index] = letter;
                        }
                    });
                }

                // If the guess is not in the Pokemon's name
                else{
                    game.incorrectGuesses.push(userGuess);
                }

                // Refresh the display
                displayAll();
            }
        }

        // User repeats a previous guess
        else{

        }

        // Check for win state
        if(game.hangmanText.indexOf("_")===-1){
            newGameNext = true;
            win();
            document.getElementById("guessesMadeHeader").textContent = "You Got It!"
            document.getElementById("guessesMade").textContent = "It's " + game.pokemon.name + "!";
            document.getElementById("guessesLeftHeader").textContent = "Controls";
            document.getElementById("guessesLeft").textContent = "Type any letter to make a guess. Type any key to start a new game.";
            displayAll();
        }
    }
}