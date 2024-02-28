'use strict'

let gElCanvas
let gCtx


function onInit() {
    renderMeme()
}

function renderMeme() {
    const mems =  getMeme()
 
    gElCanvas = document.querySelector('.img-canvas')
    gCtx = gElCanvas.getContext('2d')

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    
    gCtx.font = "30px Arial"
	gCtx.fillStyle = 'black'
    gCtx.fillText(mems.lines[0].txt, 30, 80)

    drawImg()
   

}


function drawImg() {
    const elImg = new Image()
    elImg.src = 'img/2.jpg'

    // Draw the image on the canvas only when it's ready

    elImg.onload = () =>
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


