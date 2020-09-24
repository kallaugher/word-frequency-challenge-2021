## Instructions

- Clone this repo
- Run `npm install`
- Run `npm start`

Results will be printed in the terminal.

## External dependencies

- [Node.js](https://nodejs.org/en/)

## Exercise instructions

- What words or phrases appear more frequently in questions that students tend to do poorly on, and what appear more frequently in questions that students do well on?

- We think this exercise should take about one hour. Please do not spend more than three hours working on it. Include a brief write-up of your solution and results in the body of your reply. You may respond to this email with questions.

- Python or JavaScript are fundamental competencies at Newsela. We suggest code be written in one of these languages, but it is not a requirement. Reference any dependencies using a standard format. We should be able to get the code running ourselves.

- There's no one right answer here, but there are more or less meaningful results. Well-documented code is a plus but not necessary. Our expectation is that we can follow your thought process. If you get different results using different methods you may include any that you find interesting in your response.

Hints:

- It's acceptable to define "questions students did poorly/well on" as questions with percent correct values of less than 50% or greater than 50%, respectively. There may be other approaches or cutoff values that yield different results.

- Consider how many appearances of a word there needs to be in order to say something about it. There may be words that should be excluded or sanitized.

## Questions and assumptions

### How do we define a question that a student does well on vs. one they do poorly on?

A question a student does well on is defined here as above 50%. This can be changed by editing `SUCCESS_BOUNDARY`.

Note on naming: As we're treating the success of each question as binary, I'm using "correct" vs. "incorrect" in the code to refer to the students' performance on each question.

### How many times does the word need to occur to be meaningful?

I've arbitrarily set this as 40 occurrences. This can be changed by editing `FREQUENCY_COUNT_BOUNDARY`.

### How do we account for the difference in number of correct vs. incorrect questions?

There are almost twice as many correct questions as incorrect ones. To account for this I'm comparing the percentage of word occurrences in each set of questions, rather than the raw count.

### How do we define "more frequently"? 

Technically "more frequently" could mean a word occurred a single additional time for one question type, which would not be meaningful statistically. I'm considering "more frequently" to mean "proportionally, this word occurs at least twice as many times in one question type vs the other". This ratio can be changed by editing `FREQUENCY_RATIO_BETWEEN_TYPES`.

## Results

Word used frequently in questions students do well on: [
  'mean',      'found',
  'parents',   'disease',
  'difficult', 'rules',
  'fire',      'growing',
  'since',     'discovery',
  'suggest',   'education',
  'accurate',  'live',
  'selection'
]

Word used frequently in questions students do poorly on: [
  'evidence',  'pro',
  'argument',  'something',
  'con',       'paragraphs',
  'claim',     'point',
  'draws',     'tone',
  'animal',    'kind',
  'structure', 'little'
]

Questions that students do poorly on seem to include more words that could refer directly to textual analysis (e.g. "structure", "paragraphs", "evidence", "argument", "tone", "pro", "con", "point", "claim"). By contrast, questions students do well on seem to include more words that could refer to the text's content rather than its structure ("parents", "disease", "fire", "education", "live").

## Sources:

- [Common words source](https://www.englishclub.com/vocabulary/common-words-100.htm) (with some additions)

