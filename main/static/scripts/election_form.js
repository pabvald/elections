
/* Error messages */
let ELECTION_DATE_ERR_MSG = "Se debe especificar una fecha válida";
let ELECTION_TYPE_ERR_MSG = "Si el tipo de las elecciones es 'Municipal' sólo puede haber una circunscripción";
let ELECTION_THRESHOLD_ERR_MSG = "'Umbral mínimo de representación' debe ser estar comprendido entre 0.0 y 1.0";


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
    let date = val("election-date");
    let type = val("election-type");
    let threshold = val("election-threshold");

    if (validElection(date, type, threshold, DISTRICTS)) {
        enableElement("calculate");
    } else {
        disableElement("calculate");
    }
} 

/**
 * Validates election's date
 */
function validateElectionDate() {
    let date = val("election-date");

    if (!validElectionDate(date)) {
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
    let type = val("election-type");

    if (!validElectionType(type, DISTRICTS)) {
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
    let threshold = val("election-threshold");

    if (!validElectionThreshold(threshold)) {
        addInvalidClass("election-threshold");
        setElectionDataError(ELECTION_THRESHOLD_ERR_MSG);
    } else {
        removeInvalidClass("election-threshold");
        clearElectionDataError();
    }
    validateElection();
}
