
let districts = []; // Contains all districts
let showingDistrict = -1;


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

    if (districts.length == 0) {
        districtTable.style.display = "none";
        hideCandidaturesDiv();

    } else { // districts.length > 0      
        districtTable.style.display = "table";

        // Insert each district in a new row
        districts.forEach((district, i)=>{
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
                showingDistrict =  button.dataset.id;
                updateCandidatures();
                document.getElementById("showing-district-name").innerHTML = districts[showingDistrict].name
                showCandidaturesDiv();
            });
        });

        // Configure "Delete" buttons
        let deleteButtons = document.querySelectorAll(".delete-district");
        deleteButtons.forEach((button)=>{
            button.addEventListener("click", () =>{  
                districts.splice(button.dataset.id, 1); 
                updateDistricts();
                if (button.dataset.id == showingDistrict) {
                    hideCandidaturesDiv();
                }
                validateElectionType();
            });        
        });
    }   
}

/**
 * Update the Candidatures table.
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
    let candidatures = districts[showingDistrict].candidatures;

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
    
        // Configure "Delete" buttons
        let deleteButtons = document.querySelectorAll(".delete-candidature");
        deleteButtons.forEach((button)=>{
            button.addEventListener("click",()=>{
                districts[showingDistrict].candidatures.splice(button.dataset.id, 1);
                updateCandidatures();
            });        
        });
    }    
}



/**
 * Add the corresponding functionality to the 'Export' button.
 */
function configureExportButton() {
    let exportButton = document.getElementById("export");
    exportButton.addEventListener("click", ()=>{
        let output = generateOutput();
        let json = JSON.stringify(output, null,2);
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
        let file = document.getElementById("file");
        console.log(file.files);
        //uploadDialog.close(); 
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

    document.getElementById("election-date").addEventListener("input", validateElectionDate);
    document.getElementById("election-date").addEventListener("cange", validateElectionDate);
    document.getElementById("election-type").addEventListener("input", validateElectionType);
    document.getElementById("election-threshold").addEventListener("input", validateElectionThreshold);

    registerDialogs();
    configureNewDistrictDialog();
    configureNewCandidatureDialog();
    configureExportButton();
    configureUploadDialog();
    configureCalculateButton();    
}

window.addEventListener("load", main);