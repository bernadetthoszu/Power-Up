const grid = document.querySelector("#grid")
const select = document.querySelector("select")
const nameInput = document.querySelector("input")
const descriptionLabel = document.querySelector("#description")
const stopwatchLabel = document.querySelector("#time")
const timeoutSaveButton = document.querySelector("#timeoutSave")
const resumeButton = document.querySelector("#resume")


const playerName = ""
let N = 0
let running = false
let startingTime = null
let timeoutTime = null
let stopwatchOffset = 0
let stopwatch = null
let results = []  //stored in localStorage
let games = []


class Result{
    constructor(player, boardType, time, status){
        this.player = player;
        this.boardType = boardType;
        this.time = time;
        this.status = status;
    }
}

class Game{
    constructor(player, boardType, time, boardHTML){
        this.player = player;
        this.boardType = boardType;
        this.time = time;
        this.boardHTML = boardHTML;
    }
}


// SECTIONS 
// (copy paste one such section title into Ctrl+F 's search field to jump right there ;) )

// HTML generator
// Event handlers
// Business logic
// Helper/utility function


// HTML generator

function generateBoard(){
    grid.innerHTML = ''
    const selected = select.options[select.selectedIndex].text
    if(selected.includes("(7x7)")){
        N = 7
        grid.classList.remove("grid-container-10")
        grid.classList.add("grid-container-7")
        generate(7)
        initializeBoard(selected)
    }else {
        N = 10
        grid.classList.remove("grid-container-7")
        grid.classList.add("grid-container-10")
        generate(10)
        initializeBoard(selected)
    }
}

function generate(n){
    if(n!=7 && n!=10){
        console.log(`Error: wrong table size given: Give 7 or 10, you gave ${n}!`)
        return
    }
    for (let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            let newCell = document.createElement("div")
            newCell.classList.add("grid-item")
            newCell.setAttribute("data-i", `${i}`)
            newCell.setAttribute("data-j", `${j}`)
            newCell.setAttribute("data-nr-of-light-sources", "0")
            newCell.id = `cell${i*n+j}`
            grid.appendChild(newCell)
        }
    }
}

function initializeBoard(text){
    if(text.includes("Könnyű")){
        let cell = grid.querySelector("#cell3")
        cell.classList.add("black-cell")
        cell.innerText = "1"
        cell = grid.querySelector("#cell8")
        cell.classList.add("black-cell")
        cell.innerText = "0"
        cell = grid.querySelector("#cell12")
        cell.classList.add("black-cell")
        cell.innerText = "2"
        cell = grid.querySelector("#cell21")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell24")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell27")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell36")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell40")
        cell.classList.add("black-cell")
        cell.innerText = "2"
        cell = grid.querySelector("#cell45")
        cell.classList.add("black-cell")
        cell.innerText = "3"
    }else if(text.includes("Haladó")){
        let cell = grid.querySelector("#cell2")
        cell.classList.add("black-cell")
        cell.innerText = "0"
        cell = grid.querySelector("#cell4")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell14")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell16")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell18")
        cell.classList.add("black-cell")
        cell.innerText = "3"
        cell = grid.querySelector("#cell20")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell24")
        cell.classList.add("black-cell")
        cell.innerText = "1"
        cell = grid.querySelector("#cell28")
        cell.classList.add("black-cell")
        cell.innerText = "2"
        cell = grid.querySelector("#cell30")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell32")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell34")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell44")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell46")
        cell.classList.add("black-cell")
        cell.innerText = "2"
    }else if(text.includes("Extrém")){
        let cell = grid.querySelector("#cell1")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell15")
        cell.classList.add("black-cell")
        cell.innerText = "3"
        cell = grid.querySelector("#cell17")
        cell.classList.add("black-cell")
        cell.innerText = "2"
        cell = grid.querySelector("#cell19")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell21")
        cell.classList.add("black-cell")
        cell.innerText = "0"
        cell = grid.querySelector("#cell22")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell27")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell34")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell41")
        cell.classList.add("black-cell")
        cell.innerText = "1"
        cell = grid.querySelector("#cell44")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell45")
        cell.classList.add("black-cell")
        cell.innerText = "1"
        cell = grid.querySelector("#cell46")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell53")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell54")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell55")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell58")
        cell.classList.add("black-cell")
        cell.innerText = "3"
        cell = grid.querySelector("#cell65")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell72")
        cell.classList.add("black-cell")
        cell.innerText = "1"
        cell = grid.querySelector("#cell77")
        cell.classList.add("black-cell")
        cell.innerText = "0"
        cell = grid.querySelector("#cell78")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell80")
        cell.classList.add("black-cell")
        cell.innerText = "3"
        cell = grid.querySelector("#cell82")
        cell.classList.add("black-cell")
        cell = grid.querySelector("#cell84")
        cell.classList.add("black-cell")
        cell.innerText = "0"
        cell = grid.querySelector("#cell98")
        cell.classList.add("black-cell")
        cell.innerText = "0"
    }
}


