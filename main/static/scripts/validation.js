
/* Patterns */
let DISTRICT_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1 ]){1,120}$/;
let CAND_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1]){1}([ \wÀ-ÿ\u00f1\u00d1-]){0,99}$/;
let CAND_ABRV_NAME_PATTERN = /^([a-zA-ZÀ-ÿ\u00f1\u00d1]){1}([\wÀ-ÿ\u00f1\u00d1-]){0,19}$/;
let ELECTION_DATE_PATTERN = /^\d{4}-\d{1,2}-\d{1,2}$/;

/**
 * @param {String} name
 * @return {Boolean} - district's name matches pattern
 */
function validDistrictName(name) {
    return name != null && DISTRICT_NAME_PATTERN.test(name);
}

/**
 * @param {Number} voters
 * @return {Boolean} - district's voters are >= 1
 */
function validDistrictVoters(voters) {
    return voters != null && voters >= 1;
}

/**
 * @param {Number} voters
 * @param {Number} representatives
 * @return {Boolean} - district's representatives >= 1 and <= district's voters
 */
function validDistrictRepresentatives(representatives, voters) {
    return representatives != null && voters != null 
            &&(representatives <= voters) && (representatives >= 1);
}

/**
 * @param {Number} nullVotes
 * @param {Number} voters
 * @param {Number} blankVotes
 * @return {Boolean} - district's null votes are >= 0
 */
function validDistrictNull(nullVotes, voters, blankVotes) {

    if (isNaN(blankVotes)) {
        return nullVotes != null && voters != null 
            && (nullVotes >= 0) && (nullVotes <= voters);
    } else {
        return nullVotes != null && voters != null && blankVotes != null
            && (nullVotes >= 0) && (nullVotes <= (voters - blankVotes));
    }
    
}

/**
 * @param {Number} nullVotes
 * @param {Number} voters
 * @param {Number} blankVotes
 * @return {Boolean} - district's blank votes are >= 0
 */
function validDistrictBlank(blankVotes, voters, nullVotes) {    
    if (isNaN(nullVotes)) {
        return blankVotes != null && voters != null 
            && blankVotes >= 0 && blankVotes <= (voters);
    } else {
        return  nullVotes != null && voters != null && blankVotes != null 
                && blankVotes >= 0 && blankVotes <= (voters - nullVotes);
    }
}

/**
 * @param {String} name
 * @param {Array} allDistricts
 * @return {Boolean} - there's not another district with the same name.
 */
function uniqueDistrict(name, allDistricts) {    
    if (name == null || allDistricts == null) return false;

    let unique = true;
    allDistricts.forEach((d) => {
        if (d.name.trim() == name.trim()) { 
            unique = false 
        }
    });
    return unique;
}

/**
 * @param {Object} district
 * @param {Array} allDistricts
 * @return {Boolean} - district's fields are valid
 */
function validDistrict(district, allDistricts) {
    let name = district.name;
    let voters = district.voters;
    let representatives = district.representatives;
    let blankVotes = district.blank;
    let nullVotes  = district.null;

    return validDistrictName(name) && uniqueDistrict(name, allDistricts) 
        && validDistrictVoters(voters) && validDistrictRepresentatives(representatives, voters)
            && validDistrictBlank(blankVotes, voters, nullVotes) && validDistrictNull(nullVotes, voters, blankVotes);
}

/**
 * @param {String} name
 * @return {Boolean} - candidature's name matches pattern
 */
function validCandName(name) {
    return name != null && CAND_NAME_PATTERN.test(name);
}

/**
 * @param {String} abbrv
 * @return {Boolean} - candidature's abbreviate name matches pattern
 */
function validCandAbrvName(abbrv) {
    return abbrv != null && CAND_ABRV_NAME_PATTERN.test(abbrv);
}

/**
 * @param {Number} votes
 * @return {Boolean} - candidature's votes >= 0
 */
function validCandVotesBottom(votes) {
    return votes != null && votes >= 0;
    
}

