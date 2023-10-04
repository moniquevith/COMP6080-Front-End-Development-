// COMP6080, Assignment 2: Funforms

addEventListener("keyup", () => {
    renderMessage();
})

const streetName = document.getElementById('street-name'); 
const suburbName = document.getElementById('suburb');
const output = document.getElementById('form-result'); 
const postcodeOutput = document.getElementById('postcode');
const DOB = document.getElementById('dob');
const buildingType = document.getElementById('building-type');
const checkAll = document.querySelector('#select-all-btn');
const checkBoxOptions = document.querySelectorAll('input[type=checkbox]');
const resetButton = document.getElementById('reset-form');
const form = document.getElementsByTagName('form');

// ----------- Helper Functions ---------------------------

const isValidLength = (input) => {
    if (input.length < 3 || input.length > 50) {
        return false; 
    }
    return true;
};

const isValidPostcode = (input) => {
    if (input.length < 4 || input.length > 4 || input.isNaN) {
        return false;
    }
    return true;
};

// ----------- Rendering the message ---------------------------
var allChecked = 0;
for (let i = 0; i < checkBoxOptions.length; i++) {
    checkBoxOptions[i].addEventListener('click', (e) => {
        if (checkBoxOptions[i].checked == true) {
            allChecked += 1; 
        }

        if (allChecked == 4) {
            checkAll.value = "Deselect All";
        }
        renderMessage();
    })
}

checkAll.addEventListener('click', (e) => {
    if (e.target.value == "Select All") {
        Array.from(checkBoxOptions).map((checkBox) => {
            checkBox.checked = true;
            e.target.value = "Deselect All";
        })
    } else {
        Array.from(checkBoxOptions).map((checkBox) => {
            checkBox.checked = false;
            e.target.value = "Select All";
        })
    }
    renderMessage();
})

buildingType.addEventListener('click', (e) => {
    renderMessage();
})

const renderMessage = () => {
    const renderErrMsg = (input) => {
        output.innerHTML = `Please input a valid ${input}`
    }
    // street name
    if (!isValidLength(streetName.value)) {
        renderErrMsg("street name");
        return;
    }

    // suburb
    if (!isValidLength(suburbName.value)) {
        renderErrMsg("suburb");
        return;
    }

    // postcode
    if (!isValidPostcode(postcodeOutput.value)) {
        renderErrMsg("postcode");
        return;
    }

    // dob
    const DOBSplit = DOB.value.split("/");
    const dobOutput = new Date(`${DOBSplit[2]}/${DOBSplit[1]}/${DOBSplit[0]}`);
    const dateRegex = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");

    if (isNaN(dobOutput) || (Date.now() < dobOutput.getTime()) || !dateRegex.test(DOB.value)) {
        renderErrMsg('date of birth');
        return;
    }

    const getAge = () => {
        const delta = new Date().getTime() - dobOutput.getTime();
        return Math.floor(delta / 31556952000);
    }

    // success ouput
    const renderSuccessMsg = () => {
        let msgLine = `You are ${getAge().toString()} years old, and your address is ${streetName.value} St, ${suburbName.value}, ${postcodeOutput.value}, Australia. `
        
        if (buildingType.value == "apartment") {
            msgLine += 'Your building is an apartment, '
            console.log(buildingType.value);
        } else {
            msgLine += 'Your building is a house, '
            console.log(buildingType.value);
        }

        var features = [];
        Array.from(checkBoxOptions).map((checkBox) => {
            if (checkBox.checked == true) {
                features.push(checkBox.value);
            }
        })

        if (features == 0) {
            msgLine += 'and it has no features'
        } else if (features == 1) {
            msgLine += `and it has ${features[0]}`
        } else {
            msgLine += 'and it has '
            Array.from(features).map((ft) => {
                if (features.indexOf(ft) == (features.length - 1)) {
                    msgLine += `and ${ft}` 
                } else {
                    msgLine += `${ft}, `
                }
            })
        }

        return msgLine; 
    }

    output.innerHTML = renderSuccessMsg();
}

// ----------- Resetting the form ---------------------------
resetButton.addEventListener('click', () => {
    for (let i = 0; i < checkBoxOptions.length; i++) {
        checkBoxOptions[i].checked = false;
    }
    checkAll.value = "Select All";
    buildingType.value = "apartment";
    streetName.value = '';
    suburbName.value = '';
    postcodeOutput.value = '';
    DOB.value = '';
    output.value = '';
})
