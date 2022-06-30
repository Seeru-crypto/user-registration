const axios = require('axios').default;

export function postUser(name, sector, agreeToTerms){
    return axios.post('http://localhost:8880/account', {
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
    return axios.put("http://localhost:8880/account", {
        name, selectedSectors: sector, agreeToTerms, id
    })
}

export function getUserSectors(){
    return axios.get('http://localhost:8880/sector')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log({error});
        })
}