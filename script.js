const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const buttons = document.querySelectorAll("button");
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

let expression = "";

function updateDisplay() {
  expressionEl.textContent = expression || "0";
  try {
    if (expression) {
      const result = eval(expression);
      resultEl.textContent = result;
    } else {
      resultEl.textContent = "0";
    }
  } catch {
    resultEl.textContent = "Error";
  }
}

function clearDisplay() {
  expression = "";
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(expression);
    expression = result.toString();
    updateDisplay();
  } catch {
    resultEl.textContent = "Error";
    expression = "";
  }
}

function append(value) {
  if (value === "=") {
    calculate();
  } else if (value === "C") {
    clearDisplay();
  } else {
    expression += value;
    updateDisplay();
  }
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-key");
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 150);
    append(key);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if ("0123456789+-*/".includes(key)) {
    append(key);
  } else if (key === "Enter") {
    append("=");
  } else if (key === "Escape" || key.toLowerCase() === "c") {
    append("C");
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  }
});
