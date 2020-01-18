
/* Patterns */
let CAND_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1]){1}([\wÀ-ÿ\u00f1\u00d1-]){0,69}$/;
let CAND_ABRV_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1]){1}([\wÀ-ÿ\u00f1\u00d1-]){0,5}$/;


/* Error messages */
let CAND_NAME_ERR_MSG = "'Nombre' debe contener entre 1 y 70 caracteres (A-Z, a-z, 0-9, _ o -), comenzando con una letra";
let CAND_ABRV_NAME_ERR_MSG = "'Abreviatura' debe contener entre 1 y 6 caracteres (A-Z, a-z, 0-9, _ o -), comenzando con una letra";
let CAND_VOTES_ERR_MSG = "'Votos' debe ser un número mayor o igual que 0";



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