// Event handlers

function handleBoardOptionChanged(event){
    grid.innerHTML = ""
    generateBoard()
}

function handleNameInput(event){
    const playerName = nameInput.value
    console.log(playerName)
}

function handleShowDescription(event){
    let p = document.querySelector("p")
    p.classList.toggle("hide")
}

async function handleCellClicked(event){
    let cell = event.target
    if(!cell.matches("div>div")){
        return
    }
    if(!running){
        running = true
        startingTime = new Date() // current time
        trackTime(startingTime, stopwatchOffset)
        timeoutSaveButton.classList.toggle("hide")
    }
    if(!isBlackCell(cell)){
        if(!hasBulb(cell)){
            await addBulb(cell)
        }
        else{
            removeBulb(cell)
        }
    }
    if(isDone()){
        running = false
        
        restart()
    }
    
}

function handleTimeoutSave(){
    interrupt()
    saveGame()

    timeoutSaveButton.classList.toggle("hide")
    resumeButton.classList.toggle("hide")
}

function handleResume(){
    resumeTime()

    timeoutSaveButton.classList.toggle("hide")
    resumeButton.classList.toggle("hide")
}



// Business logic

select.addEventListener("change", handleBoardOptionChanged)
generateBoard()
nameInput.addEventListener("change", handleNameInput)
descriptionLabel.addEventListener("click", handleShowDescription)
grid.addEventListener("click", handleCellClicked)
timeoutSaveButton.addEventListener("click", handleTimeoutSave)
resumeButton.addEventListener("click", handleResume)


async function addBulb(cell){

    cell.classList.add("yellow-cell")
    cell.innerText = '💡'
    let nrSources = parseInt(cell.getAttribute("data-nr-of-light-sources"))
    nrSources = nrSources + 1
    cell.setAttribute("data-nr-of-light-sources", nrSources)

    //if any: updates, otherwise does nothing
    //updateNeighbourRestrictionCells(cell)
    updateRestrictionCells()

    let aux = cell.id
    const idCell = parseInt(aux.replace("cell", "")) 
    const icell = parseInt(cell.getAttribute("data-i"))
    const jcell = parseInt(cell.getAttribute("data-j"))

    if(icell > 0){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let i = icell
        
        //go up on column
        while(i > 0){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux - N).toString()
            nextCell = grid.querySelector(nextSelector)
            i = parseInt(nextCell.getAttribute("data-i"))
            let color = ""

            if(isBlackCell(nextCell)){
                break
            }
            if(hasBulb(nextCell)){
                color = "red"
                await asyncLightUpCell(nextCell, color)
                cell.classList.remove("yellow-cell")
                cell.classList.add("red-cell")
            }
            else{
                color = "yellow"
                await asyncLightUpCell(nextCell, color)
            }
        }
    }

    if(icell < N-1){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let i = icell
        
        //go down on column
        while(i < N-1){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux + N).toString()
            nextCell = grid.querySelector(nextSelector)
            i = parseInt(nextCell.getAttribute("data-i"))
            let color = ""

            if(isBlackCell(nextCell)){
                break
            }
            if(hasBulb(nextCell)){
                color = "red"
                await asyncLightUpCell(nextCell, color)
                cell.classList.remove("yellow-cell")
                cell.classList.add("red-cell")
            }
            else{
                color = "yellow"
                await asyncLightUpCell(nextCell, color)
            }
        }
    }

    if(jcell > 0){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let j = jcell
        
        //go to the left on line
        while(j > 0){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux - 1).toString()
            nextCell = grid.querySelector(nextSelector)
            j = parseInt(nextCell.getAttribute("data-j"))
            let color = ""

            if(isBlackCell(nextCell)){
                break
            }
            if(hasBulb(nextCell)){
                color = "red"
                await asyncLightUpCell(nextCell, color)
                cell.classList.remove("yellow-cell")
                cell.classList.add("red-cell")
            }
            else{
                color = "yellow"
                await asyncLightUpCell(nextCell, color)
            }
        }
    }

    if(jcell < N-1){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let j = jcell
        
        //go to the right on line
        while(j < N-1){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux + 1).toString()
            nextCell = grid.querySelector(nextSelector)
            j = parseInt(nextCell.getAttribute("data-j"))
            let color = ""

            if(isBlackCell(nextCell)){
                break
            }
            if(hasBulb(nextCell)){
                color = "red"
                await asyncLightUpCell(nextCell, color)
                cell.classList.remove("yellow-cell")
                cell.classList.add("red-cell")
            }
            else{
                color = "yellow"
                await asyncLightUpCell(nextCell, color)
            }
        }
    }
}

