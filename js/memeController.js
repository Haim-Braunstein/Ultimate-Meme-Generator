'use strict'

let gElCanvas
let gCtx


function onInit() {
    gElCanvas = document.querySelector('.img-canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    renderGallery()
}


function renderMeme() {
    const mems =  getMeme()
    const elImg = new Image()
    mems.selectedImgId
    elImg.src = `img/${mems.selectedImgId}.jpg`

    elImg.onload = () =>{
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = `${mems.lines[0].size +'px'} impact`
	gCtx.fillStyle = mems.lines[0].color
    gCtx.fillText(mems.lines[0].txt, 10, 50)
    }
    
}

function onTextMeme(txt){
    setLineText(txt)
    renderMeme()
}








