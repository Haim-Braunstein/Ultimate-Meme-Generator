'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    // { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    // { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    // { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    // { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat1'] },

]


function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.gallery-container')
    let strHtmls = imgs.map(img => {
        return `
      <img src="${img.url}" class="img${img.id}" onclick="onSelectImg(${img.id})" alt="">

      `
    })

    elGallery.innerHTML = strHtmls.join('')
}

function onSelectImg(elImg) {
    const elMemeEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')
    elMemeEditor.classList.remove('hide')
    setImg(elImg)
    renderMeme()
}

function showGallery() {
    const elMemeEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery')

    if (elMemeEditor && elGallery) {
        elGallery.classList.remove('hide')
        elMemeEditor.classList.add('hide')
    }
}

function getImgs() {

    return gImgs
}

const textMem = [
    '404 Brain Not Found',
    'I Code, Therefore I Am',
    'Ctrl + Alt + Delete Your Problems',
    'Just Stack Overflow Things',
    'Code Happens',
    'Keep Calm and Commit Often',
    'Code Hard, Test Harder',
    'Syntax Error: Coffee Not Found',
    'Im Not Lazy, Im in Energy Saving Mode'
]

function randomMeme(){

    const randomTextIdx= getRandomIntInclusive(0, textMem.length-1)
    addLine(textMem[randomTextIdx])
    console.log(textMem[randomTextIdx]);


    const imgs=getImgs()

const randomImgIdx=  getRandomIntInclusive(0, imgs.length-1)
const img= imgs[randomImgIdx]
onSelectImg(img.id)
     
}




