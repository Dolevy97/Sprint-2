'use strict'

var gNextId = 1
var gImgs
createImgs()

var savedImgs

var gMeme = {
    isDragged: false,
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Sample Text',
            size: 40,
            color: 'white',
            x: 0,
            y: 0,
            height: 0,
            width: 0
        }, {
            txt: 'Sample Text',
            size: 40,
            color: 'white',
            x: 0,
            y: 0,
            height: 0,
            width: 0
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getSavedImgs() {
    return savedImgs
}

// Saved Images

function saveImg(imgWithTextUrl, id, lines, cleanImgUrl) {
    if (!savedImgs) {
        savedImgs = [{ id, url: imgWithTextUrl, lines, cleanImgUrl }]
    }
    else savedImgs.push({ id, url: imgWithTextUrl, lines, cleanImgUrl })
}

function updateToDefault() {
    const lines = gMeme.lines
    lines.forEach(line => {
        line.txt = 'Sample Text'
        line.x = 0
        line.y = 0
    })
}

function updateLines(lines) {
    gMeme.lines = lines
    console.log(lines)
}

// Functions from edit controller

function changeSelectedMeme(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function changeColor(val, currLine) {
    if (gMeme.selectedLineIdx === -1) return
    gMeme.lines[currLine].color = val
}

function changeFontSize(num) {
    gMeme.lines[gMeme.selectedLineIdx].size += num
}

function addNewLine() {
    var newLine = {
        txt: 'Sample Text',
        size: 40,
        color: 'white',
        x: 0,
        y: 0,
        height: 0,
        width: 0
    }
    gMeme.lines.push(newLine)
    if (gMeme.lines.length === 1) gMeme.selectedLineIdx = 0

}

function switchLine(idx) {
    if (idx !== undefined) return gMeme.selectedLineIdx = idx
    var lines = gMeme.lines
    gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx > lines.length - 1) gMeme.selectedLineIdx = 0
}

function updatePositionAndSize(idx, x, y, width, height) {
    gMeme.lines[idx].x = x
    gMeme.lines[idx].y = y
    gMeme.lines[idx].width = width
    gMeme.lines[idx].height = height
}

function changeLinePosition(axis, num) {
    gMeme.lines[gMeme.selectedLineIdx][axis] += num
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
    if (!gMeme.lines.length) gMeme.selectedLineIdx = -1
}

function changeLineX(idx, x) {
    gMeme.lines[idx].x = x
}

// Drag

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}


// FACTORY

function createImgs() {
    gImgs = []
    for (var i = 0; i < 18; i++) {
        gImgs.push(createImg())
    }
}

function createImg(keywords = ['funny', 'cat']) {
    return {
        id: gNextId++,
        url: `meme-imgs/meme-imgs (square)/${gNextId - 1}.jpg`,
        keywords,
    }
}