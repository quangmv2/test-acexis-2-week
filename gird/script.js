const form = document.getElementById('form');
const body = document.getElementById('body');
const tag = document.getElementById('tag');
let arr = [];
let count = 0;
let n = 0, m = 0;
let max = 100;

let rd = () => {
    return Math.floor(Math.random()*1000 + 1);
}

let mySort = (index) => {
    arr.sort((a, b) => a[index] - b[index]);
    body.innerHTML = '';
    let length = 0;
    if (count*max >= arr.length) length = arr.length;
    else length = count*max;
    for (let i = 0; i<length; i++) {
        let row = body.insertRow(i);
        for (let j = 0; j<m; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = arr[i][j];
        }
    }
}

function handle(e) { 
    e.preventDefault();
    n = parseInt(form.querySelector('[name="row"]').value);
    m = parseInt(form.querySelector('[name="col"]').value);
    console.log(n, m);
    let str = '';
    for (let i = 0; i<m; i++) {
        str += `<th onclick="mySort(${i})">${i+1}</th>`;
    }
    document.getElementById('header').innerHTML = str;
    body.innerHTML = '';
    arr = [];
    count = 1;
    for (let i = 0; i<n; i++) {
        let row, cell;
        if (i<max) row = body.insertRow(i);
        let a = [];
        for (let j = 0; j<m; j++) {
            a.push(rd());
            if (i<max) cell = row.insertCell(j);
            if (i<max) cell.innerHTML = a[j];
        }
        arr.push([...a]);
    }
    }

function render(e) {  
    if (window.scrollY + window.innerHeight >= tag.offsetTop -10 && (count*max <=arr.length)){
        
        let t = 0, h = count;
        if (++h*max < arr.length) t = max;
            else t  = arr.length - (--h*max);
            console.log("count: " + count, "t: " + t, "h: " + h)
        for (let i= count*max; i < count*max+t; i++) {
            console.log( "II" +i);
            let row, cell;
            row = body.insertRow(i);
            for (let j = 0; j<m; j++) {
                cell = row.insertCell(j);
                cell.innerHTML = arr[i][j];
            }
        }
        count++;
    }
}
form.addEventListener('submit', handle);
window.addEventListener('scroll', render);