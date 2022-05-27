// document.querySelectorAll("button").addEventListener("click", run);
// let user_input = document.querySelectorAll("button").value;

const options = document.querySelectorAll("button");

//We included every button element into an array which allows us to use the method forEach to add an eventlistener to each button
Array.from(options).forEach((element) =>
  element.addEventListener("click", userchoice)
);

let user_input;
//this function grabs the user input and then calls the function run() which gathers the informaiton from our API
function userchoice(click) {
  if (click.target.classList.contains("rock")) {
    user_input = "rock";
  } else if (click.target.classList.contains("paper")) {
    user_input = "paper";
  } else if (click.target.classList.contains("scissors")) {
    user_input = "scissors";
  }
  run();
}
async function run() {
  //Here we are fetching the API from our server.js file
  const res = await fetch(`/api?student=${user_input}`);
  const data = await res.json();
  //We grab the value from  json
  const bot_choice = data.result;

  //Here we decide if the outcome of the match was a draw, win for the user, or a loss
  if (user_input === bot_choice) {
    document.querySelector("#winner").textContent = `Draw!`;
  } else if (
    (user_input == "rock" && bot_choice == "scissors") ||
    (user_input == "paper" && bot_choice == "rock") ||
    (user_input == "scissors" && bot_choice == "rock")
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
