
const clock = document.querySelector(".clock");
const user = document.querySelector(".user");
const taskInputDiv = document.querySelector(".taskInputDiv");
const taskInput = taskInputDiv.firstChild;
const whatToDo = document.querySelector(".whatToDo");
const fin = document.querySelector(".finish");
let whatToDo_LS = [];
let fin_LS=[];
const loadedToDo = localStorage.getItem("toDos");
const loadedFin = localStorage.getItem("fin");
const parsedToDo = JSON.parse(loadedToDo)
const parsedFin = JSON.parse(loadedFin)


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
    localStorage.setItem("toDos", JSON.stringify(whatToDo_LS))
    
}

function saveFin(){
    localStorage.setItem("fin", JSON.stringify(fin_LS));
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

function handleXFin(event){
    const target = event.target;
    const targetLi = target.parentNode;
    
    fin.removeChild(targetLi);

    const cleanToDo = fin_LS.filter(function(toDo){
        return toDo.id !== parseInt(targetLi.id);
    });

    fin_LS = cleanToDo
    saveFin();
}

function handleReturn(event){
    const targetReturn = event.target;
    const targetReturnLi = targetReturn.parentNode;
    const targetReturnSpan = targetReturnLi.firstChild;
    const targetReturnValue = targetReturnSpan.innerText;

    console.log(targetReturnLi)
    createWhatToDo(targetReturnValue)
    handleXFin(event)
    
}

function createFinish(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const returnBtn = document.createElement("button")
    const xBtn = document.createElement("button");
    const finObj = {
        text: text ,
        id : fin_LS.length + 1
    };
    fin_LS.push(finObj);

    xBtn.innerText = "❌";
    returnBtn.innerText = "⏯";
    span.innerText = text;
    fin.appendChild(li);
    li.appendChild(span);
    li.appendChild(returnBtn);
    li.appendChild(xBtn);
    li.id = fin_LS.length;
    
    xBtn.addEventListener("click", handleXFin)
    returnBtn.addEventListener("click", handleReturn)
    saveFin()
}

function handleFin(event){
    const targetFin = event.target;
    const targetFinLi = targetFin.parentNode;
    const targetFinSpan = targetFinLi.firstChild;
    const targetFinValue = targetFinSpan.innerText;

    console.log(targetFinValue)

    createFinish(targetFinValue)
    handleX(event)
    
}

function createWhatToDo(text){
        const li = document.createElement("li");
        const span =document.createElement("span");
        const finBtn = document.createElement("button")
        const xBtn = document.createElement("button");
        const whatToDoObj = {
            text: text ,
            id : whatToDo_LS.length + 1
        };
        whatToDo_LS.push(whatToDoObj);

        span.innerText = text;
        xBtn.innerText = "❌";
        finBtn.innerText = "✅";
        li.appendChild(span);
        li.appendChild(finBtn);
        li.appendChild(xBtn);
        whatToDo.appendChild(li);
        li.id = whatToDo_LS.length;
        saveWhatToDo()
        xBtn.addEventListener("click", handleX)
        finBtn.addEventListener("click", handleFin)
        
        
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
        taskInput.value = "";
        
    }
    
}


function loadTodo(){
    parsedToDo.forEach(function(toDo){
        createWhatToDo(toDo.text)
    })
    parsedFin.forEach(function(toDo){
        createFinish(toDo.text)
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