"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const elementSelect = document.getElementById("calcType");
  const elementNum1 = document.getElementById("num1");
  const elementNum2 = document.getElementById("num2");
  const elementResult = document.getElementById("result");
  const btnEqual = document.getElementById("btnEqual");

  function handleEqualClick() {
    const num1 = Number(elementNum1.value) || 0;
    const num2 = Number(elementNum2.value) || 0;
    const calcType = elementSelect.value;
    elementResult.textContent = calculate(num1, num2, calcType);
  }

  btnEqual.addEventListener("click", handleEqualClick);

  function calculate(num1, num2, calcType) {
    let result;

    switch (calcType) {
      case "type-add":
        result = num1 + num2;
        break;
      case "type-subtract":
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
    }

    return result;
  }

  function clear() {
    elementResult.textContent = "";
  }

  elementSelect.addEventListener("change", clear);
  elementNum1.addEventListener("input", clear);
  elementNum2.addEventListener("input", clear);
});
