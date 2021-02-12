'use strict';

// Items selectors //

const domItems = {
    setName: document.querySelector('#userName'),
    setNumber1: document.querySelector('#userNum1'),
    setNumber2: document.querySelector('#userNum2'),
    setNumber3: document.querySelector('#userNum3'),
    setNumber4: document.querySelector('#userNum4'),
    setNumber5: document.querySelector('#userNum5'),
    start: document.querySelector('.btn'),
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
    lotteryNumber5: document.querySelector('#lotteryTableNum5')
}

let userNumbers;
const onStartClick = () => {
    domItems.start.addEventListener('click', () => {
        userNumbers = [
            parseInt(domItems.setNumber1.value),
            parseInt(domItems.setNumber2.value),
            parseInt(domItems.setNumber3.value),
            parseInt(domItems.setNumber4.value),
            parseInt(domItems.setNumber5.value)
        ];
        domItems.writeName.textContent = domItems.setName.value;
        domItems.writeNumber1.textContent = userNumbers[0];
        domItems.writeNumber2.textContent = userNumbers[1];
        domItems.writeNumber3.textContent = userNumbers[2];
        domItems.writeNumber4.textContent = userNumbers[3];
        domItems.writeNumber5.textContent = userNumbers[4];
        lotteryEvent();
    });
}

const lotteryEvent = (drawNumber = 5, possibleNumber = 90) => {
    let lotteryNumbers = [];
    let randomNumber;
    for (let i = 1; i <= drawNumber; i++) {
        randomNumber = Math.floor(Math.random() * (possibleNumber - 1)) + 1;
        lotteryNumbers.push(randomNumber);
    }
    domItems.lotteryNumber1.textContent = lotteryNumbers[0];
    domItems.lotteryNumber2.textContent = lotteryNumbers[1];
    domItems.lotteryNumber3.textContent = lotteryNumbers[2];
    domItems.lotteryNumber4.textContent = lotteryNumbers[3];
    domItems.lotteryNumber5.textContent = lotteryNumbers[4];
}



onStartClick();