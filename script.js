const inputGrade = document.getElementById("gradeInput");
const gradeBtn = document.getElementById("gradeBtn");
const gradeResult = document.getElementById("gradeResult");
const temperatureInput = document.getElementById("temperatureInput");
const temperatureUnit = document.getElementById("temperatureUnit");
const temperatureBtn = document.getElementById("temperatureBtn");
const temperatureResult = document.getElementById("temperatureResult");
const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passwordResult = document.getElementById("passwordResult");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const calculatorDisplay = document.getElementById("calculatorDisplay");
const clearBtn = document.getElementById("clearBtn");
const equalsBtn = document.getElementById("equalsBtn");

gradeBtn.addEventListener("click", () => {
  const score = Number(inputGrade.value);
  if (score < 0) {
    gradeResult.innerHTML = "<h2>Invalid Grade Score</h2>";
  } else if (score < 60) {
    gradeResult.textContent = "F";
  } else if (score < 70) {
    gradeResult.textContent = "D";
  } else if (score < 80) {
    gradeResult.textContent = "C";
  } else if (score < 90) {
    gradeResult.textContent = "B";
  } else if (score <= 100) {
    gradeResult.textContent = "A";
  } else {
    gradeResult.innerHTML = "<h2>Invalid Grade Score</h2>";
  }
});

temperatureBtn.addEventListener("click", () => {
  const temperature = Number(temperatureInput.value);
  const unit = temperatureUnit.value;
  let result;
  if (unit === "celsius") {
    result = 32 + (9 / 5) * temperature;
    temperatureResult.textContent = `${result.toFixed(1)}°F`;
  } else {
    result = ((temperature - 32) * 5) / 9;
    temperatureResult.textContent = `${result.toFixed(1)}°C`;
  }
});
passwordBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  let hasNum = false;
  let hasUppercase = false;

  for (let i = 0; i < password.length; i++) {
    if (!isNaN(password[i])) {
      hasNum = true;
    } else if (
      password[i].toLowerCase() !== password[i].toUpperCase() &&
      password[i] === password[i].toUpperCase()
    ) {
      hasUppercase = true;
    }
  }
  if (password.length >= 8 && hasNum && hasUppercase) {
    passwordResult.textContent = "Valid Password";
  } else {
    passwordResult.textContent = "Invalid Password";
  }
});

let firstNumber = "";
let operator = "";
let secondNumber = "";

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (operator === "") {
      firstNumber += btn.dataset.number;
      calculatorDisplay.value = firstNumber;
    } else {
      secondNumber += btn.dataset.number;
      calculatorDisplay.value =
        firstNumber + operatorSymbols[operator] + secondNumber;
    }
  });
});
const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (firstNumber === "") return;
    operator = btn.dataset.operator;
    calculatorDisplay.value = firstNumber + operatorSymbols[operator];
  });
});

equalsBtn.addEventListener("click", () => {
  if (firstNumber === "" || operator === "" || secondNumber === "") return;

  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);
  let result;

  if (operator === "+") result = num1 + num2;
  if (operator === "-") result = num1 - num2;
  if (operator === "*") result = num1 * num2;
  if (operator === "/") result = num1 / num2;

  calculatorDisplay.value = result;

  firstNumber = result.toString();
  operator = "";
  secondNumber = "";
});

clearBtn.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  calculatorDisplay.value = "";
});
