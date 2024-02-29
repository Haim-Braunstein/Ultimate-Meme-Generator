'use strict'



var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: '', size: 30, color: 'white',font:'impact',x:300,y:50, },
        { txt: '', size: 30, color: 'white',font:'impact',x:300,y:600, }
    ]
}


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }



function setLineText(text) {
    gMeme.lines[0].txt = text

}

function setNewLineText(text) {
    gMeme.lines[1].txt = text
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

