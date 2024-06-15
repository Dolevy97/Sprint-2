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
            width: 0,
            font: 'Impact'
        }, {
            txt: 'Sample Text',
            size: 40,
            color: 'white',
            x: 0,
            y: 0,
            height: 0,
            width: 0,
            font: 'Impact'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getImgs(filter = '') {
    var imgs = gImgs

    // Filter

    imgs = _filterImgs(filter)

    return imgs
}


function getMeme() {
    return gMeme
}

function getSavedImgs() {
    return savedImgs
}

function _filterImgs(filter) {
    var imgs = gImgs
    if (filter) imgs = imgs.filter(img => img.keywords.includes(filter))
    return imgs
}

// Saved Images

function saveImg(imgWithTextUrl, id, lines, cleanImgUrl, font) {
    if (!savedImgs) {
        savedImgs = [{ id, url: imgWithTextUrl, lines, cleanImgUrl, font }]
    }
    else savedImgs.push({ id, url: imgWithTextUrl, lines, cleanImgUrl, font })
}

function updateToDefault() {
    const lines = gMeme.lines
    lines.forEach(line => {
        line.txt = 'Sample Text'
        line.font = 'Impact'
        line.color = 'White'
        line.size = 40
        line.x = 0
        line.y = 0
        line.height = 0
        line.width = 0
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

function updateFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
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
        width: 0,
        font: 'Impact'
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
    gImgs.push(createImg(['trump', 'funny']))
    gImgs.push(createImg(['cute', 'puppies']))
    gImgs.push(createImg(['cute', 'puppy', 'baby']))
    gImgs.push(createImg(['cute', 'tired', 'cat']))
    gImgs.push(createImg(['success', 'baby']))
    gImgs.push(createImg(['aliens', 'guy']))
    gImgs.push(createImg(['baby', 'black']))
    gImgs.push(createImg(['condescending', 'wonka']))
    gImgs.push(createImg(['baby']))
    gImgs.push(createImg(['laughing', 'obama']))
    gImgs.push(createImg(['kissing', 'men']))
    gImgs.push(createImg(['haim hecht', 'what would you do', 'חיים הכט', 'מה אתם הייתם עושים']))
    gImgs.push(createImg(['leonardo dicaprio', 'great gatsby', 'toast']))
    gImgs.push(createImg(['matrix', 'morpheus']))
    gImgs.push(createImg(['one does not simply', 'sean bean']))
    gImgs.push(createImg(['star trek', 'picard', 'laughing']))
    gImgs.push(createImg(['putin']))
    gImgs.push(createImg(['buzz lightyear']))
}

function createImg(keywords = ['funny', 'cat']) {
    return {
        id: gNextId++,
        url: `meme-imgs/meme-imgs (square)/${gNextId - 1}.jpg`,
        keywords,
    }
}