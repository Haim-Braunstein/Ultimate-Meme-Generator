'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
            { txt: 'Text here', size: 30, color: 'white',font:'impact',x:300,y:50, },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function setLineText(text, selectedLine) {
    selectedLine.txt = text
}

function addLine(randomText) {
    const line = _createLine(randomText)
    gMeme.lines.push(line)

    return line
}

function _createLine(randomText) {
    const fontSize = 30
    const lineHeight = fontSize + 5
    const linesCount = gMeme.lines.length
    const y = 50 + linesCount * lineHeight

    return {
        txt: randomText || 'Text here',
        size: fontSize,
        color: 'white',
        font: 'impact',
        x: 150,
        y: y
    }
}

function getMeme() {

    return gMeme

}

function setImg(img) {

    gMeme.selectedImgId = img
}

function setColor(userColor) {

    gMeme.lines[gMeme.selectedLineIdx].color = userColor

}

function _filterImgs(filterBy) {
    gFilterBy = filterBy
}

function clearFilter() {
    gFilterBy = ''
}

function setChooseFont(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily

}

function removeLine(lineIdx) {

    gMeme.lines.splice(lineIdx, 1)
}

function _saveMems() {
    saveToStorage(MEME_DB, gBooks)
}

