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
        if (screen.width < 1000) {
            gElCanvas.width = screen.width - 20
            gElCanvas.height = 400
        } else {
            gElCanvas.width = elImg.width
            gElCanvas.height = elImg.height
        }

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
    setLineTxt(val)
    drawLines()
}

function drawLines() {
    const meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]
    drawImage()
    gCtx.font = `${currLine.size}px Arial`;
    gCtx.fillStyle = currLine.color
    if (gCtx.measureText(currLine.txt).width > gElCanvas.width - 60) {
        alert('Please make a new line!')
        setLineTxt(currLine.txt.substring(0, currLine.txt.length - 1))
        document.querySelector('.line-text').value = currLine.txt
        currLine = meme.lines[meme.selectedLineIdx]
    }
    gCtx.fillText(currLine.txt, (gElCanvas.width / 2 - (gCtx.measureText(currLine.txt).width / 2)), 50 + (meme.selectedLineIdx * (gElCanvas.height - 100)))
    gCtx.strokeText(currLine.txt, (gElCanvas.width / 2 - (gCtx.measureText(currLine.txt).width / 2)), 50 + (meme.selectedLineIdx * (gElCanvas.height - 100)))
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeColor(val) {
    const meme = getMeme()
    changeColor(val, meme.selectedLineIdx)
    gCtx.drawImage(gElCurrMemeImg, 0, 0)
    drawLines()
}