function removeBulb(cell){
    cell.innerText = ''
    let nrSources = parseInt(cell.getAttribute("data-nr-of-light-sources"))
    nrSources = nrSources - 1
    cell.setAttribute("data-nr-of-light-sources", nrSources)
    if(isRedCell(cell)){
        cell.classList.remove("red-cell")
    }
    if(nrSources > 0){
        cell.classList.add("yellow-cell")
    }
    else{
        cell.classList.remove("yellow-cell")
    }

    //if any: updates, otherwise does nothing
    //updateNeighbourRestrictionCells(cell)
    updateRestrictionCells()

    let aux = cell.id
    const idCell = parseInt(aux.replace("cell", ""))
    const icell = parseInt(cell.getAttribute("data-i"))
    const jcell = parseInt(cell.getAttribute("data-j"))

    if(icell > 0){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let i = icell
        
        //go up on column
        while(i > 0){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux - N).toString()
            nextCell = grid.querySelector(nextSelector)
            i = parseInt(nextCell.getAttribute("data-i"))

            flag = toneDownCell(nextCell)
            if(flag == 0){
                break
            }
        }
    }

    if(icell < N-1){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let i = icell
        
        //go down on column
        while(i < N-1){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux + N).toString()
            nextCell = grid.querySelector(nextSelector)
            i = parseInt(nextCell.getAttribute("data-i"))

            flag = toneDownCell(nextCell)
            if(flag == 0){
                break
            }
        }
    }

    if(jcell > 0){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let j = jcell
        
        //go to the left on line
        while(j > 0){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux - 1).toString()
            nextCell = grid.querySelector(nextSelector)
            j = parseInt(nextCell.getAttribute("data-j"))

            flag = toneDownCell(nextCell)
            if(flag == 0){
                break
            }
        }
    }

    if(jcell < N-1){
        let flag = -1
        let nextSelector = "#cell" + idCell.toString()
        let nextCell = null
        let j = jcell
        
        //go to the right on line
        while(j < N-1){
            aux = parseInt(nextSelector.replace("#cell", ""))
            nextSelector = "#cell" + (aux + 1).toString()
            nextCell = grid.querySelector(nextSelector)
            j = parseInt(nextCell.getAttribute("data-j"))

            flag = toneDownCell(nextCell)
            if(flag == 0){
                break
            }
        }
    }
}

// lightUp <-> toneDown   ---> opposite functions

//returns:
//  0 - 'cell' is a black cell
//  1 - 'cell' is at most lightened up by another bulb (but not containing itself a bulb)
//  2 - 'cell' has a bulb already (we need to signal this back in order to be able to make starting bulb red as well)
function asyncLightUpCell(cell, color){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(colorCell(cell, color))
        }, 60)
    })
}

function colorCell(cell, color){
    let nrSources = parseInt(cell.getAttribute("data-nr-of-light-sources"))
    nrSources += 1
    cell.setAttribute("data-nr-of-light-sources", nrSources)
    if(color == "yellow"){
        cell.classList.remove("red-cell")
        cell.classList.add("yellow-cell")
    }
    else{
        cell.classList.remove("yellow-cell")
        cell.classList.add("red-cell")
    }
}

