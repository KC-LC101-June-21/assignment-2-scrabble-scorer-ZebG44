// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simplePointStructure = {
  1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
  };

const vowelPointStructure = {
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z' ],
  3: ['A', 'E', 'I', 'O', 'U']
  };

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
	  for (let i = 0; i < word.length; i++) {
 	    for (const pointValue in oldPointStructure) {
 		    if (oldPointStructure[pointValue].includes(word[i])) {
          letterPoints += Number(pointValue);
		    }
      }
	  }
	return letterPoints;
 }
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let wordToScore = '';
function initialPrompt() {
    console.log("Let's play some scrabble!");
    console.log();
    wordToScore = input.question("Enter a word to score: ");
  return wordToScore;
};

const simpleScore = function(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
      for (const pointValue in simplePointStructure) {
        if (simplePointStructure[pointValue].includes(word[i])) {
          letterPoints += Number(pointValue);
        } 
      }
    }
  return letterPoints; 
}

const vowelBonusScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
  	  for (const pointValue in vowelPointStructure) {
    		if (vowelPointStructure[pointValue].includes(word[i])) {
          letterPoints += Number(pointValue);
		    }
 	    } 
	  }
  return letterPoints;
}

let scrabbleScore = function(word) {
  word = word.toLowerCase();
    let letterValueTotal = 0;
      for (let i = 0; i < word.length; i++) {
        letterValueTotal += (newPointStructure[word.charAt(i)] || 0);
   	  }
  return letterValueTotal;
};

const scoringAlgorithms = [
  {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scorerFunction: simpleScore
  },
  {
    name: 'Bonus Vowels',
    description: 'Vowels are 3pts, consonants are 1 pt.',
    scorerFunction: vowelBonusScore
  },
  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scorerFunction: scrabbleScore
  }
];

let algorithm = '';
  function scorerPrompt() {
    const input = require("readline-sync");
      algorithm = input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 Points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);

 for (let i=0; i < scoringAlgorithms.length; i++){
  if (algorithm == '0') {
   console.log(`Score for '${wordToScore}': ${scoringAlgorithms[0].scorerFunction(wordToScore)}`);
  }
  else if (algorithm == '1') {
    console.log(`Score for '${wordToScore}': ${scoringAlgorithms[1].scorerFunction(wordToScore)}`);

  } else if (algorithm == '2') {
    console.log(`Score for '${wordToScore}': ${scoringAlgorithms[2].scorerFunction(wordToScore)}`);

    }  else if (algorithm !== '0' || '1' || '2') 
          console.log('Try again');

 return algorithm;
 }
};

let newPointStructure = transform(oldPointStructure);

function transform(oldObj) {
  let newPointStructure = [];
    for (const [letterValue, letterArr] of Object.entries(oldObj)) {
      for (const letter of letterArr) {
        newPointStructure[letter.toLowerCase()] = Number(letterValue);
      }
    }
return newPointStructure;
}

function runProgram() {
  let wordToScore = initialPrompt();
  let algorithm = scorerPrompt(wordToScore);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

