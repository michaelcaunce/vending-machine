
//readline allows the user to input their choice.
readline = require('readline-sync');
// Used to allow colours in the vending interface.
var colors = require('colors');

//Start of created object methods used to store item information.

/*Function which defines the constructor used to construct new instances of the object. In the constructor function's body,
this. keyword accesses the new instance of Items. Here four member variables are defined.*/
function Items (id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock_level = stock;
}

/*Define a new property on the object's prototype property, and then assign the function to it. this. keyword accesses the current instance of the object and then access each of the four properties.*/
Items.prototype.itemDetails = function() {
    return this.id + '. ' + this.name + ': ' + '£' + this.price + ' ~ ' + this.stock_level + ' available';
};

/*New intstances of Items objects, each assigned to the four member variables. */

var Coke_330 = new Items(1, 'Coke 330ml', 1.49, 1);
var Coke_Zero_330 = new Items(2, 'Coke Zero 330ml', 1.49, 10);
var Diet_Coke_330 = new Items(3, 'Diet Coke 330ml', 1.49, 10);
var Sprite_330 = new Items(4, 'Sprite 330ml', 1.49, 10)
var Coke_500 = new Items(5, 'Coke 500ml', 1.99, 10);
var Coke_Zero_500 = new Items(6, 'Coke Zero 500ml', 1.99, 10);
var Diet_Coke_500 = new Items(7, 'Diet Coke 500ml', 1.99, 10);
var Sprite_500 = new Items(8, 'Sprite 500ml', 1.99, 10)

//End of objects method.


/*Global variables called at various stages in the vending process */
var stockItems = [Coke_330, Coke_Zero_330,Diet_Coke_330,Sprite_330,Coke_500,Coke_Zero_500,Diet_Coke_500,Sprite_500];
var credit =  parseFloat(0).toFixed(2);
var space = '';
var errorMessage = ' Invalid selection choice! Please enter a number shown above.';
var pressEnter = ' Press Enter to try again.';


// Start of the main menu function

/* Function created for the GUI of the vending machine. This function contains the visuals for the vending machines main menu.
console.clear() clears the console providing a clean display. Extensive use of colour for visual purposes, credit variable
displays the users credit at all times. Options 1-5 link to the switch statements in the following function. */
function mainMenuVisual() {
    console.clear();
    console.log('                          '.white.bold.underline);
    console.log('                          ');
    console.log(' ' +'Michael Caunce'.blue.bold+'           ');
    console.log(' 23212438                 '.blue.bold);
    console.log(' CIS2152                  '.blue.bold);
    console.log('                          '.white.bold.underline);
    console.log('                          ');
    console.log('     Vending Machine      '.blue.bold)
    console.log('                          '.white.bold.underline);
    console.log('                          ');
    console.log(' Current Credit: '.blue.bold + '£' + credit);
    console.log('                          '.white.bold.underline);
    console.log('                          ');
    console.log('   1:'.white.bold + ' View Items          '.blue.bold);
    console.log('                          ');
    console.log('   2:'.white.bold + ' Add Credit          '.blue.bold);
    console.log('                          ');
    console.log('   3:'.white.bold + ' Buy Item            '.blue.bold);
    console.log('                          ');
    console.log('   4:'.white.bold + ' Return Credit       '.blue.bold);
    console.log('                          ');
    console.log('   5:'.white.bold + ' Exit                '.blue.bold);
    console.log('                          ');
    console.log('                          '.white.bold.underline);

}
/* Second main menu function, this contains all the functionality for the options presented to the users.
/* readline question requests user input, Switch statement links to the menu options presented above. Each selection is shown as case which links to various other functions.
If users enter an invalid number or character they will be presented with variables 'errorMessage' and 'pressEnter'*/
function mainMenuOption() {
    console.log(space);
    var choice = readline.question(' Selection: '.blue.bold);
    //If statement deals with users choice.
    switch (parseInt(choice)) {
      case 1: viewItems(); break;
      case 2: addCredit(); break;
      case 3: buyItem(); break;
      case 4: returnCredit(); break;
      case 5: console.clear();
              console.log('                                          '.white.bold.underline);
              console.log(space);
              console.log('Thank you for your custom, come back soon!'.bold.blue);
              console.log('                                          '.white.bold.underline);
              console.log(space);
              return;
      default:
      console.log(space);
      console.log(errorMessage.red.bold);
      console.log(space);
      console.log(pressEnter.red.bold);
      readline.question();
      mainMenu();
  }
}

