'use strict'

let gElCanvas
let gCtx
let isDragging = false
let gStartPos
const MEME_DB = 'memeDB'

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('.img-canvas')
    gCtx = gElCanvas.getContext('2d')
     
    // resizeCanvas()
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

        mems.lines.forEach((line, index) => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color

            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeStyle = 'black'
            gCtx.strokeText(line.txt, line.x, line.y)
            if (!line.txt) return
            if (index === mems.selectedLineIdx) {
                gCtx.strokeStyle = 'black'
                gCtx.lineWidth = 1

                const textWidth = gCtx.measureText(line.txt).width
                const textHeight = line.size;


                gCtx.strokeRect(line.x - 5, line.y - textHeight, textWidth + 10, textHeight + 5)
            }
        })
    }

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth


}

function onTextMeme({value, placeholder}) {
    const selectedLine = onLineClicked()

    setLineText(value, selectedLine)
    updatePlaceHolder(value)

    renderMeme()

}

function onSetColor(elInputColor) {
    setColor(elInputColor)
    renderMeme()

}

function onDecreaseFontSize() {
    const mems = getMeme()

    const selectedLineIdx = mems.selectedLineIdx;
    const selectedLine = mems.lines[selectedLineIdx]

    if (selectedLine.size > 1) {
        selectedLine.size -= 5
    }

    gCtx.font = selectedLine.size + 'px impact';
    renderMeme()
}

function onIncreaseFontSize() {
    const mems = getMeme()

    const selectedLineIdx = mems.selectedLineIdx;
    const selectedLine = mems.lines[selectedLineIdx]
    if (selectedLine.size > 1) {
        selectedLine.size += 5
        gCtx.font = selectedLine.size + 'px'
    }

    gCtx.font = selectedLine.size + 'px impact';
    renderMeme()

}

function downloadImg(elLink) {
    const mems = getMeme()
    const imgContent = gElCanvas.toDataURL('image/jpg')
    gCtx.fillStyle = 'white'
    elLink.href = imgContent
}

function onAddLine() {


    addLine()
    renderMeme()
}

function onSwitchLine() {
    const mems = getMeme()
    mems.selectedLineIdx++

    if (mems.selectedLineIdx >= mems.lines.length) {
        mems.selectedLineIdx = 0
        
    }

    renderMeme()
}

function onLineClicked() {

    const mems = getMeme()
    const selectedLine = mems.lines[mems.selectedLineIdx]
    const elTextMeme = document.querySelector('.text-meme')
    updatePlaceHolder(selectedLine.txt)

    renderMeme()

    return selectedLine
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onMouseDown(ev) {
    const mems = getMeme()
    const lines = mems.lines;
    var elTextMeme = document.querySelector('.text-meme')

    const { offsetX, offsetY } = ev

    const clickedLine = lines.find(line => {
        const { x, y, size, txt } = line
        const textWidth = gCtx.measureText(txt).width
        const textHeight = size


        return offsetX >= x && offsetX <= x + textWidth &&
            offsetY >= y - textHeight && offsetY <= y
    })

    if (clickedLine) {
        handleClickedLine(clickedLine)
        isDragging = true;
        gStartPos = getEvPos(ev)
        updatePlaceHolder(clickedLine.txt)


        gElCanvas.addEventListener('mousemove', onMouseMove);
        gElCanvas.addEventListener('mouseup', onMouseUp);
    }
}

function onMouseMove(ev) {
    if (isDragging) {
        const mems = getMeme()
        const selectedLine = mems.lines[mems.selectedLineIdx]

        const { offsetX, offsetY } = ev
        const pos = getEvPos(ev)

        const dx = offsetX - gStartPos.x
        const dy = offsetY - gStartPos.y

        selectedLine.x += dx
        selectedLine.y += dy

        gStartPos = pos
        updatePlaceHolder(selectedLine.txt)

        renderMeme()
    }
}

function onMouseUp() {

    isDragging = false

    gElCanvas.removeEventListener('mousemove', onMouseMove)
    gElCanvas.removeEventListener('mouseup', onMouseUp)
}

function handleClickedLine(clickedLine) {
    const mems = getMeme()

    mems.selectedLineIdx = mems.lines.indexOf(clickedLine);

    renderMeme()

}

function onChooseFont({ value: font }) {

    setChooseFont(font)
    renderMeme()

}

function onAlignLeft() {
    const selectedLine = onLineClicked()
    const textWidth = gCtx.measureText(selectedLine.txt).width
    selectedLine.x = 0 + selectedLine.size
    renderMeme()
}

function onAlignRight() {
    const selectedLine = onLineClicked()
    const textWidth = gCtx.measureText(selectedLine.txt).width
    selectedLine.x = gElCanvas.width - (selectedLine.size + textWidth)
    renderMeme()
}

function onAlignCenter() {
    const selectedLine = onLineClicked()
    selectedLine.x = gElCanvas.width / 2 - selectedLine.size
    renderMeme()
}

function onPositionUp() {
    const selectedLine = onLineClicked()
    if (selectedLine.y > 1) {
        selectedLine.y -= 10
    }
    renderMeme()
}

function onPositionDown() {
    const selectedLine = onLineClicked()
    if (selectedLine.y > 1) {
        selectedLine.y += 10
    }
    renderMeme()
}

function onRemoveLine() {
    const mems = getMeme()
    removeLine(mems.selectedLineIdx)
    renderMeme()
}

function updatePlaceHolder(txt) {
  
    const elTextInput = document.querySelector('.text-meme')
    elTextInput.value =txt

    elTextInput.placeholder = txt
  }


function onSaveMeme() {

    localStorage.setItem('canvas', gElCanvas.toDataURL())
}

function showMeme() {
    const elMemeEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery')
    const elMemeSaved = document.querySelector('.memes-saved')

    elGallery.classList.add('hide')
    elMemeEditor.classList.add('hide')
    elMemeSaved.classList.remove('hide')

    const savedCanvasData = localStorage.getItem('canvas')
    console.log(savedCanvasData.data);

    if (savedCanvasData) {
        const img = new Image()

        img.src = savedCanvasData

        img.onload = function () {
            gCtx.drawImage(img, 0, 0)

            renderMeme()
        }
    }
}

function toggleMenu() {
    const body = document.body
    const backdrop = document.querySelector('.backdrop')
    
    body.classList.toggle('menu-open')
    backdrop.classList.toggle('show')
}










