const axios = require('axios').default;

export function postUser(name, sector, agreeToTerms){
    return axios.post('http://localhost:8880/accounts', {
        name, selectedSectors: sector, agreeToTerms: String(agreeToTerms)
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function updateUser(id, name, sector, agreeToTerms) {
    return axios.put("http://localhost:8880/accounts", {
        name, selectedSectors: sector, agreeToTerms, id
    })
}

export function getUserSectors(){
    return axios.get('http://localhost:8880/sectors')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log({error});
        })

}export function getAccounts(){
    return axios.get('http://localhost:8880/accounts')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log({error});
        })
}