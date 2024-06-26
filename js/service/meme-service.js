'use strict'

var gNextId = 1

var gImgs
var gKeywordSearchCountMap
_createImgs()
_createKeywordMap()

// For the saved images - currently unavailable
// var savedImgs

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

function getImgs(filter = '') {
    var imgs = gImgs

    // Filter

    imgs = _filterImgs(filter)

    return imgs
}

function getMeme() {
    return gMeme
}

// For the saved images - currently unavailable
// function getSavedImgs() {
//     return savedImgs
// }

function getSearchCountMap() {
    return gKeywordSearchCountMap
}

function _filterImgs(filter) {
    var imgs = gImgs
    if (filter) imgs = imgs.filter(img => img.keywords.includes(filter))
    return imgs
}

// Saved Images

// For the saved images - currently unavailable
// function saveImg(imgWithTextUrl, id, lines, cleanImgUrl, font) {
//     if (!savedImgs) {
//         savedImgs = [{ id, url: imgWithTextUrl, lines, cleanImgUrl, font }]
//     }
//     else savedImgs.push({ id, url: imgWithTextUrl, lines, cleanImgUrl, font })
// }

function updateToDefault() {
    if (gMeme.lines.length > 2) gMeme.lines.splice(2, gMeme.lines.length)
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
// Functions from edit controller

function changeSelectedMeme(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(txt, rand = false) {
    if (gMeme.selectedLineIdx === -1) return
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    if (rand) gMeme.lines.splice(1, gMeme.lines.length)
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

function addNewLine(txt = 'Sample Text') {
    var newLine = {
        txt,
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

function addImg(imgUrl, keywords) {
    var newImg = { id: gNextId++, url: imgUrl, keywords }
    gImgs.push(newImg)
    _saveImgs()
}

function increaseSize(value) {
    gKeywordSearchCountMap[value]++
    _saveKeywords()
}


// MOVE

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

// FACTORY

function _createImgs() {
    gImgs = loadFromStorage('imgs')
    if (gImgs && gImgs.length !== 0) return
    gImgs = [
        _createImg(['trump', 'funny']),
        _createImg(['cute', 'puppies']),
        _createImg(['cute', 'puppy', 'baby']),
        _createImg(['cute', 'tired', 'cat']),
        _createImg(['success', 'baby']),
        _createImg(['aliens', 'guy']),
        _createImg(['baby', 'black']),
        _createImg(['condescending', 'wonka']),
        _createImg(['baby']),
        _createImg(['laughing', 'obama']),
        _createImg(['kissing', 'men']),
        _createImg(['haim hecht', 'what would you do', 'חיים הכט', 'מה אתם הייתם עושים']),
        _createImg(['leonardo dicaprio', 'great gatsby', 'toast']),
        _createImg(['matrix', 'morpheus']),
        _createImg(['one does not simply', 'sean bean']),
        _createImg(['star trek', 'picard', 'laughing']),
        _createImg(['putin']),
        _createImg(['buzz lightyear'])
    ]
    _saveImgs()
}


function _createKeywordMap() {
    gKeywordSearchCountMap = loadFromStorage('keywordCountMap')
    if (gKeywordSearchCountMap && gKeywordSearchCountMap.length !== 0) return
    gKeywordSearchCountMap = { 'funny': 8, 'cat': 8, 'baby': 8, 'cute': 8 }
    _saveKeywords()
}


function _createImg(keywords = ['funny', 'cat']) {
    return {
        id: gNextId++,
        url: `meme-imgs/meme-imgs (square)/${gNextId - 1}.jpg`,
        keywords,
    }
}

function _saveImgs() {
    saveToStorage('imgs', gImgs)
}

function _saveKeywords() {
    saveToStorage('keywordCountMap', gKeywordSearchCountMap)
}
