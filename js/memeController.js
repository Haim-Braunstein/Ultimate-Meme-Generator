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
        // gCtx.font = `${mems.lines[mems.selectedLineIdx].size + 'px'} impact`
        // gCtx.fillStyle = mems.lines[mems.selectedLineIdx].color
        // gCtx.fillText(mems.lines[mems.selectedLineIdx].txt, mems.lines[mems.selectedLineIdx].x, mems.lines[mems.selectedLineIdx].y)
        // gCtx.fillText(mems.lines[1].txt, 300, 600)


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

                onLineClicked(textWidth, textHeight)

                gCtx.strokeRect(line.x - 5, line.y - textHeight, textWidth + 10, textHeight + 5)

            }
        })
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
    const mems = getMeme()

    const selectedLineIdx = mems.selectedLineIdx;
    const selectedLine = mems.lines[selectedLineIdx]

    if (selectedLine.size > 1) {
        selectedLine.size--;
    }

    gCtx.font = selectedLine.size + 'px impact';
    renderMeme()
}

function onIncreaseFontSize() {
    const mems = getMeme()

    const selectedLineIdx = mems.selectedLineIdx;
    const selectedLine = mems.lines[selectedLineIdx]
    if (selectedLine.size > 1) {
        selectedLine.size++
        gCtx.font = selectedLine.size + 'px'
    }

    gCtx.font = selectedLine.size + 'px impact';
    renderMeme()

}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpg')
    gCtx.fillStyle = 'white'
    elLink.href = imgContent
}

function onAddLine() {
    let newLineTxt = prompt('Enter new line text')
    if (!newLineTxt) return
    setNewLineText(newLineTxt)
    renderMeme()
}

function onSwitchLine() {
    const mems = getMeme()
    mems.selectedLineIdx++

    if (mems.selectedLineIdx >= mems.lines.length) {
        mems.selectedLineIdx = 0
    }

    // SetSwitchLine(mems.selectedLineIdx)
    renderMeme()

}

function onLineClicked() {

    const mems = getMeme();
    const selectedLine = mems.lines[mems.selectedLineIdx];

    gElCanvas.addEventListener('click', (event) => {

        const canvasX = event.offsetX;
        const canvasY = event.offsetY;

        const textWidth = gCtx.measureText(selectedLine.txt).width;
        const textHeight = selectedLine.size;

        const textBottom = selectedLine.y;

        if (canvasX >= selectedLine.x && canvasX <= selectedLine.x + textWidth &&
            canvasY >= textBottom - textHeight && canvasY <= textBottom) {
            // setLineText(txt)
            renderMeme()
        }
    })

    return selectedLine

}

function onChooseFont({ value: font }) {

    setChooseFont(font)

}

function onAlignLeft() {
    const selectedLine = onLineClicked()
    selectedLine.x = 0
    renderMeme()

}

function onAlignRight() {
    const selectedLine = onLineClicked()
    const textWidth = gCtx.measureText(selectedLine.txt).width
    selectedLine.x = gElCanvas.width-(selectedLine.size+textWidth)
    renderMeme()
}

function onAlignCenter() {
    const selectedLine = onLineClicked()
    selectedLine.x = gElCanvas.width/2 - selectedLine.size
    renderMeme()
}

function onPositionUp() {
    const selectedLine = onLineClicked()
    if (selectedLine.y > 1) {
        selectedLine.y--
    }
    renderMeme()
}

function onPositionDown() {
    const selectedLine = onLineClicked()
    if (selectedLine.y > 1) {
        selectedLine.y++
    }
    renderMeme()
}

function onRemoveLine(){
    const mems = getMeme()
    
    const selectedLine = onLineClicked()
    removeLine(mems.selectedLineIdx)
    renderMeme()
}









