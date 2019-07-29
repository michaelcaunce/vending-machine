readline = require('readline-sync');

var colors = require('colors');

/*Settings variable stores an object of current credit, and products array.*/
/*These are global so they can be called by any function in the code*/
var settings = {
    /* The users current credit property stored in a global variable*/
    current_credit: 0.00,



    /*The products that a user can purchase, stored as objects so name, price, size and quantity can be set*/
    products: [
        {name:'Cola Regular', price:1.99, size:"500ml", quantity:10},
        {name:'Cola Regular', price:2.49, size:"1.25l", quantity:10},
        {name:'Cola Diet', price:1.99, size:"500ml", quantity:10},
        {name:'Cola Zero', price:1.99, size:"500ml", quantity:10},
        {name:'Fanta Regular', price:1.99, size:"500ml", quantity:10},
        {name:'Sprite Regular', price:1.99, size:"500ml", quantity:10},
        {name:'Monster Regular', price:1.49, size:"330ml", quantity:10},
        {name:'Monster Ultra Regular', price:1.49, size:"330ml", quantity:10}
    ]
};

function vending_visual() {
    console.clear();
    console.log('|   Vending Machine   |-----|');
    console.log('|---------------------|-----|');
    console.log('|   Michael Caunce    |-----|');
    console.log('|      23212438       |-----|');
    console.log('|                     |-----|');
    console.log('|---------------------------|');
    console.log('                             ');
    console.log(' Current Credit: £'+ credit );
    console.log('                             ');
    console.log('=============================');
    console.log('| 1: View Items       |     |');
    console.log('|                     |     |');
    console.log('| 2: Add Credit       |     |');
    console.log('|                     |     |');
    console.log('| 3: Buy Product      |     |');
    console.log('|                     |     |');
    console.log('| 4: Exit             |     |');
    console.log('+++++++++++++++++++++++++++++');

}
function mainMenuOption() {
    var choice = readline.question('         Selection: ');
    //If statement deals with users choice.
    switch (parseInt(choice)) {
      case 1: viewItems(); break;
      case 2: addCredit(); break;
      case 3: buyItem(); break;
      case 4: console.log('Thank you for your custom');  break;
      default: mainMenuOptionError();
  }
}

function mainMenuOptionError() {
    console.log(space);
    console.log('Invalid selection choice!');
    console.log(space);
    console.log('Press Enter to return to the main menu');
    console.log(space);
    mainMenuOption();
}



/*Start of main menu function*/
function main_menu() {
    vending_visual();
    /*Requests the readline question for input from the user*/
    var choice = readline.question("user input:");

    /*Switch statement listens for the users input, 1-5 are menu options that return the expected outcome for the user*/
    /*based on the selection they make, each case refers to a function throughout the program*/
    mainMenuOption();
}
/*end of main main function*/

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
      case 1: addCredit(); break;
      case 2: buyItem(); break;
      case 3: mainMenu(); break;
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

/*start of drinks selection function*/
function drinks_selection() {
    /*Loading the global variable products as products in this function*/
    var products = settings.products;
    /*Clears the console ready for the new GUI*/
    console.clear();
    console.log("                           ".bgWhite.black);
    console.log("   Please select a drink   ".bgWhite.black);
    console.log("                           ".bgWhite.black);
    console.log(" Current credit: £" + settings.current_credit)
    console.log("                           ");

    /*for loop iterates over the products in the settings.products global variable and puts them in to the new products variable inside*/
    /*this function ready to be displayed*/
    for(var i=0; i<products.length; i++) {
        var product = products[i];
        /*logs to the console the product name, size, price & quantity*/
        /*this is displayed in a list with "i" being displayed at the start of the line*/
        /*to differentiate the different selections and identify the location in the index*/
        console.log(i + ". " + product.name + " - " + product.size + ": £" + product.price + " - x" + product.quantity + " left");
    }

    /*Choice variable created to store the result of the user input upon entering a selection later down the code*/
    var choice = readline.question("User input: ");

    /*if the user input is not a number return the value of false*/
    if (isNaN(choice) == false) {
        /*parses the user string as an integer and stores it in choiceAsNumber*/
        var choiceAsNumber = parseInt(choice);

        /*if statement handles if the number entered is greater than or equal to 0 then move on to the stage 2 purchase*/
        /*without the && operator comparing if the entered unit is less than products.length, the program would crash if a number entered is greater than the iterated list*/
        if(choiceAsNumber >= 0 && choiceAsNumber < products.length) {
            /*Upon entering a valid selection, the program then passes on to the stage2_purchase function*/
            stage2_purchase(choiceAsNumber);

        }
        else {
            /*Upon entering an incorrect number the user is presented with an error message telling them that the number they entered*/
            /*was invalid, and they can try again by pressing enter*/
            console.log("The number you entered was not on the list!, please choose a number from above - press any key to try again");
            readline.question();
            drinks_selection(products);
        }
    }
    else {
        /*Similar to the previous else statement, if the user enters something that is not a number, the error message gives clear feedback instructions*/
        console.log("That is not a number, please choose a number from above - press any key to try again");
        readline.question();
        drinks_selection(products);
    }
}
/*End of drinks selection function*/



