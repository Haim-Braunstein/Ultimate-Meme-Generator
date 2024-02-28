'use strict'

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
    elMemeEditor.removeAttribute('hidden')
    setImg(elImg)
    renderMeme()
}

function showGallery(){
    const elMemeEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hide')
    elMemeEditor.setAttribute('hidden', true)
}