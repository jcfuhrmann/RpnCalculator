/**
 *  calc.js - implements an RPN calculator in Javascript 
 */

var numberEntered = true;
var decimalEntered = false;
var expressionStack = [];

function digitPressed(char) {
	console.log("key " + "\'" + char + "\'" + " pressed.\n");
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
    		}
    		decimalEntered = true;
    	}
    	break;
    case '\n':
    	expressionStack.push(Number(document.getElementById("answer").value));
        decimalEntered = false;
        numberEntered = true;
        break;
    default:
        break;
    }
}

function changeSign() {
	var inputValue = -1 * Number(document.getElementById("answer").value);
	document.getElementById("answer").value = String(inputValue);
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
