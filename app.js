const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear()
    }

    clear(){
        this.currentOperand ="";
        this.previousOperand ="";
        this.operator = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().substring(0,this.currentOperand.length-1); // creating substring out of the original number
    }

    appendNumber(number){
        // your do not want double decimal
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString().concat(number.toString());
    }

    compute() {
        let computationResult;
        const previousNum = parseFloat(this.previousOperand);
        const currentNum = parseFloat(this.currentOperand);
        if (isNaN(previousNum) || isNaN(currentNum)) return; // in case either is empty return empty
        switch (this.operation) {
            case "+":
                computationResult= previousNum + currentNum;
                break;
            case "-":
                computationResult= previousNum - currentNum;
                break;
            case "*":
                computationResult= previousNum * currentNum;
                break;
            case "÷":
                computationResult= previousNum / currentNum;
                break;
            default:
                return;
        }
        // set the value of the current operand to the result, reset the operation and make prev operand = nil
        this.currentOperand = computationResult;
        this.operation = undefined;
        this.previousOperand = ""
    }
    
    selectOperation(operation) {
        // we do not want to perform any operation in case of the current operand being empty
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();  
        }
        // in case of it being non empty then the operation needs to be appended the value of 
        // previous operand needs to be updated and current set to nil
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    
    getDisplayNum (number){
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split(".")[0]); // parsing the text as a floar post separation of pre and post decimal characters
        const decimalDigits = stringNum.split(".")[1]; // finding the post decimal chars 
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString( 'en-GB' , { maximumFractionDigits: 0}); 
            // converting the integer into a formatted number with no decimal points with maximum fraction digits
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNum(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText =
                `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
         }
    }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    } )
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.selectOperation(button.innerText)
      calculator.updateDisplay()
    })
  });


equalsButton.addEventListener('click', equalExe) 
allClearButton.addEventListener('click', clearExe)
deleteButton.addEventListener('click', deleteExe)

function equalExe(){
    calculator.compute();
    calculator.updateDisplay();  
};

//
function clearExe(){
    calculator.clear();
    calculator.updateDisplay();
};

function deleteExe(){
  calculator.delete();
  calculator.updateDisplay();
}
   
