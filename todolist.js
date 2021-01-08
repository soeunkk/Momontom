const toDoBtn = document.querySelector(".js-toDoBtn"),
    toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const TODOFlAG_LS = "toDoFlag";

const UNSHOWN = "0",
    SHOWN = "1";

let toDos = [];

function saveCheckState(event) {
    const chkbox = event.target;
    const checkState = chkbox.checked;
    const label = chkbox.parentNode;
    const li = label.parentNode;
    for (i=0; i < toDos.length; i++) {
        if (toDos[i].id === parseInt(li.id)) {
            toDos[i].check = checkState;
            if (checkState) {
                label.querySelector("span").classList.add("complete");
            } else {
                label.querySelector("span").classList.remove("complete");
            }
        }
    }
    saveToDos();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();   
}

function saveFlag(flag) {
    localStorage.setItem(TODOFlAG_LS, flag);
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, chk) {
    const newId = toDos.length + 1;
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.classList.add("btn");
    const chkbox = document.createElement("input");
    chkbox.type="checkbox";
    chkbox.addEventListener("click", saveCheckState)
    chkbox.checked = chk;
    chkbox.id = newId;
    const delBtn = document.createElement("input");
    delBtn.type="button";
    delBtn.value="Del";
    delBtn.classList.add("delBtn");
    delBtn.classList.add("btn");
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    if (chk)  {
        span.classList.add("complete");
    }
    label.appendChild(chkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
        check: chkbox.checked
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue, false);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
                paintToDo(toDo.text, toDo.check);
        });
    }
}

function splitscreen() {
    document.querySelector(".js-clock").classList.add("leaningLeft");
    document.querySelector(".js-greetingPart").classList.add("leaningLeft");
    document.querySelector(".js-greetingPart").classList.add("widthResize");
    document.querySelector(".js-greetingForm").classList.add("widthResize");
    document.querySelector(".js-greetings").classList.add("leaningLeft");
    document.querySelector(".js-search").classList.add("leaningLeft");
    document.querySelector(".js-search").classList.add("widthResize");
    document.querySelector(".js-searchForm").classList.add("widthResize");
    document.querySelector(".js-toDo").classList.add("showing");
    toDoInput.focus();
}

function fullscreen() {
    document.querySelector(".js-clock").classList.remove("leaningLeft");
    document.querySelector(".js-greetingPart").classList.remove("leaningLeft");
    document.querySelector(".js-greetingPart").classList.remove("widthResize");
    document.querySelector(".js-greetingForm").classList.remove("widthResize");
    document.querySelector(".js-greetings").classList.remove("leaningLeft");
    document.querySelector(".js-search").classList.remove("leaningLeft");
    document.querySelector(".js-search").classList.remove("widthResize");
    document.querySelector(".js-searchForm").classList.remove("widthResize");
    document.querySelector(".js-toDo").classList.remove("showing");
    document.querySelector(".js-searchInput").focus();
}

function handleBtn(event) {
    if (toDoBtn.value === UNSHOWN) {
        toDoBtn.value = SHOWN;
        splitscreen();
        saveFlag(true);
    } else {
        toDoBtn.value = UNSHOWN;
        fullscreen();
        saveFlag(false);
    }
}

function initToDoBtn() {
    toDoBtn.classList.add("btn");
    toDoBtn.addEventListener("click", handleBtn);
}

function loadFlag() {
    const currentFlag = localStorage.getItem(TODOFlAG_LS);
    if (currentFlag === null || currentFlag === "false") {
        toDoBtn.value = UNSHOWN;
    } else {
        toDoBtn.value = SHOWN;
        splitscreen();
    }
}

function init() {
    loadFlag();
    initToDoBtn();
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();