// fires when the initial HTML document completely loaded and parsed
document.addEventListener('DOMContentLoaded',function(){

    console.log('Pet Simulator Initialized');

    // define pet's maximum health points
    var hungerMax = 30
    var funMax = 30
    var hygieneMax = 30
    var energyMax = 30
    
    // define pet's current health points
    var hungerCur = hungerMax
    var funCur = funMax
    var hygieneCur = hygieneMax
    var energyCur = energyMax
    
    // define interval how fast pet's hp will get low 
    // (1000 = 1sec)
    var hungerInt = 4000
    var funInt = 3000
    var hygieneInt = 9000
    var energyInt = 6000

    // define how many hp points will be subtracted 
    var points = 2
    // define variable for hp bars width adjustment
    var hpWidth = 4 

    // query health bars to change hp 
    var hungerBar = document.getElementById('hungerBar')
    var funBar = document.getElementById('funBar')
    var hygieneBar = document.getElementById('hygieneBar')
    var energyBar = document.getElementById('energyBar')
    // query style attribute to change bars' bg colour
    var styleHunger  = hungerBar.style
    var styleFun  =  funBar.style
    var styleHygiene =  hygieneBar.style
    var styleEnergy  =  energyBar.style

    // define colour variables for hp borders
    var clrHunger = "#81F781"
    var clrFun = "#81F781"
    var clrHygiene = "#81F781"
    var clrEnergy = "#81F781" 

    // query buttons for click events
    var btnFeed = document.getElementById('btnFeed')
    var btnPlay = document.getElementById('btnPlay')
    var btnBath = document.getElementById('btnBath')
    var btnSleep = document.getElementById('btnSleep')

    // function to update hp
    function hpUpdate(){
        styleHunger.width = hungerCur * hpWidth + "px";	 
        styleFun.width = funCur * hpWidth + "px";	 
        styleHygiene.width = hygieneCur * hpWidth + "px";
        styleEnergy.width = energyCur * hpWidth + "px";
    }

    hpUpdate();

    // decrease Hunger at set interval
    setInterval(function(){
        loseHunger();
        
    },hungerInt);

    function loseHunger(){
        hungerCur = hungerCur - points;
        hpUpdate();
    }
    
    // decrease Fun at set interval
    setInterval(function(){
        loseFun();
    },funInt);
    
    function loseFun(){
        funCur = funCur - points;
        hpUpdate();
    }

    // decrease Hygiene at set interval
    setInterval(function(){
        loseHygiene();
    },hygieneInt);
    
    function loseHygiene(){
        hygieneCur = hygieneCur - points;
        hpUpdate();
    }

    // decrease Energy at set interval
    setInterval(function(){
        loseEnergy();
    },energyInt);
    
    function loseEnergy(){
        energyCur = energyCur - points;
        hpUpdate();
    }
    
});