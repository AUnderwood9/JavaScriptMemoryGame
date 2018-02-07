let colors = ["#2C14CC", "#767199", "#493D99", "#FFAA40", "#CC6014", "#9ECC9C", "#BFFF00", "#CCC89C"];
let colorList = [];

colors.forEach((item) => {
    colorList.push({color: item, timesUsed: 0});
});

let distributeRandomColor = () => {
    let randomIndex = Math.floor(Math.random()*colorList.length);
    let randomColor = colorList[randomIndex].color;
    let timesGiven = colorList[randomIndex].timesUsed;
    //let randomColor = colorList[Math.floor(Math.random()*colorList.length)];
    while(colorList[randomIndex].timesUsed < 2){
        if(colorList[randomIndex].timesUsed < 2){
            //console.log(`Fire for: ${colorList[randomIndex].color}, used ${colorList[randomIndex].timesUsed} times`);
            colorList[randomIndex].timesUsed++;
        }
        else{
            randomIndex = Math.floor(Math.random()*colorList.length);
        }
    }

    //console.log(colorList);

    return colorList[randomIndex].color;
};

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

    //console.log(mainDiv);

    for(let i = 0; i < 4; i++){
        let currentRow = `row-${i}`;
        //createElementAndClass("div", ["row", "center-align"], "", mainDiv);
        addNewElement(`<div id=${currentRow} class="row center-align"></div>`, mainDiv)
        let currentDiv = $(`#${currentRow}`);
        for(let j = 0; j < 4; j++){
            let currentIndex = (j + (i * 4)) + 1;
            let currentElement = $(`<span id=box-${currentIndex} class="squares z-depth-3 waves-effect col m3"></span>`);
            let currentElementChild = $(`<span class="content hide">${currentIndex}</span>`);
            let randomColor = distributeRandomColor();
            currentElementChild.css('background-color', `${randomColor}`);

            console.log(currentElement);
            console.log(currentElementChild);
            //currentElement.append(currentElementChild);
            addNewElement(currentElementChild, currentElement);
            addNewElement(currentElement, currentDiv);
            //createElementIdAndClass("span", currentIndex, "squares z-depth-3 waves-effect col m3", `${currentIndex}`, mainDiv);
        }
    }

    let squareSpans = mainDiv.children().children();

    console.log(squareSpans);
    
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
        let randomColor = distributeRandomColor();

        handleClickToggle(itemElement);
         
        
    });

    //squareSpans.on("mouseenter")
});