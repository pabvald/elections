
/* Patterns */
let CAND_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1]){1}([ \wÀ-ÿ\u00f1\u00d1-]){0,69}$/;
let CAND_ABRV_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1]){1}([\wÀ-ÿ\u00f1\u00d1-]){0,5}$/;


/* Error messages */
let CAND_NAME_ERR_MSG = "'Nombre' debe contener entre 1 y 70 caracteres (A-Z, a-z, 0-9, _, -), comenzando con una letra";
let CAND_ABRV_NAME_ERR_MSG = "'Abreviatura' debe contener entre 1 y 6 caracteres (A-Z, a-z, 0-9, _, -), comenzando con una letra";
let CAND_VOTES_ERR_MSG = "'Votos' debe ser un número mayor o igual que 0";


/**
 * @return {Boolean} - candidature's name matches pattern
 */
function validCandName() {
    return CAND_NAME_PATTERN.test(val("candidature-name"));
}

/**
 * @return {Boolean} - candidature's abbreviate name matches pattern
 */
function validCandAbrvName() {
    return CAND_ABRV_NAME_PATTERN.test(val("candidature-abbrv"));
}

/**
 * @return {Boolean} - candidature's votes >= 0
 */
function validCandVotes() {
    return ival("candidature-votes") >= 0;
}

/**
 * @return {Boolean} - candidature's blank votes are >= 0
 */
function validCandidature() {
    return validCandName() && validCandName() && validCandAbrvName();
}

/**
 * 
 */
function validateCandidature() {
    if (validCandidature()) {
        enableElement("add-candidature");
    } else {
        disableElement("add-candidature");
    }
}   

/**
 * Validates the candidature's name
 */
function validateCandName() {
    if (!validCandName()) {
        addInvalidClass("candidature-name");
        setCandidatureDialogError(CAND_NAME_ERR_MSG);
    } else {
        removeInvalidClass("candidature-name");
        clearCandidatureDialogError();
    }
    validateCandidature();
}

/**
 * Validates the candidature's abbreviate name
 */
function validateCandAbbrvName() {
    if (!validCandAbrvName()) {
        addInvalidClass("candidature-abbrv");
        setCandidatureDialogError(CAND_ABRV_NAME_ERR_MSG);
    } else {
        removeInvalidClass("candidature-abbrv");
        clearCandidatureDialogError();
    }
    validateCandidature();
}

/**
 * Validates the candidature's votes
 */
function validateCandVotes() {
    if (!validCandVotes()) {
        addInvalidClass("candidature-votes");
        setCandidatureDialogError(CAND_VOTES_ERR_MSG);
    } else {
        removeInvalidClass("candidature-votes");
        clearCandidatureDialogError();
    }
    validateCandidature();
}

/**
 * Clears the candidature dialog's error.
 */
function clearCandidatureDialogError() {
    setCandidatureDialogError("");
}

/**
 * Sets the candidature dialog's error
 * @param {String} error 
 */
function setCandidatureDialogError(error) {    
    let districtError = document.getElementById("dialog-candidature-error");
    districtError.innerHTML = error;
}
