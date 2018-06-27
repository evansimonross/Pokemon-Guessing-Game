var newGameNext = true;
var gameMode = 0; //0 for casual, 1 for challenge, 2 for extreme, 3 for mystery
var wins = 0;
var losses = 0;
var game = {};
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Sets the game mode (called by buttons from HTML)
function setGameMode(mode){
    gameMode = mode;
}

document.onkeyup = function (event) {

    // Creates a new game with a random Pokemon. The pokemonList variable can be found in the other .js file.
    function newGame() {
        newGameNext = false;

        var pokemon = {};
        var guessesRemaining;
        if(gameMode === 3){
            pokemon = neopetList[Math.floor(Math.random()*neopetList.length)];
            guessesRemaining = 10;
            neopetsCSS();
        }
        else if(gameMode === 2){
            pokemon = pokemonList[Math.floor(Math.random() * 807)];
            guessesRemaining = 12;
            pokemonCSS();
        }
        else if(gameMode === 1) {
            pokemon = pokemonList[Math.floor(Math.random() * 386)];
            guessesRemaining = 14;
            pokemonCSS();
        }
        else {
            pokemon = pokemonList[Math.floor(Math.random() * 151)];
            guessesRemaining = 16;
            pokemonCSS();
        }

        // Add the following line to test specific Pokemon. Good for ones with weird names. 
        //pokemon = pokemonList[771];
        var name = cleanup(pokemon.name);
        //console.log(name);
        var hangmanText = [];
        name.forEach(function (letter) {
            if(letter===" "){
                hangmanText.push(" ");
            }
            else{
                hangmanText.push("_");
            }
        });
        return { pokemon, name, hangmanText, lettersGuessed: [], incorrectGuesses: [], guessesRemaining }
    }

    // Increments the win counter.
    function win() {
        newGameNext = true;
        wins++;
        document.getElementById("winCount").textContent = wins;
        document.getElementById("guessesMadeHeader").textContent = "You Got It!"
        document.getElementById("guessesMade").textContent = "It's " + game.pokemon.name + "!";
        document.getElementById("guessesLeftHeader").textContent = "Controls";
        document.getElementById("guessesLeft").textContent = "Type any key to start a new game.";
        displayAll();

    }

    // Increments the loss counter.
    function lose() {
        newGameNext = true;
        losses++;
        document.getElementById("loseCount").textContent = losses;
        document.getElementById("guessesMadeHeader").textContent = "Too bad!"
        document.getElementById("guessesMade").textContent = "It was " + game.pokemon.name + "!";
        document.getElementById("guessesLeftHeader").textContent = "Controls";
        document.getElementById("guessesLeft").textContent = "Type any key to start a new game.";
        displayAll();
    }

    function pokemonCSS(){
        $('body').css('background','linear-gradient(rgba(255, 255, 255, 0.5), #ffffff80),url(assets/images/bkg.jpg)');
        $('body').css('background-size', '100%');
        $('body').css('color', 'yellow');

        $('#game').css('background-color','rgb(246, 24, 24)');
        $('#game').css('border','solid 3px royalblue');

        $('h1').css('-webkit-text-stroke-color', 'royalblue');
        $('h1').text("Who's That Pokémon?");

        $('#pokemon').css('width','45%');
        $('#pokemon').css('right','45%');
        $('#pokemon').css('transform','translateX(0%)');

        $('#neopets').css('display','none');

        $('.card').css('background-color','rgb(246, 24, 24)');
        $('.card').css('border','solid 3px royalblue');

        $('.btn-link, .btn-link:visited, .btn-link:hover, .btn-link:active, .btn-link:focus').css('color','yellow');
    }

    function neopetsCSS(){
        $('body').css('background','linear-gradient(rgba(255, 255, 255, 0.5), #ffffff80),url(assets/images/neo_bkg.jpg)');
        $('body').css('background-size', '100%');
        $('body').css('color', 'black');

        $('#game').css('background-color','rgb(255, 208, 38)');
        $('#game').css('border','solid 3px black');

        $('h1').css('-webkit-text-stroke-color', 'white');
        $('h1').text("Who's That Neopet?");

        $('#pokemon').css('width','70%');
        $('#pokemon').css('right','65%');
        $('#pokemon').css('transform','translateX(-10%)');

        $('#neopets').css('display','block');

        $('.card').css('background-color','rgb(255, 208, 38)');
        $('.card').css('border','solid 3px black');

        $('.btn-link, .btn-link:visited, .btn-link:hover, .btn-link:active, .btn-link:focus').css('color','black');

    }

    // Cleans up the Pokemon's name -- some Pokemon names include unusual characters.
    function cleanup(string) {
        var temp = Array.from(string.toLowerCase());
        var result = [];
        temp.forEach(function (letter) {
            if (letter === "é") {
                result.push("e");
            }
            else if (letters.indexOf(letter) === -1) {
                result.push(" ");
            }
            else {
                result.push(letter);
            }
        });
        return result;
    }

    // Displays everything that needs to be changed on the screen.
    function displayAll() {
        // Fetches the Pokemon's image from Bulbapedia and darkens it if in the middle of a game.
        var pokemonImg = document.getElementById("pokemon");
        pokemonImg.setAttribute("src", game.pokemon.image);
        if (newGameNext) {
            pokemonImg.style.webkitFilter = "brightness(100%)";
        }
        else {
            pokemonImg.style.webkitFilter = "brightness(0%)";

            // Display the hangman text with spaces between letters and underscores for letters not yet guessed
            var hangman = document.getElementById("hangman");
            hangman.textContent = "";
            game.hangmanText.forEach(function (letter) {
                hangman.textContent += letter.toUpperCase() + " ";
            });

            // Display guesses made
            document.getElementById("guessesMadeHeader").textContent = "Guesses Made"
            var guessesMade = document.getElementById("guessesMade");
            guessesMade.textContent = "";
            game.incorrectGuesses.forEach(function (letter, index, array) {
                guessesMade.textContent += letter.toUpperCase();
                if (index < array.length - 1) {
                    guessesMade.textContent += ", ";
                }
            });
            if (game.incorrectGuesses.length==0){
                guessesMade.textContent = "No incorrect guesses so far";
            }

            // Display guesses remaining
            document.getElementById("guessesLeftHeader").textContent = "Guesses Left";
            document.getElementById("guessesLeft").textContent = game.guessesRemaining;
        }
    }

    // Saves user input as a variable
    var userGuess = event.key.toLowerCase();

    // Create a new game
    if (newGameNext) {
        game = newGame();
        newGameNext = false;
        displayAll();
    }

    // Continues an ongoing game
    else {
        // User makes a new guess
        if (game.lettersGuessed.indexOf(userGuess) === -1) {

            // User guess is not an alphabetic character
            if (letters.indexOf(userGuess) === -1) {
            }

            // User guess is an alphabetic character, adds the letter to guess list and decrements remaining guesses.
            else {
                game.lettersGuessed.push(userGuess);
                game.guessesRemaining--;

                // If the guess is in the Pokemon's name
                if (game.name.indexOf(userGuess) >= 0) {
                    game.name.forEach(function (letter, index) {
                        if (letter === userGuess) {
                            game.hangmanText[index] = letter;
                        }
                    });
                }

                // If the guess is not in the Pokemon's name
                else {
                    game.incorrectGuesses.push(userGuess);
                }

                // Refresh the display
                displayAll();
            }
        }

        // User repeats a previous guess
        else {

        }

        // Check for win state
        if (game.hangmanText.indexOf("_") === -1) {
            win();
        }

        // Check for lose state
        else if (game.guessesRemaining === 0) {
            console.log("We have reached lose()");
            lose();
        }
    }
}