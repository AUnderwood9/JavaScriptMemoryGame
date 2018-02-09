let colors = ["#993D3D", "#767199", "#493D99", "#FFAA40", "#CC6014", "#9ECC9C", "#BFFF00", "#CCC89C"];
let colorList = [];
let randomColors = [];

colors.forEach((item) => {
    colorList.push({color: item, timesUsed: 0});
});

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

// let distributeRandomColor = () => {
//     let randomIndex = Math.floor(Math.random()*colorList.length);
//     let randomColor = colorList[randomIndex].color;
//     let timesGiven = colorList[randomIndex].timesUsed;
//     //let randomColor = colorList[Math.floor(Math.random()*colorList.length)];
//     while(colorList[randomIndex].timesUsed < 2){
//         if(colorList[randomIndex].timesUsed < 2){
//             //console.log(`Fire for: ${colorList[randomIndex].color}, used ${colorList[randomIndex].timesUsed} times`);
//             colorList[randomIndex].timesUsed++;
//         }
//         else{
//             randomIndex = Math.floor(Math.random()*colorList.length);
//         }
//     }

//     //console.log(colorList);

//     return colorList[randomIndex].color;
// };

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

        // console.log(`Index: ${i}, Element: ${currentRandomColor}`)
    }
}

let addNewElement = (elementString, nodeToAppendTo = document.body) => {
    nodeToAppendTo.append(elementString);
}

let toggleElementClass = (elementToToggle, classToToggle) => {
    elementToToggle.toggleClass(classToToggle);
}; 

let handleClickToggle = (itemElement) => {
    itemElement.on("click", (event) => {
    let toggleTarget = $(event.currentTarget.children[0]);
    //let randomColor = distributeRandomColor();
    toggleElementClass(toggleTarget, "hide");
    //toggleTarget.css('background-color', `${randomColor}`); 
    });
};

$(document).ready( () => {
    //console.log("Fire");
    let mainDiv = $("#box-container");
    let rowIndex = 0;

    distributeRandomColors();


    // //console.log(mainDiv);

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
            console.log(`Current Index: ${currentIndex}, Random Color: ${randomColor}`);

            // console.log(currentElement);
            // console.log(currentElementChild);
            //currentElement.append(currentElementChild);
            addNewElement(currentElementChild, currentElement);
            addNewElement(currentElement, currentDiv);
            //createElementIdAndClass("span", currentIndex, "squares z-depth-3 waves-effect col m3", `${currentIndex}`, mainDiv);
        }
    }

    let squareSpans = mainDiv.children().children();

    // console.log(squareSpans);
    
    squareSpans.each((index, item) => {
        let itemElement = $(`#${item.id}`)
        //console.log(item);
        // itemElement.on("mouseover mouseout", (event) => {
        //     if(event.type === "mouseover"){
        //         let toggleTarget = $(event.currentTarget.children[0]);
        //         toggleTarget.toggleClass("hide");
        //     }else if(event.type === "mouseout"){
        //         let toggleTarget = $(event.currentTarget.children[0]);
        //         toggleTarget.toggleClass("hide");
        //     }

        // });
        // let randomColor = distributeRandomColor();

        handleClickToggle(itemElement);
         
        
    });

    //squareSpans.on("mouseenter")
});