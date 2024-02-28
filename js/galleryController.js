'use strict'

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.gallery-container')
    let strHtmls = imgs.map(img => {
      return `
      <img src="${img.url}" class="img${img.id}" onclick="onSelectImg(${img.id})" alt="">

      `
    })

    elGallery.innerHTML=strHtmls.join('')
}

function onSelectImg(elImg) {
    setImg(elImg)
    renderMeme()
}