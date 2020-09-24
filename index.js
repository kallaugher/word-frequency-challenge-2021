import quizQuestions from "./quiz_questions.json";
import commonEnglishWords from "./common_words.json";

// The percentage that must be reached to be considered a successful answer.
const SUCCESS_BOUNDARY = 0.5;
// The number of occurrences required for a word to be considered meaningful.
const FREQUENCY_COUNT_BOUNDARY = 40;
// In order to be considered a frequent occurrence, a word must occur on average twice as many times
// in one type of question than the other type.
const WORD_RATIO_BETWEEN_TYPES = 2;

const commonWords = new Set(commonEnglishWords);
const questionCount = { correct: 0, incorrect: 0 };
const wordCount = { correct: {}, incorrect: {} };
const highestFrequencyWords = { correct: {}, incorrect: {} };

const isQuestionCorrect = (question) =>
  question.percent_correct >= SUCCESS_BOUNDARY ? "correct" : "incorrect";

const getOppositeQuestionType = (key) => key === "correct" ? "incorrect" : "correct";

const sanitizeWord = (word) => word.toLowerCase().trim();

// Gather counts for each word by type and identify frequent words.
quizQuestions.forEach((question) => {
  const questionType = isQuestionCorrect(question);
  const oppositeType = getOppositeQuestionType(questionType);

  questionCount[questionType] = questionCount[questionType] + 1;

  const words = question.text.split(/\W+/);

  words.forEach((word) => {
    const sanitizedWord = sanitizeWord(word);

    if (commonWords.has(sanitizedWord)) {
      return;
    }

    const newWordCount = wordCount[questionType][sanitizedWord]
      ? wordCount[questionType][sanitizedWord] + 1
      : 1;
    wordCount[questionType][sanitizedWord] = newWordCount;

    const oppositeTypeWordCount = wordCount[oppositeType][sanitizedWord]
      ? wordCount[oppositeType][sanitizedWord]
      : 0;
    const totalWordOccurences = newWordCount + oppositeTypeWordCount;

    if (totalWordOccurences > FREQUENCY_COUNT_BOUNDARY) {
      highestFrequencyWords[questionType][sanitizedWord] = newWordCount;
    }
  });
});

const getHighestFrequencyWordsByType = (questionType) =>
  Object.keys(highestFrequencyWords[questionType]).reduce(
    (mostFrequentWords, word) => {
      const count = highestFrequencyWords[questionType][word];
      const percentage = count / questionCount[questionType];
      const oppositeType = getOppositeQuestionType(questionType);
      const oppositeCount = highestFrequencyWords[oppositeType][word] || 0;
      const oppositePercentage = oppositeCount / questionCount[oppositeType];

      if (percentage > oppositePercentage * WORD_RATIO_BETWEEN_TYPES) {
        mostFrequentWords.push(word);
      }

      return mostFrequentWords;
    },
    []
  );

const mostFrequentWordsInCorrectQuestions = getHighestFrequencyWordsByType("correct");
const mostFrequentWordsInIncorrectQuestions = getHighestFrequencyWordsByType("incorrect");

console.log("Words used more frequently in questions students do well on:", mostFrequentWordsInCorrectQuestions);
console.log("Words used more frequently in questions students do poorly on:", mostFrequentWordsInIncorrectQuestions);
