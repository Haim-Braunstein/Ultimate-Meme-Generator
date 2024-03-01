'use strict'

let gElCanvas
let gCtx
let isDragging = false
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']




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
    const selectedLine = onLineClicked()

    setLineText(txt,selectedLine)
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

    // SetSwitchLine(mems.selectedLineIdx)
    renderMeme()

}

function onLineClicked() {

    const mems = getMeme()
    const selectedLine = mems.lines[mems.selectedLineIdx]

    gElCanvas.addEventListener('click', (event) => {
        const canvasX = event.offsetX;
        const canvasY = event.offsetY;

        // Loop through each line of text to find the clicked line
        mems.lines.forEach((line, index) => {
            const textWidth = gCtx.measureText(line.txt).width;
            const textHeight = line.size;

            const textBottom = line.y 

            // Check if the click coordinates fall within the bounding box of the text
            if (canvasX >= line.x && canvasX <= line.x + textWidth &&
                canvasY >= line.y && canvasY <= textBottom) {
                // The line is clicked
                // console.log('Clicked on line:', line);

                // Assuming you have a function to allow editing text
                // editLine(index)
                 // Pass the index of the clicked line to the editLine function
            }
        });
    });

    return selectedLine

}

function getEvPos(ev) {
	let pos = {
		x: ev.offsetX,
		y: ev.offsetY,
	}

	if (TOUCH_EVENTS.includes(ev.type)) {
		
		ev.preventDefault()         // Prevent triggering the mouse events
		ev = ev.changedTouches[0]   // Gets the first touch point

		// Calc pos according to the touch screen
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

    const { offsetX, offsetY } = ev

    const clickedLine = lines.find(line => {
        const { x, y, size, txt } = line
        const textWidth = gCtx.measureText(txt).width;
        const textHeight = size; 

        return offsetX >= x && offsetX <= x + textWidth &&
               offsetY >= y - textHeight && offsetY <= y
    });

    if (clickedLine) {
        handleClickedLine(clickedLine)    
        isDragging = true;
        gStartPos = getEvPos(ev)

    // Add event listeners to handle dragging
    gElCanvas.addEventListener('mousemove', onMouseMove);
    gElCanvas.addEventListener('mouseup', onMouseUp);
    }
}

function onMouseMove(ev) {
    if (isDragging) {
        const mems = getMeme();
        const selectedLine = mems.lines[mems.selectedLineIdx];
        
        const { offsetX, offsetY } = ev;
        const pos = getEvPos(ev)


        // Calculate the distance moved by the mouse
        const dx = offsetX - gStartPos.x;
        const dy = offsetY - gStartPos.y;

        // Update the position of the selected line
        selectedLine.x += dx;
        selectedLine.y += dy;

        // Update start position for next mouse move
        gStartPos = pos;

        // Re-render the canvas to reflect the updated position of the text line
        renderMeme();
    }
}

function onMouseUp() {
    // Deactivate dragging mode
    isDragging = false;
    
    // Remove event listeners for dragging
    gElCanvas.removeEventListener('mousemove', onMouseMove);
    gElCanvas.removeEventListener('mouseup', onMouseUp);
}

function handleClickedLine(clickedLine) {
    const mems = getMeme()

    mems.selectedLineIdx = mems.lines.indexOf(clickedLine);

    renderMeme()
    
}

function onChooseFont({ value: font }) {

    setChooseFont(font)

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
        selectedLine.y-=10
    }
    renderMeme()
}

function onPositionDown() {
    const selectedLine = onLineClicked()
    if (selectedLine.y > 1) {
        selectedLine.y+=10
    }
    renderMeme()
}

function onRemoveLine() {
    const mems = getMeme()

    const selectedLine = onLineClicked()
    removeLine(mems.selectedLineIdx)
    renderMeme()
}









