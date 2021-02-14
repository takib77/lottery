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
    tryAgain: document.querySelector('#tryAgain'),
    formSection: document.querySelector('#formSection'),
    tableSection: document.querySelector('#tableSection'),
    resultSection: document.querySelector('#resultSection')
}

// Check and use input datas

domItems.checkBox.checked = false;
const onCheckboxClick = () => {
    domItems.checkBox.addEventListener('click', () => {
        let temp = [];
        domItems.setNumbers.forEach(input => temp.push(parseInt(input.value)));
        temp.sort();
        if (temp.includes(NaN) || temp[4] > 90) {
            alert('You must choose 5 different number between 1 and 90!')
            domItems.checkBox.checked = false;
        } else {
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
        for (let i = 1; i <= 5; i++) {
            randomNum = Math.floor(Math.random() * (90 - 1)) + 1;
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
async function lotteryDrawing(drawNumber = 5, possibleNumber = 90) {
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
    }
    domItems.resultSection.classList.remove('d-none');
    userNumbers = [];
    lotteryNumbers = [];
}

// Start new game

const onTryAgain = () => {
    domItems.tryAgain.addEventListener('click', () => {
        location.reload();
    })
}


onDiceClick();
onCheckboxClick();
onStartClick();
onTryAgain();