function toneDownCell(cell){
    if(isBlackCell(cell)){
        return 0
    }

    let nrSources = parseInt(cell.getAttribute("data-nr-of-light-sources"))
    nrSources -= 1
    cell.setAttribute("data-nr-of-light-sources", nrSources)
    if(hasBulb(cell)){
        if(nrSources == 1){
            cell.classList.remove("red-cell")
            cell.classList.add("yellow-cell")
        }
    }
    else if(nrSources == 0){
        cell.classList.remove("yellow-cell")
    }
    return 1
}

//VERSION 1
//update the color of cell's neighbour restrictive cells, if needed
// function updateNeighbourRestrictionCells(cell){

//     let aux = cell.id
//     const idCell = parseInt(aux.replace("cell", "")) 
//     const icell = parseInt(cell.getAttribute("data-i"))
//     const jcell = parseInt(cell.getAttribute("data-j"))

//     // check above
//     if(icell > 0){
//         let nextSelector = "#cell" + (idCell - N).toString()
//         let nextCell = grid.querySelector(nextSelector)
//         if(isBlackCell(nextCell) && nextCell.innerText != ""){
//             if(isFulfilledRestriction(nextCell)){
//                 nextCell.classList.remove("black-cell")
//                 nextCell.classList.add("green-black-cell")
//             }
//             else{
//                 nextCell.classList.remove("green-black-cell")
//                 nextCell.classList.add("black-cell")
//             }
//         }
//     }

//     // check below
//     if(icell < N-1){
//         let nextSelector = "#cell" + (idCell + N).toString()
//         let nextCell = grid.querySelector(nextSelector)
//         if(isBlackCell(nextCell) && nextCell.innerText != ""){
//             if(isFulfilledRestriction(nextCell)){
//                 nextCell.classList.remove("black-cell")
//                 nextCell.classList.add("green-black-cell")
//             }
//             else{
//                 nextCell.classList.remove("green-black-cell")
//                 nextCell.classList.add("black-cell")
//             }
//         }
//     }

//     // check on the left
//     if(jcell > 0){
//         let nextSelector = "#cell" + (idCell - 1).toString()
//         let nextCell = grid.querySelector(nextSelector)
//         if(isBlackCell(nextCell) && nextCell.innerText != ""){
//             if(isFulfilledRestriction(nextCell)){
//                 nextCell.classList.remove("black-cell")
//                 nextCell.classList.add("green-black-cell")
//             }
//             else{
//                 nextCell.classList.remove("green-black-cell")
//                 nextCell.classList.add("black-cell")
//             }
//         }
//     }

//     // check on the right
//     if(jcell < N-1){
//         let nextSelector = "#cell" + (idCell + 1).toString()
//         let nextCell = grid.querySelector(nextSelector)
//         if(isBlackCell(nextCell) && nextCell.innerText != ""){
//             if(isFulfilledRestriction(nextCell)){
//                 nextCell.classList.remove("black-cell")
//                 nextCell.classList.add("green-black-cell")
//             }
//             else{
//                 nextCell.classList.remove("green-black-cell")
//                 nextCell.classList.add("black-cell")
//             }
//         }
//     }
// }

//VERSION 2
function updateRestrictionCells(){
    let aux = document.querySelectorAll(".black-cell")
    let restr1 = Array.from(aux).filter(e => e.innerText != "")
    aux = document.querySelectorAll(".green-black-cell")
    let restr2 = Array.from(aux)
    let restrictions = restr1.concat(restr2)

    for(let r of restrictions){
        if(isFulfilledRestriction(r)){
            r.classList.remove("black-cell")
            r.classList.add("green-black-cell")
        }
        else{
            r.classList.remove("green-black-cell")
            r.classList.add("black-cell")
        }
    }
}


function saveGame(){
   //TODO
}



// Helper/utility function

function isBlackCell(cell){
    return cell.classList.contains("black-cell") || cell.classList.contains("green-black-cell")
}

function isRedCell(cell){
    return cell.classList.contains("red-cell")
}

function hasBulb(cell){
    return cell.innerText == '💡'
}

