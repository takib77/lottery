'use strict';

// Items selectors

const domItems = {
    setName: document.querySelector('#userName'),
    setNumbers: document.querySelectorAll('#userNum'),
    checkBox: document.querySelector('#checkbox'),
    getRandom: document.querySelector('#getRandom'),
    startGame: document.querySelector('#start'),
    writeName: document.querySelector('#userSpan'),
    writeNumbers: document.querySelectorAll('#userTableNums'),
    lotteryNumbers: document.querySelectorAll('#lotteryTableNums'),
    lotteryResult: document.querySelector('#result'),
    formSection: document.querySelector('#formSection'),
    tableSection: document.querySelector('#tableSection'),
    resultSection: document.querySelector('#resultSection'),
    tryAgain: document.querySelector('#tryAgain'),
    preWinners: document.querySelector('#preWinners'),
    preWinnerSection: document.querySelector('#preWinnerSection'),
    preWinnerTable: document.querySelector('#preWinnerTable')
};

const drawNumber = 5;
const possibleNumber = 10;

// Check and use input datas

domItems.checkBox.checked = false;

const inputValidator = {
    patterns: {
        name: /^[A-ZÁÉÍÓÖŐÚŰÜ][A-ZÁÉÍÓÖŐÚŰÜa-záéíóöőúüű ]{1,20}$/,
        numbers: /[0-9]{1,2}/
    },
    validate(text, type) {
        return text.match(this.patterns[type]) ? true : false;
    }
}

const onCheckboxClick = () => {
    domItems.checkBox.addEventListener('click', () => {
        let temp = [];
        domItems.setNumbers.forEach(input => temp.push(parseInt(input.value)));
        temp.sort();
        if (inputValidator.validate(`${parseInt(domItems.setNumbers[0].value)}`, 'numbers') === false ||
            inputValidator.validate(`${parseInt(domItems.setNumbers[1].value)}`, 'numbers') === false ||
            inputValidator.validate(`${parseInt(domItems.setNumbers[2].value)}`, 'numbers') === false ||
            inputValidator.validate(`${parseInt(domItems.setNumbers[3].value)}`, 'numbers') === false ||
            inputValidator.validate(`${parseInt(domItems.setNumbers[4].value)}`, 'numbers') === false ||
            temp[4] > 90) {
            alert('You must choose 5 different number between 1 and 90!');
            domItems.checkBox.checked = false;
        }
        else {
            domItems.startGame.classList.remove('d-none');
            domItems.setName.disabled = true;
            domItems.getRandom.disabled = true;
            domItems.checkBox.disabled = true;
            domItems.setNumbers.forEach(input => input.disabled = true);
        }
    });
}


let userNumbers = [];
const onStartClick = () => {
    domItems.startGame.addEventListener('click', () => {
        domItems.setNumbers.forEach(input => userNumbers.push(parseInt(input.value)));

        domItems.writeName.textContent = domItems.setName.value;
        domItems.writeNumbers[0].textContent = userNumbers[0];
        domItems.writeNumbers[1].textContent = userNumbers[1];
        domItems.writeNumbers[2].textContent = userNumbers[2];
        domItems.writeNumbers[3].textContent = userNumbers[3];
        domItems.writeNumbers[4].textContent = userNumbers[4];
        lotteryDrawing();
    });
}

// Get random numbers

const onDiceClick = () => {
    domItems.getRandom.addEventListener('click', () => {
        let randomNumbers = [];
        let randomNum;
        for (let i = 1; i <= drawNumber; i++) {
            randomNum = Math.floor(Math.random() * (possibleNumber - 1)) + 1;
            if (!randomNumbers.includes(randomNum)) {
                randomNumbers.push(randomNum);
                domItems.setNumbers[i - 1].value = randomNumbers[i - 1];
            } else { i -= 1 };
        }
    })
}


// Delay with async

const delay = (delayInSecond) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delayInSecond * 1000);
    })
}

async function delayCall() {
    const result = await delay(2);
}

// Drawing method

let lotteryNumbers = [];
async function lotteryDrawing() {
    domItems.tableSection.classList.remove('d-none');
    domItems.formSection.classList.add('d-none');
    domItems.checkBox.classList.add('d-none');
    domItems.startGame.classList.add('d-none');
    let randomNumber;
    for (let i = 1; i <= drawNumber; i++) {
        randomNumber = Math.floor(Math.random() * (possibleNumber - 1)) + 1;
        if (!lotteryNumbers.includes(randomNumber)) {
            lotteryNumbers.push(randomNumber);
        } else { i -= 1 };
    }
    await delayCall();
    domItems.lotteryNumbers[0].textContent = lotteryNumbers[0];
    await delayCall();
    domItems.lotteryNumbers[1].textContent = lotteryNumbers[1];
    await delayCall();
    domItems.lotteryNumbers[2].textContent = lotteryNumbers[2];
    await delayCall();
    domItems.lotteryNumbers[3].textContent = lotteryNumbers[3];
    await delayCall();
    domItems.lotteryNumbers[4].textContent = lotteryNumbers[4];
    compareNums();
}

// Comparison of numbers

let counter = 0;
const compareNums = () => {
    for (let i = 0; i < userNumbers.length; i++) {
        if (lotteryNumbers.includes(userNumbers[i])) {
            counter += 1;
        }
    }
    if (counter <= 1) {
        domItems.lotteryResult.textContent = (`Sorry ${domItems.setName.value}, you have ${counter} hit in the Lottery! Try again next week!`);
        domItems.lotteryResult.classList.add('bg-white');
    } else if (counter > 1) {
        domItems.lotteryResult.textContent = (`Congratulation ${domItems.setName.value}, you have ${counter} hit in the Lottery! You are lucky!`);
        domItems.lotteryResult.classList.add('bg-warning');
        localStorage.setItem(
            `${timeNow}`, `Name: ${domItems.setName.value}, Usernumbers: ${userNumbers}, Lotterynumbers: ${lotteryNumbers}, Hits: ${counter}`);
    }
    domItems.resultSection.classList.remove('d-none');
    userNumbers = [];
    lotteryNumbers = [];
}

// Set date

const date = new Date();
const time = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),

    zero(value) {
        if (value < 10) { value = '0' + value }
        return value
    }
};

const timeNow =
    `${time.year}.${time.zero(time.month)}.${time.zero(time.day)}. ${time.zero(time.hour)}:${time.zero(time.minute)}:${time.zero(time.second)}`;

// Start new game

const onTryAgain = () => {
    domItems.tryAgain.addEventListener('click', () => {
        location.reload();
    })
}

// List previous winners

const onPreWinnersClick = () => {
    domItems.preWinners.addEventListener('click', () => {
        domItems.preWinnerSection.classList.remove('d-none');
        domItems.preWinnerTable.insertAdjacentHTML('beforeend', `<tr class="bg-primary text-white"><td>${JSON.stringify(localStorage)}</td></tr>`);
    })
}

onDiceClick();
onCheckboxClick();
onStartClick();
onTryAgain();
onPreWinnersClick();