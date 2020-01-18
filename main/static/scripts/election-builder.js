
let districts = []; // Contains all districts

/**
 * Obtain the content of all the input fields.
 * @return {Object}
 */
function generateOutput(){
    let output = {
        date: val("election-date").toString(),
        type: val("election-type"),
        configuration: {
            threshold: fval("election-threshold")
        },
        districts: districts
    };
    return output;
}

/**
 * Hide the candidatures div.
 */
function hideCandidaturesDiv() {
    let candidaturesDiv = document.getElementById("candidatures");
    candidaturesDiv.style.display = "none";
}

/**
 * Show the candidatures div.
 */
function showCandidaturesDiv() {
    let candidaturesDiv = document.getElementById("candidatures");
    candidaturesDiv.style.display = "flex";
}

/**
 * Update the Districts table.
 */
function updateDistricts(){
    let districtTable = document.getElementById("district-inside-table");

    /* Remove the existing table */ 
    districtTable.remove();

    /* Create a new table */
    districtTable = document.createElement("table");
    districtTable.id = "district-inside-table";
    districtTable.innerHTML = `
    <tr>
    <th>Nombre</th>
    <th>Censo</th>
    <th>Escaños</th>
    <th>Votos en blanco</th>
    <th>Votos nulos</th>
    <th>Candidaturas</th>
    <th>¿Borrar?</th>
    </tr>`;
    document.getElementById("district-table").appendChild(districtTable);

    if (districts.length == 0) {
        districtTable.style.display = "none";
        hideCandidaturesDiv();

    } else { // districts.length > 0      
        districtTable.style.display = "table";

        /* Insert each district in a new row */
        districts.forEach((district, i)=>{
            let row = document.createElement("tr");
            row.innerHTML = `
            <td>${district.name}</td>
            <td>${district.voters}</td>
            <td>${district.representatives}</td>
            <td>${district.blank}</td>
            <td>${district.null}</td>
            <td><button data-id="${i}" class="view-district">Ver</td>
            <td><button data-id="${i}" class="delete-district">Borrar</button></td>
            `;
            districtTable.appendChild(row);
        });

        /* Configure "View" buttons */
        let viewButtons = document.querySelectorAll(".view-district");
        viewButtons.forEach((button)=>{
            button.addEventListener("click", ()=>{
                let newCandidature = document.getElementById("new-candidature");
                newCandidature.disabled = false;
                newCandidature.dataset.id = button.dataset.id;
                updateCandidatures();
                showCandidaturesDiv();
            });
        });

        /* Configure "Delete" buttons */
        let deleteButtons = document.querySelectorAll(".delete-district");
        deleteButtons.forEach((button)=>{
            button.addEventListener("click", () =>{  
                districts.splice(button.dataset.id, 1); 
                updateDistricts();
            });        
        });
    }   
}

/**
 * Update the Candidatures table.
 */
function updateCandidatures(){
    let newCandidature = document.getElementById("new-candidature");
    let candidatureTable = document.getElementById("candidature-inside-table");

    /* Remove the existing table */
    candidatureTable.remove();

    /* Create a new table */
    candidatureTable = document.createElement("table");
    candidatureTable.id = "candidature-inside-table";
    candidatureTable.innerHTML = `
    <tr>
    <th>Nombre</th>
    <th>Abreviatura</th>
    <th>Votos</th>
    <th>¿Borrar?</th>
    </tr>`;
    document.getElementById("candidature-table").appendChild(candidatureTable);

    /* Insert each candidature of the corresponding district in a new row */
    let district_id = newCandidature.dataset.id;
    let candidatures = districts[district_id].candidatures;

    if (candidatures.length == 0) {
        let row = document.createElement("tr");
            row.innerHTML = `
            <td colspan="4">No se han introducido candidaturas para esta circunscripción</td>
            `;
            candidatureTable.appendChild(row);

    } else { //candidatures.length > 0
        candidatures.forEach((candidature, i)=>{
            let row = document.createElement("tr");
            row.innerHTML = `
            <td>${candidature.name}</td>
            <td>${candidature.abbr}</td>
            <td>${candidature.votes}</td>
            <td><button data-id="${i}" class="delete-candidature">Borrar</button></td>
            `;
            candidatureTable.appendChild(row);
        });
    
        /* Configure "Delete" buttons */
        let deleteButtons = document.querySelectorAll(".delete-candidature");
        deleteButtons.forEach((button)=>{
            button.addEventListener("click",()=>{
                districts[district_id].candidatures.splice(button.dataset.id, 1);
                updateCandidatures();
            });        
        });
    }    
}

/**
 * Obtains the content of the 'New district' dialog
 * as an object.
 * @return {Object} new district to be added.
 */
function getDistrict() {
    let district = {
        name: val("district-name"),
        voters: ival("district-voters"),
        representatives: ival("district-representatives"),
        blank: ival("district-blank"),
        null: ival("district-null"),
        candidatures: []
    };

    return district;
}

