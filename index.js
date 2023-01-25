const buttonAddTechnology = document.getElementById('adicionarTecnologia')
const form = document.getElementById('form')
let developers = []
let inputRows = 0

buttonAddTechnology.addEventListener('click', function () {

    const tecnologiasDev = document.getElementById('tecnologias')
    const newRow = document.createElement('li')

    const rowIndex = inputRows
    inputRows++
    newRow.id = 'inputRow-' + rowIndex
    newRow.className = 'inputRow'

    const inputTechName = createInput('text', 'techName', '')
    const inputRadio = createInput('radio', 'techExpo-' + rowIndex, '0-2 anos')
    const inputRadio2 = createInput('radio', 'techExpo-' + rowIndex, '3-4 anos')
    const inputRadio3 = createInput('radio', 'techExpo-' + rowIndex, '5+ anos')

    const labelTechName = createLabel('Nome:', 'techName')
    const expLabel = createLabel('Experiência:')
    const expLabel1 = createLabel('0-2 anos')
    const expLabel2 = createLabel('3-4 anos')
    const expLabel3 = createLabel('5+')

    const btnRemoveRow = document.createElement('button')
    btnRemoveRow.type = 'button'
    btnRemoveRow.innerText = 'Remover'
    btnRemoveRow.addEventListener('click', function () {
      tecnologiasDev.removeChild(newRow)
    })

    newRow.append(
        labelTechName, inputTechName, expLabel, inputRadio, expLabel1, inputRadio2, expLabel2, inputRadio3, expLabel3, btnRemoveRow
    )

    tecnologiasDev.appendChild(newRow)
})

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const fullName = document.getElementById('fullName')
    const inputRows = document.querySelectorAll('.inputRow')

    let tecnologias = []
    inputRows.forEach(function (row) {
        const techName = document.querySelector('#' + row.id + ' input[name="techName"]').value
        const techExpo = document.querySelector('#' + row.id + ' input[type="radio"]:checked').value

        tecnologias.push({name: techName, experiencia: techExpo})
    })

    const newDev = {fullname: fullName.value, tecnologias: tecnologias}
    developers.push(newDev)
    alert('Novo dev casdastrado com sucesso!')

    fullName.value = ''
    inputRows.forEach(function(row) {
        row.remove()
    })

    console.log(developers)
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