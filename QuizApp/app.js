let QnA = [
    {
        question:"What is the capital of Australia?",
        options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        answer: "Canberra"
    },
    {
        question:"Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        answer: "Mars"
    },
    {
        question:"Who painted the Mona Lisa?",
        options:["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        answer: "Leonardo da Vinci"
    },
    {
        question:"What is the longest river in the world?",
        options:["Amazon", "Yangtze", "Mississippi", "Nile"],
        answer:"Nile"
    },
    {
        question:"How many bones are in the adult human body?",
        options:["196", "206", "216", "226"],
        answer:"206"
    },
    {
        question:"Which country invented paper?",
        options:["Egypt", "India", "China", "Greece"],
        answer:"China"
    },
    {
        question:"What is the smallest planet in our solar system?",
        options:["Mars", "Pluto", "Mercury", "Venus"],
        answer:"Mercury"
    }
];


const ques = document.querySelector(".question");
const opt = document.querySelector(".options");
const next = document.querySelector(".next-btn");
const restart = document.querySelector('.restart');

let currentIndex = 0;
let answered = false;
let count = 0;

function check(event) {
    if(answered) return;
    answered = true;
    let button = event.target;
    let correctChoice = QnA[currentIndex].answer;
    
    
    if(button.textContent === correctChoice){
        button.style.background = "#63ff73";
        count++;
    } else {
        button.style.background = "#e45757";
        button.style.border = "2px solid #000";

        document.querySelectorAll(".option").forEach(btn => {
            if(btn.textContent === correctChoice){
                btn.style.background = "#63ff73";
            }
        });
    }
}

function loadQuestion() {
    answered = false;
    ques.textContent = QnA[currentIndex].question;

    QnA[currentIndex].options.forEach( option => {
    
    let button = document.createElement("button");
    button.className = "option";
    button.textContent = option;

    opt.appendChild(button);

    button.addEventListener('click', check);
});
}

loadQuestion();

next.addEventListener('click', function() {
    // QnAcont.innerHTML = '';

    if(!answered) {
        alert("Please select an answer!");
    } else {
        currentIndex++;

    if(currentIndex < QnA.length){
        ques.innerHTML = '';
        opt.innerHTML = '';
        loadQuestion();
    } else {
        opt.innerHTML = "";
        if(count === QnA.length){
            ques.textContent = `Hooray! You Scored ${count} out of ${QnA.length}.`;
        } else {
            ques.textContent = `You Scored ${count} out of ${QnA.length}. Better luck next time.`; // later add score 
        }
        next.style.display = "none";
      }
    }
    
});

restart.addEventListener('click', function() {
    if(confirm("Do you really want to restart?") === true){
        currentIndex = 0;
        count = 0;
        answered = false;
        ques.innerHTML = '';
        opt.innerHTML = '';
        loadQuestion();
        next.style.display = "block";
    } 
    
})
