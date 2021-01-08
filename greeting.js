const form = document.querySelector(".js-greetingForm"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_ON = "showing";

function printHourlyMessage(text) {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
        greeting.innerText = `Good morning, ${text}!`;
    } else if (hour < 18) {
        greeting.innerText = `Good afternoon, ${text}.`;
    } else if (hour < 22) {
        greeting.innerText = `Good evening, ${text}.`;
    } else {
        greeting.innerText = `Good day, ${text}.`;
    }
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    printHourlyMessage(text);
}
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();