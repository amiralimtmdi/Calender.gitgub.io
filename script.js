"use strict";

// Selectors

// prettier-ignore
const sideBarItems =Array.from( document.querySelector(".sidebar__list").children);
// prettier-ignore
const monthLabels = Array.from(document.querySelector(".calender__monthes").children);
// prettier-ignore

const changeYearLabels = Array.from(document.querySelectorAll(".change-year-lable"));
const daysContainer = document.querySelector(".calender__Table--days");
const dateLabel = document.querySelector(".calender__Table--date");
const yearLabel = document.querySelector(".calender__current-Year");
const timeLabel = document.querySelector(".calender__Table--time");

const toDoInput = document.querySelector(".to-do-list__task--input");
const addTaskbtn = document.querySelector(".to-do-list__task--btn");
const taskList = document.querySelector(".to-do-list__list");

const weightInput = document.getElementById("weight");
const hightInput = document.getElementById("hight");
const sexInput = document.querySelectorAll(".check-box");
const btnICalcBmi = document.querySelector(".BMI__btn");

const bmiResult = document.querySelector(".BMI-app__result");
const weightLable = document.querySelector(".result-Weight");
const hightLable = document.querySelector(".result-hieght");
const bmilable = document.querySelector(".BMI-app__result--num-bmi");
const situationLable = document.querySelector(".BMI-app__result--condition");
const overlay = document.querySelector(".overlay");

// ====================== side Bar =========================

sideBarItems.forEach((item) => {
  item.addEventListener("click", function () {
    // set all the sections and btns to defulte
    sideBarItems.forEach((i) => {
      i.style.background = " #ff5454";
      document.querySelector(`.section--${i.dataset.section}`).style.display =
        "none";
    });
    this.style.background = "#a300008a";
    document.querySelector(`.section--${item.dataset.section}`).style.display =
      "flex";
  });
});

// ====================== Calender app =====================
// Current date
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();

// year lable to currernt
yearLabel.textContent = currentYear;
dateLabel.textContent = new Intl.DateTimeFormat("en-US", {
  month: "short",
  weekday: "short",
  day: "numeric",
}).format(currentDate);

// style of month lables
monthLabels[currentMonth].style.color = "#111";
monthLabels[currentMonth].style.fontWeight = "bolder";
monthLabels[currentMonth].style.transform = "scale(1.1)";

// set time
setInterval(() => {
  const currentDate = new Date();
  timeLabel.textContent = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(currentDate);
}, 1000);

// Dates Generator
const generateDates = function (year, month) {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeekOfMonth = new Date(year, month, 1).getDay();
  const lastDayWeekOfMonth = new Date(year, month, lastDayOfMonth).getDay();
  const lastDayOfLastMonth = new Date(year, month, 0).getDate();

  let liTags = "";

  // Generate disabled days of last month
  let loopLastDayOfLastMonth = lastDayOfLastMonth;
  for (let i = firstDayWeekOfMonth; i > 0; i--) {
    liTags += `<li class="disable-date">${loopLastDayOfLastMonth}</li>`;
    loopLastDayOfLastMonth--;
  }

  // Generate dates
  let day = 1;

  for (let i = lastDayOfMonth; i > 0; i--) {
    const now = new Date(year, month, day); // can change
    const formatedNow = new Intl.DateTimeFormat("en-US").format(now);
    const formatedCurrDate = new Intl.DateTimeFormat("en-US").format(
      currentDate
    );
    if (formatedNow === formatedCurrDate) {
      liTags += `<li class="selected-date">${day}</li>`;
    } else {
      liTags += `<li>${day}</li>`;
    }
    day++;
  }

  // Generate disabled days of next month
  let day2 = 1;
  for (let i = 6 - lastDayWeekOfMonth; i > 0; i--) {
    liTags += `<li class="disable-date">${day2}</li>`;
    day2++;
  }

  daysContainer.innerHTML = liTags;
};

// Generate dates for current month
generateDates(currentYear, currentMonth);

// change month
monthLabels.forEach((month) => {
  month.addEventListener("click", function () {
    monthLabels[currentMonth].style.fontWeight = "lighter";
    currentMonth = monthLabels.indexOf(month);
    monthLabels[currentMonth].style.fontWeight = "bolder";
    generateDates(currentYear, currentMonth);
  });
});

