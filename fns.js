// define pet's maximum health points
let maxValue = 30;
let pet;

// define how many hp points will be subtracted 
let points = 2

// define letiable for hp bars width adjustment
let hpWidth = 4

//Declare container elements
let ingameEl;
let notifyEl;
let barsEl;
let btnEl;

//Declare background music
var bg;

// fires when the initial HTML document completely loaded and parsed
document.addEventListener('DOMContentLoaded',function(){

    console.log('Pet Simulator Initialized');

    //Assign container elements
    ingameEl = document.getElementById("ingame");
    notifyEl = document.getElementById("notify");
    barsEl = document.getElementById("bars-container");
    btnEl = document.getElementById("btn-container");

    //Listen to start button
    let startBtn = document.getElementById('start');
    startBtn.addEventListener('click', function(){
        console.log('Start Game!')
        ingame();
    });

});

// Empty notification section
function emptyElement(element){
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

//Start game; populate with game elements
function ingame(){
    // JSON pet declaration
    pet = { 
        el: document.getElementById('pet'),
        curVal: { // define pet's current health points
            hunger: maxValue,
            fun: maxValue,
            hygiene: maxValue,
            energy: maxValue,
        },
        int: { // define interval how fast pet's hp will get low (1000 = 1sec)
            hunger: 4000,
            fun: 3000,
            hygiene: 9000,
            energy: 6000
        },
        points: {
            hunger: 2,
            fun: 2,
            hygiene: 2,
            energy: 2
        },
        barEl: {
            hunger: document.createElement("div"),
            fun: document.createElement("div"),
            hygiene: document.createElement("div"),
            energy: document.createElement("div"),
        },
        btnEl: {
            hunger: document.createElement("button"),
            fun: document.createElement("button"),
            hygiene: document.createElement("button"),
            energy: document.createElement("button"),
        },
        audio: {
            feed: new Audio('sound/feed.mp3'),
            play: new Audio('sound/play.wav'),
            bath: new Audio('sound/bath.wav'),
            sleep: new Audio('sound/sleep.wav'),
        }
    }

    //Empty notification area
    emptyElement(notifyEl);

    //play music
    playMusic();

    //set and animate sprite
    pet.el.setAttribute('src', 'images/normal.png');
    pet.el.style.animationDuration = "2s";
    pet.el.style.animationName = "sway";

    //Create elements

    //Hunger Bar
    pet.barEl.hunger.setAttribute('id', 'hunger');
    pet.barEl.hunger.setAttribute('class', 'bar-container');
    pet.barEl.hunger.appendChild(document.createTextNode("Hunger"));
    let hungerBar = document.createElement("div");
    hungerBar.setAttribute('id', 'hungerBar');
    hungerBar.setAttribute('class', 'bar');
    pet.barEl.hunger.appendChild(hungerBar);

    //Fun Bar
    pet.barEl.fun.setAttribute('id', 'fun');
    pet.barEl.fun.setAttribute('class', 'bar-container');
    pet.barEl.fun.appendChild(document.createTextNode("Fun"));
    let funBar = document.createElement("div");
    funBar.setAttribute('id', 'funBar');
    funBar.setAttribute('class', 'bar');
    pet.barEl.fun.appendChild(funBar);

    //Hygiene Bar
    pet.barEl.hygiene.setAttribute('id', 'hygiene');
    pet.barEl.hygiene.setAttribute('class', 'bar-container');
    pet.barEl.hygiene.appendChild(document.createTextNode("Hygiene"));
    let hygieneBar = document.createElement("div");
    hygieneBar.setAttribute('id', 'hygieneBar');
    hygieneBar.setAttribute('class', 'bar');
    pet.barEl.hygiene.appendChild(hygieneBar);

    //Energy Bar
    pet.barEl.energy.setAttribute('id', 'energy');
    pet.barEl.energy.setAttribute('class', 'bar-container');
    pet.barEl.energy.appendChild(document.createTextNode("Energy"));
    let energyBar = document.createElement("div");
    energyBar.setAttribute('id', 'energyBar');
    energyBar.setAttribute('class', 'bar');
    pet.barEl.energy.appendChild(energyBar);

    //Feed Button
    pet.btnEl.hunger.setAttribute('id', 'btnFeed');
    pet.btnEl.hunger.setAttribute('class', 'btn btn-success');
    pet.btnEl.hunger.appendChild(document.createTextNode("Feed"));

    //Play Button
    pet.btnEl.fun.setAttribute('id', 'btnPlay');
    pet.btnEl.fun.setAttribute('class', 'btn btn-primary');
    pet.btnEl.fun.appendChild(document.createTextNode("Play"));

    //Bath Button
    pet.btnEl.hygiene.setAttribute('id', 'btnBath');
    pet.btnEl.hygiene.setAttribute('class', 'btn btn-info');
    pet.btnEl.hygiene.appendChild(document.createTextNode("Bath"));

    //Sleep Button
    pet.btnEl.energy.setAttribute('id', 'btnsleep');
    pet.btnEl.energy.setAttribute('class', 'btn btn-warning');
    pet.btnEl.energy.appendChild(document.createTextNode("Sleep"));
    
    // Append elements to bar container
    barsEl.appendChild(pet.barEl.hunger);
    barsEl.appendChild(pet.barEl.fun);
    barsEl.appendChild(pet.barEl.hygiene);
    barsEl.appendChild(pet.barEl.energy);

    // Append elements to button container
    btnEl.appendChild(pet.btnEl.hunger);
    btnEl.appendChild(pet.btnEl.fun);
    btnEl.appendChild(pet.btnEl.hygiene);
    btnEl.appendChild(pet.btnEl.energy);

    //Display initial bar width
    for (let [key, value] of Object.entries(pet.curVal)){
        updateBar(key);
    }

    updateVal();
    btnListener();
}

// function to update bar values
function updateVal() {
    //Clear intervals
    for (var i = 1; i < 99999; i++){
        window.clearInterval(i);
    }

    // decrease value at set interval
    for (let [key, value] of Object.entries(pet.curVal)) {
        setInterval(function(){
            pet.curVal[key] -= pet.points[key];
            updateBar(key);

            petChange();
        }, pet.int[key]);
    }
}

// function to visually update hp
function updateBar(key){
    let bar = document.getElementById(key + 'Bar');
    
    bar.style.width = pet.curVal[key] * hpWidth + "px";
    if(pet.curVal[key] <= 16 && pet.curVal[key] > 6){
        bar.style.background = "rgb(216, 178, 52)"
        bar.style.borderColor = "rgb(214, 156, 47)"; 
    } else if (pet.curVal[key] <= 6){
        bar.style.background = "rgb(240, 50, 50)"
        bar.style.borderColor = "rgb(131, 24, 24)";
    } else {
        bar.style.background = "#81F781"
        bar.style.borderColor = "rgb(90, 184, 90)";
    }
}

// function to add listeners to buttons
function btnListener(){
    for (let [key, value] of Object.entries(pet.btnEl)) {
        value.addEventListener('click', function(){
            if(pet.curVal[key] <= maxValue){
                pet.curVal[key] += 6;
                bubble(key);
            }
            pet.btnEl[key].setAttribute('disabled', '');
                setTimeout(function(){
                    pet.btnEl[key].removeAttribute('disabled');
                }, pet.int[key]/2);
            updateBar(key);
        });
    }
}

//bubble animation
function bubble(key){
    let bubble = document.createElement('img')
    bubble.setAttribute('class', 'sprite bubble');
    switch(key){
        case 'hunger':
            bubble.setAttribute('src', 'images/carrot.png');
            pet.audio.feed.play();
            if(pet.curVal.hygiene >= 4){pet.curVal.hygiene -= 4;}
            updateBar('hygiene');
            break;
        case 'fun':
            bubble.setAttribute('src', 'images/happy.png');
            pet.audio.play.play();
            if(pet.curVal.hunger >= 4){pet.curVal.hunger -= 4;}
            updateBar('hunger');
            if(pet.curVal.hygiene >= 2){pet.curVal.hygiene -= 2;}
            updateBar('hygiene');
            if(pet.curVal.energy >= 8){pet.curVal.energy -= 8;}
            updateBar('energy');
            break;
        case 'hygiene':
            bubble.setAttribute('src', 'images/soap.png');
            pet.audio.bath.play();
            if(pet.curVal.fun >= 8){pet.curVal.fun -= 8;}
            updateBar('fun');
            break;
        case 'energy':
            bubble.setAttribute('src', 'images/sleep.png');
            pet.audio.sleep.play();
            break;
    }
    ingameEl.appendChild(bubble);

    setTimeout(function(){
        ingameEl.removeChild(bubble);
    }, 1000);
}

//declare interval array
let extraInterval = [];

//Visually display changes to pet
function petChange(){
    if(pet.curVal.hunger <= 16){
        pet.el.setAttribute('src', 'images/lowHunger.png');
    }
    else if(pet.curVal.fun <= 16){
        pet.el.setAttribute('src', 'images/lowFun.png');
    }
    else if(pet.curVal.hygiene <= 16){
        pet.el.setAttribute('src', 'images/lowHygiene.png');
    }
    else if(pet.curVal.energy <= 16){
        pet.el.setAttribute('src', 'images/lowEnergy.png');
        if(pet.curVal.energy <= 6){
            pet.el.style.animationDuration = "4s";
        } else {
            pet.el.style.animationDuration = "3s";
        }
    } else {
        pet.el.setAttribute('src', 'images/normal.png');
        pet.el.style.animationDuration = "2s";
        pet.el.style.animationName = "sway";
    }
    if(pet.curVal.hunger <= 0){
        lose("Bunny starved");
        pet.el.setAttribute('src', 'images/dead.png');
        pet.el.style.animationName = "none";
    }
    if(pet.curVal.fun <= 0){
        
        //Notify player of depression
        let notifyDepress = document.getElementById('depress');
        if(notifyEl.contains(notifyDepress) == false){
            let notifytext = document.createElement('h1');
            notifytext.setAttribute('id', 'depress')
            notifytext.appendChild(document.createTextNode("Bunny is depressed"));
            notifyEl.appendChild(notifytext);
        }

        extraInterval[0] = setInterval(function(){
            pet.curVal.hygiene -= pet.points.hygiene;
            updateBar('hygiene');
        }, 1500);
    } else {
        if(extraInterval[0] != null | extraInterval[0] != undefined){
            clearInterval(extraInterval[0]);
            extraInterval[0] = null;
            emptyElement(notifyEl);
        }
    }
    if(pet.curVal.hygiene <= 0){
        lose("Bunny got sick");
        pet.el.setAttribute('src', 'images/dead.png');
        pet.el.style.animationName = "none";
    }
    if(pet.curVal.energy <= 0){

        //Notify player of exhaustion
        let notifyExhausted = document.getElementById('exhausted');
        if(notifyEl.contains(notifyExhausted) == false){
            let notifytext = document.createElement('h1');
            notifytext.setAttribute('id', 'exhausted')
            notifytext.appendChild(document.createTextNode("Bunny is exhausted"));
            notifyEl.appendChild(notifytext);
        }

        extraInterval[1] = setInterval(function(){
            pet.curVal.hygiene -= pet.points.hygiene;
            extraInterval++
            updateBar('hygiene');
        }, 1500);
    } else {
        if(extraInterval[1] != null | extraInterval[1] != undefined){
            clearInterval(extraInterval[1]);
            extraInterval[1] = null;
            emptyElement(notifyEl);
        }
    }
}

//function to call lose screen on losing condition
function lose(loseString){
    for (var i = 1; i < 99999; i++){
        window.clearInterval(i);
    }

    //pause audio
    bg.pause();

    //empty elements
    emptyElement(notifyEl);
    emptyElement(barsEl);
    emptyElement(btnEl);

    let losetext = document.createElement('h1');
    losetext.appendChild(document.createTextNode(loseString));
    let loseBtn = document.createElement('button');
    loseBtn.appendChild(document.createTextNode("Get a new bunny"));
    loseBtn.setAttribute('id', 'start');
    loseBtn.setAttribute('class', 'btn btn-success');

    loseBtn.addEventListener('click', function(){
        ingame();
    })

    notifyEl.appendChild(losetext);
    notifyEl.appendChild(loseBtn);
}

// background music function
function playMusic() {
    if(bg == null){
        bg = new Audio('sound/bg.mp3');
    }
    bg.volume = 0.5;
    bg.play();
}