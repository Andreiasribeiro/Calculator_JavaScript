const previousOperationTextElement = document.querySelector(
  "#previous-operation"
);
const currentOperationTextElement =
  document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#btn-container button");

class Calculator {
  constructor(previousOperationTextElement, currentOperationTextElement) {
    this.previousOperationTextElement = previousOperationTextElement;
    this.currentOperationTextElement = currentOperationTextElement;
    this.currentOperation = "";
  }
  appendNumber(numb) {
    console.log(numb);
    if (
      numb === "." &&
      this.currentOperationTextElement.innerText.includes(".")
    ) {
      return;
    }
    this.currentOperation = numb;
    this.updateScreen();
  }

  processOperation(operation) {
    if (
      this.currentOperationTextElement.innerText === "" &&
      operation !== "C"
    ) {
      if (this.previousOperationTextElement.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }
    let operationValue;
    let previous = +this.previousOperationTextElement.innerText.split(" ")[0];
    let current = +this.currentOperationTextElement.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationTextElement.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      this.previousOperationTextElement.innerText = `${operationValue} ${operation}`;
      this.currentOperationTextElement.innerText = "";
    }
  }

  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationTextElement.innerText =
      this.previousOperationTextElement.innerText.slice(0, -1) + operation;
  }

  processDelOperator() {
    this.currentOperationTextElement.innerText =
      this.currentOperationTextElement.innerText.slice(0, -1);
  }

  processClearCurrentOperator() {
    this.currentOperationTextElement.innerText = "";
  }
  processClearOperator() {
    this.currentOperationTextElement.innerText = "";
    this.previousOperationTextElement.innerText = "";
  }

  processEqualOperator() {
    let operation = this.previousOperationTextElement.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calculator = new Calculator(
  previousOperationTextElement,
  currentOperationTextElement
);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calculator.appendNumber(value);
    } else {
      calculator.processOperation(value);
    }
  });
});
