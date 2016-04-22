
/*============================================================================*/

/*

This routine checks the credit card number. The following checks are made:

1. A number has been provided
2. The number is a right length for the card
3. The number has an appropriate prefix for the card
4. The number has a valid modulus 10 number check digit if required

If the validation fails an error is reported.

The structure of credit card formats was gleaned from a variety of sources on
the web, although the best is probably on Wikepedia ("Credit card number"):

	http://en.wikipedia.org/wiki/Credit_card_number

Parameters:
	cardnumber	number on the card
	cardname		name of card as defined in the card list below

Author:		 John Gardner
Date:			 1st November 2003
Updated:		26th Feb. 2005			Additional cards added by request
Updated:		27th Nov. 2006			Additional cards added from Wikipedia
Updated:		18th Jan. 2008			Additional cards added from Wikipedia
Updated:		26th Nov. 2008			Maestro cards extended
Updated:		19th Jun. 2009			Laser cards extended from Wikipedia

Updated:		9th Aug. 2010			 Support Joobi Applications

*/


function checkCreditCard( cardnameid, cardnumid ) {

	// Array to hold the permitted card characteristics
	var cards = new Array();

	// Define the cards we support. You may add addtional card types.

	//Name: As in the selection box of the form - must be same as user's
	//Length: List of possible valid lengths of the card number for the card
	//prefixes: List of possible prefixes for the card
	//checkdigit Boolean to say whether there is a check digit

	cards [0] = {name: "Visa",
				length: "13,16",
				prefixes: "4",
				checkdigit: true};
	cards [1] = {name: "MasterCard",
				length: "16",
				prefixes: "51,52,53,54,55",
				checkdigit: true};
	cards [2] = {name: "DinersClub",
				length: "14,16",
				prefixes: "305, 36, 38, 54,55",
				checkdigit: true};
	cards [3] = {name: "CarteBlanche",
				length: "14",
				prefixes: "300,301,302,303,304,305",
				checkdigit: true};
	cards [4] = {name: "AmEx",
				length: "15",
				prefixes: "34,37",
				checkdigit: true};
	cards [5] = {name: "Discover",
				length: "16",
				prefixes: "6011,622,64,65",
				checkdigit: true};
	cards [6] = {name: "JCB",
				length: "16",
				prefixes: "35",
				checkdigit: true};
	cards [7] = {name: "enRoute",
				length: "15",
				prefixes: "2014,2149",
				checkdigit: true};
	cards [8] = {name: "Solo",
				length: "16,18,19",
				prefixes: "6334, 6767",
				checkdigit: true};
	cards [9] = {name: "Switch",
				length: "16,18,19",
				prefixes: "4903,4905,4911,4936,564182,633110,6333,6759",
				checkdigit: true};
	cards [10] = {name: "Maestro",
				length: "12,13,14,15,16,18,19",
				prefixes: "5018,5020,5038,6304,6759,6761",
				checkdigit: true};
	cards [11] = {name: "VisaElectron",
				length: "16",
				prefixes: "417500,4917,4913,4508,4844",
				checkdigit: true};
	cards [12] = {name: "LaserCard",
		 		length: "16,17,18,19",
				prefixes: "6304,6706,6771,6709",
				checkdigit: true};

	var cardnameElem = document.getElementById(cardnameid);
	var cardname = cardnameElem.value;
	var cardnumElem = document.getElementById(cardnumid);
	var cardnumber = cardnumElem.value;

	// Establish card type
	var cardType = -1;
	for (var i=0; i<cards.length; i++) {

		// See if it is this card (ignoring the case of the string)
		if (cardname.toLowerCase () == cards[i].name.toLowerCase()) {
			cardType = i;
			break;
		}
	}

	// If card type not found, report an error
	if (cardType == -1) {
		ccErrorNo = 0;
		return invalidCreditMessage(0);
	}

	// Ensure that the user has provided a credit card number
	if (cardnumber.length == 0)	{
		ccErrorNo = 1;
		return invalidCreditMessage(1);
	}

	// Now remove any spaces from the credit card number
	cardnumber = cardnumber.replace (/\s/g, "");

	// Check that the number is numeric
	var cardNo = cardnumber
	var cardexp = /^[0-9]{13,19}$/;
	if (!cardexp.exec(cardNo))	{
		ccErrorNo = 2;
		return invalidCreditMessage(2);
	}

	// Now check the modulus 10 check digit - if required
	if (cards[cardType].checkdigit) {
		var checksum = 0;																	// running checksum total
		var mychar = "";																	 // next char to process
		var j = 1;																				 // takes value of 1 or 2

		// Process each digit one by one starting at the right
		var calc;
		for (i = cardNo.length - 1; i >= 0; i--) {

			// Extract the next digit and multiply by 1 or 2 on alternative digits.
			calc = Number(cardNo.charAt(i)) * j;

			// If the result is in two digits add 1 to the checksum total
			if (calc > 9) {
				checksum = checksum + 1;
				calc = calc - 10;
			}

			// Add the units element to the checksum total
			checksum = checksum + calc;

			// Switch the value of j
			if (j ==1) {j = 2} else {j = 1};
		}

		// All done - if checksum is divisible by 10, it is a valid modulus 10.
		// If not, report an error.
		if (checksum % 10 != 0)	{
			ccErrorNo = 3;
			return invalidCreditMessage(3);
		}
	}

	// The following are the card-specific checks we undertake.
	var LengthValid = false;
	var PrefixValid = false;
	var undefined;

	// We use these for holding the valid lengths and prefixes of a card type
	var prefix = new Array ();
	var lengths = new Array ();

	// Load an array with the valid prefixes for this card
	prefix = cards[cardType].prefixes.split(",");

	// Now see if any of them match what we have in the card number
	for (i=0; i<prefix.length; i++) {
		var exp = new RegExp ("^" + prefix[i]);
		if (exp.test (cardNo)) PrefixValid = true;
	}

	// If it isn't a valid prefix there's no point at looking at the length
	if (!PrefixValid) {
		ccErrorNo = 3;
		return invalidCreditMessage(3);
	}

	// See if the length is valid for this card
	lengths = cards[cardType].length.split(",");
	for (j=0; j<lengths.length; j++) {
		if (cardNo.length == lengths[j]) LengthValid = true;
	}

	// See if all is OK by seeing if the length was valid. We only check the
	// length if all else was hunky dory.
	if (!LengthValid) {
		ccErrorNo = 4;
		return invalidCreditMessage(4);
	};

	// The credit card is in the required format.
	return true;
}


