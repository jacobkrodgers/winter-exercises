/*
 *  index.ts
 *  Project: First Exercise
 *
 *  Author: Jaob Rodgers
 *  Created on: Jan 19, 2023
 */

// Create Candidate type
type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
  percentage: number;
};

// Create merge function
function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
  const combinedArray: Array<number> = [];

  let i = 0;
  while (i < arr1.length || i < arr2.length) {
    if (i < arr1.length) {
      combinedArray.push(arr1[i]);
    }

    if (i < arr2.length) {
      combinedArray.push(arr2[i]);
    }
    i += 1;
  }

  return combinedArray;
}

// Create checWord function
function checkWord(attemptedWord: string, secretWord: string): string {
  let wordCheck: string = '';
  for (let i = 0; i < attemptedWord.length; i += 1) {
    if (attemptedWord[i] === secretWord[i]) {
      wordCheck += 'c';
    } else if (secretWord.includes(attemptedWord[i])) {
      wordCheck += 'p';
    } else {
      wordCheck += 'a';
    }
  }

  return wordCheck;
}

// Sum number arrays for handling candidate votes
function sumArray(array: Array<number>): number {
  let sum: number = 0;
  for (const num of array) {
    sum += num;
  }
  return sum;
}

// Driver code =======================================================

const array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const array2: Array<number> = [18, 74, 88, 3];

// Test merge function
const mergedArray: Array<number> = merge(array1, array2);
const mergedArray2: Array<number> = merge(array2, array1);

console.log(mergedArray);
console.log(mergedArray2);
console.log();

// Test checkWord function
const attempts = ['rains', 'shout', 'scope', 'spoke'];

for (const word of attempts) {
  const result = checkWord(word, 'spoke');
  console.log(result);
}

// Create array of Candidates using Candidate type
const candidates: Array<Candidate> = [
  {
    name: 'Edward Underwood',
    votes: [192, 147, 186, 114, 267],
    funding: 58182890,
    percentage: 0,
  },
  {
    name: 'Rose Olson',
    votes: [48, 90, 12, 21, 13],
    funding: 78889263,
    percentage: 0,
  },
  {
    name: 'Leonard Willis',
    votes: [206, 312, 121, 408, 382],
    funding: 36070689,
    percentage: 0,
  },
  {
    name: 'Nathaniel Taylor',
    votes: [37, 21, 38, 39, 29],
    funding: 6317921937,
    percentage: 0,
  },
];

// Display candidate votes and percentages of total votes

// Total votes
let totalVotes = 0;

for (const candidate of candidates) {
  totalVotes += sumArray(candidate.votes);
}

console.log('\n================================');
console.log('Candidate votes and percentages:');
console.log('================================\n');

// Calculate and display votes/percentages
for (const candidate of candidates) {
  const votes: number = sumArray(candidate.votes);

  console.log(
    `Name: ${candidate.name}
Votes: ${votes}
Percentage of votes: ${Math.round((votes / totalVotes) * 100)}%`
  );
  console.log('--------------------------------');
}

// Compute candidate percentages by precinct
const precinctTotals: Array<number> = [0, 0, 0, 0, 0];

for (const candidate of candidates) {
  let i: number = 0;
  while (i < candidate.votes.length) {
    precinctTotals[i] += candidate.votes[i];
    i += 1;
  }
}

console.log('\n==================================');
console.log('Candidate Percentages by precinct:');
console.log('==================================\n');

// Display candidate percentages by precinct
let precinctCounter: number = 0;
while (precinctCounter < 5) {
  console.log(`Precinct ${precinctCounter + 1}:\n`);

  for (const candidate of candidates) {
    console.log(`Name: ${candidate.name}`);
    console.log(
      `Percentage: ${Math.round(
        (candidate.votes[precinctCounter] / precinctTotals[precinctCounter]) * 100
      )}%`
    );
    console.log('---------------------------------------');
  }
  console.log();
  precinctCounter += 1;
}

// Compute and display amount spent per vote by candidate
console.log('=================================');
console.log('Candidate amounts spent per vote:');
console.log('=================================\n');
for (const candidate of candidates) {
  console.log(`Name: ${candidate.name}`);
  console.log(
    `Amount spent per vote: $${Math.round(candidate.funding / sumArray(candidate.votes))}`
  );
  console.log('---------------------------------');
}

// Compute winner or run-off candidates
let winner = false;

for (const candidate of candidates) {
  const votePercentage = (sumArray(candidate.votes) / totalVotes) * 100;
  candidate.percentage = votePercentage;
  if (votePercentage > 50) {
    console.log(
      `The winner is ${candidate.name}, with ${Math.round(votePercentage)}% of the vote.`
    );
    winner = true;
    break;
  }
}

if (!winner) {
  const topCandidates: Array<Candidate> = [candidates[0], candidates[1]];

  let i = 0;
  while (i < topCandidates.length) {
    for (const candidate of candidates) {
      if (
        candidate.percentage > topCandidates[i].percentage &&
        !topCandidates.includes(candidate)
      ) {
        topCandidates[i] = candidate;
      }
    }
    i += 1;
  }
  console.log('\n=========================');
  console.log('Run-offs:');
  console.log('=========================\n');
  for (const candidate of topCandidates) {
    console.log(`Name: ${candidate.name}`);
    console.log(`Percentage: ${Math.floor(candidate.percentage)}`);
    console.log('-------------------------');
  }
}
