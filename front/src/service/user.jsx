const axios = require('axios').default;

export function postUser(name, sectorIds, agreeToTerms) {


    return axios.post('http://localhost:8880/accounts', {
        name, sectors: mapIdsToEntities(sectorIds), agreeToTerms: String(agreeToTerms)
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const mapIdsToEntities = (sectorIds) => {
    return sectorIds.map((sectorId) => {
            return {
                id: sectorId
            }
        }
    )
}

export function updateUser(id, name, sectorIds, agreeToTerms) {
    return axios.put("http://localhost:8880/accounts", {
        name, sectors: mapIdsToEntities(sectorIds), agreeToTerms: String(agreeToTerms), id
    })
}

export function getUserSectors() {
    return axios.get('http://localhost:8880/sectors')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log({error});
        })

}

export function getAccounts() {
    return axios.get('http://localhost:8880/accounts')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log({error});
        })
}