/**
 * Add the corresponding functionality to all the 
 * dialog-disctrict's elements.
 */
function configureNewDistrictDialog() {

    /* Configure the "New district" button, which opens the dialog */   
    let dialogDistrict = document.getElementById("dialog-district");
    document.getElementById("new-district").addEventListener("click",()=>{
        dialogDistrict.showModal();
    });

    /* Configure the "Add district" button */
    document.getElementById("add-district").addEventListener("click",()=>{
        let newDistrict = getDistrict();
        districts.push(newDistrict);
        updateDistricts();
        dialogDistrict.close();       
    });
    
    /* Configure to the "Cancel" button */
    document.getElementById("cancel-district").addEventListener("click", ()=>{
        dialogDistrict.close();
    });

   /* Add event listeners to the dialog's fields */
   document.getElementById("district-name").addEventListener("input", validateDistrictName);
   document.getElementById("district-name").addEventListener("focusout", validateDistrictName);
   document.getElementById("district-voters").addEventListener("input", validateDistrictVoters);
   document.getElementById("district-voters").addEventListener("focusout", validateDistrictVoters);
   document.getElementById("district-representatives").addEventListener("input", validateDistrictRepresentatives);
   document.getElementById("district-representatives").addEventListener("focusout", validateDistrictRepresentatives);
   document.getElementById("district-null").addEventListener("input", validateDistrictNull);
   document.getElementById("district-null").addEventListener("focusout", validateDistrictNull);
   document.getElementById("district-blank").addEventListener("input", validateDistrictBlank);
   document.getElementById("district-blank").addEventListener("focusout", validateDistrictBlank);
}

/**
 * Add the corresponding functionality to all dialog-candidature's 
 * elements.
 */
function configureNewCandidatureDialog() {

    /* Configure the "New candidature" button, which opens the dialog */
    let newCandidature = document.getElementById("new-candidature");
    let dialogCandidature = document.getElementById("dialog-candidature");
    newCandidature.addEventListener("click", ()=>{
        dialogCandidature.showModal();
    });

    /* Configure the "Add candidature" button */
    let addCandidature = document.getElementById("add-candidature");
    addCandidature.addEventListener("click", () => {
        let candidature_id = newCandidature.dataset.id;
        districts[candidature_id].candidatures.push({
            name: val("candidature-name"),
            abbr: val("candidature-abbrv"),
            votes: ival("candidature-votes")
        });
        updateCandidatures();
        dialogCandidature.close();
    });

    /* Configure the "Cancel" button */
    let cancelCandidature = document.getElementById("cancel-candidature");
    cancelCandidature.addEventListener("click", ()=>{
       dialogCandidature.close(); 
    });
}

/**
 * Add the corresponding functionality to the 'Export' button.
 */
function configureExportButton() {
    let exportButton = document.getElementById("export");
    exportButton.addEventListener("click", ()=>{
        let output = generateOutput();
        let json = JSON.stringify(output);
        let a = document.createElement("a");
        let blob = new Blob([json], {type: "application/json"});
        a.href = window.URL.createObjectURL(blob);
        a.download = "election.json";
        a.click();
    });
}

/**
 * Add the corresponding functionality to the load-dialog's 
 * elements.
 */
function configureUploadDialog() {
    let uploadButton = document.getElementById("load");
    let uploadDialog = document.getElementById("load-dialog");
    uploadButton.addEventListener("click", ()=>{
        uploadDialog.showModal();
    });

    let cancelLoad = document.getElementById("cancel-load");
    cancelLoad.addEventListener("click", ()=>{
       uploadDialog.close(); 
    });
}

/**
 * Add the corresponding functionality to the 'Calculate' button.
 */
function configureCalculateButton() {
    let calculateButton = document.getElementById("calculate");
    calculateButton.addEventListener("click", ()=>{
        let token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        let output = generateOutput();
        let json = JSON.stringify(output);
        let blob = new Blob([json], {type: "application/json"});

        let form = new FormData();
        form.append("csrfmiddlewaretoken", token);
        form.append("file",blob);
        form.append("method", "ajax");

        let req = new XMLHttpRequest();
        req.open("POST", "/");
        req.send(form);
        req.addEventListener("load",()=>{
            window.location.href = "/results/" + req.response;
        })
    });
}

/**
 * Register all the HTML5 dialogs in the PolyFill.
 */
function registerDialogs() {
    let dialogs = document.querySelectorAll("dialog");
    dialogs.forEach((dialog)=>{
        dialogPolyfill.registerDialog(dialog);
    });
}


/**
 * MAIN PROGRAMM
 */
function main(){
    registerDialogs();
    configureNewDistrictDialog();
    configureNewCandidatureDialog();
    configureExportButton();
    configureUploadDialog();
    configureCalculateButton();    
}

window.addEventListener("load", main);