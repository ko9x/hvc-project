import { items, configs } from "./dummyDatabase.js";
import { getItems } from "./APIService.js";

const container = document.getElementById("container");
const titleText = document.getElementById("titleText");
const titleSection = document.getElementById("titleSection");
const subTitleText = document.getElementById("subTitleText");
const disclaimerText = document.getElementById("disclaimerText");
const searchSection = document.getElementById("searchSection");
const searchItem = document.getElementById("searchItem");
const itemForm = document.getElementById("itemForm");
const addRanges = document.querySelectorAll(".rangeButton");
const addExceptions = document.querySelectorAll(".exceptionButton");
const executeSearch = document.getElementById("executeSearch");
const resultSectionContainer = document.getElementById("resultSectionContainer");
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

// Handle layout based on the screen size
function handleLayout() {
  const titleTextDescription = "Elite System Information";
  const subTitleTextDescription =
    "Find configuration information using the System Serial Number";
  const disclaimerTextDescription = "System information is for reference only. Configuration changes and upgrades made since the date of manufacture are not tracked by this database"
  if (!isSmall) {
    container.classList.add("largeContainer");
    titleSection.classList.add("largeTitleSection");
    searchSection.classList.add("largeSearchSection");
    resultSection.classList.add("largeResultSection");
    titleText.innerHTML = `<h1>${titleTextDescription}</h1>`;
    subTitleText.innerHTML = `<h3>${subTitleTextDescription}</h3>`;
    disclaimerText.innerHTML = `<p>${disclaimerTextDescription}</p>`;
  }
  if (isSmall) {
    container.classList.add("smallContainer");
    executeSearch.classList.add("smallButton");
    titleText.innerHTML = `<h3>${titleTextDescription}</h3>`;
    subTitleText.innerHTML = `<p>${subTitleTextDescription}</p>`;
    disclaimerText.innerHTML = `<p>${disclaimerTextDescription}</p>`;
  }
}

// Add and remove the resultSectionContainer class to hide a weird flash when the page loads
resultSectionContainer.classList.remove("resultSectionContainer");

//  Event Listeners *******************************************************
//NOTE: There is no listener for when the user clicks the little "x" in the search field. Javascript clears that field on its own

// Hide the results section when the user clicks inside the search field
searchItem.addEventListener("focus", () => {
  clearResults();
});

// Check to see if the user hit the "enter" key to activate the search
searchItem.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    validateSerialNumber();
  } else {
    // If they hit a key other than "enter", just keep hiding the result section
    clearResults();
  }
});

// Check to see if the user clicked the "Search" button
executeSearch.addEventListener("click", () => {
  validateSerialNumber();
  flashSearchButton();
  // This is here for testing the APIService
  // getItems();
});

// Loop through all the addRange buttons and assign the click listener that will run the addRangeField function
for(var i = 0; i < addRanges.length; i++) {
  addRanges[i].addEventListener("click", (e) => {
    addRangeField(e.target.id);
  });
};

// Loop through all the addException buttons and assign the click listener that will run the addExceptionField function
for(var i = 0; i < addExceptions.length; i++) {
  addExceptions[i].addEventListener("click", (e) => {
    addExceptionField(e.target.id);
  });
};

// Check to see if the user click the "Submit" button
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let ranges = [];

  for (var config of configs) {
    let myRanges = document.getElementsByName(config.code);

    for (var range of myRanges) {
      var myInputs = range.getElementsByTagName('input');
      var myTextarea = range.getElementsByTagName('textarea')[0].value;
      console.log('myTextArea', myTextarea); //@DEBUG

      let myObj = {
        name: config.code,
        starts_at: myInputs[0].value,
        ends_at: myInputs[1].value,
        display: myTextarea
      };
      ranges.push(myObj);
    }
  }
  console.log('ranges', ranges); //@DEBUG
});

function addExceptionField(exceptionField) {
  const exceptionSection = document.getElementById(`${exceptionField}`);

   // Create exceptionInputContainer which is the div that wraps the input and the label
   var exceptionInputContainer = document.createElement("div");
   exceptionInputContainer.classList.add("rangeInput");

   // Create the exceptionInputLabel 
   var exceptionInputLabel = document.createElement("label");
   exceptionInputLabel.innerHTML = "Exception serial number";
   exceptionInputLabel.classList.add("rangeLabel");

  //  Create a container for the input and the remove button
  var inputAndButtonContainer = document.createElement("div");
  inputAndButtonContainer.classList.add("inputAndButton");
 
   // Create the exceptionInput input element
   var exceptionInput = document.createElement("input");
   exceptionInput.setAttribute("type", "text");
   exceptionInput.setAttribute("name", "exception");
   exceptionInput.setAttribute("id", "exception");

  //  Create the removeExceptionButton
   var removeExceptionButton = document.createElement("button");
   removeExceptionButton.setAttribute("type", "button");
   removeExceptionButton.innerHTML = "X"
   removeExceptionButton.classList.add("removeRangeCardButton");

  //  Append the input and remove button to the inputAndButtonContainer
  inputAndButtonContainer.appendChild(exceptionInput);
  inputAndButtonContainer.appendChild(removeExceptionButton);

   // Append the exception elements to the exceptionInputContainer
   exceptionInputContainer.appendChild(exceptionInputLabel);
   exceptionInputContainer.appendChild(inputAndButtonContainer);

   // Append the exceptionInputContainer to the exceptionSection
   exceptionSection.appendChild(exceptionInputContainer);

   // Append the onclick function to the button after all other appends are done so the parent and child elements exist
   removeExceptionButton.onclick = () => removeChildInstanceFromParentInstance(exceptionSection, exceptionInputContainer);
}

