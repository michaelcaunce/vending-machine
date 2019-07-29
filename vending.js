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



/*Start of main menu function*/
function main_menu() {
    /*clear console after running the main_menu function, allows for a less cluttered command line*/
    /*GUI design made to be as simple as possible witout too much clutter*/
    console.clear();
    console.log("                          ".bgWhite.black);
    console.log("     VENDING MACHINE      ".bgWhite.red)
    console.log("       ".bgWhite.black+"Peter Bailey".bold.bgWhite.blue+"       ".bgWhite.black)
    console.log("         23292491         ".bgWhite.black)
    console.log("         CIS:2152         ".bgWhite.black)
    console.log("                          ".bgWhite.black);
    /*Displays the users current credit at all times on the main menu*/
    console.log("   Current credit: £" + settings.current_credit)
    console.log("                          ".bgWhite.black);
    console.log(" Please select an option: ".bgWhite.black);
    console.log("                          ".bgWhite.black);
    console.log("   1. Puchase a drink     ".bgWhite.black)
    console.log("   2. View credit         ".bgWhite.black)
    console.log("   3. Add credit          ".bgWhite.black)
    console.log("   4. Refund credit       ".bgWhite.black)
    console.log("   5. Exit                ".bgWhite.black)
    console.log("                          ".bgWhite.black)


    /*Requests the readline question for input from the user*/
    var choice = readline.question("user input:");

    /*Switch statement listens for the users input, 1-5 are menu options that return the expected outcome for the user*/
    /*based on the selection they make, each case refers to a function throughout the program*/
    switch (parseInt(choice)) {
        case 1: drinks_selection(); break;
        case 2: view_credit(); break;
        case 3: add_credit(); break;
        case 4: refund_credit(); break;
        /*if the user selects option 5 "Exit" the program ends*/
        case 5: break;
        default:
            /*Should the user enter an invalid selection i.e. any numerical digit not present on the list, or types anything other, including letters*/
            /*the user is presented with a fresh screen that informs them that the selection they made is invalid and gives them clear instructions on how*/
            /*to return to the main menu*/
            console.clear();
            console.log("That was not a selection!");
            console.log("press Enter to return to the main menu")
            readline.question();
            main_menu();
        break;
    }
}
/*end of main main function*/




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
