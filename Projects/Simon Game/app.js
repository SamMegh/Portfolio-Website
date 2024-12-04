let userarry = [], level = 0, gamearry = [], start = false;
let h2 = document.querySelector("h2");
const color = ["red", "yellow", "green", "purple"];
let error = false;
let highest = [];
let highe = document.querySelector(".high");
highe.style.display = 'none';
let btns = document.querySelectorAll(".box");
function pressfun() {                                            //user click press function
    let box = document.getElementById(this.id);
    userflash(box);
    userarry.push(this.id);
    checksys(userarry.length - 1);
}

function userflash(box) {                                            //user selected box flash
    box.classList.add("suss");
    setTimeout(function () { box.classList.remove('suss') }, 100);
}

for (let index = 0; index < btns.length; index++) {                 //user click recoganise
    btns[index].addEventListener('click', pressfun);

}

function gameflash(box) {
    box.classList.add("white");
    setTimeout(function () { box.classList.remove('white') }, 250);
}

function levelup() {                                                //level up funciton
    userarry = [];
    level++;                            //level up here
    h2.innerHTML = `Level ${level}`;
    rendom_num = Math.floor(Math.random() * 4);
    rendom_color = color[rendom_num];
    gamearry.push(rendom_color);                                    //game arry updated here
    let box = document.querySelector(`#${rendom_color}`);
    gameflash(box);

}

document.addEventListener("keypress", function (event) {
    if (start == false) {
        start = true;
        highe.style.display = 'none';
        for (i = 0; i < btns.length; i++) {
            btns[i].classList.add(`box_hover`)
        }
        levelup();
    }
});
function checksys(index) {
    if (userarry[index] === gamearry[index]) {
        if (userarry.length == gamearry.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `YOU Loss! your score was ${level} <br> Press any key to start`;
        highest.push(level)
        console.log(highest)
        highe.style.display = 'inline-block';
        highe.innerHTML = `Highest Score : ${Math.max(...highest)}`;
        reset();
    }

}

function reset() {
    gamearry = [];
    userarry = [];
    level = 0;
    start = false;
}