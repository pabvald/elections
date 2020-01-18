
/* Error messages */ 
let FILE_TYPE_ERR_MSG = "El fichero debe ser .json";
let FILE_FORMAT_ERR_MSG = "El fichero contiene errores";
let FILE_NULL_ERR_MSG = "No se ha elgido ningún fichero .json";


/**
 * Adds the corresponding functionality to all upload dialog's 
 * elements.
 */
function configureUploadDialog() {
    let uploadButton = document.getElementById("load");
    let uploadDialog = document.getElementById("load-dialog");
    uploadButton.addEventListener("click", ()=>{
        uploadDialog.showModal();
    });

    let upload = document.getElementById("upload");   
    upload.addEventListener("click",uploadFile);

    let cancelLoad = document.getElementById("cancel-load");
    cancelLoad.addEventListener("click", ()=>{
        uploadDialog.close(); 
    });
}

/**
 * Clears the candidature dialog's error.
 */
function clearUploadDialogError() {
    setUploadDialogError("");
}

/**
 * Sets the Upload dialog's error
 * @param {String} error 
 */
function setUploadDialogError(error) {    
    let uploadError = document.getElementById("dialog-upload-error");
    uploadError.innerHTML = error;
}

/**
 * Uploads the specified .json file
 */
function uploadFile() {
    let uploadDialog = document.getElementById("load-dialog");
    let fileElement = document.getElementById("file");
    let file = fileElement.files[0];
    let textType = /.json/;
    let reader, election;

    if (file == null) {
        setUploadDialogError(FILE_NULL_ERR_MSG);

    } else if (!file.type.match(textType)) {
        setUploadDialogError(FILE_TYPE_ERR_MSG);

    } else {
        reader = new FileReader();        
        reader.onload = function(e) {
            election = JSON.parse(reader.result);
            
            if (validElection(election)) {
                generateInput(election);
                uploadDialog.close();
            } else {
                setUploadDialogError(FILE_FORMAT_ERR_MSG);
            }
        }
        reader.readAsText(file);    
    }
}

/**
 * Validates an election object 
 * @param {*} election an election in the export/import format
 */
function validateElectionObject(election) {
    //TODO
    return true;
}

