const containers = document.querySelectorAll(".container");
const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");
const button = document.querySelector("#button");

let dayIsCorrect = true;
let monthIsCorrect = true;
let yearIsCorrect = true;

let isNum = true;

let daysLived = 0;
let monthsLived = 0;
let yearsLived = 0;

let i = 0;

function formGoToNormal(idx) {
  const inputElement = document.querySelector(
    `.container input[data-input-id="${idx}" ]`
  );
  const spanElement = document.querySelector(
    `.container span[data-span-id="${idx}"]`
  );

  spanElement.dataset.red = "false";
  inputElement.dataset.red = "false";
}

function formGoToRed(idx) {
  const inputElement = document.querySelector(
    `.container input[data-input-id="${idx}" ]`
  );
  const spanElement = document.querySelector(
    `.container span[data-span-id="${idx}"]`
  );

  spanElement.dataset.red = "true";
  inputElement.dataset.red = "true";
}

function checkAllInputsHaveSth() {
  isNum = true;

  containers.forEach((el) => {
    i++;

    const footerElement = document.querySelector(`#footer[data-id="${i}"]`);

    if (
      /\d/.test(
        document.querySelector(`.container input[data-input-id="${i}" ]`).value
      )
    ) {
      footerElement.textContent = "";

      formGoToNormal(i);
    } else {
      isNum = false;
      if (
        document.querySelector(`.container input[data-input-id="${i}" ]`).value
          .length > 0
      ) {
        formGoToRed(i);
        footerElement.textContent = "It must be a number";
      } else {
        formGoToRed(i);
        footerElement.textContent = "This field is required";
      }
    }
  });

  i = 0;

  if (isNum === false) {
    throw new Error("Labels doesn't have enough numbers");
  }
}

function isLeapYear(year) {
  if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
    return true;
  } else {
    return false;
  }
}

function checkDateIsCorrect(day, month, year) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month < 1 || month > 12) {
    document.querySelector(`#footer[data-id="2"]`).textContent =
      "Must be a valid month";
    formGoToRed(2);
    monthIsCorrect = false;
  }

  if (year < 0) {
    document.querySelector(`#footer[data-id="3"]`).textContent =
      "Year can not be 0 or less";
    formGoToRed(3);
    yearIsCorrect = false;
  }

  if (year > new Date().getFullYear()) {
    document.querySelector(`#footer[data-id="3"]"]`).textContent =
      "Year must be in past";
    formGoToRed(3);
    yearIsCorrect = false;
  }

  if (isLeapYear(year)) daysInMonth[1] = 29;

  if (day < 1 || day > daysInMonth[month - 1]) {
    console.log("beka");
    document.querySelector(`#footer[data-id="1"]`).textContent =
      "Day must be valid";
    formGoToRed(1);
    dayIsCorrect = false;
  } else if (day > 31 && !monthIsCorrect) {
    console.log("beka1");
    document.querySelector(`#footer[data-id="1"]`).textContent =
      "Day must be valid";
    formGoToRed(1);
    dayIsCorrect = false;
  } else {
    console.log("beka2");
    document.querySelector(`#footer[data-id="1"]`).textContent = "";
    formGoToNormal(1);
  }

  if (!dayIsCorrect || !yearIsCorrect || !monthIsCorrect) {
    dayIsCorrect = true;
    monthIsCorrect = true;
    yearIsCorrect = true;
    throw new Error("Invalid date");
  }

  return true;
}

function calculateAgeAndDisplay(day, month, year) {
  const today = new Date();

  let ageYears = today.getFullYear() - year;
  let ageMonths = today.getMonth() + 1 - month;
  let ageDays = today.getDate() - day;

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.querySelector("#year-calculations-display span").textContent =
    ageYears;
  document.querySelector("#month-calculations-display span").textContent =
    ageMonths;
  document.querySelector("#day-calculations-display span").textContent =
    ageDays;
}

function resetCalculationsWrapperToDefault() {
  document.querySelector("#year-calculations-display span").textContent = "--";
  document.querySelector("#month-calculations-display span").textContent = "--";
  document.querySelector("#day-calculations-display span").textContent = "--";
}

button.addEventListener("click", () => {
  resetCalculationsWrapperToDefault();

  checkAllInputsHaveSth();

  checkDateIsCorrect(dayInput.value, monthInput.value, yearInput.value);

  calculateAgeAndDisplay(dayInput.value, monthInput.value, yearInput.value);

  daysLived = 0;
  monthsLived = 0;
  yearsLived = 0;
});
