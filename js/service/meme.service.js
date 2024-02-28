'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 30, color: 'red' }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme(){

    return  gMeme 
    
}

function setLineText (text){

    gMeme.lines[0].txt= text

}

function getImgs(){
    return gImgs
}

function setImg(img){
    gMeme.selectedImgId= img
}

function setColor(userColor){

    gMeme.lines[0].color= userColor

}