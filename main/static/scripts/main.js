
let DISTRICTS = []; // Contains all districts
let SHOWING_DISTRICT = -1; // The index of the district whose candidatures are being shown.


/**
 * Obtains the content of all the input fields.
 * @return {Object}  an election in the export/import format
 */
function generateOutput(){
    let output = {
        date: val("election-date").toString(),
        type: val("election-type"),
        configuration: {
            threshold: fval("election-threshold")
        },
        districts: DISTRICTS
    };
    return output;
}

/**
 * Sets the content of all the input fields
 * @param {Object} election an election in the export/import format
 */
function generateInput(election) {
    document.getElementById("election-date").value = election.date;
    document.getElementById("election-type").value = election.type;
    document.getElementById("election-threshold").value = election.configuration.threshold;
    DISTRICTS = election.districts;
    updateDistricts();
    validateElection();
}


/**
 * Hide the candidatures div.
 */
function hideCandidaturesDiv() {
    let candidaturesDiv = document.getElementById("candidatures");
    candidaturesDiv.style.display = "none";
}

/**
 * Shows the candidatures div.
 */
function showCandidaturesDiv() {
    let candidaturesDiv = document.getElementById("candidatures");
    candidaturesDiv.style.display = "flex";
}

/**
 * Updates the Districts table.
 */
function updateDistricts(){
    let districtTable = document.getElementById("district-inside-table");

    // Remove the existing table 
    districtTable.remove();

    // Create a new table
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

    if (DISTRICTS.length == 0) {
        districtTable.style.display = "none";
        hideCandidaturesDiv();

    } else { // districts.length > 0      
        districtTable.style.display = "table";

        // Insert each district in a new row
        DISTRICTS.forEach((district, i)=>{
            let row = document.createElement("tr");
            row.innerHTML = `
            <td>${district.name}</td>
            <td>${district.voters}</td>
            <td>${district.representatives}</td>
            <td>${district.blank}</td>
            <td>${district.null}</td>
            <td><button data-id="${i}" class="view-district">Ver/Añadir</td>
            <td><button data-id="${i}" class="delete-district">Borrar</button></td>
            `;
            districtTable.appendChild(row);
        });

        // Configure "View" buttons
        let viewButtons = document.querySelectorAll(".view-district");
        viewButtons.forEach((button)=>{
            button.addEventListener("click", ()=>{                
                SHOWING_DISTRICT =  button.dataset.id;
                updateCandidatures();
                document.getElementById("showing-district-name").innerHTML = DISTRICTS[SHOWING_DISTRICT].name
                showCandidaturesDiv();
            });
        });

        // Configure "Delete" buttons
        let deleteButtons = document.querySelectorAll(".delete-district");
        deleteButtons.forEach((button)=>{
            button.addEventListener("click", () =>{  
                DISTRICTS.splice(button.dataset.id, 1); 
                updateDistricts();
                if (button.dataset.id == SHOWING_DISTRICT) {
                    hideCandidaturesDiv();
                }
                validateElectionType();
            });        
        });
    }   
}

/**
 * Updates the Candidatures table.
 */
function updateCandidatures(){
    let candidatureTable = document.getElementById("candidature-inside-table");

    // Remove the existing table
    candidatureTable.remove();

    // Create a new table
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

    // Insert each candidature of the corresponding district in a new row
    let candidatures = DISTRICTS[SHOWING_DISTRICT].candidatures;

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
            <td>${candidature.abbrv}</td>
            <td>${candidature.votes}</td>
            <td><button data-id="${i}" class="delete-candidature">Borrar</button></td>
            `;
            candidatureTable.appendChild(row);
        });
    
        // Configure "Delete" buttons
        let deleteButtons = document.querySelectorAll(".delete-candidature");
        deleteButtons.forEach((button)=>{
            button.addEventListener("click",()=>{
                DISTRICTS[SHOWING_DISTRICT].candidatures.splice(button.dataset.id, 1);
                updateCandidatures();
            });        
        });
    }    
}


/**
 * Adds the corresponding functionality to the 'Export' button.
 */
function configureExportButton() {
    let exportButton = document.getElementById("export");
    exportButton.addEventListener("click", ()=>{
        let output = generateOutput();
        console.log(output.districts[3]);
        let json = JSON.stringify(output);  //JSON.stringify(output, undefined, 2);
        json = json.replace(/,null/g, "");
        let a = document.createElement("a");
        let blob = new Blob([json], {type: "application/json"});
        a.href = window.URL.createObjectURL(blob);
        a.download = "election.json";
        a.click();
    });
}


/**
 * Adds the corresponding functionality to the 'Calculate' button.
 */
function configureCalculateButton() {
    let calculateButton = document.getElementById("calculate");
    calculateButton.addEventListener("click", ()=>{
        let token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        let output = generateOutput();
        let json = JSON.stringify(output);
        json = json.replace(/,null/g, "");
        let blob = new Blob([json], {type: "application/json"});

        let form = new FormData();
        form.append("csrfmiddlewaretoken", token);
        form.append("file", blob);
        form.append("method", "ajax");

        let req = new XMLHttpRequest();
        req.open("POST", "/");
        req.send(form);
        req.addEventListener("load", ()=>{
            console.log(req.response);
            window.location.href = "/results/" + req.response;
        });
    });
}

/**
 * Registers all the HTML5 dialogs in the PolyFill.
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

    document.getElementById("election-date").addEventListener("input", validateElectionDate);
    document.getElementById("election-date").addEventListener("cange", validateElectionDate);
    document.getElementById("election-type").addEventListener("input", validateElectionType);
    document.getElementById("election-threshold").addEventListener("input", validateElectionThreshold);

    registerDialogs();
    configureNewDistrictDialog();
    configureNewCandidatureDialog();
    configureUploadDialog();
    configureExportButton();    
    configureCalculateButton();    
}

window.addEventListener("load", main);