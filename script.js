// Numero question actuelle
var currentQuestion=0;
var quizQuestions;
// Score
var totalScore=0;
// Indice used
indices = [];
// Nombre de vies
var vie = document.querySelectorAll(".fa-heart")
var nbreVies = vie.length -1;
// Numero du question
var questionActuel=document.getElementById('currentQuestion');
// Premier interface
var startScreen=document.querySelector('.start');
// Le deuxieme
var quizzScreen=document.querySelector('.quiz');
// Le troisieme
var resultSecreen=document.querySelector('.result');
// Time courant
var timeLeft=document.querySelector('.time-left');
// Affichage du score final
var score=document.getElementById('score');
// Ecran de question
var question=document.getElementById('question');
// Les options
var opt1=document.getElementById('opt1');
var opt2=document.getElementById('opt2');
var opt3=document.getElementById('opt3');
var opt4=document.getElementById('opt4');
// Les boutons
boutonStart = document.querySelector(".next_bouton")
// Commun a tous les boutons
var boutonChoix=document.getElementsByClassName('btn');
// Bouton de validation
var passer=document.getElementById('next');

// ------------------------------------Fini les declarations
// ----------Reception des donnees
var request = new XMLHttpRequest();
request.open('GET', "questions.json");
request.responseType = 'json';
request.send();
request.onload = function() {
  quizQuestions = request.response;
  console.log(quizQuestions.length)
}

// Debut; cacher les deux interfaces:fin et game
function initialize() {
  quizzScreen.classList.add("hidden");
  resultSecreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
initialize();

// Bouton demarrage active
boutonStart.addEventListener("click",(e)=>{
  // Cacher les deux autres pages
  quizzScreen.classList.remove("hidden");
  startScreen.classList.add("hidden");
  poserQuestions();
})
// Quand on passe
passer.addEventListener("click",()=>{
  wrongAnswer();
})
// Quand on fait le choix parmi les 4
// Generation d'un ordre aleatoire

for (let i = 0; i < boutonChoix.length; i++) {
  boutonChoix[i].addEventListener("click",()=>{
    // S'il a trouve
    if (boutonChoix[i].innerHTML == quizQuestions[indices[indices.length-1]].ans) {
      currentQuestion++;
      totalScore++;
      boutonChoix[i].classList.add("true");
      setTimeout(()=>{        
        boutonChoix[i].classList.remove("true");
        poserQuestions();
      },500)
    } else {
      // Si elle a fausse, on cherche l'index de l'element faux et on le met en rouge, puis celui du vrai en
      // 
      let k=0;
      for (let j = 0; j < boutonChoix.length; j++) {
        if (boutonChoix[j].innerHTML == quizQuestions[indices[indices.length-1]].ans){
          k = j;
          boutonChoix[i].classList.add("false");
          boutonChoix[k].classList.add("true");
  
          setTimeout(()=>{        
            boutonChoix[i].classList.remove("false");
            boutonChoix[k].classList.remove("true");
            wrongAnswer();
          },500)
          break;
        }
      }

    }
  }) 
}

//------ Les fonctions
// Quand on pose une question
function poserQuestions() {
  ordre = []
  for (let i = 0; i <4; i++) {
    ordre[i] = nombre_aleatoire(ordre,4)
  }
  questionNum = nombre_aleatoire(indices,quizQuestions.length)
  questionActuel.innerHTML = parseInt(currentQuestion) +1
  // Redaction des questions
  question.innerHTML = "<h2>" + quizQuestions[questionNum].question + "</h2>"
  // Redaction des differentes options
  for (let j = 0; j < boutonChoix.length; j++) {
    boutonChoix[j].innerHTML = quizQuestions[questionNum].choices[ordre[j]]
  }
}
// Quand on a fausse
function wrongAnswer(){
  if(nbreVies >0 ){
    // Enlever une vie
    vie[nbreVies].classList.remove("couleur_vie")
    nbreVies--;
    // Aller question suivante
    currentQuestion++;
    poserQuestions()
  }else{
    resultSecreen.classList.remove("hidden");
    quizzScreen.classList.add("hidden");
    score.innerHTML = totalScore;
    
  }
}
// Generation d'un nombre aleatoire
function nombre_aleatoire(tab,max) {
  valeur = parseInt(Math.random()*(max))
  if(tab.length != max){
    while (tab.indexOf(valeur) != -1) {
      valeur = parseInt(Math.random()*(max))
    }
  }else{
    return []
  }
  tab.push(valeur);
  return valeur;
}