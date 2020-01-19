
/* Error messages */
let CAND_NAME_ERR_MSG = "'Nombre' debe contener entre 1 y 70 caracteres (A-Z, a-z, 0-9, _, -), comenzando con una letra";
let CAND_ABRV_NAME_ERR_MSG = "'Abreviatura' debe contener entre 1 y 6 caracteres (A-Z, a-z, 0-9, _, -), comenzando con una letra";
let CAND_NEG_VOTES_ERR_MSG = "'Votos' debe ser un número mayor o igual que 0";
let CAND_TOP_VOTES_ERR_MSG = "'Votos' debe ser menor o igual que el número de votos disponibles en la circunscripción";
let CAND_UNIQUE_NAME_ERR_MSG = "Ya existe una candidatura con ese nombre";
let CAND_UNIQUE_ABBRV_ERR_MSG = "Ya existe una candidatura con esa abreviatura";


/**
 * Add the corresponding functionality to all dialog-candidature's 
 * elements.
 */
function configureNewCandidatureDialog() {
    // Configure the "New candidature" button, which opens the dialog
    let dialogCandidature = document.getElementById("dialog-candidature");
    let newCandidature = document.getElementById("new-candidature");
    newCandidature.addEventListener("click", ()=>{
        dialogCandidature.showModal();
    });

    // Configure the "Add candidature" button
    document.getElementById("add-candidature").addEventListener("click", () => {
        DISTRICTS[SHOWING_DISTRICT].candidatures.push(getCandidature());
        updateCandidatures();
        dialogCandidature.close();
        clearCandidatureDialog();
    });

    // Configure the "Cancel" button
    document.getElementById("cancel-candidature").addEventListener("click", ()=>{
       dialogCandidature.close(); 
    });

    // Add event listeners to the dialog's fields 
    document.getElementById("candidature-name").addEventListener("input", validateCandName);
    document.getElementById("candidature-abbrv").addEventListener("input", validateCandAbbrvName);
    document.getElementById("candidature-votes").addEventListener("input", validateCandVotes);
}

/**
 * Clears the candidature dialog's fields.
 */
function clearCandidatureDialog() {
    document.getElementById("candidature-name").value = "";
    document.getElementById("candidature-abbrv").value = "";
    document.getElementById("candidature-votes").value = "";
    disableElement("add-candidature");
}

/**
 * Obtains the content of the 'New candidature' dialog
 * as an object.
 * @return {Object} new candidature to be added.
 */
function getCandidature() {
    let candidature = {
        name: val("candidature-name").trim(),
        abbrv: val("candidature-abbrv").trim(),
        votes: ival("candidature-votes")
    }
    return candidature;
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

/**
 * Validates the candidature dialog.
 */
function validateCandidature() {
    let candidature = getCandidature();
    let district = DISTRICTS[SHOWING_DISTRICT];

    if (validCandidature(candidature, district)) {
        enableElement("add-candidature");
    } else {
        disableElement("add-candidature");
    }
}   

/**
 * Validates the candidature's name
 */
function validateCandName() {
    let name = val("candidature-name");
    let allCandidatures = DISTRICTS[SHOWING_DISTRICT].candidatures;

    if (!validCandName(name)) {
        addInvalidClass("candidature-name");
        setCandidatureDialogError(CAND_NAME_ERR_MSG);
    } else if(!uniqueCandidatureName(name, allCandidatures)) {
        addInvalidClass("candidature-name");
        setCandidatureDialogError(CAND_UNIQUE_NAME_ERR_MSG);
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
    let abbrv = val("candidature-abbrv");
    let allCandidatures = DISTRICTS[SHOWING_DISTRICT].candidatures;

    if (!validCandAbrvName(abbrv)) {
        addInvalidClass("candidature-abbrv");
        setCandidatureDialogError(CAND_ABRV_NAME_ERR_MSG);
    } else if(!uniqueCandidatureAbbrv(abbrv, allCandidatures)) {
        addInvalidClass("candidature-abbrv");
        setCandidatureDialogError(CAND_UNIQUE_ABBRV_ERR_MSG);  
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
    let votes = ival("candidature-votes");
    let district = DISTRICTS[SHOWING_DISTRICT];

    if (!validCandVotesBottom(votes)) {
        addInvalidClass("candidature-votes");
        setCandidatureDialogError(CAND_NEG_VOTES_ERR_MSG);
    } else if(!validCandVotesTop(votes, district)) {
        addInvalidClass("candidature-votes");
        setCandidatureDialogError(CAND_TOP_VOTES_ERR_MSG);
    } else {
        removeInvalidClass("candidature-votes");
        clearCandidatureDialogError();
    }
    validateCandidature();
}

