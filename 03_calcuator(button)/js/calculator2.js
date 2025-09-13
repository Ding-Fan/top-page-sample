"use strict";

const OPERATOR_MAP = {
  add: "+",
  sub: "-",
  mult: "*",
  div: "/",
};

const removeLastOperator = () => {
  // 演算子 入力しなおし
  let wkLogLastWord = elementcalcLog.innerHTML.slice(-1); //ログ最後の１文字
  if (["+", "-", "*", "/"].includes(wkLogLastWord)) {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1); //計算ログ　末尾1文字（前回の演算子）を削除
  }
};

// ワークエリア
var wkFirst = "1"; //初回FLG
var wkTotal = 0; //合計
var wkCalc = "+"; //初期値 "+"
var wkBefore = "1"; //１つ前の入力 … 0:数値  1:演算子

// ページ上の要素（Element)を参照
// 【Ａ】自分で考える

const MainBox = document.querySelector(".f-box");
const elementResult = document.querySelector("#result");
const elementcalcLog = document.querySelector("#calcLog");

// イベントを登録
// 【Ｂ】自分で考える

const handleButtonClick = (e) => {
  const id = e.target.id;
  // console.log(id);

  if (id.includes("num")) {
    // console.log(id.slice(3));
    edit(id.slice(3));
  } else if (id === "cancel") {
    clear();
  } else if (id === "equal") {
    dspResult();
  } else if (OPERATOR_MAP[id]) {
    update(OPERATOR_MAP[id]);
  }
};

MainBox.addEventListener("click", handleButtonClick);

document.addEventListener("keyup", handleKeyboardInput);

/** 数字がクリックされたときの処理 */
function edit(wkInput) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
    elementResult.innerHTML = Number(elementResult.innerHTML + wkInput); //入力値の結合（ゼロサプレスして結合）
  }
  // １つ前の入力が、演算子
  else {
    elementResult.innerHTML = wkInput;
  }
  wkFirst = "0"; //初回FLG off
  wkBefore = "0";
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
    elementcalcLog.innerHTML =
      elementcalcLog.innerHTML + Number(elementResult.innerHTML) + calcType; //計算ログ
    // 【Ｃ】自分で考える
    calculator();
  }
  // １つ前の入力が演算子（演算子 入力しなおし）
  else {
    // 初回入力
    if (wkFirst === "1") {
      elementcalcLog.innerHTML = "0" + calcType; //計算ログ
    } else {
      removeLastOperator();

      elementcalcLog.innerHTML = elementcalcLog.innerHTML + calcType; //計算ログ
    }
  }
  wkCalc = calcType; //演算子save
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
// 【Ｄ】自分で考える

const dspResult = () => {
  // if (wkBefore === "1") {
  //   removeLastOperator();
  // }

  if (wkFirst === "0" && wkBefore === "0") {
    elementcalcLog.innerHTML =
      elementcalcLog.innerHTML + Number(elementResult.innerHTML);
      calculator();
    // wkCalc = "=";
    wkBefore = "1";
  }
};

/** 計算結果をクリアします。(clear Result) */
// 【Ｅ】自分で考える

const clear = () => {
  elementResult.innerHTML = "0";
  elementcalcLog.innerHTML = "";
  wkFirst = "1"; //初回FLG
  wkTotal = 0; //合計
  wkCalc = "+"; //初期値 "+"
  wkBefore = "1"; //１つ前の入力 … 0:数値  1:演算子
};

// 計算
// 【Ｆ】自分で考える
const calculator = () => {
  const elementResultValue = Number(elementResult.innerHTML);

  switch (wkCalc) {
    case "+":
      wkTotal = Number(wkTotal) + elementResultValue;
      break;

    case "-":
      wkTotal = Number(wkTotal) - elementResultValue;
      break;

    case "*":
      wkTotal = Number(wkTotal) * elementResultValue;
      break;

    case "/":
      wkTotal = Number(wkTotal) / elementResultValue;
      break;
  }

  elementResult.innerHTML = wkTotal;
};


function handleKeyboardInput(e) {
  const key = e.key;
  
  if (key >= '0' && key <= '9') {
    edit(key);
  }
  else if (key === '+') {
    update('+');
  }
  else if (key === '-') {
    update('-');
  }
  else if (key === '*') {
    update('*');
  }
  else if (key === '/') {
    e.preventDefault();
    update('/');
  }
  else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    dspResult();
  }
  else if (key.toLowerCase() === 'c') {
    clear();
  }
}