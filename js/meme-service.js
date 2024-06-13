'use strict'

var gNextId = 1

var gImgs
createImgs()

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'white'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getImgs() {
    return gImgs
}

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