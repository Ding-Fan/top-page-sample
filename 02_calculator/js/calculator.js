document.addEventListener("DOMContentLoaded", function () {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const calcTypeSelect = document.getElementById("calcType");
  const btnEqual = document.getElementById("btnEqual");
  const resultDiv = document.getElementById("result");

  function calculate() {
    const num1 = parseFloat(num1Input.value) || 0;
    const num2 = parseFloat(num2Input.value) || 0;
    const operation = calcTypeSelect.value;
    let result;

    switch (operation) {
      case "type-add":
        result = num1 + num2;
        break;
      case "type-substract":
        result = num1 - num2;
        break;
      case "type-multiply":
        result = num1 * num2;
        break;
      case "type-divide":
        if (num2 === 0) {
          result = "Can not divide by zero";
        } else {
          result = num1 / num2;
        }
        break;
      default:
        result = "Error: Invalid operation";
    }

    resultDiv.textContent = result;
  }

  btnEqual.addEventListener("click", calculate);
});
