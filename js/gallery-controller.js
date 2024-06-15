'use strict'

function onInit() {
    renderGallery()
    renderSavedImgs()
    renderFonts()
}

function renderGallery() {
    var imgs = getImgs()
    var strHTML = imgs.map(img =>
        `<img class='meme-img' src='${img.url}'></img>`
    )
    const elGallery = document.querySelector('.images-container')
    elGallery.innerHTML = strHTML.join('')

    addImageEventListeners(imgs)
}

function renderSavedImgs() {
    var imgs = getSavedImgs()
    if (!imgs) return
    var strHTML = imgs.map(img =>
        `<img class='saved-img meme-img' src='${img.url}'></img>`
    )
    const elSavedGallery = document.querySelector('.saved-memes-container')
    elSavedGallery.innerHTML = strHTML.join('')

    addImageEventListeners(imgs, true)
}


function addImageEventListeners(imgs, saved = false) {
    var imgList = saved ? document.querySelectorAll('.saved-img') : document.querySelectorAll('.meme-img');
    imgList.forEach((img, idx) => {
        var url = saved ? imgs[idx].cleanImgUrl : imgs[idx].url;
        img.addEventListener('click', function () {
            renderPage('meme-editor')
        })
        img.addEventListener('click', function () {
            renderCanvas(url, false, saved, imgs[idx].lines)
            changeSelectedMeme(imgs[idx].id)
        })
    })
}

function onFlexible() {
    const imgs = getImgs()
    const randImg = getRandomInt(0, imgs.length)
    renderPage('meme-editor')
    changeSelectedMeme(imgs[randImg].id)
    renderCanvas(imgs[randImg].url, true)
}

function renderPage(elPage) {
    const pageValue = elPage.toLowerCase()
    const pageToRender = document.querySelector(`.${pageValue}`)
    const allPages = document.querySelectorAll('.page')
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = 'none'
    }
    pageToRender.style.display = 'block'
    if (pageValue === 'gallery') {
        pageToRender.style.display = 'block'
        document.querySelector('.meme-edit-container').style.display = 'none'
        document.querySelector('.line-text').value = ''
        updateToDefault()
    }
}
