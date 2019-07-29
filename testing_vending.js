
//readline allows the user to input their choice
readline = require('readline-sync');



function Items (id, name, price, stock) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.stock_level = stock;
}

//Method for displaying product info. To be used
//for displaying in the menu function.
Items.prototype.itemDetails = function() {
  return this.id + '. ' + this.name + ': ' + '£' + this.price + ' ~ ' + this.stock_level + ' available';
};

//New instances of the Items object created for
//individual vending items, each assigned to a variable.

var Coke_330 = new Items(1, 'Coke 330ml', 1.49, 1);
var Coke_Zero_330 = new Items(2, 'Coke Zero 330ml', 1.49, 10);
var Diet_Coke_330 = new Items(3, 'Diet Coke 330ml', 1.49, 10);
var Coke_500 = new Items(4, 'Coke 500ml', 1.99, 10);
var Coke_Zero_500 = new Items(5, 'Coke Zero 500ml', 1.99, 10);
var Diet_Coke_500 = new Items(6, 'Diet Coke 500ml', 1.99, 10);


//Array used to store the list of stock available
//in the vending machine.
var stockItems = [Coke_330, Coke_Zero_330,Diet_Coke_330,Coke_500,Coke_Zero_500,Diet_Coke_500];
var regexstockItems = '[^1-' + stockItems.length + ']';
//For storing customers available credit
//will reset everytime the program starts.
//var test =
var credit =  parseFloat(0).toFixed(2);
var space = '';
//Displays the amount of creditg the user has left.
function showCredit() {
  console.log('Credit: £' + credit);

}
function returnCredit() {
  showCredit();
  credit = 0;
  if (credit == 0) {
    console.log('Insufficient funds!');
  }
  break;
}

function addCreditMenu() {
  console.log(' --------------------------------------- ');
  console.log('|                                       |');
  console.log('||          ------------------         ||');
  console.log('|||        | 1: Buy Item      |       |||');
  console.log('||||       | 2: Main Menu     |      ||||');
  console.log('|||        | 3: Return Credit |       |||');
  console.log('||          ------------------         ||');
  console.log('|                                       |');
  console.log(' --------------------------------------- ');
}
function addCreditError() {
  console.log(space);
  console.log('Invalid selection choice! Your options are: 1, 2, 3');
  console.log(space);
  addCreditOption();

}
function addCreditOption() {
  var Option = readline.question('               Selection: ');
  //If statement deals with users Option.
  switch (parseInt(Option)) {
    case 1: buyItem();
      break;
    case 2: mainMenu();
      break;
    case 3: returnCredit();
      break;

    default: addCreditError();
  }
}
//Function for adding credit.
function addCredit() {
  console.clear();    //clears the console of previous
  var Option = readline.question('Please enter amount of credit: £');
  var regex = /^[0-9]{1,2}(\.[0-9]{1,2})?$/;

  if(Option.match(regex))
{
    console.log('Money');
    creditDecimalTwo = parseFloat(credit) + parseFloat(Option);
    credit = creditDecimalTwo.toFixed(2);
    console.clear();
    //showCredit();
    //Menu view for after function is run.
    //console.log('Your current credit is: ' + credit);
    console.log(space);
    console.log('Thank you, your balance is now £' + credit +' which can been seen in the vending machine at all times.');
    console.log(space);
    addCreditMenu();
    console.log(space);
    //Get user input for menu options.
    addCreditOption();
    //This code never executes
}
  else
{
    //This code is always executing
    console.clear();
    console.log('Please enter a valid amount');
    setTimeout(addCredit, 2000);
    //addCredit();
}



  //showCredit();       //text shown.
  //Gets users input for ammount of credit wanted,
  //Turns inputs into integers so they can be added together
  //otherwise it will concatenate the two numbers.

}

function viewItemsMenu() {
  console.log(' --------------------------------------- ');
  console.log('|                                       |');
  console.log('||          ------------------         ||');
  console.log('|||        | 1: Add Credit    |       |||');
  console.log('||||       | 2: Buy Item      |      ||||');
  console.log('|||        | 3: Main Menu     |       |||');
  console.log('||          ------------------         ||');
  console.log('|                                       |');
  console.log(' --------------------------------------- ');
}

