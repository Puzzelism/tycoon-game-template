// Tycoon game template

// global variables
points = 0; // score
pointMult = 1; // score per click
persecond = 1; // score per second
clickpow = pointMult; // clickpower, set for initialization
message = "Good luck! Have fun :)" // message display

// HTML attributes
const button = document.getElementById("click")
const pointsDisplay = document.getElementById("points")
const perSecondDisplay = document.getElementById("persec")
const perClickDisplay = document.getElementById("perclick")
const shop = document.getElementById("shop")
const display = document.getElementById("display")

// Message table for purchases
const buyMsg = [
    'Have fun with that!',
    'Congratulations!',
    'There is no warranty',
    'I hope you know what you\'re doing...'
]

// Message table when not enough funds
const brokeMsg = [
    'Not enough funds...',
    'Who do you think you are you can\'t afford that!',
    'Sadly not today :(',
    'Can\'t afford',
]

// Return random from message tables
function getBuyMsg(){
    var num = Math.floor(Math.random()*buyMsg.length)
    return buyMsg[num];
}

function getBrokeMsg(){
    var num = Math.floor(Math.random()*brokeMsg.length)
    return brokeMsg[num];
}

// Display messages, handles fadeout
function displayMessage(msg){
    display.innerText = msg;
    display.style.opacity = 1 // set opacity for element to 1
    var timerId = setInterval(function() { //start interval loop
        var opacity = display.style.opacity; // get current opacity
        if(opacity == 0) { // check if opacity is at 0
            clearInterval(timerId) //if so exit the loop
        }else {
            display.style.opacity = opacity - 0.02; // else remove opacity
        }
    }, 500); // run every 0.5 sec
}

// function which uses the standard item format to create fieldsets for items
// called at start of game for each item to show up in the shop.
function createShop(item){
    titleElement = document.createElement("legend")
    title = document.createTextNode(item.name)
    titleElement.appendChild(title)
    item.field.appendChild(titleElement)

    descElement = document.createElement("p")
    desc = document.createTextNode(item.desc)
    descElement.setAttribute("id", "desc")
    descElement.appendChild(desc)
    item.field.appendChild(descElement)

    costElement = document.createElement("p")
    cost = document.createTextNode("$" + item.cost)
    costElement.setAttribute("class", "cost")
    costElement.setAttribute("id", "cost"+item.id)
    costElement.appendChild(cost)
    item.field.appendChild(costElement)

    buyElement = document.createElement("button")
    buyElement.addEventListener("click", item.buy)
    buyText = document.createTextNode("BUY")
    buyElement.setAttribute("type", "button")
    buyElement.appendChild(buyText)
    item.field.appendChild(buyElement)

    countElement = document.createElement("p")
    count = document.createTextNode("Zilch")
    countElement.setAttribute("class", "count")
    countElement.setAttribute("id", "count"+item.id)
    countElement.appendChild(count)
    item.field.appendChild(countElement)

    item.field.setAttribute("id", "buyable")
    shop.append(item.field)
}

// used after purchase to update item count
function updateCount(item){
    count = document.getElementById("count"+item.id);
    count.innerText = "Count: "+item.count
    perClickDisplay.innerText = clickpow;
    perSecondDisplay.innerText = persecond;
    item.cost = Math.ceil(item.cost +item.count+(item.cost*0.3))
    cost = document.getElementById("cost"+item.id);
    cost.innerText = "$"+item.cost
}

// check points
function canAfford(cost){
    if(points >= cost){
        points = points - cost
        pointsDisplay.innerText = points
        displayMessage(getBuyMsg());
        return true
    }else{
        displayMessage(getBrokeMsg());
    }
    return false
}

// Item list, see datatype and add as necessary
/*
 *
 * itemName = {
 *  id: exclusive num,
 *  name: visible name,
 *  cost: value,
 *  desc: visible description,
 *  count: num (default 0),
 *  buy: function(){ ... happens on buy},
 *  field: document.createElement("fieldset")
 *  }
 *  createShop(itemName)
 *
 */

clickpower = {
    id: 1,
    name: "Click Power",
    cost: 50,
    desc: "increases power of clicks by 0.5",
    count: 0,
    buy: function(){
        if(canAfford(clickpower.cost)){
            clickpow = clickpow + 1;
            clickpower.count = clickpower.count + 1
            updateCount(clickpower)
        }
    },
    field: document.createElement("fieldset")
}
createShop(clickpower)

clickpersec = {
    id: 2,
    name: "Per Second",
    cost: 200,
    desc: "increases points per second by 1",
    count: 0,
    buy: function(){
        if(canAfford(clickpersec.cost)){
            persecond = persecond + 1;
            clickpersec.count = clickpersec.count + 1
            updateCount(clickpersec)
        }
    },
    field: document.createElement("fieldset")
}
createShop(clickpersec)

pointfarm = {
    id: 3,
    name: "Point farm",
    cost: 1000,
    desc: "increases points per second by 10",
    count: 0,
    buy: function(){
        if(canAfford(pointfarm.cost)){
            persecond = persecond + 10
            pointfarm.count = pointfarm.count + 1
            updateCount(pointfarm)
        }
    },
    field: document.createElement("fieldset")
}
createShop(pointfarm)

// give the button functionality
button.addEventListener("click", addPoints);

// updat the points per second
perSecondDisplay.innerText = persecond

// update points
function addPoints(toAdd){
    points = points + clickpow
    pointsDisplay.innerText = points
}

// update passive points
function passivePoints(){
    points = points + persecond
    pointsDisplay.innerText = points
}

// per second
setInterval(passivePoints, 1000)
