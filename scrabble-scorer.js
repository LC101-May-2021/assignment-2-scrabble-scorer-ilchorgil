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
  return oldScrabbleScorer(question);
};
// console.log(initialPrompt());

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
	let scoresByLetter = {};
  for(key in oldPointStructure){
      for(let value in oldPointStructure){
       let letters = oldPointStructure[key];
			 for (let i=0; i<letters.length; i++){
         scoresByLetter[letters[i].toLowerCase()] = Number(key)
       }
      }
    }
		return scoresByLetter;  
	}

 let newPointStructure = transform(oldPointStructure);
 
function scrabbleScore (wordToScore){
  let letterPoints = 0;
	for (let i = 0; i < question.length; i++) {
    if (question[i] in newPointStructure){
    letterPoints+= newPointStructure[question[i]]
    }
	}
  return letterPoints;
 }


const scoringAlgorithms = [
{
	name: "Simple Score",
	description:"Each letter is worth 1 point.",
	scoreFunction: simpleScore
 },
 {
	 name:"Bonus Vowels",
	 description:"Vowels are 3 pts, consonants are 1 pt.",
	 scoreFunction:vowelBonusScore
 },
{
	 name: "Scrabble" ,
	 description: "The traditional scoring algorithm.",
	 scoreFunction: scrabbleScore
 },
];

function scorerPrompt(parameter) {
  let userAnswer = [];
  let options = ("\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n");
  let selectedOptions = input.question(`Which scoring algorithm would you like to use?${options}Enter 0, 1, or 2: `); 
  selectedOptions = Number(selectedOptions);
  if (selectedOptions === 0) {
    // console.log("algorithm name: ", scoringAlgorithms[0].name);
    console.log(`Score for '${question}': ${scoringAlgorithms[0].scoreFunction(question)}`);
  } else if (selectedOptions === 1) {
    // console.log("algorithm name: ", scoringAlgorithms[1].name);
    console.log(`Score for '${question}': ${scoringAlgorithms[1].scoreFunction(question)}`);
  } else if (selectedOptions === 2) {
    // console.log("algorithm name: ", scoringAlgorithms[2].name);
    console.log(`Score for '${question}': ${scoringAlgorithms[2].scoreFunction(question)}`);
  }
  return selectedOptions;
}

function runProgram() {
  initialPrompt();
  scorerPrompt();
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