/* Final function for the main menu calls the previous two functions. Once run the user is presented with the visual layout and selection choices. */
function mainMenu() {
    console.clear();
    mainMenuVisual();
    mainMenuOption();
}

/*Displays the users credit once the function is caled. */
function showCredit() {
    console.log('Credit: '.blue.bold + '£' + credit);
}

//Start of viewItems functionality

/*Function similar to mainMenuVisual, it works the same but the options differ. */
function viewItemsVisual() {
    console.log(space);
    console.log('                          '.white.bold.underline);
    console.log('                          ');
    console.log('   1:'.white.bold + ' Add Credit          '.blue.bold);
    console.log('                          ');
    console.log('   2:'.white.bold + ' Buy Item            '.blue.bold);
    console.log('                          ');
    console.log('   3:'.white.bold + ' Main Menu           '.blue.bold);
    console.log('                          '.white.bold.underline);

}

/*Again this works in the same way as mainMenuOption. User asked to make a selection (readline.question) with 3 choices available.
Each choice is linked to the function relating to the menu option. If users enter an invalid number or character they will be presented with variables 'errorMessage' and 'pressEnter'*/
function viewItemsOption() {
    var choice = readline.question(' Selection: '.blue.bold);
    //If statement deals with users choice.
    switch (parseInt(choice)) {
      case 1: addCredit(); break;
      case 2: buyItem(); break;
      case 3: mainMenu(); break;
      default://console.clear();
              console.log(space);
              console.log(errorMessage.red.bold);
              console.log(space);
              console.log(pressEnter.red.bold);
              readline.question();
              viewItems();
    }
}


/* Displays all items in the console. Firstly the console is cleared which gives the impression of moving to a new screen. Then stockItems array is looped
through with the items being displayed. Lastly, viewItemsVisual is called which presents the menu, and viewItemsOption is called which allows users to Make
selection choices. */
function viewItems() {
    console.clear();
    for (var i = 0; i < stockItems.length; i++) {
      console.log(stockItems[i].itemDetails());
    }
    viewItemsVisual();
    console.log(space);
    viewItemsOption();
}

// Start of Add Credit functionality.

/* Main function for adding credit. Once called the console clears, with users being asked the amount of credit they'd like to deposit.
The inclusion of a Regular Expresion restricts users and prevents letters and excessive amount of numbers being used. Users can only enter
a maximum of two numbers with the option of adding decimal point followed by two numbers. In one deposit the maximum entry is £99.99.
Inside the if statement addCreditVisual and addCreditOption are called, but only if the user enters a valid amount or character.
If they do not they will be shown an error message and asked to try again.*/
function addCredit() {
    console.clear();
    var Option = readline.question(' Please enter amount of credit: '.blue.bold + '£');
    var regex = /^[0-9]{1,2}(\.[0-9]{1,2})?$/;
    if(Option.match(regex)) {
      creditDecimalTwo = parseFloat(credit) + parseFloat(Option); // Variable which adds global credit to the variable Option (amount entered by user). Turns inputs into integers so they can be added together otherwise it will concatenate the two numbers.
      credit = creditDecimalTwo.toFixed(2); //Ensures that any decimal is fixed to two.
      console.clear();
      console.log(space);
      console.log(' Thank you, your balance is now '.blue.bold + '£' + credit +' which can been seen in the vending machine at all times.'.blue.bold);
      console.log(space);
      var choice = readline.question(' Would you like to buy a drink? '.blue.bold + '(Y/N) ');
      switch (choice.toUpperCase()) {
          case "Y":
              buyItem(); break;
          case "N":
              mainMenu(); break;
          default:
              console.log(errorMessage.red.bold);
              mainMenu();
          break;
      }

  } else {
      console.log(space);
      console.log(' Minimum deposit is £1, Maximum deposit is £99.99, please try again.'.red.bold);
      console.log(space);
      var choice2 = readline.question(' Would you like to try again? '.red.bold + '(Y/N) ');
      switch (choice2.toUpperCase()) {
          case "Y":
              addCredit(); break;
          case "N":
              mainMenu(); break;
          default:
              console.log(errorMessage.red.bold);
              mainMenu();
          break;
      }
  }
}

