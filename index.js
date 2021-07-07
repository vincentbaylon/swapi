document.querySelector('#filter-dropdown').addEventListener('change', (e) => {
    e.preventDefault()
    document.querySelectorAll('#sort-list li').forEach((element) => element.remove())

    fetchPerson(e.target.value)
})

function fetchData() {
    fetch('https://swapi.dev/api/people')
    .then(res => res.json())
    .then(json => json.results.forEach(renderDropDown))
}

function fetchPerson(personName) {
    fetch('https://swapi.dev/api/people')
    .then(res => res.json())
    .then(json => {
        let data = json.results.filter(person => person['name'] === personName)
        
        fetch(data[0].url)
        .then(res => res.json())
        .then(json => renderCard(json))
    })
}

function renderCard(data) {
    let liName = document.createElement('li')
    let liBirthYear = document.createElement('li')
    let liEyeColor = document.createElement('li')
    let liGender = document.createElement('li')
    let liHairColor = document.createElement('li')
    let liHeight = document.createElement('li')
    let liMass = document.createElement('li')
    let liSkinColor = document.createElement('li')
    let liHomeworld = document.createElement('li')

    liName.className = 'card'
    liName.innerText = `Name: ${data.name}`
    liBirthYear.className = 'card'
    liBirthYear.innerText = `Birth Year: ${data.birth_year}`
    liEyeColor.className = 'card'
    liEyeColor.innerText = `Eye Color: ${data.eye_color}`
    liGender.className = 'card'
    liGender.innerText = `Gender: ${data.gender}`
    liHairColor.className = 'card'
    liHairColor.innerText = `Hair Color: ${data.hair_color}`
    liHeight.className = 'card'
    liHeight.innerText = `Height: ${data.height}`
    liMass.className = 'card'
    liMass.innerText = `Mass: ${data.mass}`
    liSkinColor.className = 'card'
    liSkinColor.innerText = `Skin Color: ${data.skin_color}`
    liHomeworld.className = 'card'

    fetch(data.homeworld)
    .then(res => res.json())
    .then(json => liHomeworld.innerText = `Homeworld: ${json.name}`)

    document.querySelector('#sort-list').append(liName, liBirthYear, liEyeColor, liGender, liHairColor, liHeight, liMass, liSkinColor, liHomeworld)
}

function renderDropDown(data) {
    let option = document.createElement('option')

    option.textContent = data.name

    document.querySelector('#filter-dropdown').append(option)
}


//Initial Render
function initialRender() {
    fetchData()
}

initialRender()