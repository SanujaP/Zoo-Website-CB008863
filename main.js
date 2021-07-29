//Initialisation of the variables and the buttons
let addToOrderButton = document.getElementById("addToOrder");
addToOrderButton.addEventListener("click", getTicketDetails);
let placeOrderButton = document.getElementById("placeOrder");
placeOrderButton.addEventListener("click", finalOrder);
let submitDonations = document.getElementById("submit");
submitDonations.addEventListener("click", donationMessage);
let addToFavorites = document.getElementById("favorites");
addToFavorites.addEventListener("click", favorites);
let checkLoyalty = document.getElementById("loyalty");
checkLoyalty.addEventListener("click", checkLoyaltyPoints);
let orderValue = 0;
let additionalCharge = 0;
let extras = 0;
let finalOrderPurchased = 0;
let points = 0;
let directory = [];

//Page startup function which is being used to set the values of the Text areas to LKR 0.00
function startupPage() {
    document.getElementById("currentOrderShow").defaultValue = "LKR 0.00";
    document.getElementById("overallOrder").defaultValue = "LKR 0.00";
}
// Get ticket details function which takes the user inputs and store them in variables
function getTicketDetails(orderValue, additionalCharge, extras) {
    let name = document.getElementById("name").value;
    let NIC = document.getElementById("NIC").value;   
    let passType = document.querySelector("input[name='ticketChoice']:checked").value;
    let adultTickets = document.getElementById("adultTickets").value;
    let childTickets = document.getElementById("childTickets").value;
    let selectDuration = document.getElementById("duration");
    duration = selectDuration.options[selectDuration.selectedIndex].value;
    let annualPass = document.getElementById("annualPass").value;
    let foodToken = document.getElementById("foodToken").value;

    calculatePassPrice(adultTickets, childTickets, orderValue, duration, adultTickets, childTickets, additionalCharge,
        annualPass, foodToken, extras);
}
// Calculation of the Pass type and price
function calculatePassPrice(adultTickets, childTickets, orderValue, duration, adultTickets, childTickets, additionalCharge, annualPasses, foodTokens, extras) {
    if (document.getElementById("day").checked) {
        orderValue = (1000 * adultTickets) + (500 * childTickets);
    } else if (document.getElementById("student").checked) {
        orderValue = (500 * adultTickets) + (250 * childTickets);;
    } else if (document.getElementById("foreigner").checked) {
        orderValue = (5000 * adultTickets) + (2500 * childTickets);
    } else {
        return alert("Please select the ticket type!");
    }
    findDurationFee(duration, adultTickets, childTickets, additionalCharge, annualPasses, foodTokens, extras, orderValue);
}
// Caluclaing the duration fee according to the inputs user has entered
function findDurationFee(duration, adultTickets, childTickets, additionalCharge, annualPasses, foodTokens, extras, orderValue) {
    if (duration == "threeHours") {
        additionalCharge = 0;
    } else if (duration == "halfDay") {
        additionalCharge = (250 * adultTickets) + 250(childTickets);
    } else if (duration == "fullDay") {
        additionalCharge = (500 * adultTickets) + (500 * childTickets);
    } else if (duration == "twoDays") {
        additionalCharge = (1000 * adultTickets) + (1000 * childTickets);
    }
    calculateExtras(annualPasses, foodTokens, extras, orderValue, additionalCharge);
}
// Cacluating the extras the user is willing to purchase
function calculateExtras(annualPasses, foodTokens, extras, orderValue, additionalCharge) {
    extras = (500 * annualPasses) + (500 * foodTokens);
    currentOrder(orderValue, additionalCharge, extras);
}
// this fucntion is being used to get the updates and show the current order value
function currentOrder(orderValue, additionalCharge, extras) {
    let totalAmount = orderValue + additionalCharge + extras;
    let finalList =
 `Ticket Amount  : LKR ${orderValue} `+
 `Pass Charge    : LKR ${additionalCharge} `+ 
 `Extra Charges  : LKR ${extras} `+ 
 `Total Amount   : LKR ${totalAmount} `;
    document.getElementById("currentOrderShow").innerText = finalList;
    localStorageSet(finalList);
}
// Final order is being used to get the current order and update everytime when button is clicked to get the final order
function finalOrder(finalOrderPurchased) {
    finalOrderPurchased = document.getElementById("currentOrderShow").value;
    document.getElementById("overallOrder").innerText = finalOrderPurchased;
    document.getElementById("currentOrderShow").innerText = "0";
    alert("Thank you " + document.getElementById("name").value + "! Your reservation has been made.");
}
// this is being used to show the message once an amount is donated
function donationMessage() {
    let donateName = document.getElementById("donateName").value;
    let donateAddress = document.getElementById("address").value;
    let cardNumber = document.getElementById("CCN").value;
    let cvv = document.getElementById("CVV").value;
    if (cvv == 3)
        alert("Thank you " + donateName + " for your donation!");
    else
        alert("Enter Valid Card");
}
// this is being used to set the finalList object to another variable in order to set it up to save on the local storage
function localStorageSet(finalList) {
    var memory = {finalList
    };
    console.log(finalList);
    if (document.getElementById('favorites').clicked == true) {
        return;
    } else
    favorites(memory);
}
// Here, the localStorage will be cleared up and then the memory object will be stored in the local storage
function favorites(memory) {
    localStorage.clear();
    directory.push(memory);
    localStorage.setItem('directory', JSON.stringify(directory));
}
// This function is being used to calculate the loyalty points an order recieves
function checkLoyaltyPoints() {
    let adultTickets = document.getElementById("adultTickets").value;
    let childTickets = document.getElementById("childTickets").value;
    let annualPass = document.getElementById("annualPass").value;
    let foodToken = document.getElementById("foodToken").value;
    if (adultTickets + childTickets + annualPass + foodToken >= 3) {
        let adultCount = adultTickets * 20;
        let childCount = childTickets * 20;
        let annualPassCount = annualPass * 20;
        let foodTokenCount = foodToken * 20;
        points = adultCount + childCount + annualPassCount + foodTokenCount;
        localStorage.setItem('Loyalty', points);
        alert("You have " + points + " Loyalty points!");
    } else alert('Should have more than 3 Items to earn points!');
}

