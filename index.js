let colors = ["#2C14CC", "#767199", "#767199", "#FFAA40", "#CC6014", "#9ECC9C", "#BFFF00", "#CCC89C"];
let colorList = [];

let getRandomColor = (colorArray = colorList) => {
    return colorArray[Math.floor(Math.random()*colorArray.length)].color;
};

let createElementIdAndClass = function(elementType, elementId, elementClass, contentToAppend = "", nodeToAppendTo = document.body) {
    let nodeToAdd = document.createElement(elementType);
    let nodeText = document.createTextNode(contentToAppend);
    nodeToAdd.id = elementId;
    elementClass.forEach((item)=> {
        nodeToAdd.className += `${item} `;
    });
    
    nodeToAdd.appendChild(nodeText);
    nodeToAppendTo.appendChild(nodeToAdd);
};

let createElementAndClass = function(elementType, elementClass, contentToAppend = "", nodeToAppendTo = document.body) {
    let nodeToAdd = document.createElement(elementType);
    let nodeText = document.createTextNode(contentToAppend);
    elementClass.forEach((item)=> {
        nodeToAdd.className += `${item} `;
    });

    
    nodeToAdd.appendChild(nodeText);
    nodeToAppendTo.appendChild(nodeToAdd);
};


colors.forEach((item) => {
    colorList.push({color: item, timesUsed: 0});
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Fire");
    let mainDiv = document.getElementById("box-container");
    let rowIndex = 0;

    console.log(mainDiv);

    /*
    mainDiv.addEventListener("click", () => {
        mainDiv.style.color = getRandomColor();
    });*/

    for(let i = 0; i < 4; i++){
        createElementAndClass("div", ["row", "center-align"], "", mainDiv);
        let currentDiv = document.querySelectorAll(".row")[i];
        for(let j = 0; j < 4; j++){
            let currentIndex = (j + (i * 4)) + 1;
            createElementIdAndClass("div", currentIndex, ["hiddenSquare", "squares", "z-depth-3", "waves-effect", "col", "m3", "hoverable"], `${currentIndex}`, mainDiv);
        }
    }

    /*
    for(let i = 1; i <= 16; i++){
        
        if((i - 1) === 0 || (i - 1) % 4 === 0)
        {

        }
        
        createElementIdAndClass("div", i, ["hiddenSquare", "squares", "z-depth-3", "waves-effect", "col", "m3"], "", mainDiv);
    }*/
});