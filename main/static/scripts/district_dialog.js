
/* Error messages */
let DISTRICT_NAME_ERR_MSG = "'Nombre' debe contener entre 1 y 120 letras,\n mayúsculas o minúsculas";
let DISTRICT_NOT_UNIQUE_ERR_MSG = "Ya existe una circunscripción con este nombre";
let DISTRICT_REP_ERR_MSG = "'Escaños' deben ser mayor o igual que 1 y menor que el 'Censo'";
let DISTRICT_VOTERS_ERR_MSG = "'Censo' debe ser un número mayor o igual que 1";
let DISTRICT_BLANK_ERR_MSG = "'Votos en blanco' deben ser mayor o igual que 0 y menor o igual que 'Censo' - 'Votos nulos'";
let DISTRICT_NULL_ERR_MSG = "'Votos nulos' deben ser mayor o igual que 0 y menor o igual que 'Censo' - 'Votos en blanco'";


/**
 * Obtains the content of the 'New district' dialog
 * as an object.
 * @return {Object} new district to be added.
 */
function getDistrict() {
    let district = {
        name: val("district-name").trim(),
        voters: ival("district-voters"),
        representatives: ival("district-representatives"),
        blank: ival("district-blank"),
        null: ival("district-null"),
        candidatures: []
    };

    return district;
}

/**
 * Clears the district dialog's fields.
 */
function clearDistrictDialog() {
    document.getElementById("district-name").value = "";
    document.getElementById("district-voters").value = "";
    document.getElementById("district-representatives").value = "";
    document.getElementById("district-blank").value = "";
    document.getElementById("district-null").value = "";
    disableElement("add-district");    
}

/**
 * Add the corresponding functionality to all the 
 * dialog-disctrict's elements.
 */
function configureNewDistrictDialog() {

    // Configure the "New district" button, which opens the dialog   
    let dialogDistrict = document.getElementById("dialog-district");
    document.getElementById("new-district").addEventListener("click",()=>{
        dialogDistrict.showModal();
    });

    // Configure the "Add district" button
    document.getElementById("add-district").addEventListener("click",()=>{
        let newDistrict = getDistrict();
        DISTRICTS.push(newDistrict);
        updateDistricts();
        dialogDistrict.close();  
        clearDistrictDialog();
        validateElectionType();     
    });
    
    // Configure to the "Cancel" button
    document.getElementById("cancel-district").addEventListener("click", ()=>{
        dialogDistrict.close();
    });

    // Add event listeners to the dialog's fields
    document.getElementById("district-name").addEventListener("input", validateDistrictName);
    document.getElementById("district-voters").addEventListener("input", validateDistrictVoters);
    document.getElementById("district-representatives").addEventListener("input", validateDistrictRepresentatives);
    document.getElementById("district-null").addEventListener("input", validateDistrictNull);
    document.getElementById("district-blank").addEventListener("input", validateDistrictBlank);
}

/**
 * Clears the district dialog's error.
 */
function clearDistrictDialogError() {
    setDistrictDialogError("");
}

/**
 * Sets the district dialog's error
 * @param {String} error 
 */
function setDistrictDialogError(error) {    
    let districtError = document.getElementById("dialog-district-error");
    districtError.innerHTML = error;
}


/**
 * Checks if the every field of the district is valid and enables/disables
 * the 'Add district' button.
 */
function validateDistrict() {
    let district = getDistrict();

    if (validDistrict(district, DISTRICTS)) {
        enableElement("add-district");
    } else {
        disableElement("add-district");
    }
}

/**
 * Validates the district's name 
 */
function validateDistrictName() {
    let name = val("district-name");

    if (!validDistrictName(name)) {
        addInvalidClass("district-name");
        setDistrictDialogError(DISTRICT_NAME_ERR_MSG);
    } else if(!uniqueDistrict(name, DISTRICTS)) {
        addInvalidClass("district-name");
        setDistrictDialogError(DISTRICT_NOT_UNIQUE_ERR_MSG);
    } else{
        removeInvalidClass("district-name");
        clearDistrictDialogError();
    }
    validateDistrict();
}

/**
 * Validates the district's voters
 */
function validateDistrictVoters() {
    let voters = ival("district-voters");

    if (!validDistrictVoters(voters)) {
        addInvalidClass("district-voters");
        setDistrictDialogError(DISTRICT_VOTERS_ERR_MSG);
    } else {
        removeInvalidClass("district-voters");
        clearDistrictDialogError();        
    }
    validateDistrict();
}


/**
 * Validates the district's representatives
 */
function validateDistrictRepresentatives() {
    let voters = ival("district-voters");
    let representatives = ival("district-representatives");

    if (!validDistrictRepresentatives(representatives, voters)) {
        addInvalidClass("district-representatives");
        setDistrictDialogError(DISTRICT_REP_ERR_MSG);
    } else {
        removeInvalidClass("district-representatives");
        clearDistrictDialogError();
    }
    validateDistrict();
}

/**
 * Validates the district's null votes
 */
function validateDistrictNull() {
    let districtVoters = ival("district-voters");
    let districtNull = ival("district-null");
    let districtBlank = ival("district-blank");

    if (!validDistrictNull(districtNull, districtVoters, districtBlank)) {
        addInvalidClass("district-null");
        setDistrictDialogError(DISTRICT_NULL_ERR_MSG);
    } else {
        removeInvalidClass("district-null");
        clearDistrictDialogError();
    }
    validateDistrict();
}

/**
 * Validates the district's null votes
 */
function validateDistrictBlank() {
    let districtVoters = ival("district-voters");
    let districtNull = ival("district-null");
    let districtBlank = ival("district-blank");

    if (!validDistrictBlank(districtBlank, districtVoters, districtNull)) {
        addInvalidClass("district-blank");
        setDistrictDialogError(DISTRICT_BLANK_ERR_MSG);
    } else {
        removeInvalidClass("district-blank");
        clearDistrictDialogError();
    }
    validateDistrict();
}