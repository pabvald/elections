
/* Patterns */
let ELECTION_DATE_PATTERN = /^\d{4}-\d{1,2}-\d{1,2}$/;

/* Error messages */
let ELECTION_DATE_ERR_MSG = "Se debe especificar una fecha válida";
let ELECTION_TYPE_ERR_MSG = "Si el tipo de las elecciones es 'Municipal' sólo puede haber una circunscripción";
let ELECTION_THRESHOLD_ERR_MSG = "'Umbral mínimo de representación' debe ser estar comprendido entre 0.0 y 1.0";


/**
 * @return {Boolean} - election's date is valid
 */
function validElectionDate() {
    return ELECTION_DATE_PATTERN.test(val("election-date"));
}

/**
 * @return {Boolean} - election's type and number of districts are valid
 */
function validElectionType() {
    return !(val("election-type") == "local" && districts.length > 1);   
}

/**
 * @return {Boolean} - election's threshold >= 0 and <= 1.
 */
function validElectionThreshold() {
    let t = fval("election-threshold");
    return t >= 0 && t <= 1;
}

/**
 * @return {Boolean} - election data is valid
 */
function validElection() {
    return validElectionDate() && validElectionType() && validElectionThreshold() && districts.length >= 1;
}

/**
 * Clears the election's data error.
 */
function clearElectionDataError() {
    setElectionDataError("");
}

/**
 * Sets the election's data error
 * @param {String} error 
 */
function setElectionDataError(error) {    
    let districtError = document.getElementById("election-data-error");
    districtError.innerHTML = error;
}


/**
 * Validates election's data.
 */
function validateElection() {
    if (validElection()) {
        enableElement("calculate");
    } else {
        disableElement("calculate");
    }
} 

/**
 * Validates election's date
 */
function validateElectionDate() {
    if (!validElectionDate()) {
        addInvalidClass("election-date");
        setElectionDataError(ELECTION_DATE_ERR_MSG);
    } else {
        removeInvalidClass("election-date");
        clearElectionDataError();
    }
    validateElection();
}

/**
 * Validates election's type
 */
function validateElectionType() {
    if (!validElectionType()) {
        addInvalidClass("election-type");
        setElectionDataError(ELECTION_TYPE_ERR_MSG);
    } else {
        removeInvalidClass("election-type");
        clearElectionDataError();
    }
    validateElection();
}


/**
 * Validates election's threshold
 */
function validateElectionThreshold() {
    if (!validElectionThreshold()) {
        addInvalidClass("election-threshold");
        setElectionDataError(ELECTION_THRESHOLD_ERR_MSG);
    } else {
        removeInvalidClass("election-threshold");
        clearElectionDataError();
    }
    validateElection();
}



