import {itemInfo as HVCInfo, configs} from './dummyDatabase.js'

const container = document.getElementById("container");
const titleText = document.getElementById("titleText");
const titleSection = document.getElementById("titleSection");
const subTitleText = document.getElementById("subTitleText");
const searchSection = document.getElementById("searchSection");
const searchItem = document.getElementById("searchItem");
const executeSearch = document.getElementById("executeSearch");
const resultSectionContainer = document.getElementById("resultSectionContainer");
const resultSection = document.getElementById("resultSection");
const topResultLabel = document.getElementById("topResultLabel");
const topResultContent = document.getElementById("topResultContent");
const bottomResultLabel = document.getElementById("bottomResultLabel");
const bottomResultContent = document.getElementById("bottomResultContent");
// Constants for height and width
const width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
const height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

// Configuration arrays
const standardCConfigs = ['F9XXXX', 'F9XXTX', 'F2XXXX', 'F2XXTX'];
const superC9Configs = ['FSXXXX', 'FSXXTX'];
const superCFPDConfigs = ['FAHXXX', 'FAHXTX', 'FBHXXX', 'FBHXTX'];
const ergoCConfigs = ['FAXXXE', 'FAXXTE', 'FBXXXE', 'FBXXTE'];
const motorizedConfigs = ['FAMHXX', 'FAMHTX', 'FBMHXX', 'FBMHTX'];
// Create a variable to differentiate between large and small screens
const isSmall = width < 750;

// This section runs every time the app loads
hideResultsSection();
handleLayout();

// console.log('HVC Info', HVCInfo); //@DEBUG
// console.log('configs all', configs); //@DEBUG
// console.log('configs', configs.find(config => config.code === 'F2XX')); //@DEBUG

// Add and remove the resultSectionContainer class to hide a weird flash when the page loads
resultSectionContainer.classList.remove('resultSectionContainer');

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
  const titleTextDescription = 'Elite High Voltage Cable Finder'
  const subTitleTextDescription = 'Identify the correct High Voltage Cable part number using the System Serial Number'
  if(!isSmall) {
    container.classList.add('largeContainer');
    titleSection.classList.add('largeTitleSection');
    searchSection.classList.add('largeSearchSection');
    resultSection.classList.add('largeResultSection');
    titleText.innerHTML = `<h1>${titleTextDescription}</h1>`;
    subTitleText.innerHTML = `<h3>${subTitleTextDescription}</h3>`

  }
  if(isSmall) {
    container.classList.add('smallContainer');
    executeSearch.classList.add('smallButton');
    titleText.innerHTML = `<h3>${titleTextDescription}</h3>`;
    subTitleText.innerHTML = `<p>${subTitleTextDescription}</p>`
  }
}

// Make the search button change color for 100ms when the user clicks it
function flashSearchButton() {
  executeSearch.style.backgroundColor = 'rgb(100, 0, 160)';
    executeSearch.style.color = 'white';
    setTimeout(() => {
        executeSearch.style.color = 'black';
        executeSearch.style.backgroundColor = 'white'
    }, 100)
}

function clearResults() {
  hideResultsSection();
  topResultLabel.innerText = "";
  topResultContent.innerText = "";
  bottomResultLabel.innerText = "";
  bottomResultContent.innerText = "";
}

function showResultsSection() {
  resultSection.classList.remove('resultSectionHide');
}

function hideResultsSection() {
    resultSection.classList.add('resultSectionHide');
}

function displayResults(topDescription, bottomDescription) {
  if(bottomDescription) {
    topResultLabel.innerText = "System Configuration Details:";
    bottomResultLabel.innerText = "High Voltage Cable Part#:";
    topResultContent.innerText = topDescription;
    bottomResultContent.innerText = bottomDescription;
  } else {
    topResultLabel.innerText = "Invalid Serial Number";
    bottomResultLabel.innerText = "";
    topResultContent.innerText = topDescription;
    bottomResultContent.innerText = 'Please enter a valid Elite Serial Number';
  }
  showResultsSection();
  return;
}

