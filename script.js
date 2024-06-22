const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()_+=-:;"<>?/,.';

//initially
let password = "";
let passwordLength = 0;
let checkCount = 0;
handleslider();
setIndicator("#ccc")

// set strength circle to grey


//set passwordlength
function handleslider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%"
    
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;  
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol(){
    const randNUM = getRndInteger(0,symbols.length);
    return symbols.charAt(randNUM);
}

function calcStrength(){
    let hasUpper =false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercasecheck.checked) hasUpper = true;
    if(lowercasecheck.checked) hasLower = true;
    if(numberscheck.checked) hasNum = true;
    if(symbolscheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6 ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00"); 
    }
}

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})


function shufflePassword(array){
    //Fischer Yates Method
    for(let i=array.length-1;i>=0;i--){
        //generate random j
        const j = Math.floor(Math.random() * (i));
        //swap
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    console.log(array)
    let str = "";
    array.forEach(element => {
        console.log(element)
        str+= element;
    });
    console.log(str)
    return str;
    

}

function handleCheckBoxChange(){
    checkCount =0;
    allcheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleslider();
    }
}


allcheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleslider();
})

generateBtn.addEventListener('click',()=>{
    //none of the checkbox are selected

    if(checkCount == 0)
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleslider();
    }

    //lets start the journey to find new password

    console.log("Starting the journey");

    //remove old password
    password = "";

    //lets put the stuff mentioned by checkboxes 

    let funcArr = [];

    if(uppercasecheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercasecheck.checked)
        funcArr.push(generateLowerCase);

    if(numberscheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolscheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }
    console.log("compulsory addition done");
    console.log(password);

    //remaining addition
    for(let i=0;i<passwordLength - funcArr.length;i++){
        let randindex = getRndInteger(0,funcArr.length);
        console.log("randIndex" + randindex);
        password += funcArr[randindex]();
    }
    console.log("remaining addition done");
    console.log(password)
    //shuffle the password

    console.log(Array.from(password))
    password = shufflePassword(Array.from(password));
    console.log("Password is shuffled");
    console.log(password)

    //show in UI
    passwordDisplay.value = password;
    console.log("UI addition done");

    //calculating streght
    calcStrength();
    
})

