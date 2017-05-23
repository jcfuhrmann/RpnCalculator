/**
 *  calc.js - implements an RPN calculator in Javascript 
 */

var numberEntered = true;
var decimalEntered = false;
var expressionStack = [];
var expMode = false;

function digitPressed(char) {
	console.log("key " + "\'" + char + "\'" + " pressed.\n");
	console.log("char is Integer? " + Number.isInteger(Number(char)));
    if (expMode && Number.isInteger(Number(char))) {
    	document.getElementById("answer").value += char;
    	var str = document.getElementById("answer").value;
    	console.log("str = " + str);
    	var numeric = str.substring(0, str.indexOf("e"));
    	console.log("numeric = " + numeric);
    	var powerOfTen = Number(str.substring(str.indexOf("e") + 1, str.length));
    	console.log("powerOfTen = " + powerOfTen);
    	document.getElementById("answer").value = String(numeric * Math.pow(10, powerOfTen));
    	console.log("answer = " + document.getElementById("answer").value);
    	expressionStack.push(Number(document.getElementById("answer").value));
        decimalEntered = false;
        numberEntered = true;
    	expMode = false;
    	document.getElementById("clearBtn").innerHTML = "C";
    }
    else {
		switch (char) {
	    case '0':
	    	if (!numberEntered) {
	    		document.getElementById("answer").value += char;
	    	}
	    	else {
	    		document.getElementById("answer").value = "0";
	    	}
	    	break;
	    case '1':
	    case '2':
	    case '3':
	    case '4':
	    case '5':
	    case '6':
	    case '7':
	    case '8':
	    case '9':
	        if (!numberEntered) {
	        	document.getElementById("answer").value += char;
	        } 
	        else {
	    		document.getElementById("answer").value = char;
	    		numberEntered = false;
	        	document.getElementById("clearBtn").innerHTML = "&#582;";
	        }
	        break;
	    case '.':
	    	if (!decimalEntered) {
	    		if (!numberEntered) {
	    			document.getElementById("answer").value += char;
	    		}
	    		else {
	    			document.getElementById("answer").value = "0" + char;
	    			numberEntered = false;
	    	    	document.getElementById("clearBtn").innerHTML = "&#582;";
	    		}
	    		decimalEntered = true;
	    	}
	    	break;
	    case '\n':
	    	if (expMode) {
	    		var str = document.getElementById("answer").value;
	    		console.log("str = " + str);
	    		var e = str.substring(0, str.indexOf("e"));
	    		console.log("e = " + e);
	    		expressionStack.push(e);
	    	}
	    	else {
		    	expressionStack.push(Number(document.getElementById("answer").value));
	    	}
		    decimalEntered = false;
	        numberEntered = true;
	        expMode = false;
	    	document.getElementById("clearBtn").innerHTML = "C";
	        break;
	    default:
	        break;
	    }
    }
}

function changeSign() {
	console.log("key " + "\'" + "&plusmn;" + "\'" + " pressed.\n");
	if (expMode) {
		str = document.getElementById("answer").value;
		if (/e\+/) {
			console.log("replacing +");
			str = str.replace(/e\+/, "e-");
		}
		else {
			console.log("replacing -");
			str = str.replace(/e\-/, "e+");
		}
		console.log("str = " + str);
		document.getElementById("answer").value = str;
	}
	else {
		var inputValue = -1 * Number(document.getElementById("answer").value);
		document.getElementById("answer").value = String(inputValue);
	}
}

function operatorPressed(char) {
	var op1, op2, operator, ans;
	console.log("operator " + char + " pressed");
	
	if (!numberEntered) {
		expressionStack.push(Number(document.getElementById("answer").value));
	}
	expressionStack.push(char);
    decimalEntered = false;
    numberEntered = true;
	document.getElementById("clearBtn").innerHTML = "C";
	
	if (expressionStack.length < 3) {
		console.log("Bad math expression entered");
		return;
	}
	
	operator = expressionStack.pop();
	op2 = expressionStack.pop();
	op1 = expressionStack.pop();
	
	switch (operator) {
	case '*':
		ans = op1 * op2;
		break;
	case '/':
		if (op2 == 0) {
			console.log("Divison by zero attempted");
			return;
		}
		ans = op1 / op2;
		break;
	case '+':
		ans = op1 + op2;
		break;
	case '-':
		ans = op1 - op2;
		break;
	}
	expressionStack.push(ans);
	document.getElementById("answer").value = String(ans);
}

function clearPressed() {
	console.log("key " + "\'" + "C" + "\'" + " pressed.\n");

	if (numberEntered) {
		expressionStack = [];
	}
	document.getElementById("answer").value = "0";
	document.getElementById("clearBtn").innerHTML = "C";
	numberEntered = true;
	decimalEntered = false;
	expMode = false;
}

function expPressed() {
	console.log("key " + "\'" + "E" + "\'" + " pressed.\n");
	
	expMode = true;
	document.getElementById("answer").value += 'e+';
}
