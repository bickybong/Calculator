const but0 = document.querySelector("#b0");
const but1 = document.querySelector("#b1");
const but2 = document.querySelector("#b2");
const but3 = document.querySelector("#b3");
const but4 = document.querySelector("#b4");
const but5 = document.querySelector("#b5");
const but6 = document.querySelector("#b6");
const but7 = document.querySelector("#b7");
const but8 = document.querySelector("#b8");
const but9 = document.querySelector("#b9");
const butDot = document.querySelector("#bdot");

const addd = document.querySelector("#add");
const subtractd = document.querySelector("#subtract");
const divided = document.querySelector("#divide");
const multiplyd = document.querySelector("#multiply");
const equald = document.querySelector("#equal");
const cleard = document.querySelector("#clear");
const backd = document.querySelector("#back");

const display = document.querySelector("#shownNumbers");
const stored = document.querySelector("#stored");

displayScreen = "0";//initial display
storedScreen = 0;//initial stored

function equalsRefresh(){
    storedScreen = 0;
    stored.textContent = storedScreen;
}// refresh stored screen to 0 on = click

function round(num){//round numbers to 3dp
    return Math.round(num * 1000) / 1000;
};

function previousOperators (prevOperator) { //calculate the previous operator on new operator click
    storedScreen = parseFloat(storedScreen);
    switch (prevOperator){
        case "add":
            storedScreen += displayScreen;
            stored.textContent =   `${round(storedScreen)} +`;
        break;

        case "subtract":
            storedScreen -= displayScreen;
            stored.textContent =   `${round(storedScreen)} -`;
        break;

        case "divide":
            storedScreen /= displayScreen;
            stored.textContent =   `${round(storedScreen)} /`;
        break;

        case "multiply":
            storedScreen *= displayScreen;
            stored.textContent =   `${round(storedScreen)} x`;
        break;
    };
};

prevOperator = "";//initial previous operator
function operatorButton (operator){
    previousOperators(prevOperator);
    if (storedScreen === 0){
            storedScreen = displayScreen;
    };
    switch (operator){
        case "add":
            equald.onclick = () =>{//eqautes everything on equal click
                displayScreen = parseFloat(displayScreen);
                displayScreen += storedScreen;
                display.textContent = round(displayScreen);
                equalsRefresh();
                equald.onclick = "";
            };
            stored.textContent =   `${round(storedScreen)} +`;
        break;

        case "subtract":
            equald.onclick = () =>{
                displayScreen = parseFloat(displayScreen);
                displayScreen = storedScreen - displayScreen;
                display.textContent = round(displayScreen);
                equalsRefresh();
                equald.onclick = "";
            };
            stored.textContent =   `${round(storedScreen)} -`;
        break;

        case "divide":
            equald.onclick = () =>{
                displayScreen = parseFloat(displayScreen);
                if (displayScreen == 0){ // divide by 0
                    display.textContent = "numbers go brrr";
                    displayScreen = storedScreen;
                } else {
                displayScreen = storedScreen / displayScreen;
                display.textContent = round(displayScreen);
                };
                equalsRefresh();
                equald.onclick = "";
            };
            stored.textContent =   `${round(storedScreen)} /`;
        break;

        case "multiply":
            equald.onclick = () =>{
                displayScreen = parseFloat(displayScreen);
                displayScreen *= storedScreen;
                display.textContent = round(displayScreen);
                equalsRefresh();
                equald.onclick = "";
            };
            stored.textContent =   `${round(storedScreen)} x`;
        break;
    };
    displayScreen = 0; //reset display to 0
    display.textContent = displayScreen;
    prevOperator = operator; //stores previous operator
};

addd.addEventListener("click",()=> {operatorButton ("add")});
subtractd.addEventListener("click",()=> {operatorButton ("subtract")});
divided.addEventListener("click",()=> {operatorButton ("divide")});
multiplyd.addEventListener("click",()=> {operatorButton ("multiply")});

cleard.onclick = ()=>{ //clear button
    displayScreen = 0; //reset display to 0
    display.textContent = displayScreen;
    equalsRefresh();
    prevOperator = 0;
}

function numberButtons(btn,num){
    btn.addEventListener('click', () => {
        displayScreen = displayScreen.toString();
        displayScreen= displayScreen.concat(num);
        display.textContent = displayScreen;
        displayScreen = parseFloat(displayScreen);
      });
      
};

function activateNumberButtons(){
    buttonObject = {0:but0, 1:but1, 2:but2, 3:but3, 4:but4, 
        5:but5 ,6:but6, 7:but7, 8:but8, 9:but9};
    for (let but in buttonObject){
        numberButtons(buttonObject[but],but);
    }
};

butDot.onclick = () =>{// decimal button
    displayScreen = displayScreen.toString();
    if (!displayScreen.includes(".")){
        displayScreen= displayScreen.concat(".");
        display.textContent = displayScreen;
    };
}

backd.onclick = () =>{//back button
    displayScreen = displayScreen.toString();
    if (displayScreen.length > 1){
        displayScreen= displayScreen.slice(0,-1);
    };
    display.textContent = displayScreen;
};

activateNumberButtons();
display.textContent = displayScreen;
stored.textContent = storedScreen;

