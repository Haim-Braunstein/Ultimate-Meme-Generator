'use strict'

let gFilterBy

const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['president', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['movie', 'funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprise'] },
    { id: 8, url: 'img/8.jpg', keywords: ['crazy', 'funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['president', 'politics'] },
    { id: 11, url: 'img/11.jpg', keywords: ['crazy', 'sport'] },
    { id: 12, url: 'img/12.jpg', keywords: ['crazy', 'funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'movie'] },
    { id: 14, url: 'img/14.jpg', keywords: ['movie', 'funny'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'movie'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'movie'] },
    { id: 17, url: 'img/17.jpg', keywords: ['president', 'politics'] },
    { id: 18, url: 'img/18.jpg', keywords: ['movie', 'funny'] },

]

const textMem = [
    '404 Brain Not Found',
    'Me: starts diet. Also me: eats pizza',
    'Ctrl + Alt + Delete Your Problems',
    'Just Stack Overflow Things',
    'Code Happens',
    'Keep Calm and Commit Often',
    'Me in the shower: hot water, please!',
    'Syntax Error: Coffee Not Found',
    'Im Not Lazy, Im in Energy Saving Mode'
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
    // resizeCanvas()
   

    renderMeme()
    
}

function onSetFilterBy(val) {
    _filterImgs(val)
    renderGallery()

}

function onClearFilter() {

    const elFilterCategory = document.querySelector('.filter-category')
    elFilterCategory.value = ''
    clearFilter()
    renderGallery()
}

function showGallery() {
    const elMemeEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery')

    if (elMemeEditor && elGallery) {
        elGallery.classList.remove('hide')
        elMemeEditor.classList.add('hide')
    }
    const mems=getMeme()
    mems.lines=[]
    updatePlaceHolder
    addLine('Text here')
    
    const elTextInput = document.querySelector('.text-meme')
    elTextInput.value = ''
    elTextInput.placeholder = 'Text Here'


}

function getImgs() {
    if (!gFilterBy) {
        return gImgs
    }
    const filteredImgs = gImgs.filter(img => img.keywords.includes(gFilterBy))
    return filteredImgs
}

function randomMeme() {
    const imgs = getImgs()

        const randomTextIdx = getRandomIntInclusive(0, textMem.length - 1)
    addLine(textMem[randomTextIdx])

    const randomImgIdx = getRandomIntInclusive(0, imgs.length - 1)
    const img = imgs[randomImgIdx]
    onSelectImg(img.id)
}




