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

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// don't change the names or your program won't work as expected. //
function initialPrompt() {
 console.log("Let's play some scrabble! ");
 question = input.question("\nEnter a word to score: ");
  return question;
};


function simpleScore(word) {
  let a = 0;
  for (i = 0; i < word.length; i++) {
    a++;
  }
  return a;
}

function vowelBonusScore(word) {
  let vowels = 'aeuio';
  let vowelBonusScore = 0;
  
  for(let i = 0; i < word.length ; i++) {
    if (vowels.includes(word[i].toLowerCase())) {
      vowelBonusScore += 3;
    }
    if (!vowels.includes(word[i].toLowerCase())){
      vowelBonusScore +=1
    }
  }
  return vowelBonusScore;
}

function transform(oldPointStructure){
	let newPointStructure = {};
  for(keys in oldPointStructure){
      for(let value in oldPointStructure){
       let letters = oldPointStructure[keys];
			 for (let index = 0; index < letters.length; index++){
         newPointStructure[letters[index].toLowerCase()] = Number(keys)
       }
      }
    }
		return newPointStructure;  
	}

 let newPointStructure = transform(oldPointStructure);

function scrabbleScore (wordToScore){
  let letterPoints = 0;
  let userAnswer = question.toLowerCase();
	for (let i = 0; i < userAnswer.length; i++) {
    if (userAnswer[i] in newPointStructure){
    letterPoints+= newPointStructure[userAnswer[i]]
    }
	}
  return letterPoints;
 }


const scoringAlgorithms = [
{
	name: "Simple Score",
	description: "Each letter is worth 1 point.",
	scoringFunction: simpleScore
 },
 {
	 name: "Bonus Vowels",
	 description: "Vowels are 3 pts, consonants are 1 pt.",
	 scoringFunction: vowelBonusScore
 },
{
	 name: "Scrabble",
	 description: "The traditional scoring algorithm.",
	 scoringFunction: scrabbleScore
 },
];

function scorerPrompt(parameter) {
  // let userAnswer = scoringAlgorithms[0].name
  let options = ("\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n");
  let selectedOptions = input.question(`Which scoring algorithm would you like to use?${options}Enter 0, 1, or 2: `); 
  selectedOptions = Number(selectedOptions);
  if (selectedOptions === 0) {
    console.log(`Score for '${question}': ${scoringAlgorithms[0].scoringFunction(question)}`);
  } else if (selectedOptions === 1) {
    // console.log("algorithm name: ", scoringAlgorithms[1].name);
    console.log(`Score for '${question}': ${scoringAlgorithms[1].scoringFunction(question)}`);
  } else if (selectedOptions === 2) {
    // console.log("algorithm name: ", scoringAlgorithms[2].name);
    console.log(`Score for '${question}': ${scoringAlgorithms[2].scoringFunction(question)}`);
  } else if (selectedOptions === isNaN || selectedOptions >=3){
    console.log("Invalid Input")
  }
  return selectedOptions;
}

function runProgram(algorithms) {
  initialPrompt();
  scorerPrompt();
  // scrabbleScore();
}
// runProgram(scoringAlgorithms)
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

