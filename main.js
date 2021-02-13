'use strict';

// Items selectors

const domItems = {
    setName: document.querySelector('#userName'),
    setNumber1: document.querySelector('#userNum1'),
    setNumber2: document.querySelector('#userNum2'),
    setNumber3: document.querySelector('#userNum3'),
    setNumber4: document.querySelector('#userNum4'),
    setNumber5: document.querySelector('#userNum5'),
    checkBox: document.querySelector('#checkbox'),
    getRandom: document.querySelector('#getRandom'),
    startGame: document.querySelector('#start'),
    writeName: document.querySelector('.userSpan'),
    writeNumber1: document.querySelector('#userTableNum1'),
    writeNumber2: document.querySelector('#userTableNum2'),
    writeNumber3: document.querySelector('#userTableNum3'),
    writeNumber4: document.querySelector('#userTableNum4'),
    writeNumber5: document.querySelector('#userTableNum5'),
    lotteryNumber1: document.querySelector('#lotteryTableNum1'),
    lotteryNumber2: document.querySelector('#lotteryTableNum2'),
    lotteryNumber3: document.querySelector('#lotteryTableNum3'),
    lotteryNumber4: document.querySelector('#lotteryTableNum4'),
    lotteryNumber5: document.querySelector('#lotteryTableNum5'),
    lotteryResult: document.querySelector('#result'),
    tryAgain: document.querySelector('#tryAgain'),
    formSection: document.querySelector('.formSection'),
    tableSection: document.querySelector('.tableSection'),
    resultSection: document.querySelector('.resultSection')
}

// Check and use input datas

domItems.checkBox.checked = false;
const onCheckboxClick = () => {
    domItems.checkBox.addEventListener('click', () => {
        let temp = [];
        temp.push(
            parseInt(domItems.setNumber1.value),
            parseInt(domItems.setNumber2.value),
            parseInt(domItems.setNumber3.value),
            parseInt(domItems.setNumber4.value),
            parseInt(domItems.setNumber5.value)
        );
        temp.sort();
        if (temp.includes(NaN) || temp[4] > 90) {
            alert('You must choose 5 different number between 1 and 90!')
            domItems.checkBox.checked = false;
        } else {
            domItems.startGame.classList.remove('d-none');
            domItems.checkBox.disabled = true;
        }
    });
}

let userNumbers = [];
const onStartClick = () => {
    domItems.startGame.addEventListener('click', () => {
        userNumbers.push(
            parseInt(domItems.setNumber1.value),
            parseInt(domItems.setNumber2.value),
            parseInt(domItems.setNumber3.value),
            parseInt(domItems.setNumber4.value),
            parseInt(domItems.setNumber5.value)
        );

        domItems.writeName.textContent = domItems.setName.value;
        domItems.writeNumber1.textContent = userNumbers[0];
        domItems.writeNumber2.textContent = userNumbers[1];
        domItems.writeNumber3.textContent = userNumbers[2];
        domItems.writeNumber4.textContent = userNumbers[3];
        domItems.writeNumber5.textContent = userNumbers[4];
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
            } else { i -= 1 };
        }
        domItems.setNumber1.value = randomNumbers[0];
        domItems.setNumber2.value = randomNumbers[1];
        domItems.setNumber3.value = randomNumbers[2];
        domItems.setNumber4.value = randomNumbers[3];
        domItems.setNumber5.value = randomNumbers[4];
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
    domItems.lotteryNumber1.textContent = lotteryNumbers[0];
    await delayCall();
    domItems.lotteryNumber2.textContent = lotteryNumbers[1];
    await delayCall();
    domItems.lotteryNumber3.textContent = lotteryNumbers[2];
    await delayCall();
    domItems.lotteryNumber4.textContent = lotteryNumbers[3];
    await delayCall();
    domItems.lotteryNumber5.textContent = lotteryNumbers[4];
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