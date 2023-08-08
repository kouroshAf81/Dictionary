const wrapper = document.querySelector('.wrapper')
let searchInput = wrapper.querySelector('input')
let infoText = wrapper.querySelector('.info-text')
let synonyms = wrapper.querySelector('.synonyms .list')
let closeBtn = document.querySelector('.material-icons')
let audio

const data = (result, word) => {
    console.log(result)
    if (result.title) {
        infoText.innerHTML = `can't find the meaning of <span>"${word}"<span/>`
    } else {
        let phonetic = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[1].text}`
        wrapper.classList.add('active')
        document.querySelector('.word p').innerText = result[0].word
        document.querySelector('.word span').innerText = phonetic
        document.querySelector('.meaning span').innerText = result[0].meanings[0].definitions[0].definition

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
        fetchApi(e.target.value)
    }
})

document.querySelector('.volume').addEventListener('click', () => {
    audio.play()
})

closeBtn.addEventListener('click', () => {
    searchInput.value = ''
    wrapper.classList.remove('active')
    infoText.innerHTML = 'search a word'
})