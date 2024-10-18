let idx = localStorage.getItem("last-idx") || 0;
let i = 0;
let theme = localStorage.getItem("last-theme") || "dark";

const containersWrapper = document.querySelector("#containers-wrapper");
const content = JSON.parse(localStorage.getItem("content")) || [];

const todoInput = document.querySelector("#todo-input");

const allFilterBtn = document.querySelector("#all-filter-btn");
const activeFilterBtn = document.querySelector("#active-filter-btn");
const completedFilterBtn = document.querySelector("#completed-filter-btn");
const clearButton = document.querySelector("#clear-button");

const itemsLeft = document.querySelector("#items-left");

if (JSON.parse(localStorage.getItem("filter-btns")) !== null) {
  allFilterBtn.dataset.activated = JSON.parse(
    localStorage.getItem("filter-btns")
  ).filterBtns.all;
  activeFilterBtn.dataset.activated = JSON.parse(
    localStorage.getItem("filter-btns")
  ).filterBtns.active;
  completedFilterBtn.dataset.activated = JSON.parse(
    localStorage.getItem("filter-btns")
  ).filterBtns.completed;
}

const navBtns = document.querySelectorAll(".btn");

function setDataToContainers() {
  const container = document.querySelectorAll(".container");
  container.forEach(el => {
    const fakeBtn = document.querySelector(
      `.fake-button[data-id="${el.dataset.id}"]`
    );
    const fakeBtnBorder = document.querySelector(
      `.fake-button-border[data-id="${el.dataset.id}"]`
    );
    const checkIcon = document.querySelector(
      `.check-icon[data-id="${el.dataset.id}"]`
    );
    const crossIcon = document.querySelector(
      `.cross-icon[data-id="${el.dataset.id}"]`
    );
    const textHolder = document.querySelector(
      `.text-holder[data-id="${el.dataset.id}"]`
    );
    
    for (let index = 0; index < content.length; index++) {
      if (content[index].index === parseInt(el.dataset.id)) {
        if (content[index].clicked === "true") {
          fakeBtn.dataset.clicked = "true";
          fakeBtnBorder.dataset.clicked = "true";
          textHolder.dataset.crossed = "true";
          checkIcon.dataset.hidden = "false";
        }
      }
    }

  })
  
}

// TODO: elementy się nie podliczają po użyciu "clear all"

function setContentFromContainersTable() {
  containersWrapper.innerHTML = "";
  content.forEach((el) => {
    if (allFilterBtn.dataset.activated === "true") {
      i++;
      containersWrapper.innerHTML += el.content;
    } else if (activeFilterBtn.dataset.activated === "true") {
      if (el.clicked === "false") {
        i++;
        containersWrapper.innerHTML += el.content;
      }
    } else if (completedFilterBtn.dataset.activated === "true") {
      if (el.clicked === "true") {
        i++;
        containersWrapper.innerHTML += el.content;
      }
    }
  });
  whenContainerBtnClicked();
  setDataToContainers();
  
  itemsLeft.textContent = `${i} items`;
  i = 0;
}

function insertElementsFromLocalStorage() {
  if (
    localStorage.getItem("content") !== null &&
    localStorage.getItem("input-content") !== null
  ) {
    todoInput.value = localStorage.getItem("input-content");
    setContentFromContainersTable();
  }
  localStorage.clear();
}

function instertDataClickedIntoTable(el, boolian) {
  for (let index = 0; index < content.length; index++) {
    if (content[index].index === parseInt(el.dataset.id)) {
      content[index].clicked = `${boolian}`;
    }
  }
}

