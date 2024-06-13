'use strict'

function onInit() {
    renderGallery()
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

function addImageEventListeners(imgs) {
    var imgList = document.querySelectorAll('.meme-img')

    imgList.forEach((img, idx) => {
        img.addEventListener('click', function () {
            renderPage('meme-editor')
        })
        img.addEventListener('click', function () {
            renderMeme(imgs[idx].url)
        })
    })
}


function renderPage(elPage) {
    const pageValue = elPage.toLowerCase()
    const pageToRender = document.querySelector(`.${pageValue}`)
    console.dir(pageToRender.className)
    const allPages = document.querySelectorAll('.page')
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = 'none'
    }
    pageToRender.style.display = 'block'

    // if (pageToRender.className.includes('meme')) {
    //     editInit()
    // }
}