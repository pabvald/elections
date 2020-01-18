
/**
 * Gets the value of an HTML ELement given its id.
 * @param {Number} id of an HTML Element
 * @return {Object} the value of the  HTML Element
 */
function val(id){
    return document.getElementById(id).value;
}

/**
 * Gets the value, as an integer, of an HTML Element given its id.
 * @param {Number} id of an HTML Element
 * @return {Number} the value of the HTML Element
 */
function ival(id){
    return parseInt(val(id));
}

/**
 * Gets the value, as a float, of an HTML Element given its id.
 * @param {Number} id of an HTML Element
 * @return {Number} the value of the HTML Element
 */
function fval(id){
    return parseFloat(val(id));
}

/**
 * Adds a class to an HTML element's class list.
 * @param {Number} id - the HTML element's id
 * @param {String} className - the name of the class to be added
 */
function addClass(id, className) {
    let element = document.getElementById(id);
    element.classList.add(className);
}

/**
 * Removes a class from an HTML element's class list.
 * @param {Number} id - the HTML element's id
 * @param {String} className - the name of the class to be removed
 */
function removeClass(id, className) {
    let element = document.getElementById(id);
    element.classList.remove(className);
}

/**
 * Removes the 'disabled' attribute from a HTML element
 * @param {Number} id - the HTML element's id
 */
function enableElement(id) {
    let element  = document.getElementById(id);
    
    if(element.getAttribute("disabled") != null) {
        element.removeAttribute("disabled");
    }       
}

/**
 * Adds the 'disabled' attribute to a HTML element
 * @param {Number} id - the HTML element's id
 */
function disableElement(id) {
    let element  = document.getElementById(id);
    
    if(element.getAttribute("disabled") == null) {
        element.setAttribute("disabled", true);
    }   
}

/**
 * Adds the "invalid-field" class to an HTML element
 * @param {*} id - HTML element's id
 */
function addInvalidClass(id) {
    addClass(id, "invalid-field");
 }
 
 /**
  * Removes the "invalid-field" class to an HTML element
  * @param {*} id - HTML element's id
  */
 function removeInvalidClass(id) {
     removeClass(id, "invalid-field");
 }