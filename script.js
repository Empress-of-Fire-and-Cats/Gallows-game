let body = document.querySelector(".body");
let word_box = document.querySelector(".word_box");
let letter = document.getElementsByClassName("letter");
let blood_drop = document.getElementsByClassName("blood_drop");
let gallows = document.getElementsByClassName("gallows");
let wrapper_lifes = document.querySelector(".wrapper_lifes");
let lifes_text = document.querySelector(".lifes_text");
let dead_play_again = document.querySelector(".dead_play_again");
let win_block = document.querySelector(".win_block");
let text_clue = document.querySelector(".text_clue");
let play = document.getElementsByClassName("play");

win_block.style.display = "none";

const wordList = ["шавермастер", "пиццайоло", "котенок", "спрайт", "обнимашки"];
const word = wordList[Math.floor(Math.random() * wordList.length)];

for (let i = 0; i < word.length; i++) {
    word_box.insertAdjacentHTML('beforeend', '<div class="letter"></div>');
}

let stopGame = false;
let usedBtns = [];
let winCheck = 0;
let dropsCount = 0;
let gallowsCount = 0;

document.addEventListener('keydown', (event) => {
    if (stopGame == false && event.key.match(/[А-Яа-я]/)) {
        
        let currentLetter = event.key.toLowerCase();
        let errorCheck = 1;
        let usedBtn = 0;

        // Если клавиша совпадает с буквой, которая уже была нажата (верная или неверная),
        // ошибка не засчитывается
        for(elem of usedBtns) {
            if(currentLetter == elem) {
                errorCheck = 0;
                usedBtn = 1;
            }   
        }

        if(usedBtn == 0) {
            for (let i = 0; i < word.length; i++) {
                //Если выбрана правильная буква
                if (word[i] == currentLetter) {
                    letter[i].innerHTML = word[i];
                    errorCheck = 0;
                    winCheck++;
                    usedBtns.push(currentLetter);
                    //Если все буквы отгаданы
                    if (winCheck == word.length) {
                        stopGame = true;
                        win_block.style.display = "block";
                        wrapper_lifes.style.display = "none";
                        text_clue.style.display = "none";
                        blink();
                    }
                } 
            }           
            
            if (errorCheck == 1) {
                //Если совершена ошибка
                if (dropsCount < blood_drop.length - 1) {
                    blood_drop[dropsCount].style.display = "none";
                    dropsCount++;
                    gallows[gallowsCount].style.display = "block";
                    gallowsCount++;
                    usedBtns.push(currentLetter);
                } else {
                    //Если не осталось жизней
                    blood_drop[dropsCount].style.display = "none";
                    gallows[gallowsCount].style.display = "block";
                    stopGame = true;
                    lifes_text.style.display = "none";
                    dead_play_again.style.display = "block";
                    blink();
                }
            }
        }
    }
})

function blink() {
    setInterval(() => {
        play[0].style.opacity = "0";
        play[1].style.opacity = "0";
        setTimeout(() => {
            play[0].style.opacity = "1";
            play[1].style.opacity = "1";
        }, 1000);
    }, 2000);
}










