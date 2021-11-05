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
        // We will first initialise the operands and operations
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().substring(0,this.currentOperand.length()-1); // creating substring out of the original number
        
    }

    appendNumber(number){
        // your do not want double decimal
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        //this.currentOperand = this.currentOperand.toString().concat(number.toString());
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

    getDisplayNum (number){
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split(".")[0]); // parsing the text as a floar post separation of pre and post decimal characters
        const decimalDigits = stringNum.split(".")[1]; // finding the post decimal chars 
        let integerDisplay;
        if (integerDigits != NaN) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString( en, { maximumFractionDigits: 0}); 
            // converting the integer into a formatted number with no decimal points with maximum fraction digits
        }
        if (decimalDigits !== null){
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay
        }
        console.log(number)
    }

    updateDisplayNum() {
        this.currentOperandText.innerText = this.getDisplayNum(this.currentOperand); // to update the current text on the screen
        if (this.operation != null) {
            // this is to make the preverious operand displayed on top along with the operator used for example 123 *
            this.previousOperandText.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
              
        } else{
            this.previousOperandText.innerText = ""
        }
    }
}

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplayNum()

  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperation(button.innerText)
    calculator.updateDisplayNum()
  })
})
/*
equalsButton.addEventListener('click', button=>{
  calculator.compute()
  calculator.updateDisplayNum()
})

allClearButton.addEventListener('click', button=>{
  calculator.clear()
  calculator.updateDisplayNum()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplayNum()
})
 */