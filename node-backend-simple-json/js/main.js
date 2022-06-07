// document.querySelectorAll("button").addEventListener("click", run);
// let user_input = document.querySelectorAll("button").value;

const options = document.querySelectorAll("button");

//We included every button element into an array which allows us to use the method forEach to add an eventlistener to each button
Array.from(options).forEach((element) =>
  element.addEventListener("click", userchoice)
);

let user_input;
let user_rock;
let user_paper;
let user_scissor;
//this function grabs the user input and displays the animation. The function then calls the function run() which gathers the informaiton from our API
function userchoice(click) {
  if (click.target.classList.contains("rock")) {
    user_input = "rock";
    if (user_rock == true) {
      document.querySelector("#player-rock").classList.remove("hidden");
    } else {
      document.querySelector("#player-rock").classList.toggle("hidden");
    }
    document.querySelector("#player-paper").classList.add("hidden");
    document.querySelector("#player-scissors").classList.add("hidden");
    user_rock = true;
  } else if (click.target.classList.contains("paper")) {
    user_input = "paper";
    if (user_paper == true) {
      document.querySelector("#player-paper").classList.remove("hidden");
    } else {
      document.querySelector("#player-paper").classList.toggle("hidden");
    }
    document.querySelector("#player-rock").classList.add("hidden");
    document.querySelector("#player-scissors").classList.add("hidden");
    user_paper = true;
  } else if (click.target.classList.contains("scissors")) {
    user_input = "scissors";
    if (user_scissor == true) {
      document.querySelector("#player-scissors").classList.remove("hidden");
    } else {
      document.querySelector("#player-scissors").classList.toggle("hidden");
    }
    document.querySelector("#player-paper").classList.add("hidden");
    document.querySelector("#player-rock").classList.add("hidden");
    user_scissor = true;
  }
  run();
}

let computer_rock;
let computer_paper;
let computer_scissor;
async function run() {
  //Here we are fetching the API from our server.js file
  const res = await fetch(`/api?student=${user_input}`);
  const data = await res.json();
  //We grab the value from  json
  const bot_choice = data.result;

  if (bot_choice === "rock") {
    if (computer_rock == true) {
      document.querySelector("#bot-rock").classList.remove("hidden");
    } else {
      document.querySelector("#bot-rock").classList.toggle("hidden");
    }
    document.querySelector("#bot-paper").classList.add("hidden");
    document.querySelector("#bot-scissors").classList.add("hidden");
    computer_rock = true;
  } else if (bot_choice === "paper") {
    if (computer_rock == true) {
      document.querySelector("#bot-paper").classList.remove("hidden");
    } else {
      document.querySelector("#bot-paper").classList.toggle("hidden");
    }
    document.querySelector("#bot-rock").classList.add("hidden");
    document.querySelector("#bot-scissors").classList.add("hidden");
    computer_paper = true;
  } else {
    if (computer_scissor == true) {
      document.querySelector("#bot-scissors").classList.remove("hidden");
    } else {
      document.querySelector("#bot-scissors").classList.toggle("hidden");
    }
    document.querySelector("#bot-paper").classList.add("hidden");
    document.querySelector("#bot-rock").classList.add("hidden");
    computer_scissor = true;
  }

  //Here we decide if the outcome of the match was a draw, win for the user, or a loss
  if (user_input === bot_choice) {
    document.querySelector("#winner").textContent = `Draw!`;
  } else if (
    (user_input == "rock" && bot_choice == "scissors") ||
    (user_input == "paper" && bot_choice == "rock") ||
    (user_input == "scissors" && bot_choice == "paper")
  ) {
    document.querySelector(
      "#winner"
    ).textContent = `You win, congratulations!!`;
  } else {
    document.querySelector("#winner").textContent = `Bot wins :(`;
  }

  console.log(data);
  document.querySelector("#bot").textContent = `Bot chose: ${bot_choice}`;
  document.querySelector(
    "#personStatus"
  ).textContent = `You chose: ${user_input}`;
}
