let colors = ["#2C14CC", "#767199", "#767199", "#FFAA40", "#CC6014", "#9ECC9C", "#BFFF00", "#CCC89C"];
let colorList = [];

let getRandomColor = (colorArray = colorList) => {
    return colorArray[Math.floor(Math.random()*colorArray.length)].color;
};

let addNewElement = (elementString, nodeToAppendTo = document.body) => {
    nodeToAppendTo.append(elementString);
}

let toggleElementClass = (elementToToggle, classToToggle) => {
    elementToToggle.toggleClass(classToToggle);
}; 

let addClickToggle = (itemElement) => {
    itemElement.on("click", (event) => {
        let toggleTarget = $(event.currentTarget.children[0]);
        toggleElementClass(toggleTarget, "hide");

    });
};

colors.forEach((item) => {
    colorList.push({color: item, timesUsed: 0});
});

$(document).ready( () => {
    console.log("Fire");
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
            addNewElement(`<span id=box-${currentIndex} class="squares z-depth-3 waves-effect col m3"><span class="content hide">${currentIndex}</span></span>`, currentDiv);
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

        addClickToggle(itemElement);    

        
    });

    //squareSpans.on("mouseenter")
});