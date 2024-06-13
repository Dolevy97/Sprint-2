'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    var imgs = getImgs()
    var strHTML = imgs.map(img =>
        `<img class='meme-img' src='${img.url}'></img>`
    )

    const elGallery = document.querySelector('.images-container')
    elGallery.innerHTML = strHTML.join('')
}