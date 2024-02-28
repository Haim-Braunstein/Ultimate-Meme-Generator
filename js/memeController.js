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
    const mems = getMeme()
    const elImg = new Image()
    mems.selectedImgId
    elImg.src = `img/${mems.selectedImgId}.jpg`

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = `${mems.lines[0].size + 'px'} impact`
        gCtx.fillStyle = mems.lines[0].color
        gCtx.fillText(mems.lines[0].txt, 300, 50)
    }

}

function onTextMeme(txt) {
    setLineText(txt)
    renderMeme()
}

function onSetColor(elInputColor) {
    setColor(elInputColor)
}

function onDecreaseFontSize() {
    var mems = getMeme()
    var fontSize = mems.lines[0].size
    if (fontSize > 1) {
        fontSize--
        gCtx.font = fontSize + 'px'
        renderMeme()
    }

    ChangeFontSize(fontSize)
}

function onIncreaseFontSize() {
    var mems = getMeme()
    var fontSize = mems.lines[0].size
    if (fontSize > 1) {
        fontSize++
        gCtx.font = fontSize + 'px'
        renderMeme()
    }

    ChangeFontSize(fontSize)
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpg')
    gCtx.fillStyle = 'white'
    elLink.href = imgContent
}

function onAddLine() {
    const mems = getMeme()
    var newLineTxt = prompt('Enter new line text')
    console.log(newLineTxt);

    mems.lines[1].txt = newLineTxt

    gCtx.font = `${mems.lines[1].size + 'px'} impact`
    gCtx.fillStyle = mems.lines[1].color
    gCtx.fillText(mems.lines[1].txt, 300, 600)

}