// Start of Buy Item functions

/* This function is part 1 of the buy item process. Once called the first occurance is the console will again clear, with showCredit function being called.
The user is then asked to make a selection before being presented with all the items from stockItems. The for loop again loops through the array
and displays full product information, this links back to the instance of objects created at the top. Users are then asked to make their selection (readline.question).
choice = choice -1 simply ensures the options are 1-6 instead of 0-5. */
function buyItem() {
    console.clear();
    showCredit();
    console.log(space);
    console.log('Make a purchase by selecting your item: '.blue.bold);
    console.log(space);
    for (var i = 0; i < stockItems.length; i++) {
      console.log(stockItems[i].itemDetails());
    }
    console.log(space);
    var choice = readline.question('Please enter your number: '.blue.bold);
    choice = choice - 1;
    /* If the users input is not a number (isNaN) return the value 'true'*/
    if (isNaN(choice) == true) {
        /*User is made aware they have made an error, the question is repeated with buyItem function called once more.*/
        console.log(space);
        console.log('Unknown character entered! Press any key to try again.'.red.bold);
        readline.question();
        buyItem();
    } else {
      /*If statement inside the else which identifies whether users input is equal to or greater than 0 and less than the amount of current stock levels.*/
        if(choice >= 0 && choice < stockItems.length) {
            /* User moves onto stage two with their choice as the parameter. */
            buyItemPt2(choice);
        } else {
            choice = choice + 1;
            /*User is made aware they have made an error, the question is repeated with buyItem function called once more.*/
            console.log(space);
            console.log('Invalid number choice. Press any key to try again.'.red.bold);
            readline.question();
            buyItem();
        }
      }
}

//Stage 2 of buying an item.

/* Function calls the users input (choice) as the parameter. Once again the console is cleared which is followed by a series of control structures. */
function buyItemPt2(choice) {
    console.clear();
    /*New variable that stores the product information. */
    var item = stockItems[choice];
    /*Displays the name and price of the selected item.*/
    console.log('Selected item: '.blue.bold + item.name + ' £' + item.price);
    /*If statement which declares what will happen if the price of the item is greater than the current credit.
    The console displays users current balance and asks them to insert the price of the item selected (priceDifferenceDecimalTwo).
    Users are then asked if they would like to make a deposit with a switch statement. If users enter Y or y addCredit function is called,
    if N or n is entered users will be taken back to the main menu by calling mainMenu function.
    */
    if (credit < item.price) {
      console.log(space);
      var price_difference = item.price - credit;
      priceDifferenceDecimalTwo = price_difference.toFixed(2);
      console.log('Your current balance is '.red.bold + '£' + credit + ', Please insert '.red.bold + '£' + priceDifferenceDecimalTwo + ', see below.'.red.bold);
      console.log(space);
      var choice = readline.question('Would you like to add funds? '.blue.bold + '(Y/N) ');
      switch (choice.toUpperCase()) {
          case "Y":
              addCredit(); break;
          case "N":
              mainMenu(); break;
          default:
              console.log(errorMessage.red.bold);
              mainMenu();
          break;
      }
    }
    else {
        /*else if statement handles if an item is out of stock. Users are presented with a message containing the item selection. Again
        the inclusion of a switch statement proceeds to ask users if they would like to return to buy a drink. buyItem is called if users enter
        Y or y, with mainMenu called if N or n is entered. */
        if (item.stock_level == 0) {
          console.log(space);
          console.log('Oh dear, we have run out of '.red.bold + item.name);
          console.log(space);
          var choice = readline.question('Would you like to return to buy a drink? '.blue.bold + '(Y/N) ');
          switch (choice.toUpperCase()) {
              case "Y":
                  buyItem(); break;
              case "N":
                  mainMenu(); break;
              default:
                  console.log(errorMessage.red.bold);
                  mainMenu();
              break;
          }
        } else {
          /*Finally, if all of the previous statements are false, i.e. the user has enough credit and the item is in the stock,
          the else statement confirms the users purchase. Global variable 'credit' adjusts to minus the price of the item against the credit balance,
          and the stock level reduces by 1. The console displays the item purchased and informs users of their new credit balance.
          Users are then asked if they would like to make another purchase. If Y or y buyItem function is called, if N or n the user
          is taken back to the main menu by mainMenu being called.*/
          balanceDecimalTwo = credit - item.price;
          credit = balanceDecimalTwo.toFixed(2);
          item.stock_level -= 1;
          console.log(space);
          console.log('Succesfull purchase of '.blue.bold + item.name);
          console.log(space);
          console.log('Remaining balance '.blue.bold + '£' + credit);
          console.log(space);
          var choice = readline.question('Would you like to purchase another drink? '.blue.bold + '(Y/N) ');
          switch (choice.toUpperCase()) {
              case "Y":
                  buyItem(); break;
              case "N":
                  mainMenu(); break;
              default:
                  console.log(errorMessage.red.bold);
                  mainMenu();
              break;
        }
    }
  }
}