function viewItemsOption() {
  var choice = readline.question('               Selection: ');
  //If statement deals with users choice.
  switch (parseInt(choice)) {
    case 1: addCredit();
      break;
    case 2: buyItem();
      break;
    case 3: mainMenu();
      break;
    default: viewItemsError();
  }

}

function viewItemsError() {
  console.log(space);
  console.log('Invalid selection choice! Your options are: 1, 2, 3');
  console.log(space);
  viewItemsOption();

}
//Shows list of products to the user.
function viewItems() {
  console.clear();
  //showCredit();
  //console.log('');
  //Loops through stockItems array to show available stock.
  //Shows the name of the product.
  for (var i = 0; i < stockItems.length; i++) {
    console.log(stockItems[i].itemDetails());
  }
  //User menu.
  viewItemsMenu();
  //Get user input for menu option.
  console.log(space);
  viewItemsOption();

}
//Allows the user to purchase a product from the stock available.
function buyItem() {
  console.clear();
  showCredit();
  console.log(space);
  console.log('Make a purchase by selecting your item: ');
  console.log(space);
  //Loops through stockItems array to show available stock.
  //Displays full product information.
  for (var i = 0; i < stockItems.length; i++) {
    console.log(stockItems[i].itemDetails());
  }
  console.log(space);
  //Gets user input to select disred product.
  var regex2 = new RegExp(regexstockItems);
  var regexTest = new RegExp("[0-9]");
  var choices = readline.question('Please enter your number: ');

  if(regex2.test(choices)) {
  //This code is always executing
    //console.log('Error!');
    buyItem();
  } else if(regexTest.test(choices)){
    choices = choices - 1;
    //Shows user their choice and adjusts credit.
    console.log(space);
    console.clear();
    if (credit < stockItems[choices].price) {
    console.log(space);
    var price_difference = stockItems[choices].price - credit;
    priceDifferenceDecimalTwo = price_difference.toFixed(2);
    console.log('Your current balance is £' + credit + ', Please insert £' + priceDifferenceDecimalTwo);
    console.log(space);
    var option = require('readline-sync');
    if (option.keyInYN('Would you like to add additional funds?')) {
      // 'Y' key was pressed.
      addCredit();
      // Do something...
    } else {
      // Another key was pressed.
      mainMenu();
      // Do something...
      }
    } else {
      if (stockItems[choices].stock_level == 0) {
        console.log('We have run out of ' + stockItems[choices].name);
        console.log(space);
        var empty_stock = require('readline-sync');
        if (empty_stock.keyInYN('Would you like to return to drinks?')) {
          // 'Y' key was pressed.
          buyItem();
          // Do something...
        } else {
          // Another key was pressed.
          mainMenu();
          // Do something...
        }

      } else {
        stockItems[choices].stock_level -= 1;
        balanceDecimalTwo = credit - stockItems[choices].price;
        credit = balanceDecimalTwo.toFixed(2);
      }
      console.log("Your purchase is: " + stockItems[choices].name);
      console.log('Your reaming balance is £' + credit);
      console.log(space);
      var additional_purchase = require('readline-sync');
      if (additional_purchase.keyInYN('Would you like to purchase another drink?')) {
        // 'Y' key was pressed.
        buyItem();
        // Do something...
      } else {
        // Another key was pressed.
        mainMenu();
        // Do something...
      }
      //Get user input for menu option.
      //If statement deals with users choice.


    }

} else {
  //console.log('error');
  buyItem();
}
  //Used to match up the product number displayed
  //with the corresponding index number in stockItems array.

}


//Main menu function displays the vending machine
//GUI with options for the user to interact with.
function mainMenu() {
  console.clear();
  vending_visual();
  mainMenuOption();
  //showCredit();
  //Get user input for menu option.

}

mainMenu();