/**
 * function to validate the expiration date of the credit card
 * @param string carddateid
**/
//function checkCreditDate( carddateid ){
//
//	var cardexpElem = document.getElementById( carddateid );
//	var cardexp = cardexpElem.value;
//	if (cardexp.length <= 6 && cardexp.length >= 3 ){
//		var cardmonth = 0;
//		var cardyear = 0;
//		var indexSplit = 0;
//		//determine index of date month and year maker
//		if (cardexp.length == 3 || cardexp.length == 5){
//			indexSplit = 1;
//		} else {
//			indexSplit = 2;
//		}//endif
//		cardmonth = cardexp.substring(0,indexSplit);
//		cardyear = cardexp.substring(indexSplit);
//
//		//check card year length
//		if ( cardyear.length < 2 || cardyear.length == 3) return invalidCardMessage(2);
//
//		var currDate = new Date();
//		var currMonth = currDate.getMonth() + 1;
//		var currYear = currDate.getFullYear();
//
//		//TODO revise this code since it is currently hardcoded to a 50 yr check
//		if ( cardyear.length == 2) {
//			if ( cardyear < 50 ) cardyear = '20' + cardyear;
//			else return invalidCreditMessage(6);
//		}//endif
//
//		//check valid year
//		if (cardyear < currYear ) return invalidCreditMessage(6);
//		//10 year range, to make sure the expiration is not exaggerated
//		if (cardyear > currYear + 10 ) return invalidCreditMessage(5);
//
//		//check valid month
//		if (cardyear == currYear && cardmonth < currMonth) return invalidCreditMessage(6);
//
//		//updating the format of exp date
//		if (cardmonth.length < 2) cardmonth = '0' + cardmonth;
//		cardexpElem.value = cardmonth + cardyear;
//
//		//expiration valid
//		return true;
//	} else {
//		return invalidCreditMessage(5);
//	}//endif
//
//	return true;
//}//endfct



/**
 * function to handle all error messages
 * @param int type
**/
function invalidCreditMessage( type ) {


	var ccErrorNo = 0;
	var ccErrors = new Array ()

	ccErrors [0] = "Unknown card type";
	ccErrors [1] = "No card number provided";
	ccErrors [2] = "Credit card number is in invalid format";
	ccErrors [3] = "Credit card number is invalid";
	ccErrors [4] = "Credit card number has an inappropriate number of digits";
	ccErrors [5] = "Invalid Expiration Date";
	ccErrors [6] = "Credit Card Expired or invalid format";


	if (type <= ccErrors.length) alert( ccErrors[type] );
	else alert( "Invalid Credit Card!" );

	return false;
}//endfct


/*============================================================================*/
