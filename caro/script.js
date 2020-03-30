class Tick {
    constructor(id, name, i, j, status = false) {
        this.id = id; 
        this.name = name;
        this.i = i;
        this.j = j; 
        this.status = status;
    }
}

let n = 3;
let m = 3;
let tick1 = {
    arr: [],
    stt: 'X', 
    n: 3,
    m: 3,
    isPlay: true
};

let tick2 = {
    arr: [],
    stt: 'X',
    n: 0,
    m: 0,
    isPlay: false
};

let reverceSTT = (ticks) => {
    let { stt } = ticks;
    if (stt === 'X') ticks.stt = 'O';
        else ticks.stt = 'X';
}

let check = (i, j, ticks, element) => {
    let check1 = (i, j, ticks) => {
        let index = i;
        let { n, m } = ticks;
        let { name } = ticks.arr[i][j];
        let result = [];
        while (--index > -1 && ticks.arr[index][j]["name"] === name);
        while (++index < n && ticks.arr[index][j]["name"] === name ) result.push(ticks.arr[index][j]);
        if (result.length >= m) {
            result.forEach(value => {
                let { id } = value;
                document.getElementById(element + '_' + id).style.color = 'red';
            });
            return true;
        }
        return false;
    }

    let check2 = (i, j, ticks) => {
        let index = j;
        let { n, m } = ticks;
        let { name } = ticks.arr[i][j];
        let result = [];
        while (--index > -1 && ticks.arr[i][index]["name"] === name);
        while (++index < n && ticks.arr[i][index]["name"] === name ) result.push(ticks.arr[i][index]);
        if (result.length >= m) {
            result.forEach(value => {
                let { id } = value;
                document.getElementById(element + '_' + id).style.color = 'red';
            });
            return true;
        }
        return false;
    }
    
    let check3 = (i, j, ticks) => {
        let { n, m } = ticks;
        let { name } = ticks.arr[i][j];
        let result = [];
        while (--i > -1 && --j > -1 && ticks.arr[i][j]["name"] === name);
        if (i===-1 & j!==-1) j--;
       
        while (++i < n && ++j < n && ticks.arr[i][j]["name"] === name ) result.push(ticks.arr[i][j]);
        if (result.length >= m) {
            result.forEach(value => {
                let { id } = value;
                document.getElementById(element + '_' + id).style.color = 'red';
            });
            return true;
        }
        
        return false;
    }

    let check4 = (i, j, ticks) => {
        let { n, m } = ticks;
        let { name } = ticks.arr[i][j];
        let result = [];
        while (--i >-1 && ++j < n && ticks.arr[i][j]["name"] === name);
        if (i===-1) j++;
        while (++i < n && --j > -1 && ticks.arr[i][j]["name"] === name ) result.push(ticks.arr[i][j]);
        if (result.length >= m) {
            result.forEach(value => {
                let { id } = value;
                document.getElementById(element + '_' + id).style.color = 'red';
            });
            return true;
        }
        return false;
    }

    if (check1(i, j, ticks) || check2(i, j, ticks) || check3(i, j, ticks) || check4(i, j, ticks)) return true;
    return false;
}

let touch = (i, j, element) => {
    if (element === 'table1') {
        if (tick1.isPlay) 
        handle1(i, j, tick1, element);
    } else if (tick2.isPlay) handle1(i, j, tick2, element);
}

let handle1 = (i, j, ticks, element) => {
    console.log(element, ticks)
    if (ticks.arr[i][j]["status"]) return;
    ticks.arr[i][j]["status"] = true;
    let { id } = ticks.arr[i][j];
    ticks.arr[i][j]["name"] = ticks.stt;
    document.getElementById(element + "_" + id).innerHTML = ticks.stt;
    document.getElementById(element + "_" + id).setAttribute('disabled', 'disabled');
    reverceSTT(ticks);
    if (check(i, j, ticks, element)) gameOver(element, ticks);
}

let gameOver = (element, ticks) => {
    setTimeout(() => {
        reverceSTT(ticks);
        alert(`${ticks.stt} win, Game over`);
        ticks.isPlay = false;
    }, 100);
}

let createMatrix = (n, m, ticks, element) => {
    let str = '';
    for (let i = 0; i<n; i++){
        str += '<tr>';
        let t = [];
        for (let j = 0; j<n; j++){
            let id = i*n + j;
            let tick = new Tick(id, '', i, j, false)
            str += `<td><button id="${element}_${id}" onclick="touch(${i}, ${j}, '${element}')">${tick.name}</button></td>`;
            t.push(tick);
        }
        str += '</tr>'; 
        ticks.push(t);
    }
    document.getElementById(element).innerHTML = str;
}

let start1 = () => {
    tick1.arr = [];
    tick1.stt = 'X';
    tick1.isPlay = true;
    createMatrix(3, 4, tick1.arr, 'table1');
}

createMatrix(3, 4, tick1.arr, 'table1');
document.getElementById('custom').addEventListener('submit', function(e) {
    e.preventDefault();
    let n = this.querySelector('[name="n"]').value;
    let m = this.querySelector('[name="m"]').value;
    n = parseInt(n);
    m = parseInt(m);
    if (m>n) {
        alert('Số hàng cột phải lớn hơn hoặc bằng số ô chiến thắng');
        return;
    }
    tick2 = {
        arr: [],
        stt: 'X',
        n: n,
        m: m,
        isPlay: true
    };
    createMatrix(n, m, tick2.arr, 'table2');
});