// Motorized C Configuration Logic
function motorizedLogic(configChars, sequenceNum) {
  const cable1 = '5428385';
  const cable2 = '5786472';
  const configDescription1 = 'Motorized C 21cm Flat Panel Display';
  const configDescription2 = 'Motorized C 31cm Flat Panel Display';
  const interfaceDescription1 = ' with Control Panel (non-tablet)';
  const interfaceDescription2 = ' with Tablet';
  if(configChars.charAt(4) !== "T") {
    if (configChars === 'FAMHXX') {
      if (sequenceNum < '00010') {
        displayResults(
          `${configDescription1} ${interfaceDescription1}`,
          cable1
        );
      } else {
        displayResults(
          `${configDescription1} ${interfaceDescription1}`,
          cable2
        );
      }
    } else {
      if (sequenceNum < '00021') {
        displayResults(
          `${configDescription2} ${interfaceDescription1}`,
          cable1
        );
      } else {
        displayResults(
          `${configDescription2} ${interfaceDescription1}`,
          cable2
        );
      }
    }
  } else {
    if (configChars === 'FAMHTX') {
      displayResults(
        `${configDescription1} ${interfaceDescription2}`,
        cable2
      );
    } else {
      displayResults(
        `${configDescription2} ${interfaceDescription2}`,
        cable2
      );
    }
  }
}

// Ergo C Configuration Logic
function ergoCLogic(configChars, sequenceNum) {
  const cable1 = '5759488 (if unavailable, order 5792201)';
  const cable2 = '5792201';
  const configDescription1 = 'Ergo C 21cm Flat Panel Display';
  const configDescription2 = 'Ergo C 31cm Flat Panel Display';
  const interfaceDescription1 = ' with Control Panel (non-tablet)';
  const interfaceDescription2 = ' with Tablet';
  if (configChars.charAt(4) !== "T") {
    if (configChars === 'FAXXXE') {
      displayResults(
        `${configDescription1} ${interfaceDescription1}`,
        cable1
      );
    } else {
      displayResults(
        `${configDescription2} ${interfaceDescription1}`,
        cable1
      );
    }
  } else {
    if (configChars === 'FAXXTE') {
      displayResults(
        `${configDescription1} ${interfaceDescription2}`,
        cable2
      );
    } else {
      displayResults(
        `${configDescription2} ${interfaceDescription2}`,
        cable2
      );
    }
  }
}

// Super C FPD Configuration Logic
function superCFPDLogic(configChars, sequenceNum) {
  const cable1 = '5458880';
  const cable2 = '5790094';
  const configDescription1 = 'Super C 21cm Flat Panel Display';
  const configDescription2 = 'Super C 31cm Flat Panel Display';
  const interfaceDescription1 = ' with Control Panel (non-tablet)';
  const interfaceDescription2 = ' with Tablet';
  if (configChars.charAt(4) !== "T") {
    if (configChars === 'FAHXXX') {
      if (sequenceNum < '00107') {
        displayResults(
          `${configDescription1} ${interfaceDescription1}`,
          cable1
        );
      } else {
        displayResults(
          `${configDescription1} ${interfaceDescription1}`,
          cable2
        );
      }
    }
    if (configChars === 'FBHXXX') {
      if (sequenceNum < '00196') {
        displayResults(
          `${configDescription2} ${interfaceDescription1}`,
          cable1
        );
      } else {
        displayResults(
          `${configDescription2} ${interfaceDescription1}`,
          cable2
        );
      }
    }
  } else {
    if (configChars === 'FAHXTX') {
      displayResults(
        `${configDescription1} ${interfaceDescription2}`,
        cable2
      );
    } else {
      displayResults(
        `${configDescription2} ${interfaceDescription2}`,
        cable2
      );
    }
  }
}

// Super C 9" Configuration Logic
function superC9Logic(configChars) {
  if (configChars === "FSXXXX") {
    displayResults(
      'Super C 9" Image Intensifier with Control Panel (non-tablet)',
      "5877921"
    );
  }
  if (configChars === "FSXXTX") {
    displayResults('Super C 9" Image Intensifier with Tablet', "5877921");
  }
}