/**
 * @param {Number} votes
 * @param {Object} district
 * @return {Boolean} - candidature's votes <= available votes in its district
 */
function validCandVotesTop(votes, district) {
    if (votes == null || district == null) return false;

    let candidatures = district.candidatures;
    let availableVotes = district.voters - district.blank - district.null;

    candidatures.forEach((c) => {
        availableVotes -= c.votes;
    });

    return votes <= availableVotes;
}

/**
 * @param {Object} candidature
 * @param {Object} district
 * @return {Boolean} - candidature's blank votes are >= 0
 */
function validCandidature(candidature, district) {
    if (candidature == null || district == null) return false;

    let name = candidature.name;
    let abbrv = candidature.abbrv; 
    let votes = candidature.votes;
    let allCandidatures = district.candidatures;

    return validCandName(name) && uniqueCandidatureName(name, allCandidatures) 
        && validCandAbrvName(abbrv)  && uniqueCandidatureAbbrv(abbrv, allCandidatures) 
        && validCandVotesTop(votes, district) && validCandVotesBottom(votes);
}

/**
 * @param {String} name
 * @param {Array} allCandidatures
 * @return {Boolean} - there's not another candidature with the same name
 */
function uniqueCandidatureName(name, allCandidatures) {
    if (name == null || allCandidatures == null) return false;

    let unique = true;

    allCandidatures.forEach((c)=> {
        if (c.name.trim() == name.trim()) {
            unique = false;
        }
    });
    return unique;
}

/**
 * @param {String} abbrv
 * @param {Array} allCandidatures
 * @return {Boolean} - there's not another candidature with the same abbreviate name
 */
function uniqueCandidatureAbbrv(abbrv, allCandidatures) {
    if (abbrv == null || allCandidatures == null) return false;
    
    let unique = true;
    allCandidatures.forEach((c)=> {
        if (c.abbrv.trim() == abbrv.trim()) {
            unique = false;
        }
    });
    return unique;
}

/**
 * @param {String} date
 * @return {Boolean} - election's date is valid
 */
function validElectionDate(date) {
    return date != null && ELECTION_DATE_PATTERN.test(date);
}

/**
 * Validates an election's type
 * @param {String} type
 * @param {Object} districts
 * @return {Boolean} - election's type and number of districts are valid
 */
function validElectionType(type, districts) {
    return type != null && districts != null && !(type== "local" && districts.length > 1);   
}

/**
 * Validates an election's threshold
 * @param {Number} threshold
 * @return {Boolean} - election's threshold >= 0 and <= 1.
 */
function validElectionThreshold(threshold) {
    return threshold != null && threshold >= 0 && threshold <= 1;
}

/**
 * Validates an election's data
 * @param {Date} date
 * @param {String} type
 * @param {Number} threshold
 * @param {Object} districts
 * @return {Boolean} - election's data is valid
 */
function validElection(date, type, threshold, districts) {
    return validElectionDate(date) && validElectionType(type, districts) 
            && validElectionThreshold(threshold) && districts.length >= 1;
}

/**
 * Validates an election object 
 * @param {Object} election an election in the export/import format
 * @return {Boolean} - election's data is valid
 */
function validElectionObject(election) {
    let date = election.date;
    let type = election.type;
    let threshold = election.configuration.threshold;
    let districts = election.districts;
    let valid = true;

    if(!validElection(date, type, threshold, districts)) {
        valid = false;
    } 

    for(let i = 0; i < districts.length && valid; i++) {
        let allDistricts = districts.slice();
        let district = districts[i];
        let candidatures = district.candidatures;
        delete allDistricts[i];

        if (!validDistrict(district, allDistricts)) {
            valid = false;
        }

        for (let j = 0; j < district.candidatures.length && valid; j++) {
            let allCandidatures = candidatures.slice();
            let candidature = candidatures[j];
            delete allCandidatures[j];
            district.candidatures = allCandidatures;

            if (!validCandidature(candidature, district)) {
                valid = false;
            }
        }
    }
    return valid;
}