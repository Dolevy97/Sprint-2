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

        renderImgWithText()
        document.querySelector('.line-text').focus()

        drawFrame()
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
    renderImgWithText()
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
    const lines = meme.lines
    lines.forEach((line, idx, lines) => {
        if (lines.length > 2) {
            gCtx.fillText(line.txt, (gElCanvas.width / 2 - (gCtx.measureText(line.txt).width / 2)), 50 + (idx * (gElCanvas.height - 450)))
            gCtx.strokeText(line.txt, (gElCanvas.width / 2 - (gCtx.measureText(line.txt).width / 2)), 50 + (idx * (gElCanvas.height - 450)))
        } else {
            gCtx.fillText(line.txt, (gElCanvas.width / 2 - (gCtx.measureText(line.txt).width / 2)), 50 + (idx * (gElCanvas.height - 100)))
            gCtx.strokeText(line.txt, (gElCanvas.width / 2 - (gCtx.measureText(line.txt).width / 2)), 50 + (idx * (gElCanvas.height - 100)))
        }
        onUpdatePositionAndSize(idx)
    })
}


// Meme Editing Toolbar

function onChangeColor(val) {
    const meme = getMeme()
    changeColor(val, meme.selectedLineIdx)
    renderImgWithText()
}

function onChangeFontSize(num) {
    changeFontSize(num)
    renderImgWithText()
}

function renderImgWithText() {
    gCtx.drawImage(gElCurrMemeImg, 0, 0)
    drawLines()
}

function onAddNewLine() {
    addNewLine()
    renderImgWithText()
}

function onSwitchLine() {
    var txt = document.querySelector('.line-text').value
    switchLine(txt)
    drawFrame()
}

function drawFrame() {
    const meme = getMeme()
    renderImgWithText()
    var currLine = meme.lines[meme.selectedLineIdx]

    gCtx.beginPath()
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'white'
    gCtx.rect(currLine.x - 10, currLine.y - currLine.height - 10, currLine.width + 20, currLine.height + 20)
    gCtx.stroke()
    gCtx.closePath()

    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
}

function onUpdatePositionAndSize(idx) {
    var meme = getMeme()
    var currLine = meme.lines[idx]
    var x = (gElCanvas.width / 2 - (gCtx.measureText(currLine.txt).width / 2))
    var y = 50 + (idx * (gElCanvas.height - 450))
    if (meme.lines.length > 2) {
        y = 50 + (idx * (gElCanvas.height - 450))
    } else {
        y = 50 + (idx * (gElCanvas.height - 100))
    }
    var width = gCtx.measureText(meme.lines[idx].txt).width
    var height = gCtx.measureText(meme.lines[idx].txt).actualBoundingBoxAscent + gCtx.measureText(meme.lines[idx].txt).actualBoundingBoxDescent
    updatePositionAndSize(idx, x, y, width, height)
}

// Download / Upload / Share

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}