'use strict'

const fonts = [
    "Impact",
    "Arial",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Bookman Old Style",
    "Bradley Hand ITC",
    "Century",
    "Century Gothic",
    "Comic Sans MS",
    "Georgia",
    "Gentium",
    "King",
    "Lucida Console",
    "Lalit",
    "Modena",
    "Monotype Corsiva",
    "Papyrus",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Verona",
    "cursive",
    "monospace",
    "serif",
    "sans-serif",
    "fantasy",
    "default"
];

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext("2d");
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const gLocalMeme = getMeme()

var gCurrentFont = 'Impact'
var gElCurrMemeImg
var gTextAlign = 'center'

function renderFonts() {
    var strHTML = fonts.map(font =>
        `<option>${font}</option>`
    )
    document.querySelector('.font-family-select').innerHTML = strHTML.join('')
}

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
        document.querySelector('.meme-edit-container').style.display = 'flex'
        document.querySelector('.line-text').focus()

        firstPositionSizeUpdate()
        drawFrame()
        addListeners()
    }
    elContainer.style.width = elImg.width + 50 + 'px'
    elContainer.style.height = elImg.height + 50 + 'px'
}


// Doing first one in order to be able to change locations and not have the y fixated
function firstPositionSizeUpdate() {
    const lines = gLocalMeme.lines
    lines.forEach((line, idx) => onUpdatePositionAndSize(idx))
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
    const lines = gLocalMeme.lines

    drawImage()

    lines.forEach((line, idx, lines) => {
        gCtx.font = `${lines[idx].size}px ${gCurrentFont}`;
        gCtx.fillStyle = lines[idx].color
        if (lines.length > 2) {
            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)
        } else {
            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)
        }

    })
}


// Meme Editing Toolbar

function onChangeColor(val) {
    changeColor(val, gLocalMeme.selectedLineIdx)
    renderImgWithText()
    drawFrame()
}

function onChangeFontSize(num) {
    changeFontSize(num)
    renderImgWithText()
    drawFrame()
}

function renderImgWithText() {
    gCtx.drawImage(gElCurrMemeImg, 0, 0)
    drawLines()

}

function onAddNewLine() {
    addNewLine()
    onUpdatePositionAndSize(gLocalMeme.lines[gLocalMeme.lines.length - 1])
    renderImgWithText()
    drawFrame()
}

function onSwitchLine() {
    switchLine()
    drawFrame()
}


function drawFrame() {
    renderImgWithText()

    var currLine = gLocalMeme.lines[gLocalMeme.selectedLineIdx]

    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'
    gCtx.rect(currLine.x - 3, currLine.y - currLine.height - 3, currLine.width + 6, currLine.height + 6)
    gCtx.stroke()
    gCtx.closePath()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
}

function onUpdatePositionAndSize(idx) {
    var currLine = gLocalMeme.lines[idx]
    var x = (gElCanvas.width / 2 - (gCtx.measureText(currLine.txt).width / 2))
    var y
    if (gLocalMeme.lines.length > 2) {
        y = 50 + (idx * (gElCanvas.height - 450))
    } else {
        y = 50 + (idx * (gElCanvas.height - 100))
    }
    var width = gCtx.measureText(gLocalMeme.lines[idx].txt).width
    var height = gCtx.measureText(gLocalMeme.lines[idx].txt).actualBoundingBoxAscent + gCtx.measureText(gLocalMeme.lines[idx].txt).actualBoundingBoxDescent
    updatePositionAndSize(idx, x, y, width, height)
}

function onChangeFontFamily(value) {
    gCurrentFont = value
    renderImgWithText()
    drawFrame()
}

function onChangeTextAlign(value) {
    gTextAlign = value
    renderImgWithText()
    drawFrame()
}

function onDown(ev) {

}

function onMove(ev) {

}

function onUp(ev) {

}

function onClick(ev) {
    const pos = getEvPos(ev)
    const lines = gLocalMeme.lines

    lines.forEach((currLine, idx) => {
        if (pos.x >= currLine.x &&
            pos.x <= currLine.x + currLine.width &&
            pos.y >= currLine.y - currLine.height &&
            pos.y <= currLine.y) {
            switchLine(idx)
            drawFrame()
        }
    })
}

function onKeyDown(ev) {
    if (ev.code === 'ArrowDown') {
        changeLinePosition('y', 1)
    } else if (ev.code === 'ArrowUp') {
        changeLinePosition('y', -1)
    } else if (ev.code === 'ArrowRight') {
        changeLinePosition('x', 1)
    } else if (ev.code === 'ArrowLeft') {
        changeLinePosition('x', -1)
    }
    renderImgWithText()
    drawFrame()
}
// Download / Upload / Share

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


// GetEvPos

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('click', onClick)
    gElCanvas.addEventListener('keydown', function () { onKeyDown(event) })
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}