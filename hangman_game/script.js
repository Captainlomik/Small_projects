const letterContainer = document.querySelector(".letter__container")
const optionsContainer = document.querySelector(".options__container")
const userInputSection = document.querySelector(".user-input")
const canvas = document.querySelector('#canvas')
const resultText = document.querySelector('.game__container-text')
const newGameButton = document.querySelector('.new-game__button')
const newGameContainer = document.querySelector('.game__container')

let options = {
    fruits: [
        "Яблоко",
        "Малина",
        "Ежевика",
        "Манго",
        "Ананас",
        "Грейпфрут"
    ],
    animals: [
        "Волк",
        "Заяц",
        "Кот",
        "Носорог",
        "Лев",
        "Тигр",
        "Пантера"
    ],
    countries: [
        "Россия",
        "Италия",
        "Испания",
        "Германия",
        "Финляндия",
        "Франция",
        "Норвегия",
        "Японимая",
        "Корея",
        "Китай"
    ]
}

let translate = {
    fruits: "Фрукты",
    animals: "Животные",
    countries: "Страны"
}


let winCount = 0
let count = 0

let chosenWorld = ""

//Выбор категорий
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Выберите категорию</h3>`
    let buttonCon = document.createElement('div')
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" value=${value} onclick="generateWorld('${value}')">
        ${translate[value].toUpperCase()}</button>`
    }
    optionsContainer.appendChild(buttonCon)
}

function blocker() {
    let optionsButtons = document.querySelectorAll('.options')
    let letterButtons = document.querySelectorAll('.letters')
    optionsButtons.forEach(button => {
        button.disabled = true
    })
    letterButtons.forEach(button => {
        button.disabled.true
    })
    newGameContainer.classList.remove('hide')
}

//Буквы
function generateWorld(optionValue) {
    let optionsButtons = document.querySelectorAll('.options')
    optionsButtons.forEach((button) => {
        if (button.value.toLowerCase() === optionValue) {
            button.classList.add("active")
        }
        button.disabled = true
    })

    letterContainer.classList.remove('hide')
    userInputSection.innerText = ''

    let optionArray = options[optionValue]

    chosenWorld = optionArray[Math.floor(Math.random() * optionArray.length)]

    chosenWorld = chosenWorld.toLocaleUpperCase()
    console.log(chosenWorld)

    let displayItem = chosenWorld.replace(/./g, '<span class="dashes">_</span>')

    userInputSection.innerHTML = displayItem
}


function initilizer() {
    winCon = 0;
    count = 0;

    userInputSection.innerHTML = ''
    optionsContainer.innerHTML = ''
    letterContainer.classList.add('hide')
    newGameContainer.classList.add('hide')
    letterContainer.innerHTML = ''


    for (let i = 1040; i < 1072; i++) {
        let button = document.createElement('button')
        button.classList.add('letters')
        button.innerText = String.fromCharCode(i)

        button.addEventListener('click', () => {
            let charArray = chosenWorld.split('')
            let dashes = document.querySelectorAll('.dashes')

            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        dashes[index].innerText = char
                        winCount += 1
                        if (winCount === charArray.length) {
                            resultText.innerHTML = `
                            <h2 class="win-msg">Ты выиграл!!</h2>
                            <p> Загаданое слово -<span> ${chosenWorld}</span></p>`
                            winCount = 0
                            blocker()
                        }
                    }
                })
            }
            else {
                count += 1;
                drawMan(count)
                if (count === 6) {
                    resultText.innerHTML = `
                            <h2 class="lose-msg">Ты проиграл! =(</h2>
                            <p>Загаданое слово <span> ${chosenWorld}</span></p>`
                    blocker()
                    winCount = 0
                }
            }
            button.disabled = true
        })

        letterContainer.append(button)
    }

    displayOptions()

    let { initialDrawing } = canvasCreator()
    initialDrawing()
}

//canvas 
function canvasCreator() {
    let context = canvas.getContext('2d')
    context.beginPath()
    context.srokeStyle = "#000"
    context.lineWidth = 2

    //for lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY)
        context.lineTo(toX, toY)
        context.stroke()
    }
    const body = () => {
        drawLine(70, 40, 70, 80)
    }

    const head = () => {
        context.beginPath()
        context.arc(70, 30, 10, 0, Math.PI * 2, true)
        context.stroke()
    }

    const leftArm = () => {
        drawLine(70, 50, 50, 70)
    }
    const rightArm = () => {
        drawLine(70, 50, 90, 70)
    }
    const leftLeg = () => {
        drawLine(70, 80, 50, 110)
    }
    const rightLeg = () => {
        drawLine(70, 80, 90, 110)
    }

    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        drawLine(10, 130, 130, 130) //bottom
        drawLine(10, 10, 10, 131)//left
        drawLine(10, 10, 70, 10)//top
        drawLine(70, 10, 70, 20)//small top
    }

    return { initialDrawing, body, head, rightArm, rightLeg, leftArm, leftLeg }

}
function drawMan(count) {
    let { head, body, leftArm, leftLeg, rightArm, rightLeg } = canvasCreator()
    switch (count) {
        case 1:
            head()
            break;
        case 2:
            body()
            break;
        case 3:
            leftArm()
            break;
        case 4:
            rightArm()
            break;
        case 5:
            leftLeg()
            break;
        case 6:
            rightLeg()
            break
        default:
            break
    }

}


newGameButton.addEventListener("click", initilizer)
window.onload = initilizer()