"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const elementSelect = document.getElementById("calcType");
  const elementNum1 = document.getElementById("num1");
  const elementNum2 = document.getElementById("num2");
  const elementResult = document.getElementById("result");

  function calculate() {
    const num1 = Number(elementNum1.value) || 0;
    const num2 = Number(elementNum2.value) || 0;
    const calcType = elementSelect.value;
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

    elementResult.textContent = result;
  }

  elementSelect.addEventListener("change", calculate);
  elementNum1.addEventListener("input", calculate);
  elementNum2.addEventListener("input", calculate);
});