// change year
changeYearLabels.forEach((lable) => {
  lable.addEventListener("click", function () {
    lable.classList.contains("next") ? currentYear++ : currentYear--;
    console.log(currentYear);
    yearLabel.textContent = currentYear;
    generateDates(currentYear, currentMonth);
  });
});

// ======================= To-do list app =======================

// prettier-ignore
let listOfItems = Array.from(document.querySelectorAll(".to-do-list__list--item"));
let listOfTrashs = Array.from(document.querySelectorAll(".trash"));

// adding task
addTaskbtn.addEventListener("click", function (e) {
  e.preventDefault();

  const html = `
        <div class="to-do-list__list--item_right">
          <input type="checkbox" class="check-box" />
          <p>${toDoInput.value}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          width="27px"
          stroke="currentColor"
          class="w-6 h-6 trash"
        >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          class="trash2"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>`;

  const elemnt = document.createElement("div");
  elemnt.classList = "to-do-list__list--item";
  elemnt.innerHTML = html;

  taskList.prepend(elemnt);
  toDoInput.value = "";
  // prettier-ignore
  listOfItems = Array.from(document.querySelectorAll(".to-do-list__list--item"));
  listOfTrashs = Array.from(document.querySelectorAll(".trash"));
});

taskList.addEventListener("click", function (e) {
  const target = e.target;
  const listItem = target.closest(".to-do-list__list--item");
  console.log();

  // prettier-ignore
  if (
    listItem &&
    (target.classList.contains("trash") || target.classList.contains("trash2"))
  ) {
    listItem.remove();
  }

  if (target.classList.contains("check-box")) {
    const checkBox = target;
    const siblingElement = checkBox.nextElementSibling;

    checkBox.classList.toggle("active");
    siblingElement.classList.toggle("disable");
  }
});

// ======================= BMI app =======================

// const weightInput = document.querySelector("#weight");;
// const hightInput = document.querySelector("#high");
// const sexInput = document.querySelectorAll(".check-box");
// const btnICalcBmi = document.querySelector(".BMI__btn");

// const bmiResult = document.querySelector(".BMI-app__result");
// const weightLable = document.querySelector(".result-Weight");
// const hightLable = document.querySelector(".result-hight");
// const bmilable = document.querySelector(".BMI-app__result--num-bmi");
// const situationLable = document.querySelector(".BMI-app__result--condition");
// const overlay = document.querySelector(".overlay");
bmiResult.style.display = "none";

const displayResultBMI = function (bmi, situation, hwr1, hwr2) {
  weightLable.textContent = `W ${weightInput.value}kg`;
  hightLable.textContent = `H ${hightInput.value}cm`;
  bmilable.textContent = bmi;
  situationLable.textContent = situation;
  document.querySelector(".weight-range--1").textContent = hwr1;
  document.querySelector(".weight-range--2").textContent = hwr2;

  overlay.style.display = "block";
  bmiResult.style.display = "block";
};

overlay.addEventListener("click", function () {
  overlay.style.display = "none";
  bmiResult.style.display = "none";
});

let situation;
btnICalcBmi.addEventListener("click", function (e) {
  e.preventDefault();

  // calculate BMI
  const bmi = Number(
    ((weightInput.value / hightInput.value ** 2) * 10000).toFixed(1)
  );

  // calculate situation
  switch (true) {
    case bmi < 16.5:
      situation = "Severe Underweight";
      break;
    case bmi >= 16.5 && bmi < 18.5:
      situation = "Underweight";
      break;
    case bmi >= 18.5 && bmi < 25:
      situation = "Normal";
      break;
    case bmi >= 25 && bmi < 30:
      situation = "Overweight";
      break;
    case bmi >= 30 && bmi < 35:
      situation = "Severe Overweight";
      break;
    default:
      situation = "unknown";
  }

  const hwr1 = (0.00185 * hightInput.value ** 2).toFixed(1);
  const hwr2 = (0.0025 * hightInput.value ** 2).toFixed(1);
  displayResultBMI(bmi, situation, hwr1, hwr2);
});
