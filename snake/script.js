class Snake {
    constructor(id, i, j) {
        this.id = id;
        this.i = i; 
        this.j = j
    }
}
const radios = document.querySelectorAll('[type="radio"]');
let rd = () => {
    return Math.floor(Math.random()*20);
}
const speed = 1000;
let n = 20;
let snake = new Snake(9*n + 9 + 1, 9, 9);
let snakes = [snake];
let horizontal = 1;
let vertical = 0;
let newFoodi = rd();
let newFoodj = rd();
let food = {
    id: newFoodi*n + newFoodj + 1,
}
let optionA = true;
let idInterval = 0;
let isPlay = true;
let isDie = false;

let run = () => {   
    if (isDie) return;
    let { id, i, j } = snakes[0];
    document.getElementById(food.id).style.background = 'black';
    i+=vertical;
    j+=horizontal;
    if (optionA) {
        if (i<0 || i>=n || j<0 || j>=n) {
            gameOver();
            return;
        }
    } else {
        if (i<0) i = n-1;
            else if (i>=n) i = 0;
        if (j<0) j = n-1;
        else if (j>=n) j = 0;
    }
    let snake = new Snake(i*n + j + 1, i, j);
    snakes.unshift(snake);

    snakes.forEach((value, index) => {
        if (index === 0) return;
        if (value.id === snake.id) {
            gameOver();
            return;
        }
    });

    if (snake.id === food.id) {
        let newFoodi = rd();
        let newFoodj = rd();
        food = {
            id: newFoodi*n + newFoodj + 1,
        }
        document.getElementById(food.id).style.background = 'black';
    } else {
        if (!isDie) document.getElementById(snakes[snakes.length - 1].id).style.background = 'white';
        snakes.pop();
    }
    document.getElementById(snakes[0].id).style.background = 'red';
    document.getElementById('length').innerHTML = "Độ dài: " + snakes.length;
}

let gameOver = () => {
    isDie = true;
    clearInterval(idInterval);
    document.getElementById('length').innerHTML = "Độ dài: 1" ;
    alert("Game over");
}

let createMatrix = () => {
    let str = '';
    for (let i = 0; i<n; i++){
        str += '<tr>';
        for (let j = 0; j<n; j++){
            let id = i*n + j + 1;
            str += `<td id=${id}></td>`;
        }
        str += '</tr>';
    }
    document.getElementById('table').innerHTML = str;
}

function handle(e) {
    let key = e.which;
    if (key === 37 && horizontal === 0) {
        clearInterval(idInterval);
        horizontal = -1;
        vertical = 0;
        run();
        idInterval = setInterval(() => {
            run();
        }, speed);
        return;
    }
    if (key === 39 && horizontal === 0) {
        clearInterval(idInterval);
        horizontal = 1;
        vertical = 0;
        run();
        idInterval = setInterval(() => {
            run();
        }, speed);
        return;
    }
    if (key === 38 && vertical === 0) {
        clearInterval(idInterval);
        horizontal = 0;
        vertical = -1;
        run();
        idInterval = setInterval(() => {
            run();
        }, speed);
        return;
    }
    if (key === 40 && vertical === 0) {
        clearInterval(idInterval);
        horizontal = 0;
        vertical = 1;
        run();
        idInterval = setInterval(() => {
            run();
        }, speed);
        return;
    }
    
}

function changeOption(e) {
    let value = this.value;
    if (value === 'A') optionA = true 
     else optionA = false;
    document.getElementById('reset').focus();
}

createMatrix();
idInterval = setInterval(() => {
    run();
}, speed);
document.getElementById('length').innerHTML = "Độ dài: 1" ;
document.addEventListener('keydown', handle);
radios.forEach(radio => radio.addEventListener('click', changeOption))
radios.forEach(radio => radio.addEventListener('change', (e) => {console.log(e)}))
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(idInterval);
    createMatrix();
    let snake = new Snake(9*n + 9 + 1, 9, 9);
    snakes = [snake];
    isPlay = true;
    isDie = false;
    horizontal = 1;
    vertical = 0;
    let newFoodi = rd();
    let newFoodj = rd();
    food = {
        id: newFoodi*n + newFoodj + 1,
    }
    idInterval = setInterval(() => {
        run();
    }, speed);
});