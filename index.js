
const clock = document.querySelector(".clock");
const user = document.querySelector(".user");
const taskInputDiv = document.querySelector(".taskInputDiv");
const taskInput = taskInputDiv.firstChild;
const whatToDo = document.querySelector(".whatToDo");


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
        const li = document.createElement("li");
        li.innerText = inputValue;
        whatToDo.appendChild(li);
        console.log(taskInput.value)
    }
    
}

function loadUser(){
    const userName = document.querySelector(".userName");
    const loadedUser = localStorage.getItem("userName")
    const userNameSpan = document.querySelector(".userNameSpan");

    if(loadedUser !== null){
        userNameSpan.innerHTML ="welcome " + loadedUser + " What is your task?"
        userName.remove()
        makeTaskInput()
    }
    
}



user.addEventListener("submit", handleSubmit)




function init(){
    loadUser()
    getTime()
    setInterval(getTime, 1000)
    

}

init()