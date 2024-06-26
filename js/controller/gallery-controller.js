'use strict'

var gFilter

function onInit() {
    renderApp()
}

function renderApp() {
    renderGallery()
    // renderSavedImgs()
    renderGalleryFilterDatalist()
    renderFonts()
    renderStickers()
    renderKeywords()
}

function renderGallery() {
    var imgs = getImgs(gFilter)
    var strHTML = imgs.map(img =>
        `<img class='meme-img' src='${img.url}'></img>`
    )
    const elGallery = document.querySelector('.images-container')
    elGallery.innerHTML = strHTML.join('')
    addImageEventListeners(imgs)
}

// Belongs to saved imgs - unavailable :(
// function renderSavedImgs() {
//     var imgs = getSavedImgs()
//     if (!imgs) return
//     var strHTML = imgs.map(img =>
//         `<img class='saved-img meme-img' src='${img.url}'></img>`
//     )
//     const elSavedGallery = document.querySelector('.saved-memes-container')
//     elSavedGallery.innerHTML = strHTML.join('')
//     addImageEventListeners(imgs, true)
// }

function renderGalleryFilterDatalist() {
    var imgs = getImgs()
    var uniqueKeywords = [...new Set(imgs.flatMap(img => img.keywords))];
    if (uniqueKeywords.length > 11) uniqueKeywords.splice(10, uniqueKeywords.length)
    var strHTML = uniqueKeywords.map(keyword =>
        `<option value="${keyword}"></option>`
    )
    document.querySelector('.gallery-filter-datalist').innerHTML = strHTML.join('')
}

function renderKeywords() {
    const searchCountMap = getSearchCountMap()
    const keywords = Object.keys(searchCountMap)
    const fontSizes = Object.values(searchCountMap)
    var strHTML = keywords.map((keyword, idx) =>
        `<p class="keyword" style="font-size:${fontSizes[idx]}px;" onclick="onFilterByKeyword(this.innerText)">${keyword}</p>`
    )
    var elKeywordContainers = document.querySelectorAll('.frequent-keywords')
    elKeywordContainers.forEach(container =>
        container.innerHTML = strHTML.join('')
    )


}

function addImageEventListeners(imgs, saved = false) {
    var imgList = saved ? document.querySelectorAll('.saved-img') : document.querySelectorAll('.meme-img');
    imgList.forEach((img, idx) => {
        var url = saved ? imgs[idx].cleanImgUrl : imgs[idx].url;
        img.addEventListener('click', function () {
            renderPage('meme-editor')
            renderCanvas(url, false, saved, imgs[idx].lines)
            changeSelectedMeme(imgs[idx].id)
        })
    })
}

function onUpload(ev) {
    loadImageFromInput(ev, uploadImg)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let elImg = new Image()
        elImg.src = event.target.result
        elImg.onload = () => onImageReady(elImg)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function uploadImg(elImg) {
    var keywords = []
    var newKeyword = prompt('Enter keywords to describe the image (quit to stop)')
    while (newKeyword !== 'quit') {
        keywords.push(newKeyword)
        newKeyword = prompt('Enter keywords to describe the image (quit to stop)')
    }
    addImg(elImg.src, keywords)
    document.querySelector('.file-input').value = ''
    renderGallery()
}

function onFlexible() {
    const imgs = getImgs()
    const randImg = getRandomInt(0, imgs.length)
    const lines = ['Today will be a short day', 'No exercise tomorrow', 'This is exciting']
    const line = lines[getRandomInt(0, lines.length)]
    setLineTxt(line, true)
    renderPage('meme-editor')
    changeSelectedMeme(imgs[randImg].id)
    renderCanvas(imgs[randImg].url, true, false)
}

function renderPage(elPage) {
    const pageValue = elPage.toLowerCase()
    const pageToRender = document.querySelector(`.${pageValue}`)
    const allPages = document.querySelectorAll('.page')
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = 'none'
    }
    pageToRender.style.display = 'block'
    if (pageValue !== 'meme-editor') {
        document.querySelector('.meme-edit-container').style.display = 'none'
        document.querySelector('.line-text').value = ''
        document.querySelector('.font-family-select').selectedIndex = 0
        updateToDefault()
    }
}

function onFilter(value) {
    gFilter = value
    getImgs(value)
    renderGallery()
}

function onFilterByKeyword(value) {
    gFilter = value
    increaseSize(value)
    getImgs(value)
    renderKeywords()
    renderGallery()
}

function onClearFilter() {
    document.querySelector('.search-input').value = ''
    gFilter = ''
    renderGallery()
}