/*Start of stage 2 purchase function*/
function stage2_purchase(product_index) {
    console.clear();
    /*Creates a new variable that stores the product information */
    var product = settings.products[product_index];

    /*informs the user of the selected product, and its price*/
    console.log("Selected product: " + product.name + " " + product.price);

    /*If statement handles the scenario that the price of the item is greater than the users current credit*/
    /*if this is the case it informs the user that they don't have enough credit to make the purchase*/
    /*and gives them the ability to return to the main menu to add more credit*/
    if (product.price > settings.current_credit) {
        console.clear();
        console.log("You do not have the required credit to make this purchase :(")
        console.log("Your current credit is: £" + settings.current_credit)
        console.log("Please press any key to return to the main menu and add credit")
        readline.question();
        main_menu();

    }
    else {
        /*else if statement handles the scenario of the item being out of stock, it informs the user of this*/
        /*and returns the user to the main-menu, as they may not want to be returned to the drinks-selection as the product*/
        /*they wanted was out of stock*/
        if (product.quantity == 0) {
            console.clear();
            console.log("Sorry, that item is out of stock")
            console.log("Please press any key to return to the main menu")
            readline.question();
            main_menu();
          }
        /*else statement confirms the users purchase, adjusts the current_credit taking away the amount of the selected products price*/
        /*also removes 1 from the quantity of the product that has been purchased*/
        console.clear()
        settings.current_credit -= product.price;
        product.quantity -= 1;
        console.log("You have purchased: " + product.name + " - £" + product.price)
        console.log("Thank you!, Your credit is now: £" + settings.current_credit + " - Enjoy your drink!")
        console.log("Press any key to return to the main menu")
        readline.question();
        main_menu();
    }
}
/*End of stage 2 purchase*/


/**/
/*start of view credit function*/
function view_credit() {
    console.clear();
    /*view_credit is a very simple function that merely creates a new screen that displays the users current credit*/
    /*and allows them to return to the main menu.*/
    console.log("Your credit is: " + "£" + settings.current_credit);
    console.log("press any key to return to the main menu");
    readline.question();
    main_menu();
}
/*End of view credit function*/



/*Start of add credit function*/
function add_credit() {
    console.clear();
    console.log("Please enter the amount of credit you would like to add");
    console.log("Or press enter to exit");
    /*Choice variable created to pass the user input, £ sign used as string to indicate the user is entering a currency*/
    var choice = readline.question("£");

    /*choiceAsFloat recieves the input from choice and parses it as a float*/
    var choiceAsFloat = parseFloat(choice);

    /*If the input is not a number return as false, and if the input is greater than 0 update the global variable*/
    /*settings.current_credit to reflect the input given by the user*/
    if (isNaN(choiceAsFloat) == false) {
        if(choiceAsFloat > 0) {
            settings.current_credit += choiceAsFloat;
        }
        /*Else statement should detect if the user enters something other than a number*/
        /*and return user feedback saying such, so far it only returns this if the number is negative*/
        else {
            console.log("Please enter a number that is higher than 0");
            console.log("Press any key to return to refund credit:");
            readline.question();
            add_credit();
        }
        /*Upon succesfull credit being added the user is prompted by the success and given the option to return to the main menu*/
        console.clear();
        console.log("thank you! Your credit is now: £" + settings.current_credit + " press enter to return to the main menu")
        readline.question();
        main_menu();
    } else {
            /*Similar to the previous else statement, if the user enters something that is not a number, the error message gives clear feedback instructions*/
            console.log("That is not a number, please choose a number from above - press any key to try again");
            readline.question();
            add_credit();
    }
}
/*End of add credit function*/



/*Start of refund credit function*/
function refund_credit() {
    console.clear()/**/
    /*If statement says that if the credit is less than or equal to 0, then there*/
    /*is no credit to refund, thus the user is promted as such, and given the option to return to main menu*/
    if(settings.current_credit <= 0) {
        console.log("You do not have any credit to refund!")
        console.log("Press Enter to ret[urn to the main menu:")
        readline.question();
        main_menu();
    }

    /*Else the user is asked if they are sure they want to refund the credit*/
    /*This is handled by a switch statement*/
    else {
        console.log("Are you sure you want to refund your credit? Y/N")
        console.log("Your current credit is: £" + settings.current_credit)
        /*Choice variable is used again to recieve user input*/
        var choice = readline.question("User input: ");

        /*Switch statement uses toUpperCase JS function, to ensure that the user input is understood*/
        /*whether or not they use an uppercase or lowercase letter*/
        switch (choice.toUpperCase()) {
            /*if the user enters Y, then the current credit is set to 0, the user is then promted*/
            /*of this and given the option to return to the main menu*/
            case "Y":
                console.clear();
                settings.current_credit = 0;
                console.log("Thank you, your credit is now: " + "£" + settings.current_credit)
                console.log("Press Enter to return to the main menu:")
                readline.question();
                main_menu();
                break;
            /*Should the user enter N, the user is then immediately returned to the main menu and the credit is unaltered*/
            case "N": main_menu(); break;
            default:
                /*if any other input is given, the user is returned to the main menu*/
                console.log("That was not a selection!");
                main_menu();
            break;
        }
    }
}
/*End of refund credit function*/


/*Start of program*/
main_menu()
