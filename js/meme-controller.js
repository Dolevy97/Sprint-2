'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext("2d");


function renderMeme(imgUrl) {
    var elImg = new Image;
    const elContainer = document.querySelector('.canvas-container')
    elImg.src = imgUrl
    elImg.onload = function () {
        gElCanvas.width = elImg.width
        gElCanvas.height = elImg.height
        gCtx.drawImage(elImg, 0, 0)
    }
    elContainer.style.width = elImg.width + 50 + 'px'
    elContainer.style.height = elImg.height + 50 + 'px'
}