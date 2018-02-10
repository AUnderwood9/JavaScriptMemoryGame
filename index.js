let colors = ["#993D3D", "#767199", "#493D99", "#FFAA40", "#CC6014", "#9ECC9C", "#BFFF00", "#CCC89C"];
let colorList = [];
let randomColors = [];
let squaresSelected = 0;
let selectedSquare1;
let selectedSquare2;
let numberOfMatches = 0;
let numberOfSquares = 0;
let numberOfClicks = 0;
let timeTracker;

colors.forEach((item) => {
    colorList.push({color: item, timesUsed: 0});
});

let removeEventHandler = (elementToModify, eventToRemove) => {
    $(elementToModify).off(eventToRemove);
}

let makeElementTransparent = (elementToModify) => {
    $(elementToModify).css({"opacity": 0});
}

let deleteElement = (elementToModify) => {
    $(elementToModify).remove();
}

// Gets a random color from an array of objects that contain the property color (Used for the colorList array of objects)
function getRandomElementFromClass(arrToRandomize){
    return arrToRandomize[Math.floor(Math.random()*arrToRandomize.length)].color;
}

// used in the find function to find an object in an array of objects that has this value
function randomColorIndex(item) {
    let strToCheck = String(this);
    return item.color === strToCheck;
}


function getRandomColorObject(colorToSearch){
    return colorList.find(randomColorIndex, colorToSearch);
}

// A function that removes a color object that has been used twice
function removeIfUsedTwice(item){
    return item.timesUsed < 2;
}

// This function distributes random color objects if they have been used less than two times
let distributeRandomColors = () => {
    let currentRandomColor;
    let currentColorObject;
    for(let i = 0; i < 16; i++){
        // Before searching, filter out objects that have been used two times or more
        colorList = colorList.filter(removeIfUsedTwice);

        // We are getting a random color then updating its object representation and telling it that it has been used
        // once it has been retrieved
        currentRandomColor = getRandomElementFromClass(colorList);
        currentColorObject = getRandomColorObject(currentRandomColor);

        currentColorObject.timesUsed++;

        // deploy the random color that was generated after its object representation has been updated
        randomColors.push(currentRandomColor);
    }
}

let addNewElement = (elementString, nodeToAppendTo = document.body) => {
    nodeToAppendTo.append(elementString);
}

let toggleElementClass = (elementToToggle, classToToggle) => {
    elementToToggle.toggleClass(classToToggle);
}; 

let hideSelectedSquares = (firstSquare, secondSquare) => {
    toggleElementClass($(firstSquare.children[0]), "hide");
    toggleElementClass($(secondSquare.children[0]), "hide");
}

// Remove event handlers from squares that match and set it's opacity to transparent
let concealMatchedSquares = (square1, square2) => {
    removeEventHandler(square1, "click");
    removeEventHandler(square2, "click");
    makeElementTransparent(square1);
    makeElementTransparent(square2);
}

// Compare the two squares that were selected
let squareColorMatch = (square1, square2) => {
    // return if the square colors match
    let match = $(square1.children[0]).css("backgroundColor") === $(square2.children[0]).css("backgroundColor");

    return match;
}

let handleClickToggle = (itemElement) => {
    itemElement.on("click", (event) => {
    let toggleTarget = $(event.currentTarget.children[0]);
    //let randomColor = distributeRandomColor();
    toggleElementClass(toggleTarget, "hide");
    //toggleTarget.css('background-color', `${randomColor}`);

    // Check if this is the first square that was selected or the second
    if(squaresSelected <= 2)
    {
        switch(squaresSelected){
            case 0:
                selectedSquare1 = event.target;
                break;
                
            case 1:
                selectedSquare2 = event.target;
                break;
        }
        squaresSelected++;
    }if(squaresSelected === 2){

        let alertTimer = () => {
            if(squareColorMatch(selectedSquare1, selectedSquare2)){
                alert("We have a match!");
                concealMatchedSquares(selectedSquare1, selectedSquare2);
                numberOfMatches++;
                if(numberOfMatches === (numberOfSquares/2)){
                    customTimeout(200, victoryMessage);
                }

            }else{
                alert("Sorry, this isn't a match :(");
                customTimeout(200, resetElements);
            }
        }

        let resetElements = () => {
            squaresSelected = 0;
            hideSelectedSquares(selectedSquare1, selectedSquare2);
            
        }

        let victoryMessage = () => {
            alert("Congratulations! you win! Aren't ya proud!? :D");
        }

        customTimeout(100, alertTimer);
        // customTimeout(1000, resetElements);

        //setTimeout
        squaresSelected = 0;
        
    }
    
    });
};

let customTimeout = (timeToWait, codeBlock) => {
    setTimeout(codeBlock, timeToWait);
}

$(document).ready( () => {
    let mainDiv = $("#box-container");
    let rowIndex = 0;

    distributeRandomColors();

    for(let i = 0; i < 4; i++){
        let currentRow = `row-${i}`;
        //createElementAndClass("div", ["row", "center-align"], "", mainDiv);
        addNewElement(`<div id=${currentRow} class="row center-align"></div>`, mainDiv)
        let currentDiv = $(`#${currentRow}`);
        for(let j = 0; j < 4; j++){
            let currentIndex = (j + (i * 4)) + 1;
            let currentElement = $(`<span id=box-${currentIndex} class="squares z-depth-3 waves-effect col m3"></span>`);
            let currentElementChild = $(`<span class="content hide">${currentIndex}</span>`);
            let randomColor = randomColors[currentIndex-1];
            currentElementChild.css('background-color', `${randomColor}`);

            addNewElement(currentElementChild, currentElement);
            addNewElement(currentElement, currentDiv);
        }
    }

    let squareSpans = mainDiv.children().children();
    numberOfSquares = squareSpans.length;

    squareSpans.each((index, item) => {
        let itemElement = $(`#${item.id}`)

        handleClickToggle(itemElement);
         
        
    });
});