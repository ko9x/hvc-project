const resultSection = document.getElementById("resultSection");
const resultSubSection = document.getElementById("resultSubSection");
const searchItem = document.getElementById("searchItem");
const executeSearch = document.getElementById("executeSearch");
const clearSearch = document.getElementById("clearSearch");
const topResultLabel = document.getElementById("topResultLabel");
const topResultContent = document.getElementById("topResultContent");
const bottomResultLabel = document.getElementById("bottomResultLabel");
const bottomResultContent = document.getElementById("bottomResultContent");

// This section runs every time the app loads
hideResultsSection();

// Event Listeners
searchItem.addEventListener("focus", () => {
  clearResults();
});

searchItem.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    findConfiguration();
  } else {
    clearResults();
  }
});

executeSearch.addEventListener("click", () => {
    findConfiguration();
    // Make the search button change color for 100ms when the user clicks it
    executeSearch.style.backgroundColor = 'rgb(100, 0, 160)';
    executeSearch.style.color = 'white';
    setTimeout(() => {
        executeSearch.style.color = 'black';
        executeSearch.style.backgroundColor = 'transparent'
    }, 100)
});

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

// Configuration Check Array Section
const standardConfigs = ['F9XXXX', 'F9XXTX', 'F2XXXX', 'F2XXTX'];
const superC9Configs = ['FSXXXX', 'FSXXTX'];
const superCFPDConfigs = ['FAHXXX', 'FAHXTX', 'FBHXXX', 'FBHXTX'];
const ergoConfigs = ['FAXXXE', 'FAXXTE', 'FBXXXE', 'FBXXTE'];
const motorizedConfigs = ['FAMHXX', 'FAMHTX', 'FBMHXX', 'FBMHTX'];

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
  if (configChars.charAt(4) !== "T") {
    if (configChars === "F9XXXX") {
      if (sequenceNum < "00035") {
        displayResults(
          'Standard C 9" Image Intensifier with Control Panel (non-tablet)',
          "5443126"
        );
      } else {
        displayResults(
          'Standard C 9" Image Intensifier with Control Panel (non-tablet)',
          "5792202 (if unavailable order 5877920)"
        );
      }
    }
    if (configChars === "F2XXXX") {
      if (sequenceNum < "00032") {
        displayResults(
          'Standard C 12" Image Intensifier with Control Panel (non-tablet)',
          "5443126"
        );
      } else {
        displayResults(
          'Standard C 12" Image Intensifier with Control Panel (non-tablet)',
          "5792202 (if unavailable order 5877920)"
        );
      }
    }
  } else {
    if (configChars === "F9XXTX") {
      if (sequenceNum < "00134") {
        displayResults(
          'Standard C 9" Image Intensifier with Tablet',
          "5792202 (if unavailable order 5877920)"
        );
      } else {
        displayResults(
          'Standard C 9" Image Intensifier with Tablet',
          "5877920"
        );
      }
    }
    if (configChars === "F2XXTX") {
      if (sequenceNum < "00299") {
        displayResults(
          'Standard C 12" Image Intensifier with Tablet',
          "5792202 (if unavailable order 5877920)"
        );
      } else {
        displayResults(
          'Standard C 12" Image Intensifier with Tablet',
          "5877920"
        );
      }
    }
  }
}

// General Configuration Identification Logic
function findConfiguration() {
  if (searchItem.value.length !== 11) {
    displayResults("The Serial Number entered is not 11 characters");
    return;
  }
  let capitalizedSearchItem = searchItem.value.toUpperCase();
  let configChars = capitalizedSearchItem.slice(0, 6);
  let sequenceNum = capitalizedSearchItem.slice(-5);
  if (capitalizedSearchItem.charAt(0) !== "F") {
      displayResults("The Serial Number entered does not start with character 'F'");
      return;
  }
  if (standardConfigs.includes(configChars)) {
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
  displayResults('The Serial Number entered does not match any Elite configurations');
}
