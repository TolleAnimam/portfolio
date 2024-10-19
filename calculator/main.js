const buttons = document.querySelectorAll(".button");
const mainDisplay = document.querySelector("#main-display");
const secondDisplay = document.querySelector("#second-display");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const equal = document.querySelector("#equal");

let buffer = "";

function betterMainDisplay() {
  mainDisplay.textContent = "";
  for (let i = 0; i <= buffer.length - 1; i++) {
    if (buffer[i] === "*") {
      mainDisplay.textContent += "∙";
    } else if (buffer[i] === "/") {
      mainDisplay.textContent += "÷";
    } else {
      mainDisplay.textContent += buffer[i];
    }
  }
}

function checkNumHaveDot() {
  for (let i = 1; i <= buffer.length - 1; i++) {
    if (buffer[buffer.length - i] === ".") {
      return true;
    } else if (
      buffer[buffer.length - i] === "/" ||
      buffer[buffer.length - i] === "*" ||
      buffer[buffer.length - i] === "+" ||
      buffer[buffer.length - i] === "-"
    ) {
      if (buffer[buffer.length - 1] !== "%") {
        return false;
      }
    }
  }

  return false;
}

buttons.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.dataset.number !== undefined) {
      if (buffer[buffer.length - 1] !== "%") {
        if (buffer[0] === undefined && el.dataset.number === "0") {
        } else if (buffer[0] === undefined && el.dataset.number === "00") {
        } else {
          buffer += el.dataset.number;
          betterMainDisplay();
          secondDisplay.textContent = math.evaluate(buffer);
        }
      }
    } else if (el.dataset.symbol !== undefined) {
      if (
        buffer[buffer.length - 1] === undefined &&
        el.dataset.symbol !== "." &&
        typeof buffer === "string"
      ) {
        throw new Error("");
      }

      if (
        buffer[buffer.length - 1] === "/" ||
        buffer[buffer.length - 1] === "*" ||
        buffer[buffer.length - 1] === "+" ||
        buffer[buffer.length - 1] === "-"
      ) {
        if (el.dataset.symbol !== "%" && el.dataset.symbol !== ".") {
          buffer = buffer.slice(0, -1);
          buffer += el.dataset.symbol;
        }
      } else if (
        buffer[buffer.length - 1] === "." &&
        (el.dataset.symbol === "/" ||
          el.dataset.symbol === "*" ||
          el.dataset.symbol === "+" ||
          el.dataset.symbol === "-")
      ) {
      } else if (
        (buffer[buffer.length - 1] === "%" && el.dataset.symbol === "%") ||
        (buffer[buffer.length - 1] === "." && el.dataset.symbol === ".")
      ) {
      } else if (buffer === "" && el.dataset.symbol === ".") {
        buffer = "0";
        buffer += el.dataset.symbol;
      } else if (
        buffer[buffer.length - 1] !== "." &&
        el.dataset.symbol === "."
      ) {
        for (let i = 1; i >= buffer.length - 1; i++) {
          if (buffer[buffer.length - i] === undefined) {
            if (buffer[buffer.length - 1] !== "%") {
              if (el.dataset.symbol !== ".") {
                buffer += el.dataset.symbol;
              }
            }
            break;
          }
        }
        if (!checkNumHaveDot()) {
          buffer += `${el.dataset.symbol}`;
        }
      } else if (
        (buffer[buffer.length - 1] === "%" && el.dataset.symbol === ".") ||
        (buffer[buffer.length - 1] === "." && el.dataset.symbol === "%")
      ) {
      } else {
        buffer += el.dataset.symbol;
      }

      betterMainDisplay();
      if (
        buffer[buffer.length - 1] !== "/" &&
        buffer[buffer.length - 1] !== "*" &&
        buffer[buffer.length - 1] !== "+" &&
        buffer[buffer.length - 1] !== "-"
      ) {
        secondDisplay.textContent = math.evaluate(buffer);
      }
    }
  });
});

clear.addEventListener("click", (_) => {
  buffer = "";
  mainDisplay.textContent = "0";
  secondDisplay.textContent = "0";
});

backspace.addEventListener("click", (_) => {
  if (buffer.length - 1 !== 0 || buffer.length - 1 !== undefined) {
    buffer = buffer.slice(0, -1);
  } else {
    buffer = "0";
  }

  betterMainDisplay();

  if (math.evaluate(buffer) !== undefined)
    secondDisplay.textContent = math.evaluate(buffer);

  if (buffer.length === 0 || buffer.length === undefined) {
    mainDisplay.textContent = "0";
    secondDisplay.textContent = "0";
  }
});

equal.addEventListener("click", (_) => {
  if (buffer.length > 0) {
    buffer = `${math.evaluate(buffer)}`;

    betterMainDisplay();
    secondDisplay.textContent = buffer;
  }
});