function whenContainerBtnClicked() {
  const container = document.querySelectorAll(".container");
  container.forEach((el) => {
    const fakeBtn = document.querySelector(
      `.fake-button[data-id="${el.dataset.id}"]`
    );
    const fakeBtnBorder = document.querySelector(
      `.fake-button-border[data-id="${el.dataset.id}"]`
    );
    const checkIcon = document.querySelector(
      `.check-icon[data-id="${el.dataset.id}"]`
    );
    const crossIcon = document.querySelector(
      `.cross-icon[data-id="${el.dataset.id}"]`
    );
    const textHolder = document.querySelector(
      `.text-holder[data-id="${el.dataset.id}"]`
    );

    setDataToContainers();

    // console.log(el);

    fakeBtn.addEventListener("click", () => {
      if (fakeBtn.dataset.clicked === "true") {
        // unclick button if is clicked
        fakeBtn.dataset.clicked = "false";
        fakeBtnBorder.dataset.clicked = "false";
        textHolder.dataset.crossed = "false";
        checkIcon.dataset.hidden = "true";
        instertDataClickedIntoTable(el, false);
      } else if (fakeBtn.dataset.clicked === "false") {
        // click button if is unclicked
        fakeBtn.dataset.clicked = "true";
        fakeBtnBorder.dataset.clicked = "true";
        textHolder.dataset.crossed = "true";
        checkIcon.dataset.hidden = "false";
        instertDataClickedIntoTable(el, true);
      }
    });

    el.addEventListener(
      "mouseover",
      () => (crossIcon.dataset.hidden = "false")
    );
    el.addEventListener("mouseout", () => (crossIcon.dataset.hidden = "true"));

    crossIcon.addEventListener("click", () => {
      for (let index = 0; index < content.length; index++) {
        if (content[index].index === parseInt(el.dataset.id)) {
          content.splice(index, 1);
          setContentFromContainersTable();
          whenContainerBtnClicked();
        }
      }
    });
  });
}

function todoInputConfirmed() {
  const todoInput = document.querySelector("#todo-input");

  if (todoInput.value.length !== 0) {
    idx++;
    const containerTemplate = `
        <div data-id="${idx}" class="container">
            <div class="checkbox-wrapper">
                <div data-clicked="false" data-theme="${theme}" data-id="${idx}" class="fake-button-border">
                    <div data-id="${idx}" class="fake-button" data-theme="${theme}" data-clicked="false">
                    <svg data-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path data-id="${idx}" class="check-icon" data-hidden="true" fill="none" stroke="#fff" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                    </div>
                </div>
            </div>
            <div class="container-text-content"><div class="text-holder" data-theme="${theme}" data-id="${idx}" data-crossed="false">${todoInput.value}</div> <div class="cross-icon-wrapper"><svg class="cross-icon" data-id="${idx}" data-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></div></div>
        </div>
        <hr>`;

    content.push({ index: idx, content: containerTemplate, clicked: "false" });

    containersWrapper.innerHTML += containerTemplate;
    whenContainerBtnClicked();
  }
}

function whenInputBtnIsInInteract() {
  const fakeBtnInput = document.querySelector("#fake-button-input");
  const inputBtnCheckIcon = document.querySelector("#input-btn-check-icon");

  // when cursor hover it
  fakeBtnInput.addEventListener(
    "mouseover",
    () => (inputBtnCheckIcon.dataset.hidden = "false")
  );
  // when cursor is out
  fakeBtnInput.addEventListener(
    "mouseout",
    () => (inputBtnCheckIcon.dataset.hidden = "true")
  );

  // when input was confirmed
  fakeBtnInput.addEventListener("click", () => todoInputConfirmed());
  todoInput.addEventListener("keydown", () => {
    if (event.key === "Enter") {
      todoInputConfirmed();
    }
  });
}

function navBtnsMenagment() {
  navBtns.forEach((el) => {
    el.addEventListener("click", () => {
      if (el.dataset.activated !== undefined) {
        if (el.dataset.activated === "true") {
          el.dataset.activated = "false";
          allFilterBtn.dataset.activated = "true";
        } else if (el.dataset.activated === "false") {
          navBtns.forEach((element) => {
            if (element.dataset.activated !== undefined) {
              element.dataset.activated = "false";
            }
          });
          el.dataset.activated = "true";
        }
        setContentFromContainersTable();
      }
    });
  });
}

clearButton.addEventListener("click", () => {
  content.splice(0, content.length);
  console.log(content);
  setContentFromContainersTable();
});

insertElementsFromLocalStorage();
whenContainerBtnClicked();
whenInputBtnIsInInteract();
navBtnsMenagment();

// window.addEventListener("beforeunload", () => {
//   localStorage.setItem("input-content", `${todoInput.value}`);
//   localStorage.setItem("last-idx", `${idx}`);
//   localStorage.setItem("content", `${JSON.stringify(content)}`);
//   localStorage.setItem("last-theme", `${theme}`);
//   localStorage.setItem(
//     "filter-btns",
//     `${JSON.stringify({
//       filterBtns: {
//         all: allFilterBtn.dataset.activated,
//         active: activeFilterBtn.dataset.activated,
//         completed: completedFilterBtn.dataset.activated,
//       },
//     })}`
//   );
// });