const quizQuestions = [
  {
    question: "What is the capital city of Kenya?",
    options: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    answer: "Nairobi"
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Digital Ordinance Model",
      "Desktop Oriented Mode"
    ],
    answer: "Document Object Model"
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook"
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  },
  {
    question: "What will `typeof []` return in JavaScript?",
    options: ["array", "object", "list", "undefined"],
    answer: "object"
  },
  {
    question: "Which HTML tag is used to include JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which method is used to select an element by ID?",
    options: [
      "querySelectorAll()",
      "getElementById()",
      "getElementsByClassName()",
      "selectElement()"
    ],
    answer: "getElementById()"
  },
  {
    question: "Which array method creates a new array by applying a function to each element?",
    options: ["forEach()", "map()", "filter()", "reduce()"],
    answer: "map()"
  }
];

const quest = document.getElementById("quiz");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
let score = 0;
let index = 0;

// nextBtn.style.display = "block";
// DISPLAY QUESTIONS
function displayQuiz(){
  const questionNumber = index + 1;
  quest.textContent = `${questionNumber}. ${quizQuestions[index].question}`;
}
displayQuiz()

// DISPLAY OPTIONS
function displayOptions(){
  quizQuestions[index].options.forEach((option, i) => {
    const li = document.createElement("li");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "radioInputs"
    radio.id = "option" + i;
    radio.value = option;

    const label = document.createElement("label");
    label.htmlFor = "option" + i;
    label.textContent = option;

    li.appendChild(radio);
    li.appendChild(label);
    options.appendChild(li);
  })
}
displayOptions()

// CORRECT ANSWER
function correctAnswer(){
  const answer = quizQuestions[index].answer;
  return answer;
}

// USER OPTION
function userOption(){
  const selectedValue = document.querySelector('input[name="radioInputs"]:checked');
  // console.log(userChoice);
  if(selectedValue){
    const userChoice = selectedValue.value;
    return userChoice;
  }
}

// PROGRESS BAR
function updateProgressBar(){
  const progressBar = document.getElementById("progress-bar");

  const percentage = ( index / quizQuestions.length) * 100;
  progressBar.style.width = percentage + "%";
}

// NEXT BUTTON
nextBtn.addEventListener("click", ()=>{
  const answer = correctAnswer();
  const userChoice = userOption();

  if(!userChoice){
    document.getElementById("alert").textContent = "Please choose an option to continue!";
    return;
  }else{
    document.getElementById("alert").textContent = " ";
  }

  if(userChoice === answer){
    score += 3;
    console.log(score)
  }
  index++;
  updateProgressBar()

  if(index < quizQuestions.length){
    options.innerHTML = " ";
    displayQuiz();
    displayOptions();
  }else{
    quest.textContent = "Finished!";
    options.innerHTML = `<h3>Your Final Score is ${score}<h3>`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";

    restartBtn.addEventListener("click", ()=>{
      options.innerHTML = ``;
      nextBtn.style.display = "block";
      restartBtn.style.display = "none"
      index = 0;
      score = 0;
      updateProgressBar()
      displayQuiz();
      displayOptions();
    })
  }
})