function isValidBulb(cell){
    return parseInt(cell.getAttribute("data-nr-of-light-sources")) == 1
}

function isFulfilledRestriction(blackCell){
    let nrAllowed = parseInt(blackCell.innerText)
    let nrActual = 0
    let aux = blackCell.id
    const idCell = parseInt(aux.replace("cell", "")) 
    const icell = parseInt(blackCell.getAttribute("data-i"))
    const jcell = parseInt(blackCell.getAttribute("data-j"))

    // check above
    if(icell > 0){
        let nextSelector = "#cell" + (idCell - N).toString()
        let nextCell = grid.querySelector(nextSelector)
        if(hasBulb(nextCell)){
            nrActual += 1
        }
    }

    // check below
    if(icell < N-1){
        let nextSelector = "#cell" + (idCell + N).toString()
        let nextCell = grid.querySelector(nextSelector)
        if(hasBulb(nextCell)){
            nrActual += 1
        }
    }

    // check on the left
    if(jcell > 0){
        let nextSelector = "#cell" + (idCell - 1).toString()
        let nextCell = grid.querySelector(nextSelector)
        if(hasBulb(nextCell)){
            nrActual += 1
        }
    }

    // check on the right
    if(jcell < N-1){
        let nextSelector = "#cell" + (idCell + 1).toString()
        let nextCell = grid.querySelector(nextSelector)
        if(hasBulb(nextCell)){
            nrActual += 1
        }
    }

    if(nrAllowed == nrActual){
        return true
    }
    return false
}

function isDone(){
    //all restriction cells are green
    //no red cells
    //no white cells

    // let aux = document.querySelectorAll(".black-cell")
    // let unfulfilled = Array.from(aux).filter(e => e.innerText != "")
    // let restrictionsFulfilled = unfulfilled.length == 0

    // aux = document.querySelectorAll(".red-cell")
    // let nrInvalidBulbs = Array.from(aux)
    // let noInvalidBulbs = nrInvalidBulbs == 0

    // ---------------------

    //yellow cells (plain + bulb)
    //green black cells
    //plain black cells
    // ---> in total, should be NxN

    let aux = document.querySelectorAll(".yellow-cell")
    let nrEnlightenedCells = Array.from(aux).length

    aux = document.querySelectorAll(".green-black-cell")
    let nrFuliflledRestrictionCells = Array.from(aux).length

    aux = document.querySelectorAll(".black-cell")
    aux = Array.from(aux).filter(e => e.innerText == "")
    let nrPlainBlackCells = aux.length

    if(nrEnlightenedCells + nrFuliflledRestrictionCells + nrPlainBlackCells == N*N){
        console.log("IS DONE")
        return true
    }
    else{
        console.log("is not done")
        return false
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function restart() {
    clearInterval(stopwatch)
    await sleep(3000);
    resetTime()
    generateBoard()
}

//stackoverflow
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function demo() {
//     for (let i = 0; i < 5; i++) {
//         console.log(`Waiting ${i} seconds...`);
//         await sleep(i * 1000);
//     }
//     console.log('Done');
// }

// demo();


function trackTime(start, offset){
    // start is a Date object while offset is just an int representing some offset miliseconds
    stopwatch = setInterval(() => {
        if (running){
            let current = new Date()
            let difference = current - start + offset
            let h = Math.floor(difference/3600000) % 24
            let m = Math.floor(difference/60000) % 60
            let s = Math.floor(difference/1000) % 60
            if(Math.floor(h/10) == 0){
                h = "0" + h.toString()
            }
            if(Math.floor(m/10) == 0){
                m = "0" + m.toString()
            }
            if(Math.floor(s/10) == 0){
                s = "0" + s.toString()
            }
            stopwatchLabel.innerText = `${h}:${m}:${s}`
        }
    }, 1000)
}

function resetTime(){
    running = false
    stopwatchLabel.innerText = "00:00:00"
    stopwatch = null
}


function interrupt(){
    running = false
    timeoutTime = new Date()
    clearInterval(stopwatch)
}

function resumeTime(){
    running = true
    stopwatchOffset = stopwatchOffset + (timeoutTime - startingTime)
    startingTime = new Date()
    trackTime(startingTime, stopwatchOffset)
}