'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext("2d");


function renderMeme(imgUrl) {
    var elImg = new Image;
    elImg.src = imgUrl
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    
}