// Standard C Configuration Logic
function standardCLogic(configChars, sequenceNum) {
  const cable1 = '5443126';
  const cable2 = '5792202 (if unavailable, order 5877920)';
  const cable3 = '5877920';
  const configDescription1 = 'Standard C 9" Image Intensifier';
  const configDescription2 = 'Standard C 12" Image Intensifier';
  const interfaceDescription1 = ' with Control Panel (non-tablet)';
  const interfaceDescription2 = ' with Tablet';
  if (configChars.charAt(4) !== "T") {
    if (configChars === "F9XXXX") {
      if (sequenceNum < "00035") {
        displayResults(
          `${configDescription1} ${interfaceDescription1}`,
          cable1
        );
      } else {
        displayResults(
          `${configDescription1} ${interfaceDescription1}`,
          cable2
        );
      }
    }
    if (configChars === "F2XXXX") {
      if (sequenceNum < "00032") {
        displayResults(
          `${configDescription2} ${interfaceDescription1}`,
          cable1
        );
      } else {
        displayResults(
          `${configDescription2} ${interfaceDescription1}`,
          cable2
        );
      }
    }
  } else {
    if (configChars === "F9XXTX") {
      if (sequenceNum < "00134") {
        displayResults(
          `${configDescription1} ${interfaceDescription2}`,
          cable2
        );
      } else {
        displayResults(
          `${configDescription1} ${interfaceDescription2}`,
          cable3
        );
      }
    }
    if (configChars === "F2XXTX") {
      if (sequenceNum < "00299") {
        displayResults(
          `${configDescription2} ${interfaceDescription2}`,
          cable2
        );
      } else {
        displayResults(
          `${configDescription2} ${interfaceDescription2}`,
          cable3
        );
      }
    }
  }
}

function validateSerialNumber() {
  let regex = /F[ABS29][HMX][HX][TX][EX]\d\d\d\d\d/i;
  let capitalizedSearchItem = searchItem.value.toUpperCase();
  if(capitalizedSearchItem.match(regex)) {
    findConfiguration(capitalizedSearchItem);
  } else {
    displayResults("The Serial Number entered is not valid");
  }
}

function findBreakPoint(serialNum, breakPointArr, sequenceNum) {
  if(serialNum.charAt(4) === 'T') {
    const infoBreakPoint = breakPointArr.find((breakPoint) => {
      let startSequenceNum = breakPoint.startsAt.slice(-5);
      let endSequenceNum = breakPoint.endsAt.slice(-5);
      if(breakPoint.startsAt.charAt(4) === 'X') {
        if(breakPoint.endsAt.charAt(4) === 'T' && endSequenceNum >= sequenceNum) {
          return breakPoint;
        }
      }
      if(breakPoint.startsAt.charAt(4) === 'T') {
        if(startSequenceNum <= sequenceNum && endSequenceNum >= sequenceNum) {
          return breakPoint;
        }
      }
    })
    console.log('tablet', infoBreakPoint); //@DEBUG
  }
  if(serialNum.charAt(4) === 'X') {
    const infoBreakPoint = breakPointArr.find((breakPoint) => {
      let startSequenceNum = breakPoint.startsAt.slice(-5);
      let endSequenceNum = breakPoint.endsAt.slice(-5);
      if(breakPoint.startsAt.charAt(4) === 'X' && startSequenceNum <= sequenceNum) {
        if ((breakPoint.endsAt.charAt(4) === 'X' && endSequenceNum > sequenceNum) || breakPoint.endsAt.charAt(4) === 'T') {
          return breakPoint;
        }
      }
    })
    console.log('non tablet', infoBreakPoint); //@DEBUG
  }
}

// General Configuration Identification Logic
function findConfiguration(capitalizedSearchItem) {
  let configChars = capitalizedSearchItem.slice(0, 4);
  let sequenceNum = capitalizedSearchItem.slice(-5);
  configs.find((config) => {
    if(config.code === configChars) {
      console.log('Match', config)
      HVCInfo.forEach((item) => {
        item.configs.find((itemConfig) => {
          if(config.id === itemConfig.id) {
            findBreakPoint(capitalizedSearchItem, itemConfig.breakPoints, sequenceNum);
          }
        })
      })
    }
  })
  if (standardCConfigs.includes(configChars)) {
    standardCLogic(configChars, sequenceNum);
    return;
  }
  if (superC9Configs.includes(configChars)) {
    superC9Logic(configChars);
    return;
  }
  if (superCFPDConfigs.includes(configChars)) {
    superCFPDLogic(configChars, sequenceNum);
    return;
  }
  if (ergoCConfigs.includes(configChars)) {
    ergoCLogic(configChars, sequenceNum);
    return;
  }
  if (motorizedConfigs.includes(configChars)) {
    motorizedLogic(configChars, sequenceNum);
    return;
  }
  displayResults('The Serial Number entered does not match any Elite configurations');
}
