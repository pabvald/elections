
/* Patterns */
let DISTRICT_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1 ]){1,120}$/;

/* Error messages */
let DISTRICT_NAME_ERR_MSG = "'Nombre' debe contener entre 1 y 120 letras,\n mayúsculas o minúsculas";
let DISTRICT_REP_ERR_MSG = "'Escaños' deben ser mayor o igual que 1 y menor que el censo";
let DISTRICT_VOTERS_ERR_MSG = "'Censo' debe ser un número mayor o igual que 1";
let DISTRICT_BLANK_ERR_MSG = "'Votos en blanco' deben ser mayor o igual que 0";
let DISTRICT_NULL_ERR_MSG = "'Votos nulos' deben ser mayor o igual que 0";


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
 * @return {Boolean} - district's name matches pattern
 */
function validDistrictName() {
    return DISTRICT_NAME_PATTERN.test(val("district-name"));
}

/**
 * @return {Boolean} - district's voters are >= 1
 */
function validDistrictVoters() {
    return ival("district-voters") >= 1;
}

/**
 * @return {Boolean} - district's representatives >= 1 and <= district's voters
 */
function validDistrictRepresentatives() {
    let districtRepresentatives = ival("district-representatives");
    let districtVoters = ival("district-voters");

    return (districtRepresentatives <= districtVoters) && (districtRepresentatives >= 1);
}

/**
 * @return {Boolean} - district's null votes are >= 0
 */
function validDistrictNull() {
    return ival("district-null") >= 0;
}

/**
 * @return {Boolean} - district's blank votes are >= 0
 */
function validDistrictBlank() {
    return ival("district-blank") >= 0;
}

/**
 * @return {Boolean} - district's fields are valid
 */
function validDistrict() {
    return validDistrictName() && validDistrictVoters() && validDistrictRepresentatives()
            && validDistrictBlank() && validDistrictNull();
}

/**
 * Checks if the every field of the district is valid and enables/disables
 * the 'Add district' button.
 */
function validateDistrict() {
    if (validDistrict()) {
        enableElement("add-district");
    } else {
        disableElement("add-district");
    }
}

/**
 * Validates the district's name 
 */
function validateDistrictName() {
    if (!validDistrictName()) {
        addInvalidClass("district-name");
        setDistrictDialogError(DISTRICT_NAME_ERR_MSG);
    } else {
        removeInvalidClass("district-name");
        clearDistrictDialogError();
    }
    validateDistrict();
}

/**
 * Validates the district's voters
 */
function validateDistrictVoters() {
    if (!validDistrictVoters()) {
        addInvalidClass("district-voters");
        setDistrictDialogError(DISTRICT_VOTERS_ERR_MSG);
    } else {
        removeInvalidClass("district-voters");
        clearDistrictDialogError();
        validateDistrictRepresentatives();
    }
}


/**
 * Validates the district's representatives
 */
function validateDistrictRepresentatives() {
    if (!validDistrictRepresentatives()) {
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
    if (!validDistrictNull()) {
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
    if (!validDistrictBlank()) {
        addInvalidClass("district-blank");
        setDistrictDialogError(DISTRICT_BLANK_ERR_MSG);
    } else {
        removeInvalidClass("district-blank");
        clearDistrictDialogError();
    }
    validateDistrict();
}
