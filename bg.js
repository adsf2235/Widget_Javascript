
const body = document.querySelector("body")
const randomNumber = genRandom()


function paintImage(imageNumber){
    const image = new Image()
    image.src=`images/${imageNumber + 1}.jpg`
    body.prepend(image)
    image.classList.add("bgimg")
}

function genRandom(){
    return Math.floor(Math.random() * 3)
}

function init(){
    paintImage(randomNumber)
}
init()