// Start of return credit.

/* Function which handles the users credit being returned. Once again the console is cleared which is followed by a series of control structures. */
function returnCredit() {
    console.clear()/**/
    /*If statement which displays users current credit and informs that they must have available funds in order to recieve a refund. */
    if(credit <= 0) {
        console.log('Your balace is '.red.bold + '£' + credit + ', you must have credit to refund.'.red.bold);
        console.log(space);
        console.log('Press Enter to return to the Main Menu'.red.bold);
        readline.question();
        mainMenu();
    }
    /*Else the user is presented with their current credit, and asked if they would like a refund. Once again this is handled with a switch statement*/
    else {
        console.log('Your current balance is: '.blue.bold + '£' + credit);
        console.log(space);
        console.log('Would you like to return your credit? '.blue.bold + '(Y/N) ');
        console.log(space);
        var choice = readline.question('Selection: '.blue.bold);
        switch (choice.toUpperCase()) {
            /*if the user enters Y or y users are thanked and informed of the amount returned. The balnce of global credit is restarted and set to 0. Users are presented
            with this information and asked if they would like to exit the vending machine.*/
            case "Y":
                console.clear();
                console.log('Thank you, '.blue.bold + '£' + credit + ' has been returned.'.blue.bold);
                credit = 0;
                console.log(space);
                console.log('Current balance is now '.blue.bold + '£' + credit);
                console.log(space);
                console.log('Would you like to exit the Vending Machine? '.blue.bold + '(Y/N) ');
                console.log(space);
                var choices = readline.question('Selection: '.blue.bold);
                /* Additonal switch statment asking users if they would like to exit the vending machine. If Y or y is entered users are thanked for their custom
                and the vending machine ends */
                switch (choices.toUpperCase()) {
                  case "Y":
                      console.clear();
                      console.log('                                          '.white.bold.underline);
                      console.log('                          ');
                      console.log('Thank you for your custom, come back soon!'.bold.blue);
                      console.log('                                          '.white.bold.underline);
                      console.log(space);
                      return;
                  case "N": mainMenu(); break;
                  default:
                      /*if any other input is given, the user is returned to the main menu*/
                      mainMenu();
                  break;
                }
            case "N": mainMenu(); break;
            default:
                /*if any other input is given, the user is returned to the main menu*/
                mainMenu();
            break;
        }
    }
}

/* Start of the Vending Machine */
mainMenu();
