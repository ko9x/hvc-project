const resultSection = document.getElementById("resultSection");
const resultSubSection = document.getElementById("resultSubSection");
const searchItem = document.getElementById("searchItem");
const executeSearch = document.getElementById("executeSearch");
const clearSearch = document.getElementById("clearSearch");
const invalidSerial = document.getElementById("invalidSerial");
const systemDetails = document.getElementById("systemDetails");
const partNumber = document.getElementById("partNumber");
const errorMessage = "<h6>Please enter a valid Elite System Serial Number<h6>";
let resultsIsHidden = false;

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
    executeSearch.style.backgroundColor = 'rgb(100, 0, 160)';
    executeSearch.style.color = 'white';
    setTimeout(() => {
        executeSearch.style.color = 'black';
        executeSearch.style.backgroundColor = 'transparent'
    }, 100)
});

clearSearch.addEventListener("click", () => {
  searchItem.value = "";
  clearResults();
});

function presentErrorMessage(uniqueMessage) {
  invalidSerial.innerHTML = `<h5>Entered Serial Number ${uniqueMessage}</h5>${errorMessage}`;
  systemDetails.innerHTML = "";
  partNumber.innerHTML = "";
}

function clearResults() {
  hideResultsSection();
  systemDetails.innerText = "";
  partNumber.innerText = "";
  invalidSerial.innerText = "";
}

function showResultsSection() {
  resultSection.classList.remove('resultSectionHide');
}

function hideResultsSection() {
    resultSection.classList.add('resultSectionHide');
}

function displayResults(configurationDescription, partDescription) {
  showResultsSection();
  systemDetails.innerText = configurationDescription;
  partNumber.innerText = partDescription;
  return;
}

// Standard C Configuration Logic
function standardCLogic(standardSerial, configChars, sequenceNum) {
  if (standardSerial.charAt(4) !== "T") {
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
    presentErrorMessage("is not 11 characters");
    return;
  }
  let capitalizedSearchItem = searchItem.value.toUpperCase();
  let configChars = capitalizedSearchItem.slice(0, 6);
  let sequenceNum = capitalizedSearchItem.slice(-5);
  if (capitalizedSearchItem.charAt(0) !== "F") {
      presentErrorMessage("does not start with character 'F'");
      return;
  }
  if (capitalizedSearchItem.charAt(1) === "9" || "2") {
    standardCLogic(capitalizedSearchItem, configChars, sequenceNum);
  }
  if (capitalizedSearchItem.charAt(1) === "S") {
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
}