function removeChildInstanceFromParentInstance(parentInstance, childInstance) {
  parentInstance.removeChild(childInstance);
}

// Add another range to the form that is styled correctly and in the correct location
function addRangeField(rangeField) {
  // The id from the button is passed in so we know where to add the new range field
  const rangeSection = document.getElementById(`${rangeField}`);
  
  // We use this to match the id of the exceptionSection and button
  const rangeSectionIndex = rangeSection.children.length;

  // We use this to match the id of the exceptionSection and button
  const rangeConfigChars = rangeField.substr(rangeField.length - 4);

  // Then we create the element to add to the DOM
  // Create rangeContainer
  var rangeContainer = document.createElement("div");
  rangeContainer.classList.add("rangeContainer");
  rangeContainer.setAttribute("name", rangeConfigChars);
  
  // Create a container for the rangeRemoveButton
  var rangeRemoveButtonContainer = document.createElement("div");
  rangeRemoveButtonContainer.classList.add("removeRangeCardButtonContainer");

  // Create a button for the user to remove the added range card
  var rangeRemoveButton = document.createElement("button");
  rangeRemoveButton.setAttribute("type", "button");
  rangeRemoveButton.innerHTML = "X";
  rangeRemoveButton.classList.add("removeRangeCardButton");

  // Append the rangeRemoveButton to its container
  rangeRemoveButtonContainer.appendChild(rangeRemoveButton);

  // Create rangeInputContainer which contains the divs that hold the input/label
  var rangeInputContainer = document.createElement("div");
  rangeInputContainer.classList.add("rangeInputContainer");

  // Create rangeInputStart which is the div that wraps the input and the label
  var rangeInputStart = document.createElement("div");
  rangeInputStart.classList.add("rangeInput");

  // Create the rangeInputStartsAtLabel 
  var rangeInputStartsAtLabel = document.createElement("label");
  rangeInputStartsAtLabel.innerHTML = "Starts at";
  rangeInputStartsAtLabel.classList.add("rangeLabel");

  // Create the rangeInputStartsAt input
  var rangeInputStartsAt = document.createElement("input");
  rangeInputStartsAt.setAttribute("type", "text");
  rangeInputStartsAt.setAttribute("name", "starts_at");
  rangeInputStartsAt.setAttribute("id", "starts_at");

  // Append the rangeInputStart elements 
  rangeInputStart.appendChild(rangeInputStartsAtLabel);
  rangeInputStart.appendChild(rangeInputStartsAt);

  // Create rangeInputEnd which is the div that wraps the input and label
  var rangeInputEnd = document.createElement("div");
  rangeInputEnd.classList.add("rangeInput");

  // Create the rangeInputEndsLabel
  var rangeInputEndsAtLabel = document.createElement("label");
  rangeInputEndsAtLabel.innerHTML = "Ends at";
  rangeInputEndsAtLabel.classList.add("rangeLabel");

  // Create the rangeInputEndsAt input
  var rangeInputEndsAt = document.createElement("input");
  rangeInputEndsAt.setAttribute("type", "text");
  rangeInputEndsAt.setAttribute("name", "ends_at");
  rangeInputEndsAt.setAttribute("id", "ends_at");

  // Append the rangeInputEnd elements
  rangeInputEnd.appendChild(rangeInputEndsAtLabel);
  rangeInputEnd.appendChild(rangeInputEndsAt);

  // Append the rangeInputStart and rangeInputEnd to rangeInputContainer
  rangeInputContainer.appendChild(rangeInputStart);
  rangeInputContainer.appendChild(rangeInputEnd);

  // Create the exceptionSection. This is where the input for adding exception serial numbers will display
  var exceptionSection = document.createElement("div");
  exceptionSection.setAttribute("id", `exceptionSection${rangeSectionIndex}${rangeConfigChars}`);

  // Create the exceptionButton which will display an input for the user to enter an exception serial number
  var exceptionButton = document.createElement("button");
  exceptionButton.setAttribute("type", "button");
  exceptionButton.setAttribute("id", `exceptionSection${rangeSectionIndex}${rangeConfigChars}`);
  exceptionButton.setAttribute("title", "An exception is a serial number outside the set range where the Display description still applies");
  exceptionButton.classList.add("exceptionButton");
  exceptionButton.innerHTML = "Add exception";
  exceptionButton.onclick = (e) => addExceptionField(e.target.id)

  // Create the rangeTextAreaContainer which is the div that contains the rangeTextArea element and label
  var rangeTextAreaContainer = document.createElement("div");
  rangeTextAreaContainer.classList.add("rangeTextAreaContainer");

  // Create the rangeInputStartsAtLabel 
  var rangeTextAreaLabel = document.createElement("label");
  rangeTextAreaLabel.innerHTML = "Display";
  rangeTextAreaLabel.classList.add("rangeLabel");

  // Create the rangeTextArea element
  var rangeTextArea = document.createElement("textarea");
  rangeTextArea.classList.add("rangeTextArea");
  rangeTextArea.setAttribute("name", "display");
  rangeTextArea.setAttribute("id", "display");
  rangeTextArea.setAttribute("placeholder", "Enter the description the user will see for this serial nubmer range. For example: High Voltage Cable Part# 2222222 (if unavailable order 3333333)");

  // Append the rangeTextArea and label to the rangeTextAreaContainer
  rangeTextAreaContainer.appendChild(rangeTextAreaLabel);
  rangeTextAreaContainer.appendChild(rangeTextArea);

  // Append the containers to the rangeContainer
  rangeContainer.appendChild(rangeRemoveButtonContainer);
  rangeContainer.appendChild(rangeInputContainer);
  rangeContainer.appendChild(exceptionSection);
  rangeContainer.appendChild(exceptionButton);
  rangeContainer.appendChild(rangeTextAreaContainer);

  // Append the rangeContainer to the hard coded rangeSection div in the HTML
  rangeSection.appendChild(rangeContainer);

  // Append the onclick function to the button after all other appends are done so the parent and child elements exist
  rangeRemoveButton.onclick = () => removeChildInstanceFromParentInstance(rangeSection, rangeContainer);
  
};

