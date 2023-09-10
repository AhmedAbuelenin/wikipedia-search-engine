let resultsContainer = document.getElementsByClassName('container')[0]
const searchInput = document.getElementsByClassName('search__input')[0]

const generateResults = () => {
  fetch(
    'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=' +
      searchInput.value
  )
    .then(response => response.json())
    .then(data => {
      let results = data.query.search
      let numberOfResults = data.query.search.length
      resultsContainer.innerHTML = ''
      for (let i = 0; i < numberOfResults; i++) {
        let result = document.createElement('div')
        result.classList.add('results')
        result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
        resultsContainer.appendChild(result)
      }
    })
}

const debounce = (func, timeout = 500) => {
  let timerId

  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      searchInput.value
        ? func.apply(this, args)
        : (resultsContainer.innerHTML =
            '<p>Type something in the above search input</p>')
    }, timeout)
  }
}

const validateInput = debounce(generateResults)
