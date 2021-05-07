
const body = document.querySelector("body")
const randomNumber = genRandom()



function paintImage(image){
    
    
    body.prepend(image)
    image.classList.add("bgimg")
}

function handleImage(imageNumber){
    const image = new Image()
    image.src=`images/${imageNumber + 1}.jpg`
    image.addEventListener("load", paintImage(image))
}

function genRandom(){
    return Math.floor(Math.random() * 3)
}

function init(){
    handleImage(randomNumber)
}
init()