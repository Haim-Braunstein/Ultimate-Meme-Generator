'use strict'

let gElCanvas
let gCtx


function onInit() {
    gElCanvas = document.querySelector('.img-canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}


function renderMeme() {
    const mems =  getMeme()
    const elImg = new Image()
    elImg.src = 'img/2.jpg'

    elImg.onload = () =>{
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = "30px impact"
	gCtx.fillStyle = 'black'
    console.log(mems.lines[0].txt);
    gCtx.fillText(mems.lines[0].txt, 10, 50)
    }
    
}

function onTextMeme(txt){
    setLineText(txt)
    renderMeme()
}








