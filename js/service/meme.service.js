'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
        // { txt: '', size: 30, color: 'white',font:'impact',x:300,y:50, },
        // { txt: '', size: 30, color: 'white',font:'impact',x:300,y:600, }
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function setLineText(text,selectedLine) {
    selectedLine.txt = text

}

function addLine() {
    const line = _createLine()
    gMeme.lines.push(line)

    return line
}

function _createLine() {
    const fontSize = 30
    const lineHeight = fontSize + 5
    const linesCount = gMeme.lines.length
    const y = 50 + linesCount * lineHeight

    return {
        txt:'Text here',
        size:fontSize,
        color:'white',
        font:'impact',
        x:300,
        y:y
    }
}

// function setNewLineText(text) {
//     gMeme.lines[1].txt = text
// }

function getMeme() {

    return gMeme

}

function setImg(img) {

    gMeme.selectedImgId = img
}

function setColor(userColor) {

    gMeme.lines[gMeme.selectedLineIdx].color = userColor

}

function setChooseFont(fontFamily){
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily

}

function removeLine(lineIdx){

   gMeme.lines.splice(lineIdx, 1)
}


// function ChangeFontSize(fontSize) {
//     console.log( gMeme.lines[gMeme.selectedLineIdx].size);

//     gMeme.lines[gMeme.selectedLineIdx].size = fontSize

// }

// function setSwitchLine(lineIdx) {

//     gMeme.selectedLineIdx = lineIdx
// }

