'use strict'

// This is to choose Question form the quizQuestions const.
let pickQuestion; 

// Question Number Declared to Update the Question Numbers.
let questionNumber = 1;

// This is used to store the total correct score of the user.
let score = 0;

// Array Declared to generate Random Numbers 
let arr = [1,2,3,4,5,6,7,8,9,10];

// This const is the data store that is used to store the questions. options for questions and correct answer for that question.
const quizQuestions = {
  1: {
    question: 'Who makes a cameo in every Marvel movie?',
    option1: 'Jack Kirby',
    option2: 'Stan Lee',
    option3: 'Robert Downey Jr',
    option4: 'None of the above',
    answer: 'Stan Lee'
  },
  2: {      
    question: 'What was the first Marvel movie ever to be made?',
    option1: 'Captain America',
    option2: 'Black Panther',
    option3: 'The Incredible Hulk',
    option4: 'Iron Man',
    answer: 'Iron Man'
  },
  3: {
    question: 'Who has a shield as their main weapon and symbol?',
    option1: 'Captain America',
    option2: 'Nick Fury',
    option3: 'Black Widow',
    option4: 'Spiderman',
    answer: 'Captain America'
  },
  4: {
    question: 'What is the only line that Hulk says in the movie \"The Avengers\"?',
    option1: 'I am Groot',
    option2: 'Hulk, smash!',
    option3: 'Puny god',
    option4: 'He didn\'t say anything',
    answer: 'Puny god'
  },
  5: {
    question: 'Who is Captain America\'s best friend who became the Winter Soldier?',
    option1: 'Nick Fury',
    option2: 'Alexander Pierce',
    option3: 'Tony Stark',
    option4: 'Bucky Barnes',
    answer: 'Bucky Barnes'
  },
  6: {
    question: 'What does S.H.I.E.L.D. stand for?',
    option1: 'Secret Headquarters Incorporated and Executive Local Deals',
    option2: 'Strategic, Homeland, Intervention, and Logistics Division',
    option3: 'Strategic, Homeland, Individuals in Every Local Division',
    option4: 'Superhero Headquarters In Every Local Division',
    answer: 'Strategic, Homeland, Intervention, and Logistics Division'
  },
  7: {
    question: 'What is Tony Stark\'s father\'s first name?',
    option1: 'George',
    option2: 'Howard',
    option3: 'Henry',
    option4: 'Greg',
    answer: 'Howard'
  },
  8: {
    question: 'what color is Captain America\'s shield?',
    option1: 'Red, yellow, and blue',
    option2: 'Black',
    option3: 'Red, white, and blue',
    option4: 'Green, yellow, and gold',
    answer: 'Red, white, and blue'
  },
  9: {
    question: 'Whose main weapon is a bow and arrows?',
    option1: 'Hawkeye',
    option2: 'Dead Shot',
    option3: 'The Incredible Hulk',
    option4: 'Ant Man',
    answer: 'Hawkeye'
  },
  10: {
    question: 'Who is the main villain in the two part Avengers movie?',
    option1: 'Drax the Destroyer',
    option2: 'Thanos',
    option3: 'Ultron',
    option4: 'Hydra',
    answer: 'Thanos'
  }
};

// This is used to assign a random number to the pickQuestion variable so that a question can be picked every time the quiz is run.
function generateRandomNumbers(){
  let generateRandom = Math.ceil(Math.random()*arr.length);
  let number = arr[generateRandom-1];
  let position = arr.indexOf(number);
  pickQuestion = String(number);
  arr.splice(position,1);
};

// get the checked value of the radio button
function getCheckedVal(){
  let checkedVal = $('form').find("input:radio[name=option]:checked").val();
  return checkedVal;
}

// Get the Mazimum Questions that are present in the "quizQuestions" data store
function findMaximumNumber(){
  let totalQuestionGiven = Object.keys(quizQuestions);
  let largestNum = Number(totalQuestionGiven[0]);
  let questionLength = totalQuestionGiven.length;
  for(let i=0; i<questionLength ; i++){
    if(Number(totalQuestionGiven[i]) > largestNum){
      largestNum = Number(totalQuestionGiven[i]);
    }
  }
  return largestNum;
}

//Handle Start Quiz Again
function startQuizAgain(){
 $('.js-show-Result').on('click', '.start-Again', function(event){
   let quizheaderdiv = $('.js-container').find('.js-quiz-Start');
   arr = [1,2,3,4,5,6,7,8,9,10];
   score = 0;
   questionNumber = 1;
   event.stopPropagation();
   $(this).closest('.js-show-Result').addClass('remove-display');
   quizheaderdiv.find('.js-instructions').removeClass('remove-display');
   quizheaderdiv.removeClass('remove-display');
   quizheaderdiv.find('.js-start-Quiz-Button').removeClass('remove-display');
 });
 return;
}

// To handle the Final Score Result.
function showResult(){
  let totalQuestion = findMaximumNumber();
  let value= getCheckedVal();
  if(value === quizQuestions[pickQuestion].answer){
    score +=1;
  }
  const element = 
  `
  <p class=result-title>Quiz-Completed</p>
  <p class=final-score>Score - ${score}  out of ${totalQuestion}<p>
  <p class=start-Again><input type='button' value='Start Again'></p>
  `;
  $('.js-form').on('click', '.displayResult', function(){
    let container =  $('.js-container');
    let showResultDiv = container.find('.js-show-Result');
    showResultDiv.find('p').remove();
    showResultDiv.append(element);
    showResultDiv.removeClass('remove-display');
    container.find('.js-quiz-Start').addClass('remove-display');
    container.find('.js-form').addClass('remove-display');
    container.find('.js-score').addClass('remove-display');
  });
  startQuizAgain();
  return;
}

