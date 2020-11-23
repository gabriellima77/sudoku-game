let mouse = [0, 0];
let value, block;
const close = document.querySelector('#close');
const numbers = document.querySelector('#numbers');
let table;

close.onclick = ()=>{
    numbers.style.display = 'none';
}


window.addEventListener('mousemove', e =>{
    mouse[0] = e.x;
    mouse[1] = e.y;
});

function getIndex(){
    let i, j;
    let containers = Array.from(table);
    containers.forEach( (element, a) => {
        if(element.contains(block)){
            i = a;
            Array.from(element.children).forEach( (e, index) =>{ 
                if(e === block){
                    j = index;
                }
            })
        }
    })
    return [i, j];
}

function incorrectMove(parent){
    let verify = 0;
    let index = getIndex();
    Array.from(parent.children).forEach(element => {
        if(element.textContent == value && element != block){
            verify =  1;
        }
    });
    let line = [index[1] - (index[1] % 3), index[0] - (index[0] % 3)];
    let box  = table;
    for(let i = line[1]; i < line[1] + 3; i++){
        for(let j = line[0]; j < line[0] + 3; j++){
            if(box[i].children[j].textContent == value && box[i].children[j] != block){
                verify = 1;
            }
        }
    }
    let column = [(index[1] >= 6) ? (index[1] % 6): (index[1] >= 3) ? (index[1] % 3): index[1]];
    column.push((index[0] >= 6) ? (index[0] % 6): (index[0] >= 3) ? (index[0] % 3): index[0]);
    for(let i = column[1]; i < column[1] + 9; i += 3){
        for(let j = column[0]; j < column[0] + 9; j += 3){
            if(box[i].children[j].textContent == value && box[i].children[j] != block){
                verify = 1;
            }
        }
    }
    return verify;
}

function addNumber(){
    value = this.textContent;
    if(incorrectMove(block.parentElement)){
        block.style.color = 'red';
    }
    else{
        block.style.color = 'black';
    }
    block.textContent = value;
}

function putNumbers(){
    if(!this.classList.contains('blocked')){
        numbers.style.left = mouse[0] + 'px';
        numbers.style.top = mouse[1] + 'px';
        numbers.style.display = 'grid';
        let number = document.querySelectorAll('.number');
        number.forEach(element => element.addEventListener('click', addNumber));
        document.querySelector('#clear').onclick = ()=>{
            block.textContent = '';
        }
    }
    block = this;
}

function startGame(difficulty = 'easy'){
    let n = (difficulty === 'easy')? 4: 3;
    table.forEach(block => {
        Array.from(block.children).forEach(tile =>{
            let p = document.createElement('p');
            p.textContent = '123456789';
            tile.appendChild(p);
        })
    })
    pickNumber(n);
}

function pickNumber(n){
    let para;
    let pos, number;
    let v;
    for(let i = 0; i < table.length; i++){
        for(let j = 0; j < n; j++){
            pos = Math.floor(Math.random() * 9);
            if(table[i].children[pos].children[0]){
                para = table[i].children[pos].children[0];
                number = Math.floor(Math.random() * para.textContent.length);
                v = para.textContent[number];
                block = table[i].children[pos];
                removeNumber(table[i], para.textContent[number]);
                table[i].children[pos].removeChild(para);
                table[i].children[pos].textContent = v;
                table[i].children[pos].classList.add('blocked');
            }
            else {
                j--;
            }
            
        }
    }
}

function removeNumber(block, number){
    let index = getIndex();
    let tile;
    Array.from(block.children).forEach(element => {
        if(element.children[0]){
            if(element.children[0].textContent.match(number)){
                element.children[0].textContent = element.children[0].textContent.replace(number, '');
            }
        }
    });
    let line = [index[1] - (index[1] % 3), index[0] - (index[0] % 3)];
    let box  = table;
    for(let i = line[1]; i < line[1] + 3; i++){
        for(let j = line[0]; j < line[0] + 3; j++){
            tile = box[i].children[j];
            if(tile.children[0]){
                if(tile.children[0].textContent.match(number)){
                    tile.children[0].textContent = tile.children[0].textContent.replace(number, '');
                }
            }
        }
    }
    let column = [(index[1] >= 6) ? (index[1] % 6): (index[1] >= 3) ? (index[1] % 3): index[1]];
    column.push((index[0] >= 6) ? (index[0] % 6): (index[0] >= 3) ? (index[0] % 3): index[0]);
    for(let i = column[1]; i < column[1] + 9; i += 3){
        for(let j = column[0]; j < column[0] + 9; j += 3){
            tile = box[i].children[j];
            if(tile.children[0]){
                if(tile.children[0].textContent.match(number)){
                    tile.children[0].textContent = tile.children[0].textContent.replace(number, '');
                }
            }
        }
    }
}

function game(){
    let container = document.querySelector('#container');
    let box;
    for(let i = 0; i < 81; i++){
        if(i % 9 === 0){
            box = document.createElement('div');
            box.classList.add('container');
            container.appendChild(box);
        }
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', putNumbers);
        box.appendChild(tile);
    }
    table = document.querySelectorAll('.container');
    startGame('easy');
}

game();