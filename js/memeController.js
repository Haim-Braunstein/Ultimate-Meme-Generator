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
            // Set font size and color for the current line
            gCtx.font = `${line.size}px impact`
            gCtx.fillStyle = line.color

            // Render the text of the current line at its position
            gCtx.fillText(line.txt, line.x, line.y)

            // If this line is selected, draw a border around it
            if (!line.txt) return
            if (index === mems.selectedLineIdx) {
                gCtx.strokeStyle = 'black' // Border color
                gCtx.lineWidth = 3 // Border width

                // Calculate the width and height of the text
                const textWidth = gCtx.measureText(line.txt).width
                const textHeight = line.size;

                onLineClicked(textWidth, textHeight)

                // Draw a rectangle border around the text
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
    console.log(mems)
    mems.selectedLineIdx++

    if (mems.selectedLineIdx >= mems.lines.length) {
        mems.selectedLineIdx = 0
    }

    // SetSwitchLine(mems.selectedLineIdx)
    renderMeme()

}

function onLineClicked(textWidth, textHeight) {

    const mems = getMeme();
const selectedLine = mems.lines[mems.selectedLineIdx];
console.log(selectedLine);
console.log(); // Get the selected line

// Add event listener to check for clicks on the canvas
gElCanvas.addEventListener('click', (event) => {
    // Get the click coordinates relative to the canvas
    const canvasX = event.offsetX;
    const canvasY = event.offsetY;

    // Calculate the width and height of the text
    const textWidth = gCtx.measureText(selectedLine.txt).width;
    const textHeight = selectedLine.size; // Assuming height is equal to font size

    // Calculate the position of the bottom left corner of the text
    const textBottom = selectedLine.y; // Assuming y represents the top-left corner

    // Check if the click coordinates fall within the bounding box of the selected line
    if (canvasX >= selectedLine.x && canvasX <= selectedLine.x + textWidth &&
        canvasY >= textBottom - textHeight && canvasY <= textBottom) {
            // let txt = prompt('edit the txt')
        setLineText(txt)
        // Perform your desired action here
        renderMeme()
    }
});

}