//handle the Last condition(when Last question is Displayed) of the Quiz.
function handleLastCondition(){
  let totalQuestion = findMaximumNumber();
  if(arr.length === 0){
    let nextButton = $('form').find('.js-next');
    let submitButton = $('form').find('.js-submit');
    nextButton.attr('value', 'Final-Score');
    nextButton.addClass('displayResult');
    showResult();
    return;
  }else{
    return;
  }
}

function removeFeedbackView(){
  let feedBackSelector = $('.js-feed-back');
  feedBackSelector.find('p').remove();
}


function correctAnswerView(){
  let value= getCheckedVal();
  let feedBackSelector = $('.js-feed-back');
  $(`input[value='${value}']`).closest("p").addClass('correct-Answer');
  const element = 
  `
  <p><span>You Got it Right !!! Kudos<span></p>
  <p>Correct Anwer is: <span>"${value}"</span></p>
  `;
  feedBackSelector.append(element);
  feedBackSelector.removeClass('remove-display');
  return ;
}

function wrongAnswerView(){
  let value= getCheckedVal();
  let correctAnswer = quizQuestions[pickQuestion].answer;
  let feedBackSelector = $('.js-feed-back');
  $(`input[value='${value}']`).closest("p").addClass('wrong-Answer');
  $(`input[value='${correctAnswer}']`).closest("p").addClass('correct-Answer');
  const element = 
  `
  <p><span>Sorry, the Answer is not correct !!!<span></p>
  <p>Correct Answer was: <span>"${correctAnswer}"</span></p>
  <p>Your Answer is: <span>"${value}"</span></p>
  `;
  feedBackSelector.append(element);
  feedBackSelector.removeClass('remove-display');
  return;
}

function handleClose(){
  $('#popup').on('click', '.close', function(){
    $(this).closest('#popup').addClass('remove-display');
  });
  return;
}

// Handles the form submission
function handleSubmit() {
  $('.js-form').submit(function(event){
    if(getCheckedVal()){
      event.preventDefault();
      handleLastCondition();
      $(this).find("input[type=radio]").attr('disabled', true);
      let value= getCheckedVal();
      if(value === quizQuestions[pickQuestion].answer){
        questionNumber +=1;
        score +=1;
        correctAnswerView();
        generateRandomNumbers();
      }else{
        questionNumber +=1; 
        wrongAnswerView();
        generateRandomNumbers();
      }
      $(this).find('.js-submit').attr('disabled', true);
      $(this).find('.js-next').attr('disabled', false);
      return;
    }else{
      event.preventDefault();
      // alert('No Value is Selected- Please select a value before Submission')
      $('#popup').removeClass('remove-display');
      handleClose();
      return;
    }
  });
}

// Handles the visiblity of Next question
function handleNext() {
  $('.js-form').on('click', '.js-next', function(){
    let fieldset = $(this).closest('fieldset');
    let feedBackSelector = $('.js-feed-back');
    feedBackSelector.addClass('remove-display');
    removeFeedbackView();
    fieldset.find('legend').remove();
    fieldset.find('p').remove();
    if(quizQuestions[pickQuestion]){
      renderQuestion();
      renderScore();
      return;
    }
    return;
  });
}

//renders the Question Div
function renderQuestion() {
  const element = 
  `<legend class='formlegend question'>${questionNumber}) ${quizQuestions[pickQuestion].question}</legend>
  <p class='formInputParagraph'>
  <input type="radio" name="option" role="radio" id="option_1" value="${quizQuestions[pickQuestion].option1}">
  <label for="option_1">${quizQuestions[pickQuestion].option1}</label>
  </p>
  <p class='formInputParagraph'>
  <input type="radio" name="option" role="radio" id="option_2" value="${quizQuestions[pickQuestion].option2}">
  <label for="option_2">${quizQuestions[pickQuestion].option2}</label>
  </p>
  <p class='formInputParagraph'>
  <input type="radio" name="option" role="radio" id="option_3" value="${quizQuestions[pickQuestion].option3}">
  <label for="option_3">${quizQuestions[pickQuestion].option3}</label>
  </p>
  <p class='formInputParagraph'>
  <input type="radio" name="option" role="radio" id="option_4" value="${quizQuestions[pickQuestion].option4}">
  <label for="option_4">${quizQuestions[pickQuestion].option4}</label>
  </p>
  <p class='formInputParagraph'>
  <input type="submit" value="Submit" class='submit js-submit'>
  <input type="button" value="Next" class='next js-next' disabled='disabled'>
  </p>
  `;
  $('.js-form').find('fieldset').append(element);
  return;
}

// renders the Score div
function renderScore(){
  let totalQuestion = findMaximumNumber();
  let scoreElement = $('.js-score')
  const element =
  `
  <div class="score-Content">
  <span>Question <em>${questionNumber}/${totalQuestion}</em></span>
  <span>Score <em>${score}</em></span>
  </div>
  `;
  scoreElement.find('span').remove();
  scoreElement.append(element);
  return;
}

// Start Quiz
function startQuiz() {
  $('.js-quiz-Start').on('click', '.js-start-Quiz-Button', function(event){
    event.stopPropagation();
    $('p').removeClass('remove-display');
    $('p').removeClass('wrong-Answer');
    $('.js-form').removeClass('remove-display');
    generateRandomNumbers();
    renderQuestion();
    renderScore();
    let container= $(this).closest('.js-container');
    $(this).addClass('remove-display');
    $(this).closest('.js-quiz-Start').find('.js-instructions').addClass('remove-display');
    container.find('.js-score').removeClass('remove-display');
    container.find('.js-form').addClass('form-align');
  });
  handleSubmit();
  handleNext();
  return;
}

// Entry point of our Code.
function main() {
  startQuiz();
  return;
}

$(main())