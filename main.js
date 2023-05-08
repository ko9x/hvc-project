import { items, configs } from "./dummyDatabase.js";

const container = document.getElementById("container");
const titleText = document.getElementById("titleText");
const titleSection = document.getElementById("titleSection");
const subTitleText = document.getElementById("subTitleText");
const searchSection = document.getElementById("searchSection");
const searchItem = document.getElementById("searchItem");
const executeSearch = document.getElementById("executeSearch");
const resultSectionContainer = document.getElementById(
  "resultSectionContainer"
);
const resultSection = document.getElementById("resultSection");
const topResultLabel = document.getElementById("topResultLabel");
const topResultContent = document.getElementById("topResultContent");
const bottomResultLabel = document.getElementById("bottomResultLabel");
const bottomResultContent = document.getElementById("bottomResultContent");

// Constants for height and width
const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// Create a variable to differentiate between large and small screens
const isSmall = width < 750;

// This section runs every time the app loads
hideResultsSection();
handleLayout();

// Add and remove the resultSectionContainer class to hide a weird flash when the page loads
resultSectionContainer.classList.remove("resultSectionContainer");

// Event Listeners
searchItem.addEventListener("focus", () => {
  clearResults();
});

searchItem.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    validateSerialNumber();
  } else {
    clearResults();
  }
});

executeSearch.addEventListener("click", () => {
  validateSerialNumber();
  flashSearchButton();
});

// Handle layout based on the screen size
function handleLayout() {
  const titleTextDescription = "Elite System Information Database";
  const subTitleTextDescription =
    "Find configuration information and part numbers using the System Serial Number";
  if (!isSmall) {
    container.classList.add("largeContainer");
    titleSection.classList.add("largeTitleSection");
    searchSection.classList.add("largeSearchSection");
    resultSection.classList.add("largeResultSection");
    titleText.innerHTML = `<h1>${titleTextDescription}</h1>`;
    subTitleText.innerHTML = `<h3>${subTitleTextDescription}</h3>`;
  }
  if (isSmall) {
    container.classList.add("smallContainer");
    executeSearch.classList.add("smallButton");
    titleText.innerHTML = `<h3>${titleTextDescription}</h3>`;
    subTitleText.innerHTML = `<p>${subTitleTextDescription}</p>`;
  }
}

// Make the search button change color for 100ms when the user clicks it
function flashSearchButton() {
  executeSearch.style.backgroundColor = "rgb(100, 0, 160)";
  executeSearch.style.color = "white";
  setTimeout(() => {
    executeSearch.style.color = "black";
    executeSearch.style.backgroundColor = "white";
  }, 100);
}

function clearResults() {
  hideResultsSection();
  topResultLabel.innerText = "";
  topResultContent.innerText = "";
  bottomResultLabel.innerText = "";
  bottomResultContent.innerText = "";
}

function showResultsSection() {
  resultSection.classList.remove("resultSectionHide");
}

function hideResultsSection() {
  resultSection.classList.add("resultSectionHide");
}

function displayResults(id, name, itemInfo, userInterface) {
  const configuration = configs.find((config) => config.id === id);
  topResultLabel.innerText = "System Configuration Details:";
  bottomResultLabel.innerText = name;
  topResultContent.innerText = `${configuration.description} ${userInterface}`;
  bottomResultContent.innerText = itemInfo;
  showResultsSection();
  return;
}

function validateSerialNumber() {
  let regex = /F[ABS29][HMX][HX][TX][EX]\d\d\d\d\d/i;
  let capitalizedSearchItem = searchItem.value.toUpperCase();
  if (capitalizedSearchItem.match(regex)) {
    findConfiguration(capitalizedSearchItem);
  } else {
    displayResults("The Serial Number entered is not valid");
  }
}

function findBreakPoint(serialNum, breakPointArr, sequenceNum, id, name) {
  if (serialNum.charAt(4) === "T") {
    const infoBreakPoint = breakPointArr.find((breakPoint) => {
      let startSequenceNum = breakPoint.startsAt.slice(-5);
      let endSequenceNum = breakPoint.endsAt.slice(-5);
      if (breakPoint.startsAt.charAt(4) === "X") {
        if (
          breakPoint.endsAt.charAt(4) === "T" &&
          endSequenceNum >= sequenceNum
        ) {
          return breakPoint;
        }
      }
      if (breakPoint.startsAt.charAt(4) === "T") {
        if (startSequenceNum <= sequenceNum && endSequenceNum >= sequenceNum) {
          return breakPoint;
        }
      }
    });
    displayResults(id, name, infoBreakPoint.display, "with Tablet");
  }
  if (serialNum.charAt(4) === "X") {
    const infoBreakPoint = breakPointArr.find((breakPoint) => {
      let startSequenceNum = breakPoint.startsAt.slice(-5);
      let endSequenceNum = breakPoint.endsAt.slice(-5);
      if (
        breakPoint.startsAt.charAt(4) === "X" &&
        startSequenceNum <= sequenceNum
      ) {
        if (
          (breakPoint.endsAt.charAt(4) === "X" &&
            endSequenceNum >= sequenceNum) ||
          breakPoint.endsAt.charAt(4) === "T"
        ) {
          return breakPoint;
        }
      }
    });
    displayResults(
      id,
      name,
      infoBreakPoint.display,
      "with Control Panel (non-tablet)"
    );
  }
}

// General Configuration Identification Logic
function findConfiguration(capitalizedSearchItem) {
  let configChars = capitalizedSearchItem.slice(0, 4);
  let sequenceNum = capitalizedSearchItem.slice(-5);
  configs.find((config) => {
    if (config.code === configChars) {
      items.forEach((item) => {
        item.configs.find((itemConfig) => {
          if (config.id === itemConfig.id) {
            findBreakPoint(
              capitalizedSearchItem,
              itemConfig.breakPoints,
              sequenceNum,
              config.id,
              item.name
            );
          }
        });
      });
    }
  });
}
