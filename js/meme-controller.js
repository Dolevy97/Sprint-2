'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext("2d");
var gElCurrMemeImg

function renderCanvas(imgUrl) {
    var elImg = new Image;
    const elContainer = document.querySelector('.canvas-container')
    elImg.src = imgUrl
    elImg.onload = function () {
        gElCurrMemeImg = elImg
        gElCanvas.width = elImg.width
        gElCanvas.height = elImg.height
        drawImage()
        drawLines()
    }
    elContainer.style.width = elImg.width + 50 + 'px'
    elContainer.style.height = elImg.height + 50 + 'px'
}

function drawImage() {
    if (!gElCurrMemeImg) return
    gCtx.drawImage(gElCurrMemeImg, 0, 0)
}

function onUpdateText(val) {
    const meme = getMeme()
    setLineTxt(val)
    drawLines()
}

function drawLines() {
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    drawImage()
    gCtx.font = `${currLine.size}px serif`;
    gCtx.fillStyle = currLine.color
    gCtx.fillText(currLine.txt, (gElCanvas.width / 2 - (gCtx.measureText(currLine.txt).width / 2)), 50 + (meme.selectedLineIdx * (gElCanvas.height - 100)))
    gCtx.strokeText(currLine.txt, (gElCanvas.width / 2 - (gCtx.measureText(currLine.txt).width / 2)), 50 + (meme.selectedLineIdx * (gElCanvas.height - 100)))
}