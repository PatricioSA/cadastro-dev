const buttonAddTechnology = document.getElementById('adicionarTecnologia')
const form = document.getElementById('form')
const devList = document.getElementById('listaDevs')
let developers = []
let tecnologias = []
let numberRow = 0

buttonAddTechnology.addEventListener('click', function () {

    const tecnologiasDev = document.getElementById('tecnologias')
    const newRow = document.createElement('li')
    const inputExperiencia1 = document.createElement('div')
    const inputExperiencia2 = document.createElement('div')
    const inputExperiencia3 = document.createElement('div')

    const rowIndex = numberRow
    numberRow++
    newRow.id = 'inputRow-' + rowIndex
    newRow.className = 'inputRow'

    const inputTechName = createInput('text', 'techName', '')
    const inputRadio = createInput('radio', 'techExpo-' + rowIndex, '0-2 anos')
    const inputRadio2 = createInput('radio', 'techExpo-' + rowIndex, '3-4 anos')
    const inputRadio3 = createInput('radio', 'techExpo-' + rowIndex, '5+ anos')

    const labelTechName = createLabel('Nome:', 'techName')
    const expLabel = createLabel('Experiência:')
    const expLabel1 = createLabel('0-2 anos', 'techExpo-' + rowIndex)
    const expLabel2 = createLabel('3-4 anos', 'techExpo-' + rowIndex)
    const expLabel3 = createLabel('5+', 'techExpo-' + rowIndex)

    inputExperiencia1.append(inputRadio, expLabel1)
    inputExperiencia2.append(inputRadio2, expLabel2)
    inputExperiencia3.append(inputRadio3, expLabel3)

    const btnRemoveRow = document.createElement('button')
    btnRemoveRow.type = 'button'
    btnRemoveRow.innerText = 'Remover'
    btnRemoveRow.id = 'btnRemove'
    btnRemoveRow.addEventListener('click', function () {
        tecnologiasDev.removeChild(newRow)
    })

    newRow.append(
        labelTechName, inputTechName, expLabel, inputExperiencia1, inputExperiencia2, inputExperiencia3, btnRemoveRow
    )

    tecnologiasDev.appendChild(newRow)
})

form.addEventListener('submit', function (event) {
    event.preventDefault()

    const fullName = document.getElementById('fullName')
    const inputRows = document.querySelectorAll('.inputRow')
 
    let techName = ''
    let techExpo = ''
    inputRows.forEach(function (row) {
        techName = document.querySelector('#' + row.id + ' input[name="techName"]').value
        techExpo = document.querySelector('#' + row.id + ' input[type="radio"]:checked').value
        
        tecnologias.push({ name: techName, experiencia: techExpo })
    })
    
    if(fullName.value === '' || techName === '') return

    const newDev = {id: numberRow, fullname: fullName.value, tecnologias: tecnologias }
    developers.push(newDev)
    alert('Novo dev casdastrado com sucesso!')

    fullName.value = ''
    inputRows.forEach(function (row) {
        row.remove()
    })

    console.log(developers)
    createTableRow(newDev.fullname, techName, techExpo)
})

function createInput(type, name, value) {
    const input = document.createElement('input')
    input.type = type
    input.name = name
    input.value = value
    return input
}

function createLabel(text, htmlFor) {
    const label = document.createElement('label')
    label.innerText = text
    label.htmlFor = htmlFor
    return label
}

function createElement(tag, innerText = '', innerHTML = '') {
    const element = document.createElement(tag)

    if(innerText) {
        element.innerText = innerText
    }

    if(innerHTML) {
        element.innerHTML = innerHTML
    }

    return element
}

function createTableRow(name, techName, experience) {
    const tbody = document.getElementById('novosDevs')

    const newTableRow = createElement('tr')
    const tableRowIndex = numberRow
    newTableRow.id = 'tableRow-' + tableRowIndex

    const nameDev = createElement('td', name)
    const tech = createElement('td', techName)
    const timeExperience = createElement('td', experience)
    const action = createElement('td')

    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>')

    deleteButton.classList.add('btnAction')

    deleteButton.addEventListener('click', () => deleteDev(tableRowIndex))
    console.log(newTableRow.id)

    action.append(deleteButton)

    newTableRow.append(nameDev, tech, timeExperience, action)
    tbody.appendChild(newTableRow)
    return newTableRow
}

function deleteDev(id) {
    const tbody = document.getElementById('novosDevs')
    const tableRow = document.querySelector(`#tableRow-${id}`)
    console.log(tableRow)
    tbody.removeChild(tableRow)

    developers = developers.filter((dev) => dev.id !== id)
    console.log(developers)
}