// Hide the results section and clear all the fields
function clearResults() {
  hideResultsSection();
  topResultLabel.innerText = "";
  topResultContent.innerText = "";
  bottomResultLabel.innerText = "";
  bottomResultContent.innerText = "";
}

// Show the results section
function showResultsSection() {
  resultSection.classList.remove("resultSectionHide");
}

// Hide the results section
function hideResultsSection() {
  resultSection.classList.add("resultSectionHide");
}

// Make the search button changes color for 100ms when the user clicks it
function flashSearchButton() {
  executeSearch.style.backgroundColor = "rgb(100, 0, 160)";
  executeSearch.style.color = "white";
  setTimeout(() => {
    executeSearch.style.color = "black";
    executeSearch.style.backgroundColor = "white";
  }, 100);
}

// Initial validation of the serial number. More validation happens in the findConfiguration function
function validateSerialNumber() {
  let regex = /F[ABS29][HMX][HX][TX][EX]\d\d\d\d\d/i;
  let capitalizedSearchItem = searchItem.value.toUpperCase();
  if (capitalizedSearchItem.match(regex)) {
    findConfiguration(capitalizedSearchItem);
  } else {
    displayError();
  }
}

// Populate the results section fields with the configuration information
function displayResults(id, name, itemInfo, userInterface) {
  const configuration = configs.find((config) => config.id === id);
  topResultLabel.innerText = "System Configuration Details:";
  topResultContent.innerText = `${configuration.description} ${userInterface}`;
  bottomResultLabel.innerText = name;
  bottomResultContent.innerText = itemInfo;
  showResultsSection();
  return;
}

// Populate the results section fields with the error information
function displayError() {
  topResultLabel.innerText = "System Configuration Details:";
  topResultContent.innerText = "Unknown configuration";
  bottomResultLabel.innerText = "The entered System Serial Number is invalid";
  bottomResultContent.innerText = "Please check your information and enter a valid System Serial Number";
  showResultsSection();
  return;
}

// Configuration Identification Logic
function findConfiguration(capitalizedSearchItem) {
  let noMatch = 0;
  let configChars = capitalizedSearchItem.slice(0, 4);
  let sequenceNum = capitalizedSearchItem.slice(-5);
  configs.find((config) => {
    if (config.code === configChars) {
      // If the serial includes an E make sure it is a valid ergo code
      if(capitalizedSearchItem.charAt(5) === 'E') {
        if(config.id !== 3 && config.id !== 4) {
          return displayError();
        }
      }
      // If the serial is an ergo code make sure it includes the E
      if(config.id === 3 || config.id === 4) {
        if(capitalizedSearchItem.charAt(5) !== 'E') {
          return displayError();
        }
      }
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
          } else {
          }
        });
      });
    } else {
      // if the serial doesn't match any of the 9 codes display an error
      noMatch++;
      if(noMatch === 9) {
        displayError();
      }
    }
  });
}

// Find the correct breakPoint where the serial number the user entered falls between the startsAt and endsAt values.
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
    displayResults(
      id,
      name,
      infoBreakPoint.display,
      "with Tablet"
    );
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

