const wrapper = document.querySelector('.wrapper')
let searchInput = wrapper.querySelector('input')
let infoText = wrapper.querySelector('.info-text')
let synonyms = wrapper.querySelector('.synonyms .list')
let closeBtn = document.querySelector('.material-icons')
let audio

const data = (result, word) => {
    let count = 1

    if (result.title) {
        infoText.innerHTML = `can't find the meaning of <span>"${word}"<span/>`
    } else {
        let phonetic = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[1].text}`
        wrapper.classList.add('active')
        document.querySelector('.word p').innerText = result[0].word
        document.querySelector('.word span').innerText = phonetic

        for (let i = 0; i < result[0].meanings.length; i++) {
            console.log(result[0].meanings[i].definitions[0].definition)

            let p = document.createElement('p')
            p.innerText = `meaning ${count}`

            let span = document.createElement('span')
            span.innerText = result[0].meanings[i].definitions[0].definition

            let detail = document.createElement('div')
            detail.classList.add('details')
            detail.appendChild(p)
            detail.appendChild(span)
            document.querySelector('.meaning').appendChild(detail)
            count++

        }

        audio = new Audio(`${result[0].phonetics[0].audio}`)
    }
}

const fetchApi = (word) => {
    infoText.innerHTML = `searching the meaning of <span>"${word}"<span/>`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(res => res.json()).then(result => data(result, word))
}


searchInput.addEventListener('keyup', e => {
    if (e.key == 'Enter' && e.target.value) {
        document.querySelector('.meaning').innerHTML = ''
        fetchApi(e.target.value)
    }
})

document.querySelector('.volume').addEventListener('click', () => {
    audio.play()
})

closeBtn.addEventListener('click', () => {
    document.querySelector('.meaning').innerHTML = ''
    searchInput.value = ''
    wrapper.classList.remove('active')
    infoText.innerHTML = 'search a word'
})