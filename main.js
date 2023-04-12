const resultSection = document.getElementById('resultSection');
const searchItem = document.getElementById('searchItem');
const executeSearch = document.getElementById('executeSearch');
const invalidSerial = document.getElementById('invalidSerial');
const systemDetails = document.getElementById('systemDetails');
const partNumber = document.getElementById('partNumber');
const errorMessage = '<h6>Please enter a valid Elite System Serial Number<h6>';

function clearResults() {
    systemDetails.innerText = '';
    partNumber.innerText = '';
    invalidSerial.innerText = '';
};

searchItem.addEventListener('focus', () => {
    clearResults();
});

searchItem.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        findConfiguration();
    } else {
        clearResults();
    }
});

function standardCLogic(standardSerial) {
    let sequenceNum = standardSerial.slice(-5);
    let configChars = standardSerial.slice(0, 6);
    if(standardSerial.charAt(4) !== 'T') {
        if(configChars === 'F9XXXX') {
            if (sequenceNum < '00035') {
                systemDetails.innerText = 'Standard C 9" Image Intensifier with Control Panel (non-tablet)';
                partNumber.innerText = '5443126';
                return;
            } else {
                systemDetails.innerText = 'Standard C 9" Image Intensifier with Control Panel (non-tablet)';
                partNumber.innerText = '5792202 (if unavailable order 5877920)';
                return;
            }
            
        }
        if(configChars === 'F2XXXX') {
            if (sequenceNum < '00032') {
                systemDetails.innerText = 'Standard C 12" Image Intensifier with Control Panel (non-tablet)';
                partNumber.innerText = '5443126';
                return;
            } else {
                systemDetails.innerText = 'Standard C 12" Image Intensifier with Control Panel (non-tablet)';
                partNumber.innerText = '5792202 (if unavailable order 5877920)';
                return;
            }
        }
    } else {
        if(configChars === 'F9XXTX') {
            if(sequenceNum < '00134') {
                systemDetails.innerText = 'Standard C 9" Image Intensifier with Tablet';
                partNumber.innerText = '5792202 (if unavailable order 5877920)';
                return;
            } else {
                systemDetails.innerText = 'Standard C 9" Image Intensifier with Tablet';
                partNumber.innerText = '5877920 ';
                return;
            }
        }
        if(configChars === 'F2XXTX') {
            if(sequenceNum < '00299') {
                systemDetails.innerText = 'Standard C 12" Image Intensifier with Tablet';
                partNumber.innerText = '5792202 (if unavailable order 5877920)';
                return;
            } else {
                systemDetails.innerText = 'Standard C 12" Image Intensifier with Tablet';
                partNumber.innerText = '5877920';
                return;
            }
        }
    }
    console.log('invalid serial number error', ); //@DEBUG
}

function presentErrorMessage(uniqueMessage) {
    invalidSerial.innerHTML = `<h5>Entered Serial Number ${uniqueMessage}</h5>${errorMessage}`;
    systemDetails.innerHTML = '';
    partNumber.innerHTML = '';
}

// Configuration Identification Logic
function findConfiguration() {
    if(searchItem.value.length !== 11) {
        presentErrorMessage('is not 11 characters');
    }
    let capitalizedSearchItem = searchItem.value.toUpperCase();
    if(capitalizedSearchItem.charAt(0) !== 'F') {
        presentErrorMessage("does not start with character 'F'");
    };
    if(capitalizedSearchItem.charAt(1) === '9' || '2') {
        standardCLogic(capitalizedSearchItem);
    }
};

executeSearch.addEventListener('click', () => {
    findConfiguration();
    // const systemDetailResult = document.createElement('h1');
    // const partNumberResult = document.createElement('h1');
    // systemDetailResult.innerHTML = 'Super C 9" Tablet';
    // partNumberResult.innerHTML = '5214487';
    // systemDetails.appendChild(systemDetailResult);
    // partNumber.appendChild(partNumberResult);
});