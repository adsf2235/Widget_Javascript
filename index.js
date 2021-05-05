
const clock = document.querySelector(".clock");
const user = document.querySelector(".user");
const taskInputDiv = document.querySelector(".taskInputDiv");
const taskInput = taskInputDiv.firstChild;
const whatToDo = document.querySelector(".whatToDo");
let whatToDo_LS = [];
const loadedToDo = localStorage.getItem("toDos");
const parsedToDo = JSON.parse(loadedToDo)


function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` :seconds}`
}

function makeTaskInput(){
    const taskInput = document.createElement("input");
    const taskInputDiv = document.querySelector(".taskInputDiv");

    taskInputDiv.appendChild(taskInput);
    
}

function saveWhatToDo(){
    localStorage.setItem("toDos", JSON.stringify(whatToDo_LS));
}

function handleX(event){
    const target = event.target;
    const targetLi = target.parentNode;
    
    whatToDo.removeChild(targetLi);

    const cleanToDo = whatToDo_LS.filter(function(toDo){
        return toDo.id !== parseInt(targetLi.id);
    });

    whatToDo_LS = cleanToDo
    saveWhatToDo();
}

function createWhatToDo(text){
        const li = document.createElement("li");
        const finBtn = document.createElement("button")
        const xBtn = document.createElement("button");
        const whatToDoObj = {
            text: text ,
            id : whatToDo_LS.length + 1
        };
        whatToDo_LS.push(whatToDoObj);

        xBtn.innerText = "❌";
        finBtn.innerText = "✅";
        li.innerText = text;
        whatToDo.appendChild(li);
        li.appendChild(finBtn);
        li.appendChild(xBtn);
        li.id = whatToDo_LS.length;
        saveWhatToDo()
        xBtn.addEventListener("click", handleX)
}

function handleSubmit(event){
    event.preventDefault();
    
    const loadedUser = localStorage.getItem("userName")
    if(loadedUser === null){
        const userName = document.querySelector(".userName");
        const userNameValue = userName.value;
        const userNameSpan = document.querySelector(".userNameSpan");
    
    userNameSpan.innerHTML="WelCome "+userNameValue +" What is your task?";
    userName.remove()
    localStorage.setItem("userName",userNameValue)
    makeTaskInput()
    }else{
        const taskInputDiv = document.querySelector(".taskInputDiv");
        const taskInput = taskInputDiv.firstChild;
        const inputValue = taskInput.value;
        createWhatToDo(inputValue)
    }
    
}


function loadTodo(){
    parsedToDo.forEach(function(toDo){
        createWhatToDo(toDo.text)
    })
}


function loadUser(){
    const userName = document.querySelector(".userName");
    const loadedUser = localStorage.getItem("userName")
    const userNameSpan = document.querySelector(".userNameSpan");
    const taskInputDiv = document.querySelector(".taskInputDiv");
    const taskInput = taskInputDiv.firstChild;
    const inputValue = localStorage.getItem("1")
    const li = document.createElement("li");
    const finBtn = document.createElement("button")
    const xBtn = document.createElement("button");

    if(loadedUser !== null){
        userNameSpan.innerHTML ="welcome " + loadedUser + " What is your task?"
        userName.remove()

        makeTaskInput()
        loadTodo()
        
    }
    
}



user.addEventListener("submit", handleSubmit)




function init(){
    loadUser()
    getTime()
    setInterval(getTime, 1000)
    

}

init()