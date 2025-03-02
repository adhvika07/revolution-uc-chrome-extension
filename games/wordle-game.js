// API URL for the Free Dictionary API
const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Initialize game variables
let secretWord;
let guessCount = 0;
const maxGuesses = 6;
let fiveLetterWords = []; // Store valid 5-letter words

// Fetch 5-letter words once and cache them
async function fetchFiveLetterWords() {
    // Generate a list of 5-letter words from the dictionary API
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const words = [];
    
    // Fetch valid words from the dictionary API for each 5-letter combination
    for (let i = 0; i < alphabet.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            for (let k = 0; k < alphabet.length; k++) {
                for (let l = 0; l < alphabet.length; l++) {
                    for (let m = 0; m < alphabet.length; m++) {
                        const word = `${alphabet[i]}${alphabet[j]}${alphabet[k]}${alphabet[l]}${alphabet[m]}`;
                        
                        // Make a single API call for each word
                        try {
                            const response = await fetch(apiUrl + word);
                            if (response.ok) {
                                words.push(word); // Add valid words to the list
                            }
                        } catch (error) {
                            console.error(`Failed to fetch word: ${word}`);
                        }
                    }
                }
            }
        }
    }

    // Store the valid words in the fiveLetterWords array
    fiveLetterWords = words;
}

// Initialize secret word by selecting a random word from the valid 5-letter words list
async function setSecretWord() {
    // Wait for the 5-letter words to be fetched
    await fetchFiveLetterWords();
    if (fiveLetterWords.length > 0) {
        secretWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
        console.log("Secret Word:", secretWord);  // For debugging purposes
    } else {
        alert("Failed to fetch valid 5-letter words.");
    }
}

// Update the UI with the guess results
function updateGuessResults(userGuess, result) {
    const resultDiv = document.getElementById("guess-results");
    const resultElement = document.createElement("div");
    resultElement.textContent = `${userGuess.toUpperCase()} -> ${result}`;
    resultDiv.appendChild(resultElement);
}

// Function to check the guess
function checkGuess(userGuess) {
    if (userGuess.length !== 5) {
        alert("Guess must be 5 letters!");
        return;
    }

    guessCount++;

    let result = "";

    // Compare each letter
    for (let i = 0; i < 5; i++) {
        if (userGuess[i] === secretWord[i]) {
            result += `${userGuess[i]} (Correct) `;
        } else if (secretWord.includes(userGuess[i])) {
            result += `${userGuess[i]} (Wrong position) `;
        } else {
            result += `${userGuess[i]} (Incorrect) `;
        }
    }

    // Display the result of the guess
    updateGuessResults(userGuess, result);

    // Check if the word is guessed correctly
    if (userGuess === secretWord) {
        alert("Congratulations! You've guessed the word!");
    } else if (guessCount >= maxGuesses) {
        alert(`Sorry, you've used all guesses! The word was: ${secretWord}`);
    }
}

// Event listener to handle user's guess input
document.getElementById("guess-btn").addEventListener("click", () => {
    const userGuess = document.getElementById("guess-input").value.toLowerCase();
    checkGuess(userGuess);
});

// Reset the game logic
function resetGame() {
    guessCount = 0;
    document.getElementById("guess-input").value = "";
    document.getElementById("guess-results").innerHTML = "";
    setSecretWord(); // Set a new secret word
}

// Event listener for resetting the game
document.getElementById("reset-btn").addEventListener("click", () => {
    resetGame();
});

// Initialize the game by setting the secret word
setSecretWord();
